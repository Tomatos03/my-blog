# Python 迭代器与生成器

迭代器和生成器是 Python 惰性求值的核心机制，用于高效处理大量数据或无限序列。

## 可迭代对象与迭代器

实现了 `__iter__()` 的对象是可迭代对象，同时实现 `__iter__()` 和 `__next__()` 的是迭代器：

```python
class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in CountDown(5):
    print(n)  # 5, 4, 3, 2, 1
```

## 生成器函数

使用 `yield` 的函数自动变为生成器：

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# 取前 10 个
gen = fibonacci()
for _ in range(10):
    print(next(gen))
```

`yield` 暂停函数执行并保存状态，下次调用 `next()` 时恢复。

## 生成器表达式

```python
# 列表推导式（立即求值，占用内存）
squares_list = [x**2 for x in range(1000000)]

# 生成器表达式（惰性求值，节省内存）
squares_gen = (x**2 for x in range(1000000))

total = sum(x**2 for x in range(1000000))  # 逐个计算
```

## yield from

委派给子生成器：

```python
def chain(*iterables):
    for it in iterables:
        yield from it

list(chain([1, 2], [3, 4]))  # [1, 2, 3, 4]
```

## send 与 throw

生成器支持双向通信：

```python
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is None:
            break
        total += value

gen = accumulator()
next(gen)         # 启动，返回 0
gen.send(10)      # 10
gen.send(20)      # 30
gen.throw(ValueError)  # 抛入异常
```

## itertools 模块

```python
import itertools

# 无限迭代
for i in itertools.count(1):
    if i > 5:
        break
    print(i)

# 组合
list(itertools.chain([1, 2], [3, 4]))       # [1, 2, 3, 4]
list(itertools.product("AB", [1, 2]))        # [('A',1), ('A',2), ('B',1), ('B',2)]
list(itertools.combinations("ABC", 2))       # [('A','B'), ('A','C'), ('B','C')]
list(itertools.permutations("ABC", 2))       # 6个排列

# 分组
data = [("a", 1), ("a", 2), ("b", 3)]
for k, g in itertools.groupby(data, key=lambda x: x[0]):
    print(k, list(g))
```
