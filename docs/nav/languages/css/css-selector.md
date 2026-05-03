# CSS选择器

CSS 选择器是用于定位和选择 HTML 元素的模式。通过选择器，我们可以对特定的元素应用样式。

## 基础选择器

### 通用选择器 

通用选择器用于选择页面中的所有元素。

```css
* {
    margin: 0;
    padding: 0;
}
```

> [!WARNING]
> 虽然通用选择器很方便，但由于要遍历页面中的所有元素，可能对性能产生影响。在大型项目中应谨慎使用。

### 类型选择器

类型选择器根据 HTML 标签名称选择元素。

```css
p {
    color: #333;
    line-height: 1.6;
}

div {
    margin: 10px;
}

a {
    text-decoration: none;
}
```

### 类选择器 

类选择器用点号（`.`）开头，选择具有指定 class 属性的元素。

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}
```
```html
<!-- container容器被选中 -->
<div class="container">
    <!-- 拥有 btn-primary 类属性的按钮会被选中 -->
    <button class="btn-primary">Click Me Fist</button>
    <button>Click Me Second</button>
</div>
```

**多个类组合：**
```css
/* 同时具有 active 和 highlight 类的元素 */
.active.highlight {
    font-weight: bold;
    color: red;
}
```

### ID 选择器

ID 选择器用井号（`#`）开头，选择具有指定 id 属性的元素。ID 在页面中应该是唯一的。

```css
#header {
    background-color: #222;
    padding: 20px;
}

#main-content {
    width: 100%;
}
```

> [!NOTE]
> ID 选择器的优先级较高，应避免过度使用。在大型项目中，优先使用类选择器以提高代码复用性和可维护性。

### 属性选择器

属性选择器根据元素的属性和属性值选择元素。

**精确匹配：**
```css
input[type="text"] {
    border: 1px solid #ccc;
}

a[target="_blank"] {
    color: #e74c3c;
}
```

**前缀匹配 (^=)：**
```css
/* 选择 href 以 https:// 开头的链接 */
a[href^="https://"] {
    color: green;
}
```

**后缀匹配 ($=)：**
```css
/* 选择以 .pdf 结尾的链接 */
a[href$=".pdf"] {
    background-image: url(pdf-icon.png);
}
```

**包含匹配 (*=)：**
```css
/* 选择 class 中包含 "btn" 的元素 */
[class*="btn"] {
    cursor: pointer;
}
```

**单词匹配 (~=)：**
```css
/* 选择 class 包含 "active" 单词的元素 */
[class~="active"] {
    font-weight: bold;
}
```

**语言匹配 (|=)：**
```css
/* 选择 lang 属性为 "en" 或以 "en-" 开头的元素 */
[lang|="en"] {
    font-family: Arial, sans-serif;
}
```

## 选择器组合

### 后代选择器

后代选择器选择指定元素的所有后代元素。

```css
/* 选择 .container 内的所有 p 元素 */
.container p {
    color: #666;
}

/* 深层嵌套 */
.menu ul li a {
    text-decoration: none;
}
```

> [!TIP]
> 虽然后代选择器很方便，但层级越深性能越差。尽量保持选择器深度在 3 层以内。

### 子元素选择器

子元素选择器只选择直接子元素，不包括更深层的后代。

```css
/* 只选择 .container 的直接子元素 p，不包括孙元素 */
.container > p {
    margin: 10px 0;
}

/* 选择 ul 的直接子元素 li */
ul > li {
    list-style: none;
}
```

### 相邻兄弟选择器

相邻兄弟选择器选择紧邻在指定元素后面的第一个兄弟元素。

```css
/* 选择 h1 后面紧跟的第一个 p 元素 */
h1 + p {
    font-size: 18px;
    font-weight: bold;
}

/* 选择 input 后面紧跟的第一个 span 元素 */
input + span {
    color: red;
}
```

### 通用兄弟选择器

通用兄弟选择器选择指定元素后面的所有兄弟元素。

```css
/* 选择 h1 后面的所有 p 元素 */
h1 ~ p {
    color: #555;
}

/* 选择 .active 后面的所有 .item 元素 */
.active ~ .item {
    opacity: 0.5;
}
```

## 伪类选择器

伪类选择的是元素的**某种状态**或**某种位置**。

### 结构性伪类

**第一个和最后一个：**
```css
li:first-child {
    border-top: 1px solid #ddd;
}

li:last-child {
    border-bottom: none;
}
```

**按类型的第一个和最后一个：**
```css
p:first-of-type {
    margin-top: 0;
}

p:last-of-type {
    margin-bottom: 0;
}
```

**nth-child() 和 nth-of-type()：**
```css
/* 选择第 3 个子元素 */
li:nth-child(3) {
    background-color: yellow;
}

/* 选择奇数个子元素 */
li:nth-child(odd) {
    background-color: #f9f9f9;
}

/* 选择偶数个子元素 */
li:nth-child(even) {
    background-color: white;
}

/* 公式：2n+1 (奇数), 3n (3的倍数) 等 */
li:nth-child(2n+1) {
    color: blue;
}

/* 按类型选择 */
p:nth-of-type(2) {
    font-weight: bold;
}
```

**唯一子元素：**
```css
/* 选择唯一的子元素 */
div:only-child {
    margin: 0;
}

/* 选择其类型唯一的元素 */
p:only-of-type {
    padding: 10px;
}
```

### 动态伪类

**链接相关：**
```css
/* 未访问过的链接 */
a:link {
    color: #0066cc;
}

/* 已访问过的链接 */
a:visited {
    color: #663399;
}
```

**用户交互：**
```css
/* 鼠标悬停 */
a:hover {
    color: #ff6600;
    text-decoration: underline;
}

/* 元素被激活（点击按下） */
button:active {
    background-color: #004499;
}

/* 元素获得焦点 */
input:focus {
    outline: 2px solid #0066cc;
    box-shadow: 0 0 5px rgba(0, 102, 204, 0.3);
}
```

### 其他伪类

**否定伪类 :not()：**
```css
/* 选择所有不是 .disabled 的 button 元素 */
button:not(.disabled) {
    cursor: pointer;
}

/* 选择除了最后一个 li 外的所有 li */
li:not(:last-child) {
    border-bottom: 1px solid #ddd;
}
```

**匹配伪类 :is() 和 :where()：**
```css
/* :is() - 选择 h1, h2, h3 中任意一个 */
:is(h1, h2, h3) {
    font-weight: bold;
    margin-top: 20px;
}

/* :where() - 与 :is() 类似，但特异性始终为 0 */
:where(.header, .footer) {
    padding: 20px;
}
```

**表单状态伪类：**
```css
/* 禁用的表单元素 */
input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

/* 启用的表单元素 */
input:enabled {
    background-color: white;
}

/* 被选中的复选框或单选按钮 */
input[type="checkbox"]:checked {
    accent-color: blue;
}
```

**其他伪类：**
```css
/* 空元素 */
div:empty {
    display: none;
}

/* 目标元素（URL 中有 # 指向） */
#section1:target {
    background-color: yellow;
}
```

## 伪元素选择器

伪元素创建的是**原本不存在的元素**, 用于添加装饰性内容。

**::before 和 ::after：**
```css
/* 在元素前插入内容 */
.quote::before {
    content: '"';
    font-size: 2em;
    color: #999;
}

/* 在元素后插入内容 */
.quote::after {
    content: '"';
    font-size: 2em;
    color: #999;
}

/* 实际应用 */
.new-tag::after {
    content: 'NEW';
    background-color: red;
    color: white;
    padding: 2px 5px;
    margin-left: 5px;
    font-size: 0.8em;
}
```

**::first-line：**
```css
/* 第一行文字样式 */
p::first-line {
    font-weight: bold;
    color: blue;
}
```

**::first-letter：**
```css
/* 第一个字母样式（首字下沉效果） */
p::first-letter {
    font-size: 2em;
    font-weight: bold;
    float: left;
    margin-right: 5px;
}
```

**::selection：**
```css
/* 用户选中文本的样式 */
::selection {
    background-color: yellow;
    color: black;
}

p::selection {
    background-color: blue;
    color: white;
}
```

**::placeholder：**
```css
/* 输入框占位符样式 */
input::placeholder {
    color: #999;
    font-style: italic;
}
```

## 选择器优先级

选择器优先级决定了当多个选择器应用到同一元素时，哪个样式会被使用。

**优先级计算规则**

优先级由四个数字组成：`(a, b, c, d)`

- **a** - 内联样式（style 属性）: 1
- **b** - ID 选择器个数
- **c** - 类选择器、属性选择器、伪类选择器个数
- **d** - 类型选择器、伪元素选择器个数

**优先级权重表**

| 选择器类型 | 权重示例 | 说明 |
|---------|--------|------|
| `!important` | 最高 | 覆盖所有其他声明 |
| 内联样式 | (1, 0, 0, 0) | `style=""` |
| ID 选择器 | (0, 1, 0, 0) | `#id` |
| 类选择器 | (0, 0, 1, 0) | `.class` |
| 属性选择器 | (0, 0, 1, 0) | `[attr="value"]` |
| 伪类选择器 | (0, 0, 1, 0) | `:hover`, `:nth-child()` |
| 类型选择器 | (0, 0, 0, 1) | `p`, `div` |
| 伪元素选择器 | (0, 0, 0, 1) | `::before`, `::after` |
| 通用选择器 | (0, 0, 0, 0) | `*` |

```css
/* (0, 0, 0, 1) */
p {
    color: blue;
}

/* (0, 0, 1, 0) */
.highlight {
    color: red;
}

/* (0, 1, 0, 0) */
#main {
    color: green;
}

/* (0, 1, 1, 1) */
#main .container p {
    color: purple;
}

/* 比较：#main .container p 的优先级为 (0, 1, 1, 1)，优先级最高 */
```

**!important 的使用**

```css
/* !important 具有最高优先级，但应避免过度使用 */
.text {
    color: blue !important;
}

/* 下面的规则无法覆盖上面的样式 */
#main .text {
    color: red;
}
```

> [!CAUTION]
> 过度使用 `!important` 会导致样式难以维护。只在必要时使用，如第三方样式冲突等特殊情况。

## 实践建议

1. **避免过度嵌套：** 尽量保持选择器深度在 3 层以内
```css
/* ❌ 不好 */
.header .nav ul li a span {
    color: blue;
}

/* ✅ 好 */
.nav-link {
    color: blue;
}
```

2. **优先使用类选择器：** 类选择器性能更好，也更易复用
```css
/* ❌ 不好 */
div > p {
    margin: 10px;
}

/* ✅ 好 */
.text-block {
    margin: 10px;
}
```

3. **避免过度使用通用选择器：**
```css
/* ❌ 不好 */
* {
    box-sizing: border-box;
}

/* ✅ 好 */
html {
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}
```

4. **使用有意义的命名：**
```css
/* ❌ 不好 */
.red {
    color: red;
}

/* ✅ 好 */
.error-message {
    color: #e74c3c;
}
```

5. **保持一致的命名规范：** 使用 BEM 或类似的命名方法
```css
/* BEM 方法 */
.button {
    /* 块 */
}

.button__text {
    /* 元素 */
}

.button--primary {
    /* 修饰符 */
}
```

6. **按优先级组织代码：** 从低优先级到高优先级
```css
/* 类型选择器 */
p {
    margin: 10px;
}

/* 类选择器 */
.highlight {
    color: red;
}

/* ID 选择器 */
#header {
    background: black;
}
```

## 速查卡片

### CSS 选择器速查表

| 选择器 | 语法 | 用途 |
|-------|------|------|
| 通用 | `*` | 选择所有元素 |
| 类型 | `p` | 选择所有 `<p>` 元素 |
| 类 | `.class` | 选择 class="class" 的元素 |
| ID | `#id` | 选择 id="id" 的元素 |
| 属性 | `[attr="value"]` | 选择具有特定属性的元素 |
| 后代 | `p
 span` | 选择 `<p>` 内的所有 `<span>` |
| 子元素 | `p > span` | 选择 `<p>` 的直接子元素 `<span>` |
| 相邻兄弟 | `p + span` | 选择紧邻 `<p>` 后的 `<span>` |
| 通用兄弟 | `p ~ span` | 选择 `<p>` 后的所有 `<span>` |

### 常用伪类速查表

| 伪类 | 说明 |
|------|------|
| `:first-child` | 第一个子元素 |
| `:last-child` | 最后一个子元素 |
| `:nth-child(n)` | 第 n 个子元素 |
| `:hover` | 鼠标悬停 |
| `:active` | 元素被激活 |
| `:focus` | 元素获得焦点 |
| `:visited` | 已访问的链接 |
| `:not(selector)` | 不匹配选择器的元素 |
| `:checked` | 被选中的表单元素 |
| `:disabled` | 禁用的表单元素 |

### 常用伪元素速查表

| 伪元素 | 说明 |
|-------|------|
| `::before` | 在元素前插入内容 |
| `::after` | 在元素后插入内容 |
| `::first-line` | 第一行文字 |
| `::first-letter` | 第一个字母 |
| `::selection` | 用户选中的文本 |
| `::placeholder` | 输入框占位符 |

### 属性选择器速查表

| 语法 | 说明 |
|------|------|
| `[attr]` | 具有 attr 属性 |
| `[attr="value"]` | attr 属性等于 value |
| `[attr^="value"]` | attr 属性以 value 开头 |
| `[attr$="value"]` | attr 属性以 value 结尾 |
| `[attr*="value"]` | attr 属性包含 value |
| `[attr~="value"]` | attr 属性包含单词 value |
| `[attr\|="value"]` | attr 属性为 value 或以 value- 开头 |
