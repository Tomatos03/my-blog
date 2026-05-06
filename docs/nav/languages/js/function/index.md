# JavaScript 函数

## 函数声明

JavaScript 中有 6 种声明/创建函数的方式。

### Function

最基本的声明方式，会被 **提升（hoisting）**，即可以在声明之前调用。

```javascript
// 基本语法
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet('Tom')); // "Hello, Tom!"

// 提升 — 可以在声明之前调用
console.log(add(2, 3)); // 5
function add(a, b) {
    return a + b;
}

// 可以没有 return，默认返回 undefined
function sayHi() {
    console.log('Hi');
}
console.log(sayHi()); // 先输出 "Hi"，再输出 undefined
```

### 函数表达式

将函数赋值给变量，**不会被提升**（存在暂时性死区）。

```javascript
// 匿名函数表达式
const greet = function(name) {
    return `Hello, ${name}!`;
};

// sayHi(); // ReferenceError: 无法访问到sayHi
const sayHi = function() {
    console.log('Hi');
};

// 具名函数表达式 — 内部名字方便递归和调试，外部不可见
const factorial = function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1); // 用 fact 递归调用自身
};
console.log(factorial(5)); // 120
// console.log(fact(5));   // ❌ ReferenceError — fact 只在函数内部可见

// 作为回调传递
const numbers = [3, 1, 2];
numbers.sort(function(a, b) { return a - b; });
console.log(numbers); // [1, 2, 3]
```

### Function 构造函数

通过 `new Function()` 动态创建函数，字符串形式的函数体会在运行时编译。**实际开发中几乎不使用。**

```javascript
// 语法：new Function([arg1, arg2, ...], functionBody)
const add = new Function('a', 'b', 'return a + b');
console.log(add(2, 3)); // 5

// 无参数
const sayHi = new Function('return "Hi"');
console.log(sayHi()); // "Hi"

// 所有参数都是字符串，函数体在全局作用域中执行
const x = 10;
const getX = new Function('return x');
console.log(getX()); // 10 — 访问全局的 x，不是外层的 x
```

> [!TIP]
> `new Function()` 创建的函数作用域始终在全局，无法访问外层局部变量。性能也较差（每次都要解析字符串）。实际场景仅用于需要动态执行代码的极少数情况，如模板引擎或沙箱。

### 箭头函数（ES6）

更简洁的语法，`this` 由定义时的外层作用域决定（词法绑定）。

```javascript
// 基本语法
const add = (a, b) => {
    return a + b;
};

// 单表达式可以省略大括号和 return
const double = x => x * 2;

// 单参数可以省略括号
const isEven = n => n % 2 === 0;

// 无参数需要括号
const greet = () => 'Hello!';

// 返回对象字面量需要加括号，避免与函数体的大括号混淆
const getUser = (name) => ({ name, age: 25 });
console.log(getUser('Tom')); // { name: "Tom", age: 25 }

// 用于回调时更安全 — this 自动绑定外层
class Timer {
    constructor() {
        this.seconds = 0;
    }
    start() {
        setInterval(() => {
            this.seconds++; // ✅ this 正确指向 Timer 实例
        }, 1000);
    }
}
```

#### 箭头函数的限制

```javascript
// ❌ 不能用作构造函数
const Foo = () => {};
// new Foo(); // TypeError: Foo is not a constructor

// ❌ 没有 arguments 对象
const demo = () => {
    // console.log(arguments); // ❌ ReferenceError
};

// ❌ 没有 prototype 属性
const Bar = () => {};
console.log(Bar.prototype); // undefined

// ❌ 不能用作 Generator
// const gen = *() => {}; // ❌ SyntaxError
```

### 对象方法简写（ES6）

对象字面量中可以省略 `: function` 直接定义方法。

```javascript
// 传统写法
const obj1 = {
    name: 'Tom',
    greet: function() {
        return `Hi, I'm ${this.name}`;
    },
};

// 简写（ES6）
const obj2 = {
    name: 'Tom',
    greet() {
        return `Hi, I'm ${this.name}`;
    },
};

// 简写等价于普通方法，this 由调用方式决定
console.log(obj2.greet()); // "Hi, I'm Tom"

// 与箭头函数的区别 — 箭头函数不能作为对象方法（this 不指向对象）
const obj3 = {
    name: 'Tom',
    greet: () => {
        console.log(this.name); // undefined — this 不指向 obj3
    },
};
```

### Generator 函数（ES6）

使用 `function*` 声明，通过 `yield` 暂停执行并产出值，调用返回迭代器。

```javascript
// 基本语法
function* countUp() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = countUp();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// 用 for...of 遍历
for (let value of countUp()) {
    console.log(value); // 1, 2, 3
}

// 展开为数组
console.log([...countUp()]); // [1, 2, 3]

// 生成无限序列
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3

// 带参数的 yield — 调用 next(arg) 时将 arg 作为 yield 表达式的值
function* echo() {
    let input = yield 'ready';
    yield `you said: ${input}`;
}

const e = echo();
console.log(e.next());       // { value: 'ready', done: false }
console.log(e.next('hello')); // { value: 'you said: hello', done: false }
```

### 声明方式对比

| 特性 | function 声明 | 函数表达式 | 箭头函数 | 对象方法 | new Function | Generator |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| 提升 | ✅ 整体提升 | ❌ TDZ | ❌ TDZ | — | ❌ | ✅ 整体提升 |
| `this` | 动态绑定 | 动态绑定 | 词法继承 | 动态绑定 | 全局 | 动态绑定 |
| `arguments` | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| `new` 调用 | ✅ | ✅ | ❌ | — | ✅ | ❌ |
| `prototype` | ✅ | ✅ | ❌ | — | ✅ | ✅ |
| `yield` | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

> [!TIP]
> **提升（Hoisting）说明**：JavaScript 引擎在执行代码前会进行编译，`function` 声明和 `Generator` 函数会被完整地提升到作用域顶部，即可以在声明之前调用。而函数表达式、箭头函数和使用 `new Function` 创建的函数不会被提升，处于"暂时性死区（TDZ）"中，在声明前访问会抛出错误。

> [!TIP]
> 日常开发中最常用的三种：**函数声明**（顶层函数）、**箭头函数**（回调/闭包）、**对象方法简写**（对象/类中的方法）。其余方式按需了解即可。


## 函数参数

JavaScript 对于函数参数的传入非常宽松，**调用函数时不需要把所有参数都传入**，甚至可以多传、少传参数，JS 都不会报错。

### 默认参数

```javascript
function greet(name = 'World') {
    console.log(`Hello, ${name}!`);
}
greet();      // "Hello, World!"
greet('Tom'); // "Hello, Tom!"

// 默认参数可以引用前面的参数
function createPoint(x = 0, y = x) {
    return { x, y };
}
console.log(createPoint(5)); // { x: 5, y: 5 }
```

### rest 参数

收集剩余参数为一个数组。rest 必须是函数的**最后一个参数**

```javascript
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// rest 必须是最后一个参数
function log(first, ...rest) {
    console.log('First:', first);
    console.log('Rest:', rest);
}
log(1, 2, 3, 4); // First: 1, Rest: [2, 3, 4]
```

### arguments 对象

类数组对象，包含所有传入的参数。**箭头函数**中不可用。

```javascript
function demo() {
    console.log(arguments.length); // 3
    console.log(arguments[0]);     // 'a'
}

// demo函数没有定义参数，但可以通过 arguments 访问传入的参数, 参考结构如下：
// arguments = {
//   0: 1,
//   1: 2,
//   2: 3,
//   length: 3
// }
demo('a', 'b', 'c');

// 转为数组
function toArray() {
    return Array.from(arguments);
    // 或 [...arguments]
    // 或 [].slice.call(arguments)
}
```

## 闭包

函数可以访问其外部作用域的变量，即使外部函数已经执行完毕.

> [!TIP]
> 对于闭包，当一个函数返回另一个函数（或对象），并且这个返回的函数/对象引用了外部函数的变量时，这些变量会被"记住"，不会因为外部函数执行完毕而消失。

```javascript
function createCounter() {
    let count = 0;
    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getCount() { return count; },
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1
```

**一个简单的闭包应用场景**

```javascript
// 1. 数据私有化
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    return {
        deposit(amount) { balance += amount; },
        withdraw(amount) {
            if (amount > balance) throw new Error('余额不足');
            balance -= amount;
        },
        getBalance() { return balance; },
    };
}

// 2. 函数工厂
function multiplier(factor) {
    return (number) => number * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15
```

## IIFE（立即执行函数表达式）

```javascript
(function() {
    let privateVar = 'I am private';
    console.log(privateVar);
})();

// 带参数
(function(name) {
    console.log(`Hello, ${name}!`);
})('Tom');

// 箭头函数写法
(() => {
    console.log('Arrow IIFE');
})();
```

> [!TIP]
> 在 ES6 模块化普及后，IIFE 的使用场景减少。它曾主要用于避免全局变量污染。
