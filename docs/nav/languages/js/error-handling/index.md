# JavaScript 错误处理

## try / catch / finally

```javascript
try {
    // 可能出错的代码
    let data = JSON.parse('invalid json');
} catch (error) {
    // 捕获并处理错误
    console.error('错误名称:', error.name);     // "SyntaxError"
    console.error('错误信息:', error.message);   // "Unexpected token i in JSON at position 0"
    console.error('错误堆栈:', error.stack);     // 完整的调用栈信息
} finally {
    // 无论是否出错都会执行
    console.log('清理工作');
}
```

> [!TIP]
> `finally` 块中的代码总会在 `try` 和 `catch` 之后执行，即使 `try` 中有 `return` 语句。

## throw 语句

手动抛出错误。

```javascript
function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('参数必须是数字');
    }
    if (b === 0) {
        throw new RangeError('除数不能为零');
    }
    return a / b;
}

try {
    divide('10', 2);
} catch (error) {
    if (error instanceof TypeError) {
        console.error('类型错误:', error.message);
    } else if (error instanceof RangeError) {
        console.error('范围错误:', error.message);
    }
}
```

可以抛出任意值，不仅限于 Error 对象：

```javascript
throw 'something went wrong';  // 可以但不推荐
throw 404;
throw { message: 'custom error' }; // 可以但不推荐
throw new Error('标准做法');        // ✅ 推荐
```

## 内置错误类型

| 错误类型 | 触发场景 |
|---------|---------|
| `Error` | 通用错误基类 |
| `TypeError` | 类型不匹配（如调用 `undefined`） |
| `ReferenceError` | 引用未声明的变量 |
| `SyntaxError` | 语法错误（通常在解析阶段） |
| `RangeError` | 数值超出范围 |
| `URIError` | URI 编解码函数参数错误 |

```javascript
// TypeError
let obj = null;
try {
    obj.name; // Cannot read properties of null
} catch (e) {
    console.log(e instanceof TypeError); // true
}

// ReferenceError
try {
    console.log(undeclaredVar);
} catch (e) {
    console.log(e instanceof ReferenceError); // true
}

// RangeError
try {
    new Array(-1);
} catch (e) {
    console.log(e instanceof RangeError); // true
}
```

## 自定义错误类

```javascript
class ValidationError extends Error {
    constructor(field, message) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class NotFoundError extends Error {
    constructor(resource, id) {
        super(`${resource} with id ${id} not found`);
        this.name = 'NotFoundError';
        this.resource = resource;
        this.id = id;
        this.statusCode = 404;
    }
}

function validateAge(age) {
    if (typeof age !== 'number') {
        throw new ValidationError('age', '年龄必须是数字');
    }
    if (age < 0 || age > 150) {
        throw new ValidationError('age', '年龄必须在 0-150 之间');
    }
    return true;
}

try {
    validateAge('abc');
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(`字段 "${error.field}" 验证失败: ${error.message}`);
    } else {
        throw error; // 不认识的错误继续向上抛
    }
}
```

## 异步错误处理

### Promise

```javascript
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('请求失败:', error.message);
    });
```

### async / await

```javascript
async function loadData() {
    try {
        let response = await fetch('https://api.example.com/data');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('请求被取消');
        } else {
            console.error('加载失败:', error.message);
        }
    }
}
```

### 全局未捕获错误

```javascript
// 浏览器
window.addEventListener('unhandledrejection', (event) => {
    console.error('未处理的 Promise 拒绝:', event.reason);
    event.preventDefault();
});

// Node.js
process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的 Promise 拒绝:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('未捕获的异常:', error);
    process.exit(1);
});
```

## Error 的 cause 属性（ES2022）

链式错误，保留原始错误信息。

```javascript
try {
    try {
        parseData('bad data');
    } catch (originalError) {
        throw new Error('数据处理失败', { cause: originalError });
    }
} catch (error) {
    console.log(error.message);        // "数据处理失败"
    console.log(error.cause.message);  // 原始错误信息
}
```
