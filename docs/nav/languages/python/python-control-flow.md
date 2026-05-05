# Python 流程控制

Python 通过条件判断和循环语句控制程序执行流程。

## 条件判断

```python
score = 85

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

条件表达式（三元运算符）：

```python
result = "及格" if score >= 60 else "不及格"
```

## for 循环

```python
# 遍历列表
for item in [1, 2, 3]:
    print(item)

# range
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 3): # 2, 5, 8
    print(i)

# enumerate 带索引
for i, v in enumerate(["a", "b", "c"]):
    print(f"{i}: {v}")
```

## while 循环

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

## break 与 continue

```python
# break 跳出循环
for i in range(10):
    if i == 5:
        break

# continue 跳过本次迭代
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)
```

## for-else / while-else

循环正常结束（未被 `break` 中断）时执行 `else` 块：

```python
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            break
    else:
        print(f"{n} 是质数")
```

## match-case

Python 3.10+ 结构化模式匹配：

```python
match command:
    case "quit":
        exit()
    case "hello":
        print("Hello!")
    case str() as s if s.startswith("go"):
        print(f"Going to {s[3:]}")
    case _:
        print("Unknown command")
```
