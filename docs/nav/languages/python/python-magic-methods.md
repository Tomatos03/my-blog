# Python 魔术方法

魔术方法（Dunder Methods）是以双下划线开头和结尾的特殊方法，用于自定义类的行为。

## 对象创建与销毁

```python
class Resource:
    def __new__(cls, *args, **kwargs):
        instance = super().__new__(cls)
        return instance

    def __init__(self, name):
        self.name = name

    def __del__(self):
        print(f"{self.name} 被销毁")
```

## 字符串表示

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):       # str(), print()
        return f"({self.x}, {self.y})"

    def __repr__(self):      # repr(), 交互式
        return f"Point({self.x}, {self.y})"
```

## 算术运算符

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):        # +
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):        # -
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):       # *
        return Vector(self.x * scalar, self.y * scalar)

    def __truediv__(self, scalar):   # /
        return Vector(self.x / scalar, self.y / scalar)

    def __neg__(self):               # -v
        return Vector(-self.x, -self.y)

    def __abs__(self):               # abs(v)
        return (self.x**2 + self.y**2) ** 0.5
```

## 比较运算符

```python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def __eq__(self, other):    # ==
        return self.celsius == other.celsius

    def __lt__(self, other):    # <
        return self.celsius < other.celsius

    def __le__(self, other):    # <=
        return self.celsius <= other.celsius

    def __hash__(self):         # hash(), 用作字典键或集合元素
        return hash(self.celsius)
```

## 容器协议

```python
class Playlist:
    def __init__(self):
        self._songs = []

    def __len__(self):              # len()
        return len(self._songs)

    def __getitem__(self, index):   # []
        return self._songs[index]

    def __setitem__(self, index, value):
        self._songs[index] = value

    def __contains__(self, item):   # in
        return item in self._songs

    def __iter__(self):             # for 循环
        return iter(self._songs)
```

## 可调用对象

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, x):
        return x * self.factor

double = Multiplier(2)
double(5)  # 10
```

## 上下文管理

```python
class ManagedFile:
    def __init__(self, filename):
        self.filename = filename

    def __enter__(self):
        self.file = open(self.filename, "r")
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        return False
```

## 属性访问

```python
class Dynamic:
    def __init__(self):
        self._data = {}

    def __getattr__(self, name):        # 属性不存在时调用
        return self._data.get(name)

    def __setattr__(self, name, value):
        if name.startswith("_"):
            super().__setattr__(name, value)
        else:
            self._data[name] = value

    def __delattr__(self, name):
        del self._data[name]
```

## 类型转换

```python
class Money:
    def __init__(self, amount):
        self.amount = amount

    def __int__(self):        # int()
        return int(self.amount)

    def __float__(self):      # float()
        return float(self.amount)

    def __bool__(self):       # bool()
        return self.amount != 0
```
