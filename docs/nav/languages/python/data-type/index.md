# Python 数据类型

Python 是动态类型语言，变量无需声明类型，解释器在运行时自动推断。Python 内置了丰富的数据类型体系，包括数值、序列、映射、集合等类别。

## 内置数据类型

| 类型 | 关键字 | 示例 | 说明 |
|------|--------|------|------|
| 整数 | `int` | `42`, `-7`, `0` | 无精度限制 |
| 浮点数 | `float` | `3.14`, `-0.5` | 双精度浮点 |
| 复数 | `complex` | `3+4j` | 实部 + 虚部 |
| 布尔 | `bool` | `True`, `False` | `int` 的子类 |
| 字符串 | `str` | `'hello'`, `"world"` | 不可变的 Unicode 字符序列 |
| 空值 | `NoneType` | `None` | 表示"没有值"，是单例对象 |

```python
a = 10            # int
b = 3.14          # float
c = 2 + 5j        # complex
d = True          # bool（int 子类，True==1，False==0）
e = 'hello'       # str
f = None          # NoneType

# 布尔上下文中以下值为 False
bool(None)        # False
bool(0)           # False
bool(0.0)         # False
bool("")          # False
bool([])          # False
bool({})          # False
```

## 类型转换

```python
int("42")       # 42
float("3.14")   # 3.14
str(100)        # "100"
bool(0)         # False
bool("hello")   # True
```

## 类型检查

使用 `type()` 或 `isinstance()` 检查类型：

```python
type(42)                    # <class 'int'>
isinstance(42, int)         # True
isinstance(42, (int, float))  # True
```
