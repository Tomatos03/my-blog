# Rust 生命周期

Rust 的生命周期（Lifetime）是其内存安全机制的重要组成部分。生命周期用于描述引用（references）在程序中的作用域，确保引用在使用时始终有效，防止悬垂引用和数据竞争等问题。

## 基本语法

Rust 中生命周期通过一个标记表示, 写法为：`'<标识符>`

**规则说明：**
- 标记必须以单引号 `'` 开头，后面跟生命周期名字
- 生命周期名字可以是任何合法的 Rust 标识符（字母、数字、下划线），通常用小写字母表示
- 常见的生命周期名字包括：`'a`、`'b`、`'c` 等（按照字母顺序），或者 `'static`（特殊的生命周期，表示整个程序运行期间）
- 生命周期标记本身没有特殊含义，只用于区分不同的生命周期

单生命周期, 示例:

```rust
// <'a> 声明了一个名为 'a 的生命周期参数
// x: &'a str 和 y: &'a str 表示两个参数都是 'a 生命周期内的字符串引用
// -> &'a str 表示返回值也是 'a 生命周期内的字符串引用
// 这表示返回的引用的有效期与输入参数的有效期相同
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```
当涉及多个不同的生命周期时，可以声明多个生命周期参数, 示例：

```rust
//  这里 `'a` 和 `'b` 是两个不同的生命周期，表示源和目标引用可以有独立的有效期。
fn copy_from<'a, 'b>(source: &'a str, dest: &'b mut String) {
    dest.push_str(source);
}
```

## 省略规则

Rust 在函数或方法签名中有一套称为“生命周期省略规则（lifetime elision rules）”的规则，编译器会根据这些规则自动推断缺失的生命周期标注，从而省去大部分常见场景的显式写法。

编译器规则如下：

1. 每一个引用参数都会被分配一个独立的生命周期参数（编译器会为每个 elided 引用假设一个生命周期）。
2. 如果函数只有**一个**输入生命周期参数，那么该生命周期会被赋给所有被省略的输出（返回值会继承这个输入生命周期）。
3. 如果有多个输入生命周期参数，但其中**一个是 `&self` 或 `&mut self`**（即方法签名中的 self 引用），那么 `self` 的生命周期会被赋给所有被省略的输出（返回值）。

常见可省略显示书写生命周期的示例: 

```rust
// 满足规则2
fn first_word(s: &str) -> &str {
    &s[..1]
}

struct Person { name: String }
impl Person {
    // 满足规则3
    fn find_in_name(&self, pattern: &str) -> &str {
        self.name.find(pattern)
            .map(|idx| &self.name[idx..])
            .unwrap_or("")
    }
    
    fn name(&self) -> &str {
        &self.name
    }
}
```

必须显式写生命周期常见示例：

```rust
// 编译器无法推断出生命周期
fn longest(x: &str, y: &str) -> &str { /* ... */ }
// 修正后的写法
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { /* ... */ }


// 结构体（或枚举）中包含引用字段时，需要为类型声明生命周期参数：
struct Book<'a> { title: &'a str }
```

> [!TIP]
> - 大多数日常代码可以依赖省略规则，无需显式标注。
> - 当出现编译错误（如 “missing lifetime specifier” 或 “cannot infer an appropriate lifetime”）时，按错误提示在函数/类型签名处添加生命周期标注即可。

## 相关错误

- error[E0106]: missing lifetime specifier  
  原因说明：编译器无法自动推断返回值引用的生命周期，必须显式添加生命周期标记。

- error[E0495]: cannot infer an appropriate lifetime  
  原因说明：编译器无法根据现有信息推断出引用的生命周期，通常发生在多个引用参数涉及返回值时，需要手动指定生命周期参数。

- error[E0597]: borrowed value does not live long enough  
  原因说明：引用的生命周期超出了被引用值的作用域，导致悬垂引用。需要确保引用不会比其数据活得更久。

- error[E0623]: lifetime may not live long enough  
  原因说明：返回的引用生命周期比输入参数短，或者生命周期参数之间存在不兼容，导致返回值可能悬垂。

- error[E0515]: cannot return reference to local variable  
  原因说明：尝试返回一个指向函数内部局部变量的引用，该变量在函数结束后被销毁，引用将悬垂。

> [!NOTE]
> **悬垂引用**是指一个引用指向的内存已经被释放或超出了作用域，此时该引用变得无效。如果继续通过悬垂引用访问数据，会导致未定义行为甚至程序崩溃。
