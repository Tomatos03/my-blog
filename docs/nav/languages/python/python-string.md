# Python 字符串

Python 字符串是不可变的 Unicode 字符序列，支持丰富的内置方法和格式化操作。

## 创建字符串

| 方式 | 语法 | 说明 |
|------|------|------|
| 单引号 | `'hello'` | 最基础的写法 |
| 双引号 | `"hello"` | 与单引号等价，内部可包含单引号 |
| 三引号 | `"""..."""` 或 `'''...'''` | 可跨行，保留换行和缩进 |
| 原始字符串 | `r'hello\n'` | 不处理转义字符 |
| 字节串 | `b'hello'` | 表示字节数据，仅限 ASCII |

```python
s1 = 'hello'
s2 = "it's a test"           # 内部含单引号时用双引号
s3 = """多行
字符串"""                      # 跨行保留换行符
s4 = r'path\no\escape'       # 原始字符串，\n 不会被转义
s5 = b'hello'                # 字节串
```

### 三引号字符串

三引号（`"""` 或 `'''`）的核心特点是**保留源码中的换行和缩进**，常用于以下场景：

**多行文本：**

```python
text = """第一行
第二行
    第三行（带缩进）"""
# 第一行
# 第二行
#     第三行（带缩进）
```

**文档字符串（docstring）：**

```python
def greet(name):
    """向用户打招呼。

    Args:
        name: 用户名
    Returns:
        问候语
    """
    return f"Hello, {name}!"
```

**SQL / HTML 等多行内容：**

```python
query = """
    SELECT id, name
    FROM users
    WHERE age > 18
    ORDER BY name
"""
```

> [!TIP]
> 三引号字符串末尾的换行会被保留。如果不需要末尾换行，把结束的 `"""` 放在同一行：`"""第一行\n第二行"""`。

## 字符串拼接

| 方式 | 适用场景 | 性能 |
|------|----------|------|
| `+` 运算符 | 少量字符串拼接 | 一般 |
| 相邻字面量 | 长字符串换行 | 最优（编译期合并） |
| `join()` | 循环中拼接大量字符串 | 最优（运行时） |
| f-string | 需要嵌入变量 | 一般 |

- **`+` 运算符**：最直观的方式，适合少量字符串拼接。

```python
first = "Hello"
second = "World"
s = first + " " + second  # "Hello World"
```

- **相邻字面量自动拼接**：Python 在编译时会自动合并相邻的字符串字面量，无需运算符。常用于长字符串换行。

```python
s = "Hello" " " "World"  # "Hello World"

message = (
    "这是一个很长的字符串，"
    "可以分成多行书写，"
    "编译时会自动拼接。"
)
```

> [!TIP]
> 每次使用 `+` 拼接字符串时，都会创建一个新的字符串对象，性能较差。对于大量字符串拼接，推荐使用 `join()`。  

- **`join()` 方法**：拼接可迭代对象中的多个字符串，循环拼接时性能最优。

```python
words = ["Hello", "World", "Python"]
" ".join(words)   # "Hello World Python"
",".join(words)   # "Hello,World,Python"
"".join(words)    # "HelloWorldPython"
```

- **f-string 拼接**：适合需要嵌入变量的场景。

```python
name = "Tom"
age = 25
s = f"{name} is {age} years old"
```

- **性能对比**：循环中应使用 `join()`，避免 `+=` 反复创建新对象。

```python
# 低效：每次 + 都会创建新字符串对象
result = ""
for s in ["a", "b", "c", "d"]:
    result += s

# 高效：join 只分配一次内存
result = "".join(["a", "b", "c", "d"])
```

## 字符串操作

```python
# 重复
s = "ha" * 3  # "hahaha"

# 索引与切片
s = "Python"
s[0]     # 'P'
s[-1]    # 'n'
s[1:4]   # 'yth'
s[::2]   # 'Pto'
```

## 常用方法

| 方法 | 说明 |
|------|------|
| `strip()` | 去除两端空白 |
| `split(sep)` | 按分隔符拆分 |
| `join(iter)` | 用字符串连接可迭代对象 |
| `replace(old, new)` | 替换子串 |
| `find(sub)` | 查找子串位置，未找到返回 -1 |
| `startswith()` / `endswith()` | 前缀/后缀判断 |
| `upper()` / `lower()` | 大小写转换 |
| `format()` / `f-string` | 格式化 |

## 格式化

### f-string（推荐）

Python 3.6+ 引入，在字符串前加 `f`，用 `{}` 直接嵌入表达式：

```python
name = "Tom"
age = 25

# 基本用法
f"{name} is {age} years old"       # "Tom is 25 years old"

# 表达式
f"{name.upper()}"                  # "TOM"
f"明年 {age + 1} 岁"               # "明年 26 岁"
f"结果: {3.14159:.2f}"             # "结果: 3.14"（保留2位小数）

# 填充与对齐
f"{'hi':>10}"       # "        hi"（右对齐，宽度10）
f"{'hi':<10}"       # "hi        "（左对齐）
f"{'hi':^10}"       # "    hi    "（居中）
f"{'hi':*^10}"      # "****hi****"（居中，用*填充）

# 数字格式
f"{42:05d}"         # "00042"（补零）
f"{0.856:.1%}"      # "85.6%"（百分比）
f"{1_000_000:,}"    # "1,000,000"（千分位）
f"{255:#x}"         # "0xff"（十六进制）
```

### format 方法

```python
# 位置参数
"{} is {} years old".format("Tom", 25)
"{0} is {1} years old".format("Tom", 25)

# 关键字参数
"{name} is {age} years old".format(name="Tom", age=25)

# 格式规范与 f-string 相同
"{:.2f}".format(3.14159)       # "3.14"
"{:>10}".format("hi")          # "        hi"
```

### % 格式化（旧式）

```python
"%s is %d years old" % ("Tom", 25)
"%.2f" % 3.14159               # "3.14"
```

| 占位符 | 说明 |
|--------|------|
| `%s` | 字符串 |
| `%d` | 整数 |
| `%f` | 浮点数 |
| `%x` | 十六进制 |

> [!TIP]
> 优先使用 f-string，它可读性最好、性能最高。`%` 格式化仅在兼容旧代码时使用。

## 字符串编码

```python
# 编码
s = "你好"
b = s.encode("utf-8")   # b'\xe4\xbd\xa0\xe5\xa5\xbd'

# 解码
s2 = b.decode("utf-8")  # "你好"
```
