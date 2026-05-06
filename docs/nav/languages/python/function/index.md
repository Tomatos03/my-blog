# Python 函数

Python 使用 `def` 定义函数，函数是一等公民，可赋值、传递和嵌套定义。

## 基本定义

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Tom"))
```

## 参数类型

| 参数类型       | 语法          | 说明                           |
| -------------- | ------------- | ------------------------------ |
| 位置参数       | `def f(a, b)` | 调用时必须按顺序提供           |
| 默认参数       | `def f(a=1)`  | 调用时可省略，使用默认值       |
| 可变位置参数   | `def f(*args)` | 接收任意数量的位置参数         |
| 可变关键字参数 | `def f(**kwargs)` | 接收任意数量的关键字参数   |

- **默认参数**：为参数指定默认值，调用时可以省略该参数。

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Tom")                    # "Hello, Tom!"
greet("Tom", "Hi")              # "Hi, Tom!"
```

> [!NOTE]
> 默认参数必须放在位置参数之后。默认参数的值在函数定义时计算一次，不是每次调用时重新计算。

- **可变位置参数（`*args`）**：接收任意数量的位置参数，以元组形式存储。

```python
# *args 将所有位置参数收集为元组
def sum_all(*args):
    # args = (1, 2, 3) 或 (1, 2, 3, 4, 5)
    return sum(args)

sum_all(1, 2, 3)        # 6
sum_all(1, 2, 3, 4, 5)  # 15
```

> [!TIP]
> `*args` 中的 `args` 只是约定俗成的名称，可以改为其他名称如 `*numbers`，但通常保持 `*args` 以保持代码一致性。

- **可变关键字参数（`**kwargs`）**：接收任意数量的关键字参数，以字典形式存储。

```python
# **kwargs 将所有关键字参数收集为字典
def print_info(**kwargs):
    # kwargs = {'name': 'Tom', 'age': 25}
    for k, v in kwargs.items():
        print(f"{k}: {v}")

print_info(name="Tom", age=25)
# name: Tom
# age: 25
```

> [!NOTE]
> `**kwargs` 中的 `kwargs` 也是约定俗成的名称，可以改为其他名称如 `**options`。

## 参数顺序

定义时参数顺序必须为：位置参数 → 默认参数 → `*args` → 关键字参数 → `**kwargs`

```python
def func(a, b, c=0, *args, d, **kwargs):
    pass
```

## Lambda 表达式

Lambda 表达式是一种创建匿名函数的简洁方式，语法为：`lambda 参数: 表达式`

- **参数**：可以有多个，用逗号分隔
- **表达式**：单行表达式，自动返回结果
- **返回值**：表达式的计算结果

```python
# 基本用法：单个参数
square = lambda x: x ** 2
square(5)  # 25

# 多个参数
add = lambda x, y: x + y
add(3, 4)  # 7

# 无参数
greet = lambda: "Hello"
greet()  # "Hello"
```

Lambda 常用于需要传递函数作为参数的场景，如 `sorted()`、`map()`、`filter()` 等：

```python
pairs = [(1, 'b'), (3, 'a'), (2, 'c')]
sorted(pairs, key=lambda x: x[1])  # [(3, 'a'), (1, 'b'), (2, 'c')]

numbers = [1, 2, 3, 4, 5]
list(map(lambda x: x ** 2, numbers))  # [1, 4, 9, 16, 25]
list(filter(lambda x: x > 2, numbers))  # [3, 4, 5]
```

> [!NOTE]
> Lambda 表达式只能包含单行表达式，不能包含多条语句。对于复杂逻辑，应使用 `def` 定义普通函数。

## 作用域

Python 使用 LEGB 规则查找变量，按以下顺序逐级查找：

1. **L**ocal：函数内部
2. **E**nclosing：嵌套函数的外层
3. **G**lobal：模块级
4. **B**uilt-in：内置

| 关键字 | 作用 |
| ------ | ---- |
| `global` | 声明变量来自全局作用域（模块级），允许在函数内修改全局变量 |
| `nonlocal` | 声明变量来自外层函数作用域（Enclosing），允许在嵌套函数内修改外层函数的变量 |

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
        # nonlocal 声明 count 来自外层函数，而不是创建新的局部变量
        nonlocal count
        count += 1
        return count
    return increment

# 创建计数器函数
counter_func = counter()
counter_func()  # 1
counter_func()  # 2
counter_func()  # 3
```

## 返回值

```python
# 返回多个值（实际是元组）
# 当前函数的返回值: (min, max)
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5])
```

## 类型注释

类型注释用于静态类型检查和 IDE 辅助，不影响运行时行为。函数参数和返回值都可以添加类型注释。

```python
def add(a: int, b: int) -> int:
    return a + b
```

| 类型注释 | 说明 | 示例 |
| -------- | ---- | ---- |
| `int` | 整数 | `def f(x: int)` |
| `float` | 浮点数 | `def f(x: float)` |
| `str` | 字符串 | `def f(x: str)` |
| `bool` | 布尔值 | `def f(x: bool)` |
| `list` | 列表 | `def f(x: list)` |
| `dict` | 字典 | `def f(x: dict)` |
| `tuple` | 元组 | `def f(x: tuple)` |
| `set` | 集合 | `def f(x: set)` |
| `list[int]` | 整数列表 | `def f(x: list[int])` |
| `dict[str, int]` | 字符串键、整数值的字典 | `def f(x: dict[str, int])` |
| `tuple[int, str]` | 包含整数和字符串的元组 | `def f(x: tuple[int, str])` |
| `None` | 无返回值 | `def f() -> None` |
| `Union[int, str]` | 多种类型之一 | `def f(x: Union[int, str])` |
| `Optional[int]` | 可选类型（可为 None） | `def f(x: Optional[int])` |

> [!NOTE]
> 类型注释是可选的，Python 不会在运行时强制检查。使用类型检查工具如 `mypy` 可以在开发阶段发现类型错误。
