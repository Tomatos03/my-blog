# JavaScript 变量与作用域

## 变量声明

JavaScript 提供三种声明变量的关键字：`var`、`let`、`const`。

| 关键字  | 作用域     | 可重复声明 | 可重新赋值 | 变量提升                        |
| ------- | ---------- | ---------- | ---------- | ------------------------------- |
| `var`   | 函数作用域 | ✅         | ✅         | ✅ 提升且初始化为 `undefined`   |
| `let`   | 块级作用域 | ❌         | ✅         | ⚠️ 提升但不初始化（暂时性死区） |
| `const` | 块级作用域 | ❌         | ❌         | ⚠️ 提升但不初始化（暂时性死区） |

> [!WARNING]
> `var` 声明的变量会被提升到函数或全局作用域的顶部，并且在声明之前访问会得到 `undefined`。  
> `let` 和 `const` 声明的变量虽然也会被提升，但在声明之前访问会抛出 `ReferenceError`，这是因为它们处于所谓的“暂时性死区（Temporal Dead Zone）”。


```javascript
// var — 函数作用域
var name = 'Tom';
var name = 'Jerry'; // 可重复声明
name = 'Spike'; // 可重新赋值

// let — 块级作用域
let age = 25;
age = 26; // 可重新赋值
// let age = 30;     // ❌ SyntaxError: Identifier 'age' has already been declared

// const — 必须初始化，不可重新赋值
const PI = 3.14159;
// PI = 3;           // ❌ TypeError: Assignment to constant variable

// const 引用类型：不能重新赋值，但可以修改内容
const arr = [1, 2, 3];
arr.push(4); // ✅ 修改内容可以
console.log(arr); // [1, 2, 3, 4]
// arr = [];          // ❌ 不能重新赋值

const obj = { name: 'Tom' };
obj.age = 20; // ✅ 修改属性可以
// obj = {};          // ❌ 不能重新赋值
```

> [!TIP]
> 推荐使用顺序：`const` > `let` > `var`。默认用 `const`，需要重新赋值时用 `let`，尽量避免 `var`。

## var 的问题

### 没有块级作用域

```javascript
if (true) {
    var x = 10;
}
console.log(x); // 10 — var 穿透了 if 块

for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// 输出: 3, 3, 3 — var 只有一个 i，循环结束后 i=3
```

### 变量提升

```javascript
console.log(a); // undefined — var 声明被提升，但赋值不提升
var a = 10;

// 实际执行顺序：
// var a;
// console.log(a);
// a = 10;
```

### 经典闭包陷阱

```javascript
// 用 var 的问题
var funcs = [];
// for循环过程中都是同一个i
for (var i = 0; i < 3; i++) {
    funcs.push(function () {
        return i; // 对于闭包函数之中返回值，返回的是引用，无论返回值是什么数据类型。
    });
}
console.log(funcs[0]()); // 3
console.log(funcs[1]()); // 3
console.log(funcs[2]()); // 3

// 用 let 解决
var funcs2 = [];
for (let j = 0; j < 3; j++) {
    funcs2.push(function () {
        return j; 
    });
}
console.log(funcs2[0]()); // 0
console.log(funcs2[1]()); // 1
console.log(funcs2[2]()); // 2
```

## 暂时性死区（TDZ）

`let` 和 `const` 虽然也会提升，但在声明语句之前访问会抛出 `ReferenceError`。

```javascript
// console.log(x); // ❌ ReferenceError: Cannot access 'x' before initialization
let x = 10;

// TDZ 的隐蔽场景
function demo(a = b, b = 2) {}
demo(); // ❌ ReferenceError: Cannot access 'b' before initialization
```

## 作用域链

JavaScript 通过作用域链查找变量：当前作用域 → 父作用域 → ... → 全局作用域。

```javascript
let global = 'I am global';

function outer() {
    let outerVar = 'I am outer';

    function inner() {
        let innerVar = 'I am inner';
        console.log(innerVar); // I am inner
        console.log(outerVar); // I am outer — 向上查找
        console.log(global); // I am global — 继续向上查找
    }

    inner();
}

outer();
```

## 全局对象

- 浏览器环境中全局对象是 `window`
- Node.js 中全局对象是 `global`

```javascript
// var 声明的全局变量会成为全局对象的属性
var x = 10;
console.log(window.x); // 10（浏览器环境）

// let / const 不会
let y = 20;
console.log(window.y); // undefined
```
