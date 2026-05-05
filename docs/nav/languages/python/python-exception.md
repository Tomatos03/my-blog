# Python 异常处理

Python 使用 try-except 机制处理运行时错误，异常是类对象，支持自定义和层级继承。

## 基本语法

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零")
except (TypeError, ValueError) as e:
    print(f"类型或值错误: {e}")
else:
    print("没有异常时执行")
finally:
    print("总是执行")
```

## 常见内置异常

| 异常 | 说明 |
|------|------|
| `ValueError` | 值不合法 |
| `TypeError` | 类型不匹配 |
| `KeyError` | 字典键不存在 |
| `IndexError` | 索引越界 |
| `FileNotFoundError` | 文件不存在 |
| `AttributeError` | 属性不存在 |
| `ImportError` | 导入失败 |
| `RuntimeError` | 运行时错误 |

## 异常链

```python
try:
    open("missing.txt")
except FileNotFoundError as e:
    raise RuntimeError("配置文件缺失") from e
```

## 自定义异常

```python
class AppError(Exception):
    """应用基础异常"""
    pass

class ValidationError(AppError):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

# 使用
raise ValidationError("email", "格式不正确")
```

## 异常捕获原则

- 只捕获你能处理的异常
- 不要用裸 `except:` 捕获所有异常
- 尽量缩小 try 块的范围
- 用 `finally` 做清理工作

```python
# 不推荐
try:
    do_something()
except:
    pass

# 推荐
try:
    do_something()
except ValueError:
    handle_value_error()
```

## 内置异常层次

```
BaseException
 ├── SystemExit
 ├── KeyboardInterrupt
 ├── GeneratorExit
 └── Exception
      ├── StopIteration
      ├── ArithmeticError
      │    ├── ZeroDivisionError
      │    └── OverflowError
      ├── LookupError
      │    ├── IndexError
      │    └── KeyError
      ├── OSError
      │    └── FileNotFoundError
      ├── ValueError
      └── TypeError
```
