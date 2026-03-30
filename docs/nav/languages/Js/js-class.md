# JavaScript 类

## 基本语法

```javascript
class Person {
    // 构造函数 — 实例化时自动调用
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // 实例方法
    greet() {
        return `Hi, I'm ${this.name}, ${this.age} years old`;
    }
}

let tom = new Person('Tom', 25);
console.log(tom.greet()); // "Hi, I'm Tom, 25 years old"
console.log(tom instanceof Person); // true
```

## 类的本质

JavaScript 的类是 **语法糖**，底层仍然是基于原型（prototype）的继承。

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return `${this.name} makes a noise`;
    }
}

// 等价于原型写法
function Animal2(name) {
    this.name = name;
}
Animal2.prototype.speak = function() {
    return `${this.name} makes a noise`;
};
```

## 继承 extends

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return `${this.name} makes a noise`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // 必须先调用 super()
        this.breed = breed;
    }
    speak() {
        return `${this.name} barks`; // 重写父类方法
    }
    fetch() {
        return `${this.name} fetches the ball`;
    }
}

let dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.speak());  // "Buddy barks"
console.log(dog.fetch());  // "Buddy fetches the ball"
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
```

> [!TIP]
> 子类 `constructor` 中必须先调用 `super()` 才能使用 `this`。`super` 代表父类的构造函数或方法。

## 静态成员

```javascript
class MathUtils {
    // 静态属性
    static PI = 3.14159;

    // 静态方法 — 通过类名调用，不能通过实例调用
    static square(n) {
        return n * n;
    }
    static cube(n) {
        return n * n * n;
    }
}

console.log(MathUtils.PI);        // 3.14159
console.log(MathUtils.square(5)); // 25

let utils = new MathUtils();
// utils.square(5); // ❌ TypeError: utils.square is not a function
```

### 静态方法的应用

```javascript
class User {
    static count = 0;

    constructor(name) {
        this.name = name;
        User.count++;
    }

    static getCount() {
        return User.count;
    }

    static createGuest() {
        return new User('Guest');
    }
}

let u1 = new User('Tom');
let u2 = new User('Jerry');
console.log(User.getCount()); // 2

let guest = User.createGuest();
console.log(guest.name); // "Guest"
```

## Getter 与 Setter

```javascript
class Temperature {
    constructor(celsius) {
        this._celsius = celsius;
    }

    get fahrenheit() {
        return this._celsius * 9 / 5 + 32;
    }

    set fahrenheit(value) {
        this._celsius = (value - 32) * 5 / 9;
    }

    get celsius() {
        return this._celsius;
    }
}

let temp = new Temperature(100);
console.log(temp.fahrenheit); // 212
temp.fahrenheit = 32;
console.log(temp.celsius);    // 0
```

## 私有成员（ES2022）

使用 `#` 前缀声明私有字段和方法。

```javascript
class BankAccount {
    #balance; // 私有字段

    constructor(owner, initialBalance) {
        this.owner = owner;
        this.#balance = initialBalance;
    }

    // 私有方法
    #validate(amount) {
        return amount > 0 && amount <= this.#balance;
    }

    deposit(amount) {
        if (amount <= 0) throw new Error('金额必须大于0');
        this.#balance += amount;
    }

    withdraw(amount) {
        if (!this.#validate(amount)) throw new Error('余额不足');
        this.#balance -= amount;
    }

    get balance() {
        return this.#balance;
    }
}

let account = new BankAccount('Tom', 1000);
account.deposit(500);
console.log(account.balance); // 1500
// console.log(account.#balance); // ❌ SyntaxError: Private field '#balance' must be declared in an enclosing class
```

## 抽象类模式

JavaScript 没有 `abstract` 关键字，但可以模拟：

```javascript
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('Shape 不能直接实例化');
        }
    }

    area() {
        throw new Error('子类必须实现 area() 方法');
    }

    perimeter() {
        throw new Error('子类必须实现 perimeter() 方法');
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }

    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}

// let s = new Shape(); // ❌ Error: Shape 不能直接实例化
let c = new Circle(5);
console.log(c.area().toFixed(2));      // "78.54"
console.log(c.perimeter().toFixed(2)); // "31.42"
```

## Mixin 模式

JavaScript 不支持多重继承，但可以用 Mixin 实现代码复用。

```javascript
let Serializable = (Base) => class extends Base {
    toJSON() {
        let json = {};
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                json[key] = this[key];
            }
        }
        return json;
    }
};

let Loggable = (Base) => class extends Base {
    log() {
        console.log(`[${this.constructor.name}]`, this);
    }
};

class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

// 组合多个 Mixin
class EnhancedUser extends Loggable(Serializable(User)) {}

let user = new EnhancedUser('Tom', 25);
user.log();  // [EnhancedUser] { name: 'Tom', age: 25 }
console.log(user.toJSON()); // { name: 'Tom', age: 25 }
```
