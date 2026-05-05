# Python 函数

Python 使用 `def` 定义函数，函数是一等公民，可赋值、传递和嵌套定义。

## 基本定义

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Tom"))
```

## 参数类型

```python
# 默认参数
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# 可变位置参数
def sum_all(*args):
    return sum(args)

sum_all(1, 2, 3)  # 6

# 可变关键字参数
def print_info(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}: {v}")

print_info(name="Tom", age=25)
```

## 参数顺序

定义时参数顺序必须为：位置参数 → 默认参数 → `*args` → 关键字参数 → `**kwargs`

```python
def func(a, b, c=0, *args, d, **kwargs):
    pass
```

## Lambda 表达式

```python
square = lambda x: x ** 2
square(5)  # 25

pairs = [(1, 'b'), (3, 'a'), (2, 'c')]
sorted(pairs, key=lambda x: x[1])  # [(3, 'a'), (1, 'b'), (2, 'c')]
```

## 作用域

Python 使用 LEGB 规则查找变量：

- **L**ocal：函数内部
- **E**nclosing：嵌套函数的外层
- **G**lobal：模块级
- **B**uilt-in：内置

```python
x = "global"

def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print(x)
    inner()

outer()  # "local"
```

使用 `global` 和 `nonlocal` 修改外层变量：

```python
def counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment
```

## 返回值

```python
# 返回多个值（实际是元组）
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5])
```

## 类型提示

```python
def add(a: int, b: int) -> int:
    return a + b
```
