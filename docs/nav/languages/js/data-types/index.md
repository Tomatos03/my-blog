# JavaScript 数据类型

JavaScript 共有 **8 种数据类型**，分为 **7 种基本类型** 和 **1 种引用类型**。

## 基本类型

基本类型存储的是值本身，赋值时复制值。

| 类型 | 说明 | 示例 |
|------|------|------|
| `number` | 数值（整数和浮点数） | `42`, `3.14` |
| `string` | 字符串 | `'hello'`, `"world"` |
| `boolean` | 布尔值 | `true`, `false` |
| `undefined` | 未定义 | `undefined` |
| `null` | 空值 | `null` |
| `symbol` | 唯一标识符（ES6） | `Symbol('id')` |
| `bigint` | 大整数（ES2020） | `9007199254740991n` |

```javascript
// number
let age = 25;
let price = 9.99;
let notANumber = NaN;        // 非数字
let infinity = Infinity;     // 无穷大

// string
let name = 'Tomatos';
let greeting = "Hello, World!";
let template = `I am ${age} years old`; // 模板字符串

// boolean
let isActive = true;
let isDeleted = false;

// undefined — 声明了但未赋值
let x;
console.log(x); // undefined

// null — 主动表示"空"
let empty = null;

// symbol — 每个 Symbol 都是唯一的
let s1 = Symbol('desc');
let s2 = Symbol('desc');
console.log(s1 === s2); // false

// bigint — 超出 Number 安全范围的整数
let big = 9007199254740993n;
```

## 引用类型

引用类型存储的是内存地址，赋值时复制的是引用（指针）。

```javascript
let arr = [1, 2, 3];
let arr2 = arr;      // 复制引用，不是复制值
arr2.push(4);
console.log(arr);    // [1, 2, 3, 4] — 原数组也被修改了

let obj = { name: 'Tom' };
let obj2 = obj;
obj2.age = 20;
console.log(obj);    // { name: 'Tom', age: 20 }
```

## typeof 运算符

`typeof` 用于检测变量的数据类型。

```javascript
console.log(typeof 42);          // "number"
console.log(typeof 'hello');     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object"  — 历史遗留 Bug
console.log(typeof Symbol());    // "symbol"
console.log(typeof 10n);         // "bigint"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){});// "function"
```

> [!TIP]
> `typeof null` 返回 `"object"` 是 JavaScript 的历史 Bug，因为 JS 最初的实现中，值以 32 位存储，类型标签占低 3 位，`null` 的机器码全是 0，因此被判断为 `"object"`。

## 类型转换

### 转字符串

```javascript
let num = 123;
console.log(String(num));       // "123"
console.log(num.toString());    // "123"
console.log(num + '');          // "123" — 隐式转换
```

### 转数字

```javascript
console.log(Number('123'));      // 123
console.log(Number('12.3'));     // 12.3
console.log(Number(''));        // 0
console.log(Number('abc'));     // NaN
console.log(Number(true));      // 1
console.log(Number(false));     // 0
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN

// parseInt / parseFloat — 更灵活的解析
console.log(parseInt('42px'));     // 42
console.log(parseFloat('3.14m'));  // 3.14
console.log(parseInt('abc'));      // NaN
```

### 转布尔值

以下值为 **假值（falsy）**，其余全是 **真值（truthy）**：

```javascript
// 6 个假值
Boolean(false)     // false
Boolean(0)         // false
Boolean(-0)        // false
Boolean('')        // false
Boolean(null)      // false
Boolean(undefined) // false
Boolean(NaN)       // false

// 隐式转换示例
if ('hello') {
    console.log('truthy');  // 会执行
}

if (0) {
    console.log('不会执行');
}
```

> [!TIP]
> 记住 6 个假值：`false`, `0`, `''`, `null`, `undefined`, `NaN`。空数组 `[]` 和空对象 `{}` 是 **真值**。
