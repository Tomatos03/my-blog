# TypeScript 函数

TypeScript 对函数的类型支持非常强大，能够为参数、返回值、this、重载等提供类型约束，提升代码的安全性和可维护性。

## 基本语法

```typescript
function add(x: number, y: number): number { // ：number 为返回值类型
  return x + y;
}

const result: number = add(1, 2); // 3
```

## 函数类型声明

可以为变量声明函数类型：

```typescript
let myFunc: (a: number, b: number) => number;
myFunc = function (x, y) {
  return x + y;
};
```

## 可选参数与默认参数

可选参数用 `?` 标记，默认参数直接赋值：

```typescript
function greet(name: string, message?: string): string {
  return `${message || "Hello"}, ${name}`;
}

function pow(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}
```

## 剩余参数

用 `...` 表示不定数量参数：

```typescript
// nums 必须是一个数组
function sum(...nums: number[]): number {
  return nums.reduce((acc, cur) => acc + cur, 0);
}

sum(1, 2, 3, 4); // 10
```

## 匿名函数与箭头函数

```typescript
const multiply = (a: number, b: number): number => a * b;
```

## this 参数类型

可以显式声明 `this` 的类型：

```typescript
interface Counter {
  count: number;
  increment(this: Counter): void;
}

const counter: Counter = {
  count: 0,
  increment() {
    this.count++; // 调用时会检查 this 类型是否为 Counter
  }
};

interface Counter {
  count: number;
  increment(): void; // 没有 this: Counter
}

const counter: Counter = {
  count: 0,
  increment() {
    this.count++; // 这里的 this 默认是 any 类型. ts不会检查是否在 Counter 对象上调用
  }
};
```

## 函数重载

TypeScript 支持函数重载，函数重载必须满足函数签名不同(参数数量，顺序, 类型至少有一个不同)：

```typescript
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
  return a + b;
}

combine(1, 2); // 3
combine("a", "b"); // "ab"
```

## 函数类型别名

可以用 type 或 interface 定义函数类型：

```typescript
type Comparator = (a: number, b: number) => boolean;

const greater: Comparator = (x, y) => x > y;
```

## 高阶函数

函数可以作为参数或返回值：

```typescript
function apply(fn: (x: number) => number, value: number): number {
  return fn(value);
}

apply(x => x * 2, 5); // 10
```
