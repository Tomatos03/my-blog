# JavaScript 流程控制

## 条件语句

### if / else if / else

```javascript
let score = 85;

if (score >= 90) {
    console.log('A');
} else if (score >= 80) {
    console.log('B');
} else if (score >= 70) {
    console.log('C');
} else {
    console.log('D');
}
// 输出: B
```

### switch

```javascript
let day = 'Monday';

switch (day) {
    case 'Monday':
    case 'Tuesday':
    case 'Wednesday':
    case 'Thursday':
    case 'Friday':
        console.log('工作日');
        break;
    case 'Saturday':
    case 'Sunday':
        console.log('休息日');
        break;
    default:
        console.log('无效日期');
}
// 输出: 工作日
```

> [!TIP]
> `switch` 使用 **严格相等（===）** 比较，不会进行类型转换。忘记写 `break` 会导致 **case 穿透**（fall through）。

## 循环语句

### for

```javascript
// 基本 for 循环
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// 嵌套循环 — 九九乘法表
for (let i = 1; i <= 9; i++) {
    let row = '';
    for (let j = 1; j <= i; j++) {
        row += `${j}×${i}=${i * j}\t`;
    }
    console.log(row);
}
```

### while

```javascript
let count = 0;
while (count < 3) {
    console.log(count); // 0, 1, 2
    count++;
}
```

### do...while

至少执行一次循环体。

```javascript
let num = 10;
do {
    console.log(num); // 10 — 即使条件不满足也执行一次
    num++;
} while (num < 5);
```

### for...of

遍历 **可迭代对象**（数组、字符串、Map、Set 等）的值。

```javascript
let fruits = ['apple', 'banana', 'cherry'];
for (let fruit of fruits) {
    console.log(fruit); // "apple", "banana", "cherry"
}

// 遍历字符串
for (let char of 'Hello') {
    console.log(char); // "H", "e", "l", "l", "o"
}

// 获取索引 — 使用 entries()
for (let [index, fruit] of fruits.entries()) {
    console.log(index, fruit); // 0 "apple", 1 "banana", 2 "cherry"
}
```

### for...in

遍历对象的 **可枚举属性键**（通常用于对象，不推荐用于数组）。

```javascript
let person = { name: 'Tom', age: 25, city: 'Shanghai' };
for (let key in person) {
    console.log(key, person[key]);
}
// "name" "Tom"
// "age" 25
// "city" "Shanghai"

// ⚠️ 不推荐用 for...in 遍历数组 — 会遍历到原型链上的属性，且索引是字符串
```

> [!NOTE]
> 使用`for in`进行遍历对象时，如果对象有函数那么，属性键就是函数名.

### forEach

遍历**数组**的每个元素，接受回调函数。

> [!NOTE]
> 这种遍历方式仅仅合适于数组

```javascript
// 语法：arr.forEach((element, index, array) => { })

// 示例
let fruits = ['apple', 'banana', 'cherry'];
fruits.forEach((fruit, index) => {
    console.log(index, fruit);
});
// 0 "apple"
// 1 "banana"  
// 2 "cherry"

// 注意：forEach 无法使用 break/return 跳出循环
```

## 循环控制

```javascript
// break — 跳出整个循环
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i); // 0, 1, 2, 3, 4
}

// continue — 跳过当前迭代
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i); // 0, 1, 3, 4
}

// 标签（label）— 跳出多层嵌套循环
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) break outer;
        console.log(i, j);
    }
}
// 0 0, 0 1, 0 2, 1 0
```
