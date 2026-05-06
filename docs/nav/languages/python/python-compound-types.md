# Python 容器类型

Python 容器类型用于存储多个元素，包括列表、元组、字典和集合。它们共享索引、切片、迭代等基本操作，但在可变性和结构上各有特点。

## 列表（list）

列表是可变的有序序列，可以包含任意类型的元素：

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

### 列表推导式

```python
squares = [x ** 2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
matrix = [[i * j for j in range(3)] for i in range(3)]
```

## 元组（tuple）

元组是不可变的有序序列，创建后无法修改：

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

## 字典（dict）

字典是键值对的映射，基于哈希表实现，键必须是不可变类型：

```python
# 创建
user = {"name": "Tom", "age": 25}
empty = {}
from_keys = dict.fromkeys(["a", "b"], 0)  # {"a": 0, "b": 0}

# 增/改
user["email"] = "tom@example.com"
user.update({"age": 26, "city": "Beijing"})

# 删
del user["email"]
user.pop("city")
user.clear()

# 查
user["name"]              # KeyError if missing
user.get("name")          # None if missing
user.get("name", "N/A")   # 自定义默认值

"name" in user            # True
```

### 字典推导式

```python
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 过滤
even_sq = {x: x**2 for x in range(10) if x % 2 == 0}
```

### 字典视图

```python
user = {"name": "Tom", "age": 25}

user.keys()    # dict_keys(['name', 'age'])
user.values()  # dict_values(['Tom', 25])
user.items()   # dict_items([('name', 'Tom'), ('age', 25)])

for k, v in user.items():
    print(f"{k}: {v}")
```

### 合并字典

```python
d1 = {"a": 1, "b": 2}
d2 = {"b": 3, "c": 4}

# | 运算符（Python 3.9+）
merged = d1 | d2  # {"a": 1, "b": 3, "c": 4}

# update
d1.update(d2)

# 解包
merged = {**d1, **d2}
```

## 集合（set）

集合是无序不重复元素的集合，基于哈希表实现：

```python
# 创建
s = {1, 2, 3}
s2 = set([2, 3, 4])
empty = set()  # 注意：{} 创建的是空字典

# 增
s.add(4)

# 删
s.remove(3)    # 不存在则 KeyError
s.discard(10)  # 不存在不报错
s.pop()        # 随机弹出
```

### 集合运算

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b   # 并集 {1, 2, 3, 4, 5, 6}
a & b   # 交集 {3, 4}
a - b   # 差集 {1, 2}
a ^ b   # 对称差集 {1, 2, 5, 6}

a.issubset(b)      # False
a.issuperset({1})  # True
a.isdisjoint({7})  # True
```

### 集合推导式

```python
s = {x**2 for x in range(-3, 4)}
# {0, 1, 4, 9}
```

## 通用操作

### 索引与切片

```python
s = [10, 20, 30, 40, 50]

# 索引
s[0]     # 10
s[-1]    # 50

# 切片 [start:stop:step]
s[1:4]   # [20, 30, 40]
s[::2]   # [10, 30, 50]
s[::-1]  # [50, 40, 30, 20, 10]
```

### 运算与内置函数

```python
# 运算
[1, 2] + [3, 4]   # [1, 2, 3, 4]
[0] * 5            # [0, 0, 0, 0, 0]

# 内置函数
len(s)    # 5
min(s)    # 10
max(s)    # 50
sum(s)    # 150
sorted(s, reverse=True)  # [50, 40, 30, 20, 10]
```

### 并行迭代

```python
names = ["Alice", "Bob"]
scores = [90, 85]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

## 范围（range）

`range` 生成不可变的整数序列，常用于循环：

```python
range(5)          # 0, 1, 2, 3, 4
range(2, 8)       # 2, 3, 4, 5, 6, 7
range(0, 10, 2)   # 0, 2, 4, 6, 8

list(range(5))    # [0, 1, 2, 3, 4]
```
