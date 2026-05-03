# TypeScript 类

TypeScript 支持基于 ES6 的类语法，并在其基础上增强了类型系统和面向对象特性。类是 TypeScript 中用于描述对象结构和行为的核心语法之一。

## 基本语法

```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const tom = new Person("Tom", 25);
tom.greet(); // 输出：Hello, my name is Tom
```

## 类的构成

- **属性（Property）**：类的字段，可以指定类型。
- **方法（Method）**：类的函数成员。
- **构造函数（Constructor）**：用于创建实例时初始化成员。
- **访问修饰符**：如 `public`、`private`、`protected`、`readonly`。
- **静态成员（static）**：属于类本身而不是实例。
- **抽象成员（abstract）**：只能在抽象类中声明，需在子类实现。

## 访问修饰符

类的成员一共有三种访问修饰符：`public`、`private` 和 `protected`。

> [!TIP]
> 如果没有显示书写, 默认为 `public`

```typescript
class Animal {
  public name: string;
  private age: number;
  protected type: string;

  constructor(name: string, age: number, type: string) {
    this.name = name;
    this.age = age;
    this.type = type;
  }

  public getName(): string {
    return this.name;
  }

  private getAge(): number {
    return this.age;
  }

  protected getType(): string {
    return this.type;
  }
}
```


## 继承与多态

TypeScript 支持类的继承，通过 `extends` 关键字实现。子类可以重写父类的方法以实现多态。

```typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak(): void {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak(): void {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog("Buddy");
dog.speak(); // Buddy barks.
```

## 抽象类

```typescript
abstract class Shape {
  abstract getArea(): number;
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }
  getArea(): number { // 必须实现抽象方法或将当前类定义为抽象类, 在将此方法定义为抽象方法
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.getArea()); // 50
```

## 高级特性

### 参数属性

构造函数参数前加修饰符可自动声明并初始化成员。

```typescript
class User {
  constructor(public name: string, private age: number) {}
}
// 等价于
class User {
  public name: string;
  private age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

### 访问器

用于直接为类的属性定义 getter 和 setter 方法。

```typescript
class Counter {
  private _count = 0; // ts中私有属性通常以_开头
  // 添加getter方法
  get count() { 
    return this._count;
  }
  // 添加setter方法
  set count(value: number) {
    if (value >= 0) {
      this._count = value;
    }
  }
}

const counter = new Counter();
counter.count = 10; // 自动调用 setter 方法
console.log(counter.count) // 自动调用 getter 方法
```
