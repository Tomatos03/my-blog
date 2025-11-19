# 伪代码 

伪代码是一种非正式的、类似于英语的符号，用于描述算法的高级逻辑。它不依赖于具体的编程语言语法。关键字通常使用小写（如 `if`, `while`）或首字母大写，具体风格不限，保持统一即可。

> [!NOTE]
> 符号不好表示的部分, 可以直接使用文字描述代替

## 赋值

通常使用箭头 `←` 或 `:=` 来表示赋值操作。

```bash[text]
x ← 10
name := "Alice"
count ← count + 1
```

## 循环 

### for 循环
用于已知迭代次数的情况。

```bash[text]
for i ← 1 to 10 do
    print i
end for
```

### while 循环

当条件为真时重复执行。

```bash[text]
while count < 10 do
    count ← count + 1
end while
```

###  do...while 循环

先执行一次，直到条件满足停止

```bash[text]
repeat
    x ← x + 1
until x > 10
```

## 条件

使用 `if`, `then`, `else`, `else if` 关键字。

```bash[text]
if score >= 60 then
    print "Pass"
else if score >= 50 then
    print "Retake"
else
    print "Fail"
end if
```
## 运算符

运算符基本上与大多数编程语言相似, 仅需要注意以下几个运算符的书写：

- 赋值使用 `←` 或 `:=`
- 相等使用 `=`，不等使用 `≠`
- 逻辑与使用 `and`，逻辑或使用 `or`，逻辑非使用 `not`

## 输出

使用 `print`, `output` 或 `write`。

```bash[text]
print "Hello World"
output result
```

## 输入

使用 `read`, `input` 或 `get`。

```bash[text]
read variable_name
input user_id
```

## 数组

通常使用方括号 `[]` 来访问元素。

```bash[text]
// 声明一个大小为 N 的数组 A
A[0...N-1]

// 访问第 i 个元素
x ← A[i]

// 赋值
A[j] ← 100
```

## 函数

```bash[text]
function 函数名(参数1, 参数2, ...)
    // 函数体
    return 返回值
end function

function add(a, b)
    return a + b
end function
```

## 示例

下面以冒泡排序算法为例，展示伪代码的完整示例：

```cpp
function bubbleSort(arr)
    n ← length(arr)
    for i ← 0 to n - 1 do
        for j ← 0 to n - i - 2 do
            if arr[j] > arr[j + 1] then
                // 交换 arr[j] 和 arr[j + 1]
                temp ← arr[j]
                arr[j] ← arr[j + 1]
                arr[j + 1] ← temp
            end if
        end for
    end for
    return arr
end function
```