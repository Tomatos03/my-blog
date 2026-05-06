# Python 类与面向对象

Python 支持完整的面向对象编程，包括封装、继承和多态。

## 类的定义

```python
class Dog:
    species = "Canis familiaris"  # 类变量

    def __init__(self, name, age):
        self.name = name    # 实例变量
        self.age = age

    def bark(self):
        return f"{self.name} says: Woof!"

dog = Dog("Buddy", 3)
print(dog.bark())
```

## 继承

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError

class Cat(Animal):
    def speak(self):
        return f"{self.name}: Meow!"

class Dog(Animal):
    def speak(self):
        return f"{self.name}: Woof!"
```

## 多重继承

```python
class A:
    def hello(self):
        return "A"

class B(A):
    def hello(self):
        return "B"

class C(A):
    pass

class D(B, C):
    pass

d = D()
d.hello()  # "B"，遵循 MRO（方法解析顺序）
print(D.__mro__)
```

## 访问控制

```python
class Account:
    def __init__(self, balance):
        self._type = "savings"       # 约定私有（单下划线）
        self.__balance = balance     # 名称改写（双下划线）

    def get_balance(self):
        return self.__balance

acc = Account(1000)
acc._type          # 可以访问，但不建议
acc._Account__balance  # 名称改写后的真实属性名
```

## 类方法与静态方法

```python
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_str):
        y, m, d = map(int, date_str.split("-"))
        return cls(y, m, d)

    @staticmethod
    def is_valid(date_str):
        parts = date_str.split("-")
        return len(parts) == 3
```

## 属性装饰器

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.area)    # 78.53975
c.radius = 10    # 使用 setter
```

## 抽象类

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)
```

## 魔法方法

魔法方法（Dunder Methods）是以双下划线开头和结尾的特殊方法，用于自定义类的行为。它们允许你定义对象如何与 Python 的内置操作交互。

| 魔法方法 | 作用 | 调用时机 |
|---------|------|---------|
| `__new__` | 创建对象实例 | 在 `__init__` 之前调用，用于创建新实例 |
| `__init__` | 初始化对象 | 对象创建后立即调用 |
| `__del__` | 销毁对象 | 对象被垃圾回收时调用 |
| `__str__` | 返回用户友好的字符串 | `str()` 或 `print()` 时调用 |
| `__repr__` | 返回开发者友好的字符串 | `repr()` 或交互式解释器中调用 |
| `__add__` | 加法运算 | `obj1 + obj2` 时调用 |
| `__sub__` | 减法运算 | `obj1 - obj2` 时调用 |
| `__mul__` | 乘法运算 | `obj1 * obj2` 时调用 |
| `__truediv__` | 真除法运算 | `obj1 / obj2` 时调用 |
| `__neg__` | 一元负号 | `-obj` 时调用 |
| `__abs__` | 绝对值 | `abs(obj)` 时调用 |
| `__eq__` | 相等比较 | `obj1 == obj2` 时调用 |
| `__lt__` | 小于比较 | `obj1 < obj2` 时调用 |
| `__le__` | 小于等于比较 | `obj1 <= obj2` 时调用 |
| `__hash__` | 哈希值 | 对象用作字典键或集合元素时调用 |
| `__len__` | 返回长度 | `len(obj)` 时调用 |
| `__getitem__` | 获取元素 | `obj[key]` 时调用 |
| `__setitem__` | 设置元素 | `obj[key] = value` 时调用 |
| `__contains__` | 成员检查 | `item in obj` 时调用 |
| `__iter__` | 返回迭代器 | `for item in obj:` 时调用 |
| `__call__` | 使对象可调用 | `obj()` 时调用 |
| `__enter__` | 进入上下文 | `with obj:` 进入时调用 |
| `__exit__` | 退出上下文 | `with obj:` 退出时调用 |
| `__getattr__` | 获取不存在的属性 | 访问不存在的属性时调用 |
| `__setattr__` | 设置属性 | `obj.attr = value` 时调用 |
| `__delattr__` | 删除属性 | `del obj.attr` 时调用 |
| `__int__` | 转换为整数 | `int(obj)` 时调用 |
| `__float__` | 转换为浮点数 | `float(obj)` 时调用 |
| `__bool__` | 转换为布尔值 | `bool(obj)` 或 `if obj:` 时调用 |


```python
class Demo:
    def __new__(cls, value):
        # 在 __init__ 之前调用，创建实例
        return super().__new__(cls)

    def __init__(self, value):
        # 对象创建后立即调用，初始化属性
        self.value = value

    def __str__(self):
        # str() 或 print() 时调用，返回用户友好的字符串
        return f"Demo({self.value})"

    def __repr__(self):
        # repr() 或交互式解释器中调用，返回开发者友好的字符串
        return f"Demo(value={self.value})"

    def __add__(self, other):
        # obj1 + obj2 时调用
        return Demo(self.value + other.value)

    def __sub__(self, other):
        # obj1 - obj2 时调用
        return Demo(self.value - other.value)

    def __mul__(self, scalar):
        # obj * scalar 时调用
        return Demo(self.value * scalar)

    def __eq__(self, other):
        # obj1 == obj2 时调用
        return self.value == other.value

    def __lt__(self, other):
        # obj1 < obj2 时调用
        return self.value < other.value

    def __len__(self):
        # len(obj) 时调用
        return self.value

    def __getitem__(self, index):
        # obj[index] 时调用
        return self.value * index

    def __setitem__(self, index, value):
        # obj[index] = value 时调用
        self.value = value

    def __contains__(self, item):
        # item in obj 时调用
        return item == self.value

    def __iter__(self):
        # for item in obj: 时调用
        return iter([self.value])

    def __call__(self, x):
        # obj(x) 时调用，使对象可调用
        return self.value * x

    def __enter__(self):
        # with obj: 进入时调用
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        # with obj: 退出时调用
        return False

    def __bool__(self):
        # bool(obj) 或 if obj: 时调用
        return self.value > 0

    def __int__(self):
        # int(obj) 时调用
        return int(self.value)

    def __float__(self):
        # float(obj) 时调用
        return float(self.value)

    def __hash__(self):
        # 对象用作字典键或集合元素时调用
        return hash(self.value)

    def __del__(self):
        # 对象被垃圾回收时调用
        pass

# 调用示例
obj1 = Demo(5)           # __new__ 和 __init__ 被调用
obj2 = Demo(3)

print(str(obj1))         # __str__ 被调用
print(repr(obj1))        # __repr__ 被调用

obj3 = obj1 + obj2       # __add__ 被调用
obj4 = obj1 - obj2       # __sub__ 被调用
obj5 = obj1 * 2          # __mul__ 被调用

result = obj1 == obj2    # __eq__ 被调用
result = obj1 < obj2     # __lt__ 被调用

length = len(obj1)       # __len__ 被调用
item = obj1[2]           # __getitem__ 被调用
obj1[10] = 20            # __setitem__ 被调用

if 5 in obj1:            # __contains__ 被调用
    pass

for val in obj1:         # __iter__ 被调用
    pass

result = obj1(4)         # __call__ 被调用

with obj1:               # __enter__ 和 __exit__ 被调用
    pass

if obj1:                 # __bool__ 被调用
    pass

num = int(obj1)          # __int__ 被调用
flt = float(obj1)        # __float__ 被调用

d = {obj1: "value"}      # __hash__ 被调用
```
