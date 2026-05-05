# Python 运算符

Python 支持算术、比较、逻辑、位、赋值等多种运算符。

## 算术运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `+` | 加 | `3 + 2` → `5` |
| `-` | 减 | `3 - 2` → `1` |
| `*` | 乘 | `3 * 2` → `6` |
| `/` | 除（浮点） | `7 / 2` → `3.5` |
| `//` | 整除 | `7 // 2` → `3` |
| `%` | 取模 | `7 % 2` → `1` |
| `**` | 幂 | `2 ** 3` → `8` |

## 比较运算符

```python
a, b = 5, 10
a == b   # False
a != b   # True
a < b    # True
a > b    # False
a <= b   # True
a >= b   # False
```

## 逻辑运算符

```python
True and False   # False
True or False    # True
not True         # False
```

Python 的 `and`、`or` 使用短路求值，返回决定结果的操作数：

```python
0 or "hello"     # "hello"
"hello" and 42   # 42
None and "x"     # None
```

## 位运算符

| 运算符 | 说明 |
|--------|------|
| `&` | 按位与 |
| `\|` | 按位或 |
| `^` | 按位异或 |
| `~` | 按位取反 |
| `<<` | 左移 |
| `>>` | 右移 |

## 赋值运算符

```python
x = 10
x += 5   # x = x + 5
x -= 3   # x = x - 3
x *= 2   # x = x * 2
x //= 4  # x = x // 4
x **= 2  # x = x ** 2
```

## 海象运算符

Python 3.8+ 引入 `:=`，可在表达式中赋值：

```python
if (n := len("hello")) > 3:
    print(f"length is {n}")
```
