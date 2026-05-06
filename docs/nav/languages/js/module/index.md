# JavaScript 模块化

## EMC

ES6 引入的官方模块系统，现代 JavaScript 的标准。

### 导出 export

```javascript
// math.js — 命名导出
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// 也可以先声明再统一导出
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
export { multiply, divide };

// 导出时重命名
export { multiply as mul, divide as div };

// user.js
// 默认导出（每个模块只能有一个）， 一个文件就是一个模块
export default class User {
    constructor(name) {
        this.name = name;
    }
}
```

### 导入 import

```javascript
// 导入命名导出
import { add, subtract, PI } from './math.js';

// 导入默认导出
import User from './user.js';

// 导入全部为命名空间
// 包含默认导出
import * as MathUtils from './math.js';
MathUtils.add(1, 2);

// 导入并重命名
import { add as sum } from './math.js';

// 混合导入
import User, { add } from './mixed.js';

// 动态导入（按需加载）
async function loadModule() {
    const module = await import('./math.js');
    return module.add(1, 2);
}
```

> [!WARNING]
> 使用了默认导出，就必须使用默认导入或全部导入为命名空间来导入, 不能够使用命名导入.

### 重新导出

一般情况下如果需要使用多个模块的内容，可以在一个文件中统一再次导出，方便外部引用。

```javascript
// index.js — 统一导出，方便外部引用
export { add, subtract } from './math.js';
export { default as User } from './user.js';
export * from './utils.js';
```

## CommonJS（CJS）

Node.js 的模块系统，使用 `require` 和 `module.exports`。

```javascript
// math.js
const PI = 3.14159;

function add(a, b) {
    return a + b;
}

module.exports = { PI, add };

// 或者逐个导出
exports.multiply = (a, b) => a * b;
```

```javascript
// 使用
const { PI, add } = require('./math.js');
const math = require('./math.js');
math.add(1, 2);
```

## ESM vs CommonJS 对比

| 特性 | ES Module | CommonJS |
|------|-----------|----------|
| 语法 | `import` / `export` | `require` / `module.exports` |
| 加载时机 | 编译时（静态） | 运行时（动态） |
| 值类型 | 引用（live binding） | 值的拷贝 |
| 顶层 `this` | `undefined` | `module.exports` |
| 浏览器支持 | ✅ 原生支持 | ❌ 需要打包工具 |
| Node.js 支持 | ✅ `.mjs` 或 `"type": "module"` | ✅ 默认 |

## 在 Node.js 中使用 ESM

**方式 1：** 文件扩展名为 `.mjs`

**方式 2：** `package.json` 中设置 `"type": "module"`

```json
{
    "type": "module"
}
```
此时 `.js` 文件也可以用 `import`/`export`。

## 模块的值引用特性

```javascript
// counter.js
export let count = 0;
export function increment() {
    count++;
}

// main.js
import { count, increment } from './counter.js';
import { logCount } from './logger.js';
increment();
// 后续其他文件导入count时也会看到最新值
console.log(count); // 1 — ESM 导出的是引用，值会同步更新
```

> [!TIP]
> ESM 导出的是 **活绑定（live binding）**，导入的值会随导出方的变化而更新。而 CommonJS `require` 导入的是值的 **拷贝**，后续变化不会同步。

## 动态导入

`import()` 是 ES2020 引入的动态导入函数，返回 Promise，支持在运行时按需加载模块。

```javascript
// 按需加载
if (needFeature) {
    const { specialFunction } = await import('./feature.js');
    specialFunction();
}

// 路由懒加载
async function loadPage(page) {
    const module = await import(`./pages/${page}.js`);
    module.render();
}
```

## import.meta

ESM 模块中的元信息对象, 可以**直接在 ES Module（ESM）代码中使用 `import.meta` 对象**，无需任何引入或声明.

> [!WARNING]
> 运行环境需要支持ESM才会生效


```javascript
// import.meta.url之中的唯一标准属性, 表示当前模块的 URL
console.log(import.meta.url); // file:///path/to/module.js

// 其他运行环境可能会扩展:
// 是否是入口模块
console.log(import.meta.main); // true/false（部分环境支持）

// 环境变量（Vite）
console.log(import.meta.env); // { DEV: true, PROD: false, ... }
```
