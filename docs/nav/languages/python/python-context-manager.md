# Python 上下文管理器

上下文管理器通过 `with` 语句管理资源的获取和释放，确保资源在使用后被正确清理。

## 基本用法

```python
with open("data.txt", "r") as f:
    content = f.read()
# 文件自动关闭，即使发生异常
```

## 自定义上下文管理器

实现 `__enter__` 和 `__exit__` 方法：

```python
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.elapsed = time.time() - self.start
        print(f"耗时: {self.elapsed:.4f}s")
        return False  # 不抑制异常

with Timer() as t:
    sum(range(1000000))
print(f"结果耗时: {t.elapsed}s")
```

## contextlib 方式

使用 `@contextmanager` 装饰器更简洁：

```python
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield  # yield 的值绑定到 as 变量
    print(f"耗时: {time.time() - start:.4f}s")

with timer():
    sum(range(1000000))
```

## 带参数的上下文管理器

```python
@contextmanager
def open_file(path, mode="r", encoding="utf-8"):
    f = open(path, mode, encoding=encoding)
    try:
        yield f
    finally:
        f.close()
```

## 抑制异常

```python
from contextlib import suppress

with suppress(FileNotFoundError):
    open("nonexistent.txt")
# FileNotFoundError 被忽略
```

## 嵌套使用

```python
# Python 3.10+ 支持括号分组
with (
    open("in.txt") as fin,
    open("out.txt", "w") as fout,
):
    fout.write(fin.read())

# 旧版本用 contextlib.ExitStack
from contextlib import ExitStack

with ExitStack() as stack:
    files = [stack.enter_context(open(f)) for f in ["a.txt", "b.txt"]]
```

## 常见应用场景

```python
# 数据库事务
@contextmanager
def transaction(connection):
    try:
        yield connection
        connection.commit()
    except:
        connection.rollback()
        raise

# 锁
import threading
lock = threading.Lock()

with lock:
    # 临界区代码
    pass

# 临时修改环境变量
import os

@contextmanager
def env_var(key, value):
    old = os.environ.get(key)
    os.environ[key] = value
    try:
        yield
    finally:
        if old is None:
            del os.environ[key]
        else:
            os.environ[key] = old
```
