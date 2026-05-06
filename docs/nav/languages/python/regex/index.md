# Python 正则表达式

Python 通过 `re` 模块提供正则表达式支持，用于字符串匹配、搜索和替换。

## 基本用法

```python
import re

# 匹配
re.match(r"\d+", "123abc")     # Match object（从头匹配）
re.search(r"\d+", "abc123")    # Match object（搜索第一个）
re.findall(r"\d+", "a1b2c3")   # ['1', '2', '3']
re.finditer(r"\d+", "a1b2c3")  # 迭代器

# 替换
re.sub(r"\d+", "*", "a1b2c3")  # "a*b*c*"

# 分割
re.split(r"[,;]", "a,b;c")     # ['a', 'b', 'c']
```

## 常用模式

| 模式 | 说明 |
|------|------|
| `.` | 任意字符（除换行） |
| `^` / `$` | 行首 / 行尾 |
| `\d` / `\D` | 数字 / 非数字 |
| `\w` / `\W` | 单词字符 / 非单词字符 |
| `\s` / `\S` | 空白 / 非空白 |
| `*` / `+` / `?` | 0次+ / 1次+ / 0或1次 |
| `{n,m}` | n到m次 |
| `[abc]` | 字符集 |
| `(...)` | 分组 |
| `a\|b` | 或 |

## 分组与捕获

```python
m = re.search(r"(\w+)@(\w+)\.(\w+)", "test@example.com")
m.group(0)  # "test@example.com"（完整匹配）
m.group(1)  # "test"
m.group(2)  # "example"
m.groups()  # ("test", "example", "com")

# 命名分组
m = re.search(r"(?P<user>\w+)@(?P<domain>\w+)", "test@example.com")
m.group("user")    # "test"
m.group("domain")  # "example"
```

## 编译正则

```python
pattern = re.compile(r"\d+")
pattern.findall("a1b2c3")
pattern.match("123abc")
```

## 标志位

```python
re.IGNORECASE  # re.I  忽略大小写
re.MULTILINE   # re.M  ^ $ 匹配每行
re.DOTALL      # re.S  . 匹配换行符
re.VERBOSE     # re.X  允许注释

# 使用
re.search(r"hello", "HELLO", re.I)

# 编译时指定
pattern = re.compile(r"""
    \d+     # 数字部分
    \.      # 小数点
    \d+     # 小数部分
""", re.VERBOSE)
```

## 常见用例

```python
# 提取邮箱
emails = re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", text)

# 验证手机号
bool(re.match(r"^1[3-9]\d{9}$", phone))

# 替换敏感信息
masked = re.sub(r"(\d{3})\d{4}(\d{4})", r"\1****\2", phone)
```
