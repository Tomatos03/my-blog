# Rust 控制流

Rust 提供了多种控制流结构，用于在程序中做出决策和重复执行代码。通过这些控制流语句，你可以根据条件执行不同的代码分支，或者重复执行某段代码。

## 条件分支

### if

Rust通过`if` 来进行条件判断与分支执行。与其他语言不同，Rust 的 `if` 是一个表达式，可以返回值。

**语法规则：** ：

```rust
if condition {
    // 条件为 true 时执行
} else if other_condition {
    // condition 为 false, other_condition 为 true 时执行
} else {
    // 所有条件都为 false 时执行
}
```

关键点：
- `condition` 必须是 **bool 类型**（`true` 或 `false`），Rust 不会自动转换其他类型
- 分支体使用 `{}` 包裹
- `else if` 可以有多个，`else` 是可选的
- 当作为表达式使用时，每个分支必须返回相同的类型

**具体示例：**

```rust
fn main() {
    let number = 6;

    // 不作为表达式使用
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else {
        println!("number is not divisible by 4 or 3");
    }
    
    // 作为表达式使用
    let condition = true;
    let number = if condition { 5 } else { 6 };
    println!("The value of number is: {}", number);
}
```

> [!NOTE]
> 表达式形式中，所有分支的返回值类型必须一致。例如 `if x { 5 } else { "six" }` 会编译错误。

## 循环

Rust 提供三种循环类型：`loop`、`while` 和 `for`。

### loop

`loop` 是无限循环，直到显式使用 `break` 退出。与另外两种循环不同，`loop` 可以作为表达式使用。

**语法规则：** ：
```rust
loop {
    // 循环体，会一直重复执行
    if condition {
        break;       // 退出循环
    }
    // continue;    // 跳过当前迭代，进入下一次循环
}
```

**作为表达式时：**
```rust
let result = loop {
    // 循环体
    if condition {
        break value;  // 退出循环并返回值
    }
};
```

关键点：
- `break` 用于退出循环，可以后跟返回值
- `continue` 用于跳过当前迭代，进入下一次循环
- 作为表达式时，所有 `break` 语句必须返回相同类型的值（如果有返回值的话）

**具体示例：**

```rust
fn main() {
    // 非表达式使用
    let mut count = 0;
    loop {
        println!("again!");
        count += 1;
        if count == 3 {
            break;
        }
    }
    
    // 作为表达式使用
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
    println!("The result is {}", result); // 输出: 20
}
```

### while

`while` 循环在条件为真时执行代码块，每次迭代前检查条件。

**语法规则：** 基本形式：
```rust
while condition {
    // 当 condition 为 true 时执行此代码块
    // 每次迭代开始前都会重新评估 condition
}
```

关键点：
- 条件必须是 `bool` 类型
- 当条件变为 `false` 时，循环自动退出
- 可以使用 `break` 和 `continue`

**具体示例：**

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }

    println!("LIFTOFF!!!");
}
```

### for

`for` 循环用于遍历集合中的每个元素，是最安全和常见的循环方式。

**语法规则：** ：
```rust
for element in collection {
    // 对每个 element 执行此代码块
}

for variable in start..end {
    // start 到 end-1 的每个数字（不包含 end）
}

for variable in start..=end {
    // start 到 end 的每个数字（包含 end）
}
```

关键点：
- `element` 是循环变量，每次迭代时自动绑定集合中的下一个值
- `collection` 必须实现 IntoIterator特征.
- `..` 表示左闭右开区间，`..=` 表示左闭右闭区间
- 使用 `.rev()` 获取反向迭代器

**具体示例：**

```rust
fn main() {
    // 遍历数组
    let a = [10, 20, 30, 40, 50];
    
    // a.iter()获取数组切片, 避免所有权移动
    for element in a.iter() {
        // element是数组元素的不可变引用
        println!("the value is: {}", element);
    }
    // 会发生所有权移动
    for element in a {
        println!("the value is: {}", element);
    }
    
    // 反向遍历
    for number in (1..4).rev() {
        println!("{}!", number);
    }
}
```

### 循环标签

当有多层嵌套循环时，可以使用标签明确指定 `break` 或 `continue` 作用于哪个循环。

**语法规则：** ：
```rust
'label_name: loop {
    // 外层循环
    loop {
        // 内层循环
        break 'label_name;      // 跳出标记为 'label_name 的循环
        // continue 'label_name;  // 继续标记为 'label_name 的循环
    }
}
```

关键点：
- 标签以单引号 `'` 开头，后跟标签名
- 标签必须在循环前声明
- `break 'label` 和 `continue 'label` 分别表示跳出或继续指定的循环
- 标签名通常使用 `'outer`、`'inner` 等描述性名称

**具体示例：**

```rust
fn main() {
    'outer: loop {
        println!("Entered the outer loop");

        'inner: loop {
            println!("Entered the inner loop");
            break 'outer;
        }
    }
    println!("Exited the outer loop");
}
```

## 模式匹配

### match

`match` 允许将一个值与一系列模式比较，并根据匹配的模式执行相应代码。它比 `if-else` 更强大，支持复杂的模式匹配。

**语法规则：** 
```rust
match value {
    pattern1 => result1,
    pattern2 => result2,
    pattern3 => result3,
    _ => default_result,  // 通配符，匹配所有其他情况
}
```

关键点：
- `value` 是要匹配的值
- 每个 `pattern` 是一个可能的值或模式
- `=>` 后跟当模式匹配时要执行的代码或返回的值
- 必须穷尽所有可能的情况（通常使用 `_` 作为默认情况）
- `match` 表达式会返回匹配分支的结果
- 分支按顺序进行匹配，只有第一个匹配的分支会被执行

**使用示例：**

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

**绑定值：** 当枚举变体包含数据时，可以在匹配时绑定这些值：

```rust
#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
}

enum Coin {
    Penny,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        }
    }
}
```

语法说明：
- `Coin::Quarter(state)` 中，`state` 变量绑定了 `Quarter` 内部的 `UsState` 值
- 在分支体内可以使用这个绑定的变量

**通配符模式：** 使用 `_` 来处理所有其他情况：

```rust
let some_u8_value = 0u8;

match some_u8_value {
    1 => println!("one"),
    3 => println!("three"),
    5 => println!("five"),
    7 => println!("seven"),
    _ => println!("anything else"),
}
```

说明：
- `_` 是通配符，匹配任何值
- 通常放在最后作为"默认情况"
- 如果不需要使用匹配的值，使用 `_` 可以避免变量未使用的警告

### if let

当只关心一个特定模式时，可以使用 `if let` 简化 `match` 的复杂书写。

**语法规则：** 基本形式：
```rust
// 基本用法
if let pattern = value {
    // 当 value 与 pattern 匹配时执行
}

// 带 else 分支
if let pattern = value {
    // 当匹配时执行
} else {
    // 当不匹配时执行
}

// 带 else if
if let pattern1 = value {
    // pattern1 匹配
} else if let pattern2 = value {
    // pattern2 匹配
} else {
    // 都不匹配
}
```

关键点：
- `if let` 只关心一个特定模式是否匹配，不需要穷尽所有情况
- 比 `match` 更简洁，当只有一两个分支时最有用
- 可选的 `else` 处理不匹配的情况
- 可以链接多个 `else if let`

**示例对比：**

```rust
let config_max = Some(3u8);
// match 写法
match config_max {
    Some(max) => println!("The maximum is configured to be {}", max),
    _ => (),
}

// if let 写法
if let Some(max) = config_max {
    println!("The maximum is configured to be {}", max);
}

// 带 else 分支
if let Some(max) = config_max {
    println!("The maximum is configured to be {}", max);
} else {
    println!("No maximum is configured");
}
```

> [!TIP]
> 选择 `match` 还是 `if let` 的原则：当需要处理多个模式时使用 `match`；当只关心一个特定模式时使用 `if let`。
