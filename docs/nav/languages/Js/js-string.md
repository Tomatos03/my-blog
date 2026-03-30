# JavaScript 字符串

## 创建字符串

```javascript
let s1 = 'hello';         // 单引号
let s2 = "world";         // 双引号
let s3 = `Hello, ${s1}`;  // 模板字符串（ES6）
```

## 模板字符串

```javascript
let name = 'Tom';
let age = 25;

// 插值
console.log(`${name} is ${age} years old`); // "Tom is 25 years old"

// 支持表达式
console.log(`2 + 3 = ${2 + 3}`);           // "2 + 3 = 5"
console.log(`adult: ${age >= 18 ? 'yes' : 'no'}`); // "adult: yes"

// 多行字符串
let html = `
<div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
</div>
`;

// 标签模板
function tag(strings, ...values) {
    console.log(strings); // ["Hello, ", " is ", " years old"]
    console.log(values);  // ["Tom", 25]
    return strings[0] + values[0] + strings[1] + values[1] + strings[2];
}
let result = tag`Hello, ${name} is ${age} years old`;
```

## 常用属性与方法

### 基本属性

```javascript
let str = 'Hello, World!';
console.log(str.length);   // 13
console.log(str[0]);       // "H"
console.log(str.at(-1));   // "!" — 支持负索引
```

### 查找方法

```javascript
let str = 'Hello, World!';

console.log(str.includes('World'));    // true
console.log(str.startsWith('Hello'));  // true
console.log(str.endsWith('!'));        // true
console.log(str.indexOf('l'));         // 2 — 首次出现的位置
console.log(str.lastIndexOf('l'));     // 10 — 最后出现的位置
console.log(str.indexOf('xyz'));       // -1 — 未找到

// search — 支持正则表达式
console.log(str.search(/World/));     // 7
```

### 截取与提取

```javascript
let str = 'Hello, World!';

console.log(str.slice(0, 5));       // "Hello"
console.log(str.slice(7));          // "World!"
console.log(str.slice(-6, -1));     // "World" — 支持负索引

console.log(str.substring(0, 5));   // "Hello"
console.log(str.substring(5, 0));   // "Hello" — 自动交换参数

console.log(str.charAt(0));         // "H"
console.log(str.charCodeAt(0));     // 72 — 字符的 Unicode 码点
```

### 转换方法

```javascript
let str = ' Hello, World! ';

console.log(str.trim());            // "Hello, World!" — 去除两端空格
console.log(str.trimStart());       // "Hello, World! " — 去除开头空格
console.log(str.trimEnd());        // " Hello, World!" — 去除结尾空格

console.log('hello'.toUpperCase()); // "HELLO"
console.log('HELLO'.toLowerCase()); // "hello"

console.log('abc'.repeat(3));       // "abcabcabc"

console.log('5'.padStart(3, '0'));  // "005"
console.log('5'.padEnd(3, '0'));    // "500"
```

### 替换与分割

```javascript
let str = 'Hello, World!';

// replace — 只替换第一个匹配
console.log(str.replace('World', 'JavaScript')); // "Hello, JavaScript!"

// replaceAll — 替换所有匹配（ES2021）
let str2 = 'aaa bbb aaa';
console.log(str2.replaceAll('aaa', 'xxx')); // "xxx bbb xxx"

// 正则替换
console.log(str.replace(/o/g, '0')); // "Hell0, W0rld!"

// split — 将字符串分割为数组
console.log('a,b,c,d'.split(','));    // ["a", "b", "c", "d"]
console.log('hello'.split(''));       // ["h", "e", "l", "l", "o"]
console.log('2025-01-15'.split('-')); // ["2025", "01", "15"]
```

## 正则表达式基础

```javascript
// 创建正则
let re1 = /pattern/flags;
let re2 = new RegExp('pattern', 'flags');

// 常用 flags
// g — 全局匹配
// i — 忽略大小写
// m — 多行匹配

let str = 'Hello World hello';

// test — 检测是否匹配
console.log(/hello/i.test(str)); // true

// match — 获取匹配结果
console.log(str.match(/hello/gi)); // ["Hello", "hello"]

// matchAll — 返回迭代器（ES2020）
let matches = [...str.matchAll(/hello/gi)];
console.log(matches.map(m => m[0])); // ["Hello", "hello"]

// 常用模式
/\d/      // 数字 [0-9]
/\w/      // 单词字符 [a-zA-Z0-9_]
/\s/      // 空白字符
/./       // 任意字符（除换行）
/^start/  // 以 start 开头
/end$/    // 以 end 结尾
/a{3}/    // 连续 3 个 a
/a+/      // 一个或多个 a
/a*/      // 零个或多个 a
/a?/      // 零个或一个 a
```

## 字符串不可变性

JavaScript 字符串是 **不可变的**，所有修改方法都返回新字符串。

```javascript
let str = 'hello';
str[0] = 'H';           // 无效，不会报错但也不会改变
console.log(str);        // "hello"

str = str.toUpperCase(); // 返回新字符串
console.log(str);        // "HELLO"
```
