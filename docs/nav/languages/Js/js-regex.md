# JavaScript 正则表达式

正则表达式（Regular Expression, Regex）是一种用于描述字符串模式的强大工具。它广泛应用于文本处理、数据验证、查找与替换等场景。JavaScript 内置对正则表达式的支持，提供了灵活的语法和丰富的 API。

## 正则语法

### 字符匹配

- 基本字符

| 正则表达式 | 说明 | 示例 |
|------------|------|------|
| `.`        | 匹配除换行符外的任意单个字符 | `/a.c/` 匹配 `abc`、`a1c` |
| `\d`       | 匹配数字字符 | `/\d{3}/` 匹配 `123` |
| `\D`       | 匹配非数字字符 | `/\D+/` 匹配 `abc` |
| `\w`       | 匹配字母、数字、下划线 | `/\w+/` 匹配 `test_123` |
| `\W`       | 匹配非字母、数字、下划线 | `/\W+/` 匹配 `@#$` |
| `\s`       | 匹配空白字符 | `/\s+/` 匹配空格、制表符 |
| `\S`       | 匹配非空白字符 | `/\S+/` 匹配 `hello` |

- 字符类

| 正则表达式 | 说明 | 示例 |
|------------|------|------|
| `[abc]`    | 匹配 `a`、`b` 或 `c` | `/[abc]+/` 匹配 `abc` |
| `[^abc]`   | 匹配除 `a`、`b`、`c` 外的任意字符 | `/[^0-9]/` 匹配非数字 |
| `[a-z]`    | 匹配小写字母 | `/[a-z]+/` 匹配 `hello` |
| `[a-zA-Z0-9]` | 匹配字母或数字 | `/[a-zA-Z0-9]+/` 匹配 `Test123` |

### 量词

量词用于指定前面的元素出现的次数。

| 量词 | 说明 | 示例 |
|------|------|------|
| `*`      | 匹配 0 次或多次 | `/ab*c/` 匹配 `ac`、`abc`、`abbc` |
| `+`      | 匹配 1 次或多次 | `/ab+c/` 匹配 `abc`、`abbc` |
| `?`      | 匹配 0 次或 1 次 | `/ab?c/` 匹配 `ac`、`abc` |
| `{n}`    | 匹配恰好 n 次 | `/a{3}/` 匹配 `aaa` |
| `{n,}`   | 匹配至少 n 次 | `/a{2,}/` 匹配 `aa`、`aaa` |
| `{n,m}`  | 匹配 n 到 m 次 | `/a{2,4}/` 匹配 `aa`、`aaa`、`aaaa` |
| `*?`     | 非贪婪匹配 0 次或多次 | `/a.*?b/` 匹配最短的 `a...b` |

### 分组与捕获

分组用圆括号 `()` 表示，可以将多个字符作为一个整体处理。

| 正则表达式 | 说明 | 示例 |
|------------|------|------|
| `(abc)`    | 分组，捕获 `abc` | `/(ab)+c/` 匹配 `ababc` |
| `(a|b)`    | 或，匹配 `a` 或 `b` | `/(cat|dog)/` 匹配 `cat` 或 `dog` |
| `(?:abc)`  | 非捕获组 | `/(?:ab)+c/` 不创建捕获组 |
| `(?<name>pattern)` | 命名捕获组 | `/(?<year>\d{4})/` 捕获年份 |

### 边界匹配

| 边界 | 说明 | 示例 |
|------|------|------|
| `^`  | 匹配字符串的开始 | `/^js/` 匹配以 `js` 开头 |
| `$`  | 匹配字符串的结束 | `/js$/` 匹配以 `js` 结尾 |
| `\b` | 匹配单词边界 | `/\bjs\b/` 匹配单独的 `js` |
| `\B` | 匹配非单词边界 | `/js\B/` 匹配 `javascript` 中的 `js` |

### 转义字符

在 JavaScript 字符串中，某些字符需要转义。

| 字符 | 说明 | JS 中的表示 |
|------|------|------------|
| `.`  | 点号 | `\\.` 或 `[.]` |
| `*`  | 星号 | `\\*` |
| `+`  | 加号 | `\\+` |
| `?`  | 问号 | `\\?` |
| `(`  | 左括号 | `\\(` |
| `)`  | 右括号 | `\\)` |
| `[`  | 左方括号 | `\\[` |
| `]`  | 右方括号 | `\\]` |
| `{`  | 左花括号 | `\\{` |
| `}`  | 右花括号 | `\\}` |
| `\`  | 反斜杠 | `\\\\` |
| `$`  | 美元符号 | `\\$` |
| `^`  | 脱字符 | `\\^` |

> [!NOTE]
> 如果使用字面量的方式创建正则表达式模式不需要转义

---

## JavaScript 正则 API

JavaScript 提供了 `RegExp` 构造函数和`正则字面量`两种方式创建正则对象。

- 字面量方式

```js
// 语法： /pattern/flags
// 其中 flags 可以是 g（全局）、i（忽略大小写）、u（Unicode）、m（多行）和 y（粘性）等，也可以省略
const regex = /\d{3}-\d{3}-\d{4}/;
```

常见 flags 选项：

| 标志 | 说明             |
|------|------------------|
| g    | 全局匹配         |
| i    | 忽略大小写       |
| m    | 多行模式         |
| u    | Unicode 模式     |
| y    | 粘性匹配         |


- 构造函数方式

```js
const regex = new RegExp("\\d{3}-\\d{3}-\\d{4}");
```

- 常用属性

创建出来的正则对象具有以下常用属性：

| 属性 | 说明 | 示例 |
|------|------|------|
| `source` | 正则表达式的文本 | `regex.source; \\d{3}-\\d{3}-\\d{4}"` |
| `flags` | 标志字符串 | `regex.flags;  "gim"` |
| `lastIndex` | 下次匹配的起始位置（配合 `g`/`y` 标志） | `regex.lastIndex` |

- 常用方法

**test(str)**

测试字符串是否匹配正则，返回布尔值。

```js
const regex = /^\d+$/;
console.log(regex.test("12345")); // true
console.log(regex.test("12a45")); // false
```

**exec(str)**

执行匹配，返回捕获结果数组或 `null`。

```js
const regex = /(\d{3})-(\d{3})-(\d{4})/;
const result = regex.exec("我的电话是123-456-7890");
console.log(result[0]); // "123-456-7890"
console.log(result[1]); // "123"
console.log(result[2]); // "456"
console.log(result[3]); // "7890"
```

- 字符串方法

**match**

返回匹配结果数组或 `null`。

```js
const str = "abc123def456";
const result = str.match(/\d+/g);
console.log(result); // ["123", "456"]
```

**matchAll**

返回一个包含所有匹配结果的迭代器（ES2020+）。

```js
const str = "2023-01-01,2024-02-02";
const regex = /(\d{4})-(\d{2})-(\d{2})/g;
for (const match of str.matchAll(regex)) {
    console.log(match[0], match[1], match[2], match[3]);
}
// 输出：2023-01-01 2023 01 01
//      2024-02-02 2024 02 02
```

**replace / replaceAll**

替换匹配内容。

```js
const str = "foo123bar456";
const result = str.replace(/\d+/g, "X");
console.log(result); // "fooXbarX"
```

支持捕获组：

```js
const str = "2023-01-01";
const result = str.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1");
console.log(result); // "01/01/2023"
```

**search**

返回首次匹配的索引，未匹配返回 -1。

```js
const str = "hello123";
console.log(str.search(/\d+/)); // 5
```

**split**

按正则分割字符串。

```js
const str = "apple, banana; orange|pear";
const result = str.split(/[,;|]\s*/);
console.log(result); // ["apple", "banana", "orange", "pear"]
```

---

## 进阶用法

### 贪婪与懒惰匹配

- 贪婪（默认）：尽可能多地匹配
- 懒惰（非贪婪）：尽可能少地匹配，加 `?`

```js
const str = "<div>test</div><div>demo</div>";
console.log(str.match(/<div>.*<\/div>/));   // 贪婪，匹配整个字符串
console.log(str.match(/<div>.*?<\/div>/g)); // 懒惰，匹配每个 <div>...</div>
```

### 零宽断言（正向/负向）

- 正向先行断言 `(?=...)`
- 负向先行断言 `(?!...)`
- 正向后行断言 `(?<=...)`（ES2018+）
- 负向后行断言 `(?<!...)`（ES2018+）

```js
// 匹配后面跟着 px 的数字
const str = "12px 5em 8px";
console.log(str.match(/\d+(?=px)/g)); // ["12", "8"]

// 匹配前面是 $ 的数字
const str2 = "$99 100 $88";
console.log(str2.match(/(?<=\$)\d+/g)); // ["99", "88"]
```

### 命名捕获组

ES2018+ 支持命名捕获组，语法为 `(?<name>...)`。

```js
const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const result = regex.exec("2023-12-25");
console.log(result.groups.year);  // "2023"
console.log(result.groups.month); // "12"
console.log(result.groups.day);   // "25"
```

### Unicode 与多行模式

- `u` 标志：支持 Unicode
- `m` 标志：多行模式，`^` `$` 匹配每一行的开头和结尾

```js
const str = "😊a😊";
console.log(str.match(/./gu)); // ["😊", "a", "😊"]

const text = "foo\nbar";
console.log(text.match(/^bar$/m)); // ["bar"]
```

---

> [!TIP]
> 推荐使用正则调试工具如 [regex101](https://regex101.com/)、[RegExpr](https://regexpr.com/) 进行在线测试和学习。

> [!WARNING]
> 正则表达式虽强大，但过于复杂的表达式会影响可读性和性能。建议分步调试、适度注释，避免“一行写到底”。

---
