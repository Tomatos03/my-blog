# JavaScript 运算符

## 算术运算符

```javascript
console.log(10 + 3); // 13
console.log(10 - 3); // 7
console.log(10 * 3); // 30
console.log(10 / 3); // 3.333...
console.log(10 % 3); // 1 — 取余
console.log(2 ** 3); // 8 — 幂运算（ES2016）

// 自增 / 自减
let a = 5;
console.log(a++); // 5 — 先返回再 +1
console.log(a); // 6
console.log(++a); // 7 — 先 +1 再返回
```

## 比较运算符

```javascript
// == 与 ===
console.log(1 == '1'); // true  — 宽松比较，会类型转换
console.log(1 === '1'); // false — 严格比较，不转换类型

console.log(null == undefined); // true
console.log(null === undefined); // false

console.log(0 == false); // true
console.log(0 === false); // false

// > < >= <=
console.log(10 > 5); // true
console.log('a' > 'A'); // true — 字符串按 Unicode 码点比较
```

> [!TIP]
> 始终使用 `===` 和 `!==`，避免 `==` 带来的隐式类型转换陷阱。

> [!NOTE]
> 对于`==`这个运算符，具体对左边的操作变量还是右边的操作变量进行数据类型转换，是由 JavaScript 引擎根据具体情况来决定的，开发者无法控制。所以应该尽量避免使用

## instanceof

检查对象是否为某个构造函数的实例，检查**原型链**。

```javascript
// 语法：对象 instanceof 构造函数

// 示例：基本用法
class Person {}
class Student extends Person {}

const student = new Student();
console.log(student instanceof Student); // true
console.log(student instanceof Person); // true — 向上检查原型链
console.log(student instanceof Object); // true — 所有对象继承自 Object

// 数组 instanceof
const arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true — Array 继承自 Object
```

> [!IMPORTANT]
>
> - `instanceof` 检查的是**原型链**，不是构造函数本身。对于原始类型（string、number 等），应使用包装对象的构造函数来检查。
> - `instanceof` **左边必须是对象**，原始类型返回 `false`
> - 检查原始类型需要用包装类：`'str' instanceof String` → `false`，但 `new String('str') instanceof String` → `true`

| 检查类型     | 推荐方式                        |
| ------------ | ------------------------------- |
| 对象实例     | `obj instanceof Constructor`    |
| 数组         | `Array.isArray(arr)` （更可靠） |
| 基本数据类型 | 使用 `typeof`                   |

## 逻辑运算符

```javascript
console.log(true && false); // false — 与
console.log(true || false); // true  — 或
console.log(!true); // false — 非

// 短路求值
console.log('hello' && 'world'); // "world" — 返回第一个假值或最后一个值
console.log(0 && 'world'); // 0

console.log('' || 'default'); // "default" — 返回第一个真值或最后一个值
console.log(null || 'fallback'); // "fallback"
```

## 空值合并运算符 `??`

`??` 仅在左侧为 `null` 或 `undefined` 时才返回右侧。

```javascript
console.log(0 ?? 'default'); // 0        — 0 不是 null/undefined
console.log('' ?? 'default'); // ''       — 空字符串不是 null/undefined
console.log(null ?? 'default'); // "default"
console.log(undefined ?? 'default'); // "default"

// 与 || 的区别
console.log(0 || 'default'); // "default" — || 将 0 视为假值
console.log(0 ?? 'default'); // 0         — ?? 只关注 null/undefined
```

## 可选链运算符 `?.`

安全访问嵌套属性，遇到 `null` 或 `undefined` 时短路返回 `undefined`。

```javascript
let user = {
    name: 'Tom',
    address: {
        city: 'Shanghai',
    },
};

console.log(user.address?.city); // "Shanghai"
console.log(user.contact?.email); // undefined — 不会报错
console.log(user.contact.email); // TypeError: Cannot read properties of undefined

// 用于方法调用
let api = { getData: () => 'data' };
console.log(api.getData?.()); // "data"
console.log(api.fetchData?.()); // undefined

// 用于数组
let arr = [1, 2, 3];
console.log(arr?.[0]); // 1
```
> [!TIP]
> `.?`总是去判断操作符左边的对象是否为`null`或`undefined`，不为`null`或`undefined`时才继续执行.

## 解构赋值

从数组或对象中提取值并赋给变量。

### 数组解构

```javascript
// 基本语法：const [变量1, 变量2, ...] = 数组
const [a, b] = [1, 2];

// 跳过元素：const [变量1, , 变量3] = 数组
const [x, , z] = [1, 2, 3];

// 默认值：const [变量1 = 默认值, 变量2 = 默认值] = 数组
const [p = 10, q = 20] = [1];

// 剩余/ rest：const [第一个, ...剩余] = 数组
const [first, ...rest] = [1, 2, 3];
```

### 对象解构

```javascript
// 基本语法：const { 属性1, 属性2 } = 对象
const { name, age } = { name: 'Tom', age: 25 };

// 重命名：const { 属性: 新名字 } = 对象
const { name: userName, age: userAge } = obj;

// 默认值：const { 属性 = 默认值 } = 对象
const { role = 'user' } = obj;

// 嵌套解构：const { 属性: { 嵌套属性 } } = 对象
const {
    address: { city },
} = obj;
```

## 展开运算符 `...`

```javascript
// 示例
// 数组展开
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// 对象展开（浅拷贝）
let defaults = { color: 'red', size: 10 };
let custom = { size: 20, weight: 'bold' };
let config = { ...defaults, ...custom }; // 对于公共属性size， 后面解构的对象的值会覆盖前面的
console.log(config); // { color: 'red', size: 20, weight: 'bold' }

let user = { name: 'Tom', info: { age: 25, city: 'Shanghai' } };
let newUser = { ...user, info: { role: 'admin' } }; // 这里info被完全替换了
console.log(nweUser); // { name: 'Tom', info: { role: 'admin' } } — 嵌套对象被完全替换
```

> [!IMPORTANT]
>
> - `...` 展开运算符在函数参数里**只能用于可迭代对象**（如数组），不能直接用于普通对象。
> - 普通对象展开只能用于对象字面量合并（如 `{ ...obj }`），不能用于函数参数。

## 三元运算符

```javascript
let age = 20;
let status = age >= 18 ? 'adult' : 'minor';
console.log(status); // "adult"

// 嵌套（不推荐，可读性差）
let level = age < 13 ? 'child' : age < 18 ? 'teen' : 'adult';
```
