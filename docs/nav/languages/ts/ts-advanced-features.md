# TypeScript 高级特性

TypeScript 除了基础类型和修饰符，还提供了许多强大的高级特性，帮助开发者编写更安全、灵活和高效的代码。以下是常见的 TypeScript 高级特性简介：

## 泛型

泛型用于定义可复用的组件，使类型参数化，提升代码的灵活性和类型安全。

```typescript
// 泛型方法
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello");

interface ApiResponse<T> {
  data: T;
  success: boolean;
}

class Stack<T> {
  private items: T[] = [];
  push(item: T) { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}
```

## 类型推断与类型兼容

TypeScript 能自动推断变量、函数返回值等的类型，减少显式类型声明。

```typescript
let num = 123; // 推断为 number
const arr = [1, 2, 3]; // 推断为 number[]
```

类型兼容性允许不同类型之间的赋值，只要结构兼容即可。例如：

```typescript
class User {
  name: string = ''
  age: number = 0
}

class Student {
  name: string = ''
  age: number = 0
  // 注意：Student 还有多余属性，但不影响赋值给 User
}

let user: User = new Student()  // 结构兼容
```

## 类型守卫

类型守卫用于在运行时判断变量类型，从而安全地访问属性或方法。

```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

自定义类型守卫：

```typescript
function isString(x: any): x is string {
  return typeof x === "string";
}
```

## keyof 操作符

`keyof` 用于获取某个类型的所有键名组成的联合类型。

```typescript
interface Car {
  brand: string;
  year: number;
}

type CarKeys = keyof Car; // "brand" | "year"
```

## 映射类型

映射类型用于根据已有类型生成新的类型，常见于工具类型。

```typescript
type Readonly<T> = {
  // in 表示遍历 T 的所有属性名
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;
```

## 条件类型

条件类型根据类型参数的条件进行类型推断。

```typescript
type IsString&lt;T&gt; = T extends string ? true : false;

type A = IsString<"abc">; // true
type B = IsString<123>;   // false
```

## 索引访问类型

可以通过索引访问类型成员。

```typescript
interface User {
  id: number;
  name: string;
}

type UserIdType = User["id"]; // number
```

## 类型断言

类型断言用于手动指定变量类型，告诉编译器你比它更了解变量的类型。

```typescript
let someValue: any = "hello";
let strLength: number = (someValue as string).length;
```

## 字面量类型

可以将变量限制为某个具体的值。

```typescript
type Direction = "up" | "down" | "left" | "right";
let dir: Direction = "up";
```

## 联合类型与交叉类型

**联合类型**：变量可以是多种类型之一。

```typescript
let id: number | string;
```

**交叉类型**：将多个类型合并为一个类型。

```typescript
type A = { name: string };
type B = { age: number };
type AB = A & B; // { name: string; age: number }
```

## 装饰器

装饰器是一种特殊语法，用于修饰类、方法、属性等。需要在 tsconfig.json 中开启 `experimentalDecorators`。

```typescript
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`Method ${propertyKey} 被调用`);
}

class Demo {
  @Log
  greet() {
    console.log("Hello");
  }
}
```

## 高级类型工具

### Partial&lt;T&gt;

将类型 T 的所有属性变为可选。常用于对象的“部分更新”场景。

```typescript
interface Todo {
  title: string;
  completed: boolean;
}

type PartialTodo = Partial<Todo>; // { title?: string; completed?: boolean }
```

### Pick&lt;T, K&gt;

从类型 T 中挑选部分属性 K，构造一个新类型。常用于只需要部分属性的场景。

```typescript
interface Todo {
  title: string;
  completed: boolean;
}

type PickTitle = Pick<Todo, "title">; // { title: string }
```

### Record&lt;K, T&gt;

构造一个以 K 为键、T 为值的对象类型。常用于对象映射类型。

```typescript
type PageStatus = "draft" | "published" | "archived";
type PageInfo = {
  title: string;
  content: string;
};

type PageMap = Record<PageStatus, PageInfo>;
// 等价于：
// {
//   draft: PageInfo;
//   published: PageInfo;
//   archived: PageInfo;
// }
```

### Omit&lt;T, K&gt;

从类型 T 中排除指定的属性 K，构造一个新类型。常用于“去除敏感字段”等场景。

```typescript
interface Todo {
  title: string;
  completed: boolean;
  description: string;
}

type TodoPreview = Omit<Todo, "description">; // { title: string; completed: boolean }
type descriptionObj = Omit<Todo, "completed" | "title">; // { description: string }
```
