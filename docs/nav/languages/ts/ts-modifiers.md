# TypeScript 修饰符

TypeScript 提供了多种修饰符（Modifier），用于控制类、属性、方法、参数等的可见性、行为和特性。常见的修饰符有：

## public

`public` 表示公开的成员，任何地方都可以访问。类的成员默认就是 `public`。

```typescript
class Person {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const p = new Person("Tom");
console.log(p.name); // 允许访问
```

## private

`private` 表示私有成员，只能在类的内部访问，外部无法访问。

```typescript
class Animal {
  private age: number;
  constructor(age: number) {
    this.age = age;
  }
  getAge() {
    return this.age;
  }
}

const a = new Animal(3);
// console.log(a.age); // 报错，不能访问私有属性
console.log(a.getAge()); // 3
```

## protected

`protected` 表示受保护成员，只能在类及其子类中访问，外部无法访问。

```typescript
class Vehicle {
  protected speed: number = 0;
  protected accelerate() {
    this.speed += 10;
  }
}

class Car extends Vehicle {
  drive() {
    this.accelerate();
    console.log(this.speed);
  }
}

const car = new Car();
// console.log(car.speed); // 报错
car.drive(); // 10
```

## readonly

`readonly` 表示只读属性, 适用于类、接口、类型别名的属性，或用于元组/数组类型
- 用于类属性时，表示该属性只能在声明或构造函数中赋值，之后不能修改。
- 用于元组/数组类型时，表示该数组或元组的内容不能被修改。

```typescript
// 用于类属性时
class Book {
  // 类成员访问修饰符默认为public
  readonly title: string; // 只读属性
  constructor(title: string) {
    this.title = title;
  }
}

const book = new Book("TypeScript Guide");
// book.title = "New Title"; // 报错，只读属性不能修改

// 用于数组，引用和内容都不能够修改
const numbers: readonly number[] = [1, 2, 3];
```

## static

`static` 表示静态成员，属于类本身而不是实例，通过类名访问。

```typescript
class MathUtil {
  static PI = 3.14159;
  static areaOfCircle(radius: number): number {
    return MathUtil.PI * radius * radius;
  }
}

console.log(MathUtil.PI);
console.log(MathUtil.areaOfCircle(2));
```

## abstract

`abstract` 用于定义抽象类和抽象方法，抽象类不能被实例化，只能被继承，抽象方法必须在子类中实现或继续定义为`abstract`。

```typescript
abstract class Shape {
  abstract getArea(): number;
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }
  getArea(): number {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.getArea()); // 50
```
