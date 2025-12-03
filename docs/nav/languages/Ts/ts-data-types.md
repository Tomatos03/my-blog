# TypeScript 数据类型

TypeScript 提供了丰富的数据类型，用于增强 JavaScript 的类型安全和开发体验。以下是常用的数据类型及其相关使用场景：

## number

表示所有数字类型，包括整数、浮点数、十六进制、八进制和二进制等。

```typescript
// 基本用法
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xf00d;
let binary: number = 0b1010;

// 使用场景：数学计算、计数器、金额处理等
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

let total: number = calculateTotal(29.99, 3); // 89.97
```

## string

表示文本数据，支持单引号、双引号和模板字符串。

```typescript
// 基本用法
let name: string = "Tom";
let greeting: string = 'Hello';
let message: string = `Welcome, ${name}!`; // 模块字符串

// 使用场景：用户输入、文本展示、字符串拼接等
function formatUserInfo(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

let fullName: string = formatUserInfo("John", "Doe"); // "John Doe"
```

## boolean 

表示布尔值，只有 `true` 或 `false` 两个值。

```typescript
// 基本用法
let isActive: boolean = true;
let isCompleted: boolean = false;

// 使用场景：条件判断、状态标识、开关控制等
function checkPermission(isAdmin: boolean, isLoggedIn: boolean): boolean {
  return isAdmin && isLoggedIn;
}

let hasAccess: boolean = checkPermission(true, true); // true
```

## 数组

表示同一类型元素的集合，有两种声明方式。

```typescript
// 基本用法
let scores: number[] = [90, 80, 70];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// 使用场景：存储列表数据、批量处理、数据集合等
function calculateAverage(numbers: number[]): number {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
}

let average: number = calculateAverage([85, 90, 78]); // 84.33...

// 多维数组
let matrix: number[][] = [[1, 2], [3, 4], [5, 6]];
```

## tuple

元组表示一个**已知元素数量**和**类型**的数组，每个位置的类型是固定的。

```typescript
// 基本用法
let person: [string, number] = ["Tom", 25];
let coordinate: [number, number, number] = [10, 20, 30];

// 使用场景：函数返回多个不同类型的值、表示固定结构的数据等
function getUserInfo(): [string, number, boolean] {
  return ["Alice", 28, true];
}

let [userName, userAge, isOnline] = getUserInfo();

// 命名元组（增强可读性）
type Point = [x: number, y: number];
let position: Point = [100, 200];
```

## enum

枚举用于定义一组命名常量，增强代码的可读性和可维护性。ts之中有两种类型的枚举: `数字枚举`和w`字符串枚举`

```typescript
// 数字枚举
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

enum Direction0 {
  Up = 5,    
  Down,  // 6
  Left,  // 7
  Right  // 8
}
let dir: Direction = Direction.Up;

// 字符串枚举
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

// 使用场景：状态管理、配置选项、固定选项集等
function handleStatus(status: Status): string {
  switch (status) {
    case Status.Pending:
      return "等待处理";
    case Status.Approved:
      return "已通过";
    case Status.Rejected:
      return "已拒绝";
  }
}

let message: string = handleStatus(Status.Approved); // "已通过"
```

## any

`any` 表示任意类型，关闭类型检查，使用时需谨慎。

```typescript
// 基本用法
let value: any = 123;
value = "hello";
value = true;
value = { name: "Tom" };

// 使用场景：迁移旧代码、处理动态内容、第三方库无类型定义时
function processData(data: any): void {
  // 处理来自外部API的未知结构数据
  console.log(data.someProperty);
}

// 注意：过度使用 any 会失去 TypeScript 的类型安全优势
let list: any[] = [1, "two", true, { key: "value" }];
```

## void

通常用于函数没有返回值的情况。也能够当成变量类型, 但没有太大的实际意义

```typescript
// 基本用法
function log(message: string): void {
  console.log(message);
}

// 使用场景：日志函数、事件处理、副作用操作等
function showAlert(title: string, content: string): void {
  alert(`${title}: ${content}`);
}

function updateDOM(element: HTMLElement, text: string): void {
  element.textContent = text;
}

// void 类型变量只能赋值 undefined
let unusable: void = undefined;
```

## null

表示空值，通常用于表示变量为空的情况。

```typescript
// 基本用法
let n: null = null;

// 使用场景：表示空值、清除引用、可选数据等
function findUser(id: number): string | null {
  const users = ["Alice", "Bob", "Charlie"];
  return users[id] || null;
}

let user: string | null = findUser(10); // null

// 在严格模式下，null 不能赋值给其他类型
let name: string | null = null;
name = "Tom"; // 有效
```

## undefined

表示未定义，通常用于表示变量未初始化。

```typescript
// 基本用法
let u: undefined = undefined;

// 使用场景：可选参数、未初始化变量、对象可选属性等
function greet(name?: string): string {
  if (name === undefined) {
    return "Hello, Guest!";
  }
  return `Hello, ${name}!`;
}

let message1: string = greet();        // "Hello, Guest!"
let message2: string = greet("Tom");   // "Hello, Tom!"

// 对象可选属性
interface User {
  name: string;
  age?: number; // age 可能为 undefined
}
```

## never

表示永远不会有返回值的类型，用于抛出异常或死循环的函数。

```typescript
// 基本用法：抛出异常
function throwError(msg: string): never {
  throw new Error(msg);
}

// 死循环
function infiniteLoop(): never {
  while (true) {
    // 永远不会结束
  }
}

// 使用场景：错误处理、穷尽检查等
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 10 * 10;
    case "square":
      return 10 * 10;
    case "triangle":
      return (10 * 10) / 2;
    default:
      // 如果所有情况都处理了，这里永远不会执行
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
  }
}
```

## object

表示非原始类型的对象，即除 number、string、boolean、symbol、null、undefined 之外的类型。

```typescript
// 基本用法
let obj: object = { key: "value" };
let arr: object = [1, 2, 3];
const car: { type: string, model: string, year: number } = {
  type: "Toyota",
  model: "Corolla",
  year: 2009
};
let fn: object = function() {};

// 使用场景：限制参数必须为对象、通用对象处理等
function printKeys(obj: object): void {
  console.log(Object.keys(obj));
}

printKeys({ name: "Tom", age: 25 }); // ["name", "age"]

// 更精确的对象类型定义
interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: "Alice",
  age: 30
};
```

### 可选属性

对象属性是不必在对象定义中定义的属性。

```typescript
// mileage 是可选属性
const car: { type: string, mileage?: number } = { // 没有错误
  type: "Toyota"
};
car.mileage = 2000;
```

### 索引签名

索引签名（Index Signature）是 TypeScript 中用于定义对象可以用某种类型的“键”来索引，并且这些键对应的“值”类型也被限定的一种语法

```typescript
interface StringNumberMap {
  [key: string]: number;
}

const scores: StringNumberMap = {
  Alice: 90,
  Bob: 85,
  Charlie: 92,
  // age: "twenty" // 错误，值必须是 number
};

scores["David"] = 88; // 有效
scores.David = 95;   // key 是 string类型可以用点语法访问

interface NumberStringMap {
  [index: number]: string;
}

const arr: NumberStringMap = ["a", "b", "c"];
arr[0] = 'str' // 有效
```

## union

联合类型允许变量可以是多种类型之一。

```typescript
// 基本用法
let id: number | string = 123;
id = "abc";

// 使用场景：灵活的参数类型、处理多种输入格式等
function formatId(id: number | string): string {
  if (typeof id === "number") {
    return `ID-${id.toString().padStart(5, "0")}`;
  }
  return `ID-${id.toUpperCase()}`;
}

let formattedId1: string = formatId(42);     // "ID-00042"
let formattedId2: string = formatId("abc");  // "ID-ABC"

// 联合类型与数组
let mixedArray: (number | string)[] = [1, "two", 3, "four"];
```

## 类型断言

类型断言用于手动指定变量类型，告诉编译器你比它更了解这个变量的类型。ts之中有两种语法: `as` 语法和 `<>`尖括号语法

> [!TIP]
> `as` 语法不仅可以用于普通的 TypeScript 文件中，还可以在 JSX 语法中使用，而尖括号语法在 JSX 中不可用.

> [!NOTE]
> 不正确的类型断言可能会导致运行时错误，使用时需确保断言的类型是正确的。

```typescript
// 基本用法：as 语法
let someValue: any = "hello";
let strLength: number = (someValue as string).length;

// 尖括号语法（在 JSX 中不可用）
let anotherValue: any = "world";
let anotherLength: number = (<string>anotherValue).length;

// 使用场景：DOM 操作、处理 API 响应、类型收窄等
const inputElement = document.getElementById("myInput") as HTMLInputElement;
inputElement.value = "Hello TypeScript";

// 处理 API 响应
interface ApiResponse {
  data: {
    users: string[];
  };
}

async function fetchData(): Promise<void> {
  const response = await fetch("/api/users");
  const result = (await response.json()) as ApiResponse;
  console.log(result.data.users);
}
```
## unknown

`unknown` 表示未知类型，是 TypeScript 中比 `any` 更安全的顶级类型。赋值时不会报错，但在使用前必须进行类型检查或类型断言。

```typescript
// 基本用法
let input: unknown = 123;
input = "hello";
input = true;

// 使用场景：处理外部数据、API 响应、需要类型保护的场合
function handleInput(data: unknown): void {
  // data 为unknown类型, 必须做类型判断, 否测会报错
  if (typeof data === "string") {
    console.log("字符串长度:", data.length);
  } else if (typeof data === "number") {
    console.log("数字加一:", data + 1);
  }
}

// unknown 不能直接进行属性访问或方法调用，需类型判断
// input.toUpperCase(); // 报错
 
// 正确做法：类型判断
if (typeof input === "string") {
  input.toUpperCase(); // 编译通过，运行正常
}
```
