# Python 序列

Python 序列是一组有序元素的集合，包括列表、元组和范围。它们共享索引、切片、迭代等基本操作。

## 列表（list）

列表是可变的有序序列：

```python
# 创建
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", True, [1, 2]]

# 增
fruits.append("date")
fruits.insert(1, "avocado")
fruits.extend(["fig", "grape"])

# 删
fruits.remove("banana")  # 按值删除
fruits.pop()              # 弹出末尾
fruits.pop(0)             # 按索引弹出
del fruits[1]

# 改
fruits[0] = "apricot"

# 查
fruits.index("cherry")
fruits.count("apple")
"apple" in fruits  # True
```

## 列表推导式

```python
squares = [x ** 2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
matrix = [[i * j for j in range(3)] for i in range(3)]
```

## 元组（tuple）

元组是不可变的有序序列：

```python
point = (3, 4)
single = (42,)      # 单元素元组需要逗号
empty = ()

# 解包
x, y = point

# 命名元组
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)
```

## 范围（range）

`range` 生成不可变的整数序列，常用于循环：

```python
range(5)          # 0, 1, 2, 3, 4
range(2, 8)       # 2, 3, 4, 5, 6, 7
range(0, 10, 2)   # 0, 2, 4, 6, 8

list(range(5))    # [0, 1, 2, 3, 4]
```

## 通用操作

```python
# 索引
s = [10, 20, 30, 40, 50]
s[0]     # 10
s[-1]    # 50

# 切片 [start:stop:step]
s[1:4]   # [20, 30, 40]
s[::2]   # [10, 30, 50]
s[::-1]  # [50, 40, 30, 20, 10]

# 运算
[1, 2] + [3, 4]   # [1, 2, 3, 4]
[0] * 5            # [0, 0, 0, 0, 0]

# 内置函数
len(s)    # 5
min(s)    # 10
max(s)    # 50
sum(s)    # 150
sorted(s, reverse=True)  # [50, 40, 30, 20, 10]

# zip 并行迭代
names = ["Alice", "Bob"]
scores = [90, 85]
for name, score in zip(names, scores):
    print(f"{name}: {score}")
```
