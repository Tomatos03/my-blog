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
