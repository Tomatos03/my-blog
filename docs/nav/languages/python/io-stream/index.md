# Python IO编程

Python 的 IO 模型基于"一切皆文件对象"的思想，文件读写、标准输入输出、内存缓冲、子进程管道都遵循统一的读写接口。

## 文件读写

### 基本读写

```python
# 读取
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()        # 读全部
    # lines = f.readlines()   # 读所有行
    # line = f.readline()     # 读一行

# 写入
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Hello\n")
    f.writelines(["line1\n", "line2\n"])

# 追加
with open("log.txt", "a") as f:
    f.write("new entry\n")
```

### 文件模式

| 模式 | 说明 |
|------|------|
| `r` | 只读（默认） |
| `w` | 写入（覆盖） |
| `a` | 追加 |
| `x` | 创建（已存在则失败） |
| `b` | 二进制模式 |
| `+` | 读写模式 |

```python
# 二进制文件
with open("image.png", "rb") as f:
    data = f.read()

with open("copy.png", "wb") as f:
    f.write(data)
```

### pathlib 模块

```python
from pathlib import Path

p = Path("data") / "config.json"

# 读写
p.read_text(encoding="utf-8")
p.write_text("content", encoding="utf-8")

# 信息
p.exists()
p.is_file()
p.is_dir()
p.name        # "config.json"
p.stem        # "config"
p.suffix      # ".json"
p.parent      # Path("data")

# 遍历
for f in Path(".").glob("*.py"):
    print(f)

for f in Path(".").rglob("*.py"):  # 递归
    print(f)

# 创建/删除
Path("new_dir").mkdir(parents=True, exist_ok=True)
Path("old.txt").unlink(missing_ok=True)
```

### JSON 读写

```python
import json

data = {"name": "Tom", "age": 25}

# 写入
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取
with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)

# 字符串转换
s = json.dumps(data, ensure_ascii=False)
obj = json.loads(s)
```

### CSV 读写

```python
import csv

# 写入
with open("data.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "age"])
    writer.writerows([["Tom", 25], ["Jerry", 22]])

# 读取
with open("data.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])
```

## 标准流

Python 启动时自动打开三个标准流，定义在 `sys` 模块中：

| 流 | 对象 | 默认目标 | 说明 |
|---|---|---|---|
| 标准输入 | `sys.stdin` | 键盘 | 可读文件对象，逐行读取 |
| 标准输出 | `sys.stdout` | 终端 | 可写文件对象，行缓冲 |
| 标准错误 | `sys.stderr` | 终端 | 可写文件对象，无缓冲 |

```python
import sys

# 等价于 print()
sys.stdout.write("hello\n")

# 等价于 input()
line = sys.stdin.readline()

# 错误输出不受重定向影响
sys.stderr.write("warning: something happened\n")
```

## print() 与 input()

`print()` 和 `input()` 是标准流的高层封装。

```python
# print() 参数
print("a", "b", "c", sep=", ", end="!\n")   # a, b, c!
print("log msg", file=open("app.log", "a"))  # 输出到文件
print("flush now", flush=True)               # 立即刷新

# input() 参数
name = input("请输入姓名: ")  # 显示提示，等待输入
```

`print()` 的 `file` 参数接受任何可写文件对象，`flush=True` 在实时日志场景中很有用。

## 流重定向

### 临时重定向（推荐）

```python
import contextlib
import io

# redirect_stdout 捕获 print 输出
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    print("captured")
    print("lines")
output = buf.getvalue()  # "captured\nlines\n"

# redirect_stderr 捕获错误输出
err_buf = io.StringIO()
with contextlib.redirect_stderr(err_buf):
    import sys
    sys.stderr.write("error occurred\n")
```

### 重定向到文件

```python
import sys

with open("output.txt", "w") as f:
    old_stdout = sys.stdout
    sys.stdout = f
    print("写入文件而非终端")
    sys.stdout = old_stdout  # 恢复
```

> [!WARNING]
> 手动替换 `sys.stdout` 容易遗漏恢复，建议优先使用 `contextlib.redirect_stdout`。

### redirect_stdout 的限制

只捕获通过 `sys.stdout` 的输出，以下不会被捕获：

- 直接写 `sys.stdout.buffer` 的底层调用
- C 扩展中的 `printf`
- 子进程的标准输出

## io.StringIO 与 io.BytesIO

内存中的文件对象，接口与真实文件一致，适合测试和临时数据处理。

### StringIO — 文本流

```python
import io

# 写入
buf = io.StringIO()
buf.write("line 1\n")
buf.write("line 2\n")

# 读取
buf.seek(0)          # 回到开头
content = buf.read()  # 全部内容
buf.seek(0)
lines = buf.readlines()  # ["line 1\n", "line 2\n"]

# 直接初始化
buf = io.StringIO("initial content")
```

### BytesIO — 二进制流

```python
import io

buf = io.BytesIO()
buf.write(b"\x89PNG\r\n")
buf.seek(0)
data = buf.getvalue()

# 典型用途：内存中处理图片
from PIL import Image
img = Image.open(buf)
```

### 典型用途

```python
import io
import csv

# 用 StringIO 作为 CSV 的中间缓冲
buf = io.StringIO()
writer = csv.writer(buf)
writer.writerow(["name", "age"])
writer.writerow(["Tom", 25])
csv_string = buf.getvalue()

# 测试中捕获日志
import logging
log_buf = io.StringIO()
handler = logging.StreamHandler(log_buf)
logger = logging.getLogger("test")
logger.addHandler(handler)
logger.warning("test warning")
assert "test warning" in log_buf.getvalue()
```

## 管道与 subprocess

### subprocess.run — 简单调用

```python
import subprocess

# 执行命令，捕获输出
result = subprocess.run(
    ["ls", "-la"],
    capture_output=True,  # 捕获 stdout + stderr
    text=True,            # 返回字符串而非 bytes
    cwd="/tmp",           # 工作目录
)
print(result.stdout)
print(result.returncode)

# 管道输入
result = subprocess.run(
    ["grep", "error"],
    input="line1\nerror: something\nline3\n",
    capture_output=True,
    text=True,
)
```

### subprocess.Popen — 精细控制

```python
import subprocess

# 连接两个命令的管道：ls | grep .py
p1 = subprocess.Popen(["ls"], stdout=subprocess.PIPE, text=True)
p2 = subprocess.Popen(
    ["grep", ".py"],
    stdin=p1.stdout,       # p1 的输出作为 p2 的输入
    stdout=subprocess.PIPE,
    text=True,
)
p1.stdout.close()  # 允许 p1 收到 SIGPIPE
output, _ = p2.communicate()

# 实时读取子进程输出
proc = subprocess.Popen(
    ["ping", "-c", "3", "localhost"],
    stdout=subprocess.PIPE,
    text=True,
)
for line in proc.stdout:
    print(line, end="")
proc.wait()
```

### subprocess 参数速查

| 参数 | 说明 |
|------|------|
| `stdin` | `subprocess.PIPE` 创建管道，或传入文件对象 |
| `stdout` | `subprocess.PIPE` 捕获输出 |
| `stderr` | `subprocess.PIPE` 捕获错误，`subprocess.STDOUT` 合并到 stdout |
| `capture_output` | 等价于 `stdout=PIPE, stderr=PIPE` |
| `text` | `True` 时返回 `str`，否则返回 `bytes` |
| `encoding` | 指定编解码方式，启用 `text=True` |
