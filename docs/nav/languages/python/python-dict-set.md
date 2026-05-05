# Python 字典与集合

字典是键值对的映射，集合是无序不重复元素集，两者底层均基于哈希表实现。

## 字典（dict）

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

## 字典推导式

```python
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 过滤
even_sq = {x: x**2 for x in range(10) if x % 2 == 0}
```

## 字典视图

```python
user = {"name": "Tom", "age": 25}

user.keys()    # dict_keys(['name', 'age'])
user.values()  # dict_values(['Tom', 25])
user.items()   # dict_items([('name', 'Tom'), ('age', 25)])

for k, v in user.items():
    print(f"{k}: {v}")
```

## 合并字典

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

## 集合运算

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

## 集合推导式

```python
s = {x**2 for x in range(-3, 4)}
# {0, 1, 4, 9}
```
