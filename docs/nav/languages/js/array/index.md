# JavaScript 数组

## 创建数组

```javascript
let arr1 = [1, 2, 3];           // 字面量
let arr2 = new Array(3);         // 创建长度为 3 的空数组
let arr3 = Array.of(1, 2, 3);   // [1, 2, 3]
let arr4 = Array.from('abc');    // ["a", "b", "c"]
let arr5 = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]

// 判断是否为数组
console.log(Array.isArray([1, 2]));  // true
console.log(Array.isArray('hello'));  // false
```

## 增删操作

```javascript
let arr = [1, 2, 3];

// 末尾操作
arr.push(4);          // [1, 2, 3, 4] — 末尾添加，返回新长度
arr.pop();            // [1, 2, 3]    — 末尾删除，返回被删元素

// 开头操作
arr.unshift(0);       // [0, 1, 2, 3] — 开头添加，返回新长度
arr.shift();          // [1, 2, 3]    — 开头删除，返回被删元素

// 任意位置 splice
let arr2 = [1, 2, 3, 4, 5];
// splice(start, deleteCount, ...items)
let removed = arr2.splice(1, 2, 'a', 'b');
console.log(removed); // [2, 3] — 被删除的元素
console.log(arr2);    // [1, 'a', 'b', 4, 5]
```

## 查找方法

```javascript
let arr = [1, 2, 3, 4, 5];

console.log(arr.includes(3));     // true
console.log(arr.indexOf(3));      // 2 — 返回索引，未找到返回 -1
console.log(arr.lastIndexOf(3));  // 2

// find — 返回第一个满足条件的元素
let found = arr.find(n => n > 3);
console.log(found); // 4

// findIndex — 返回第一个满足条件的索引
let idx = arr.findIndex(n => n > 3);
console.log(idx); // 3

// findLast / findLastIndex（ES2023）
let last = arr.findLast(n => n > 3);
console.log(last); // 5
```

## 遍历与转换方法

### forEach — 遍历

```javascript
let fruits = ['apple', 'banana', 'cherry'];
fruits.forEach((item, index, array) => {
    console.log(index, item);
});
// 0 "apple", 1 "banana", 2 "cherry"
```

### map — 映射为新数组

```javascript
let nums = [1, 2, 3];
let doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
console.log(nums);    // [1, 2, 3] — 原数组不变
```

### filter — 过滤

```javascript
let nums = [1, 2, 3, 4, 5];
let evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

### reduce — 归约

```javascript
let nums = [1, 2, 3, 4, 5];

// 求和
let sum = nums.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 15

// 求最大值
let max = nums.reduce((a, b) => a > b ? a : b);
console.log(max); // 5

// 统计出现次数
let words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];
let count = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, cherry: 1 }
```

### some / every — 条件判断

```javascript
let nums = [1, 2, 3, 4, 5];

console.log(nums.some(n => n > 4));   // true  — 至少一个满足
console.log(nums.every(n => n > 0));  // true  — 全部满足
console.log(nums.every(n => n > 3));  // false — 并非全部满足
```

## 排序

```javascript
// 默认排序 — 按字符串 Unicode 码点
let nums = [10, 1, 21, 2];
console.log(nums.sort()); // [1, 10, 2, 21] — ⚠️ 默认按字符串排序！

// 数字排序 — 需要比较函数
nums.sort((a, b) => a - b); // 升序: [1, 2, 10, 21]
nums.sort((a, b) => b - a); // 降序: [21, 10, 2, 1]

// 字符串排序
let names = ['Charlie', 'Alice', 'Bob'];
names.sort(); // ["Alice", "Bob", "Charlie"]

// reverse — 反转
console.log([1, 2, 3].reverse()); // [3, 2, 1]
```

> [!TIP]
> `sort()` 和 `reverse()` 会 **修改原数组**。`map`、`filter`、`reduce` 等返回新数组，不会修改原数组。

## 其他常用方法

```javascript
// flat — 扁平化嵌套数组
console.log([1, [2, [3]]].flat());       // [1, 2, [3]]
console.log([1, [2, [3]]].flat(Infinity)); // [1, 2, 3]

// flatMap — map + flat(1)
let sentences = ['Hello World', 'Hi There'];
let words = sentences.flatMap(s => s.split(' '));
console.log(words); // ["Hello", "World", "Hi", "There"]

// concat — 合并数组（不修改原数组）
let a = [1, 2];
let b = [3, 4];
console.log(a.concat(b));    // [1, 2, 3, 4]
console.log([...a, ...b]);   // [1, 2, 3, 4] — 展开运算符更常用

// join — 数组转字符串
console.log(['a', 'b', 'c'].join('-')); // "a-b-c"
console.log([1, 2, 3].join(''));        // "123"

// slice — 截取子数组（不修改原数组）
let arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 3)); // [2, 3]
console.log(arr.slice(-2));   // [4, 5]

// fill — 填充
console.log(new Array(3).fill(0));   // [0, 0, 0]
console.log([1, 2, 3].fill('x', 1, 2)); // [1, "x", 3]
```

## 不可变操作模式

```javascript
let original = [1, 2, 3];

// 添加元素（不修改原数组）
let added = [...original, 4];       // [1, 2, 3, 4]
let prepended = [0, ...original];   // [0, 1, 2, 3]

// 删除元素
let filtered = original.filter(n => n !== 2); // [1, 3]

// 替换元素
let replaced = original.map(n => n === 2 ? 20 : n); // [1, 20, 3]

// toSorted（ES2023）— 返回新数组，不修改原数组
let sorted = [3, 1, 2].toSorted((a, b) => a - b); // [1, 2, 3]

// toReversed（ES2023）
let reversed = [1, 2, 3].toReversed(); // [3, 2, 1]

// with（ES2023）— 替换指定位置元素
let withed = [1, 2, 3].with(1, 20); // [1, 20, 3]
```
