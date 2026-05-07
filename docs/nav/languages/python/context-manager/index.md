# Python 上下文管理器

上下文管理器通过 `with` 语句管理资源的获取和释放，确保资源在使用后被正确清理。

**基本用法**

```python
# 语法结构
with expression as variable:
    # 使用资源
    pass
# 资源自动释放

with open("data.txt", "r") as f:
    content = f.read()
# 文件自动关闭，即使发生异常#
```


## 自定义上下文管理器

`with` 语句在进入代码块时自动调用 `__enter__` 方法，其返回值赋给 `as` 后的变量；在离开代码块时（无论正常结束还是发生异常）自动调用 `__exit__` 方法。`__exit__` 接收三个异常参数（`exc_type`、`exc_val`、`exc_tb`），无异常时均为 `None`；返回 `True` 会抑制异常，返回 `False` 则继续向外抛出。

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
```

## contextlib 方式

使用 `@contextmanager` 装饰器可以将一个生成器函数转为上下文管理器，省去编写类的模板代码。`yield` 之前的逻辑对应 `__enter__`，`yield` 的值会赋给 `as` 变量；`yield` 之后的逻辑对应 `__exit__`，即使 `with` 块中发生异常也会执行（类似 `finally`）。

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

无论是类写法还是 `@contextmanager` 写法，只需在创建上下文管理器时传入参数即可。类写法通过 `__init__` 接收参数：

```python
class ManagedResource:
    def __init__(self, name, timeout=30):
        self.name = name
        self.timeout = timeout

    def __enter__(self):
        print(f"打开 {self.name} (超时: {self.timeout}s)")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"关闭 {self.name}")
        return False

with ManagedResource("数据库连接", timeout=60) as r:
    pass
```

`@contextmanager` 写法直接给函数传参：

```python
from contextlib import contextmanager

@contextmanager
def open_file(path, mode="r", encoding="utf-8"):
    f = open(path, mode, encoding=encoding)
    try:
        yield f
    finally:
        f.close()

with open_file("data.txt", encoding="gbk") as f:
    content = f.read()
```

## 抑制异常

```python
from contextlib import suppress

with suppress(FileNotFoundError):
    open("nonexistent.txt")
# FileNotFoundError 被忽略
```

## 多个上下文管理器

```python
# Python 3.10+ 支持括号分组
with (
    open("in.txt") as fin,
    open("out.txt", "w") as fout,
):
    fout.write(fin.read())
```

当需要管理的上下文管理器数量在编写代码时不确定（例如根据配置动态打开 N 个文件），可以使用 `ExitStack`。它在运行时通过 `stack.enter_context()` 逐个注册上下文管理器，退出 `with` 块时按后进先出的顺序自动清理所有已注册的资源：

```python
from contextlib import ExitStack

with ExitStack() as stack:
    files = [stack.enter_context(open(f)) for f in ["a.txt", "b.txt"]]
# files 中的文件句柄在 with 块结束时全部自动关闭
```
