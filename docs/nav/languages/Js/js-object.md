# JavaScript 对象

## 创建对象

```javascript
// 字面量
let person = {
    name: 'Tom',
    age: 25,
    greet() {
        return `Hi, I'm ${this.name}`;
    },
};

// 简写属性（ES6）
let name = 'Tom';
let age = 25;
let person2 = { name, age }; // 等价于 { name: name, age: age }

// 计算属性名（ES6）
let key = 'email';
let user = {
    [key]: 'tom@example.com',
    [`get${key.charAt(0).toUpperCase() + key.slice(1)}`]() {
        return this[key];
    },
};
console.log(user.email);       // "tom@example.com"
console.log(user.getEmail());  // "tom@example.com"
```

## 访问属性

```javascript
let obj = { name: 'Tom', age: 25 };

// 点语法
console.log(obj.name); // "Tom"

// 方括号语法 — 支持变量和特殊字符
console.log(obj['age']); // 25

let prop = 'name';
console.log(obj[prop]); // "Tom"

// 动态属性
let field = 'color';
obj[field] = 'red';
console.log(obj.color); // "red"
```

## 增删改查

```javascript
let user = { name: 'Tom' };

// 添加属性
user.age = 25;
user['email'] = 'tom@example.com';

// 修改属性
user.name = 'Jerry';

// 删除属性
delete user.email;

// 检查属性是否存在
console.log('name' in user);                 // true
console.log(user.hasOwnProperty('age'));      // true
console.log('toString' in user);             // true — 继承的属性
console.log(user.hasOwnProperty('toString')); // false — 自身没有
```

## Object 静态方法

```javascript
let person = { name: 'Tom', age: 25, city: 'Shanghai' };

// 获取键 / 值 / 键值对
console.log(Object.keys(person));    // ["name", "age", "city"]
console.log(Object.values(person));  // ["Tom", 25, "Shanghai"]
console.log(Object.entries(person)); // [["name", "Tom"], ["age", 25], ["city", "Shanghai"]]

// 从 entries 创建对象
let fromEntries = Object.fromEntries([['a', 1], ['b', 2]]);
console.log(fromEntries); // { a: 1, b: 2 }

// assign — 合并对象（浅拷贝）
let defaults = { color: 'red', size: 10 };
let config = Object.assign({}, defaults, { size: 20 });
console.log(config); // { color: 'red', size: 20 }

// freeze — 冻结对象（不可修改）
let frozen = Object.freeze({ x: 1 });
frozen.x = 2;        // 静默失败（严格模式报错）
console.log(frozen.x); // 1

// seal — 密封对象（可修改已有属性，不能增删）
let sealed = Object.seal({ x: 1 });
sealed.x = 2;        // ✅ 可以修改
sealed.y = 3;        // ❌ 不能添加
console.log(sealed);  // { x: 2 }

// defineProperty — 精细控制属性
Object.defineProperty(user, 'id', {
    value: 1,
    writable: false,       // 不可修改
    enumerable: false,     // 不可枚举（for...in 和 Object.keys 看不到）
    configurable: false,   // 不可删除和重新配置
});
```

## 深拷贝与浅拷贝

### 浅拷贝

```javascript
let original = { name: 'Tom', address: { city: 'Shanghai' } };

// 浅拷贝 — 只复制一层，嵌套对象仍是引用
let shallow1 = { ...original };
let shallow2 = Object.assign({}, original);

shallow1.address.city = 'Beijing';
console.log(original.address.city); // "Beijing" — 原对象被影响了！
```

### 深拷贝

```javascript
let original = { name: 'Tom', address: { city: 'Shanghai' } };

// 方式 1: structuredClone（推荐，现代浏览器和 Node 17+）
let deep1 = structuredClone(original);
deep1.address.city = 'Beijing';
console.log(original.address.city); // "Shanghai" — 不受影响

// 方式 2: JSON（不支持函数、undefined、Symbol、循环引用）
let deep2 = JSON.parse(JSON.stringify(original));

// 方式 3: 递归实现
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(deepClone);

    let result = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key]);
        }
    }
    return result;
}
```

## 对象遍历

```javascript
let obj = { a: 1, b: 2, c: 3 };

// for...in — 遍历可枚举属性（包括原型链上的）
for (let key in obj) {
    if (obj.hasOwnProperty(key)) { // 过滤掉继承的属性
        console.log(key, obj[key]);
    }
}

// Object.keys + forEach
Object.keys(obj).forEach(key => {
    console.log(key, obj[key]);
});

// Object.entries + for...of
for (let [key, value] of Object.entries(obj)) {
    console.log(key, value);
}
```

## getter 与 setter

```javascript
let user = {
    firstName: 'Tom',
    lastName: 'Hanks',
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    set fullName(value) {
        [this.firstName, this.lastName] = value.split(' ');
    },
};

console.log(user.fullName); // "Tom Hanks"
user.fullName = 'Jerry Wang';
console.log(user.firstName); // "Jerry"
```
