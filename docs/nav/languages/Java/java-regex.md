# Java 正则表达式

正则表达式（Regular Expression, Regex）是一种用来描述字符串模式的强大工具。它定义了一套规则，用于匹配、查找、替换和验证字符串中的特定模式。正则表达式广泛应用于文本处理、数据验证、日志分析等领域。

**Java 中的正则表达式支持: **

Java 提供了 `java.util.regex` 包来支持正则表达式操作。这个包包含两个核心类：

- **Pattern** 类：用于编译和表示正则表达式的模式
- **Matcher** 类：用于对字符串进行匹配操作

Java 的正则表达式引擎基于 Perl 5 的风格，提供了强大而灵活的匹配能力。

## 正则语法

### 字符匹配

- 基本字符

| 正则表达式 | 说明 | 示例 |
|---------|------|------|
| `.` | 匹配任意单个字符（除换行符外） | `a.c` 匹配 `abc`、`adc` |
| `\d` 或 `[0-9]` | 匹配任意数字 | `\d{3}` 匹配 `123` |
| `\D` 或 `[^0-9]` | 匹配任意非数字 | `\D+` 匹配 `abc` |
| `\w` 或 `[a-zA-Z0-9_]` | 匹配单词字符 | `\w+` 匹配 `test_123` |
| `\W` 或 `[^a-zA-Z0-9_]` | 匹配非单词字符 | `\W+` 匹配 `@#$` |
| `\s` | 匹配空白字符（空格、制表符、换行符） | `\s+` 匹配空格 |
| `\S` | 匹配非空白字符 | `\S+` 匹配 `hello` |

- 字符类

| 正则表达式 | 说明 | 示例 |
|---------|------|------|
| `[abc]` | 匹配 `a`、`b` 或 `c` 中的任意一个 | `[abc]+` 匹配 `abc` |
| `[^abc]` | 匹配除 `a`、`b`、`c` 外的任意字符 | `[^0-9]` 匹配非数字 |
| `[a-z]` | 匹配从 `a` 到 `z` 的任意字符 | `[a-z]+` 匹配 `hello` |
| `[a-zA-Z0-9]` | 匹配字母或数字 | `[a-zA-Z0-9]+` 匹配 `Test123` |

### 量词

量词用于指定前面的元素出现的次数。

| 量词 | 说明 | 示例 |
|------|------|------|
| `*` | 匹配 0 次或多次 | `ab*c` 匹配 `ac`、`abc`、`abbc` |
| `+` | 匹配 1 次或多次 | `ab+c` 匹配 `abc`、`abbc`，不匹配 `ac` |
| `?` | 匹配 0 次或 1 次 | `ab?c` 匹配 `ac`、`abc` |
| `{n}` | 匹配恰好 n 次 | `a{3}` 匹配 `aaa` |
| `{n,}` | 匹配至少 n 次 | `a{2,}` 匹配 `aa`、`aaa`、`aaaa` |
| `{n,m}` | 匹配 n 到 m 次 | `a{2,4}` 匹配 `aa`、`aaa`、`aaaa` |
| `*?` | 非贪心匹配 0 次或多次 | `a.*?b` 在 `aXXbYYb` 中匹配 `aXXb` |
| `+?` | 非贪心匹配 1 次或多次 | `a.+?b` 在 `aXXbYYb` 中匹配 `aXXb` |

### 分组与捕获

分组用圆括号 `()` 表示，可以将多个字符作为一个整体处理。

| 正则表达式 | 说明 | 示例 |
|---------|------|------|
| `(abc)` | 分组，匹配 `abc` | `(ab)+c` 匹配 `abcabcabc` 中的 `ababc` |
| `(a\|b)` | 或，匹配 `a` 或 `b` | `(cat\|dog)` 匹配 `cat` 或 `dog` |
| `(?:abc)` | 非捕获组 | `(?:ab)+c` 不创建捕获组 |
| `(\d{3})-(\d{3})-(\d{4})` | 多个捕获组 | 用于提取电话号码的各部分 |
| `(?<name>pattern)` | 命名捕获组 | `(?<area>\d{3})-(?<exchange>\d{3})-(?<line>\d{4})` |

### 边界匹配

| 边界 | 说明 | 示例 |
|------|------|------|
| `^` | 匹配字符串的开始 | `^java` 匹配以 `java` 开头的字符串 |
| `$` | 匹配字符串的结束 | `java$` 匹配以 `java` 结尾的字符串 |
| `\b` | 匹配单词边界 | `\bjava\b` 匹配单独的单词 `java` |
| `\B` | 匹配非单词边界 | `java\B` 匹配 `javascript` 中的 `java` |

### 转义字符

在 Java 字符串中，某些字符需要转义。

| 字符 | 说明 | Java 中的表示 |
|------|------|--------------|
| `.` | 点号（需要转义以匹配字面点） | `\\.` 或 `[.]` |
| `*` | 星号 | `\\*` |
| `+` | 加号 | `\\+` |
| `?` | 问号 | `\\?` |
| `(` | 左括号 | `\\(` |
| `)` | 右括号 | `\\)` |
| `[` | 左方括号 | `\\[` |
| `]` | 右方括号 | `\\]` |
| `{` | 左花括号 | `\\{` |
| `}` | 右花括号 | `\\}` |
| `\` | 反斜杠 | `\\\\` |
| `$` | 美元符号 | `\\$` |
| `^` | 脱字符 | `\\^` |

> [!NOTE]
>
> 在 Java 的正则表达式中，一些特殊字符不仅需要经过Java转义，还需要经过正则表达式转义。
>
> 1. **Java 字符串阶段**：`"\\"` 被解释为一个真实的反斜杠 `\`
> 2. **正则引擎阶段**：`\{` 被识别为转义的左花括号，匹配字面字符 `{`
>
> 因此在 Java 代码中，转义字符一般有多个`\`，例如: `\\{` 和 `\\}`。


## Java 正则 API

### Pattern 类

`Pattern` 类用于编译正则表达式。一旦编译完成，可以多次使用该 `Pattern` 对象进行匹配操作。

- 常用方法

**static Pattern compile(String regex)**
编译给定的正则表达式并返回 Pattern 对象。

```java
Pattern pattern = Pattern.compile("\\d+");
```

**static Pattern compile(String regex, int flags)**
编译正则表达式并指定标志。常用标志：
- `Pattern.CASE_INSENSITIVE`：忽略大小写
- `Pattern.MULTILINE`：多行模式
- `Pattern.DOTALL`：点号匹配包括换行符

```java
Pattern pattern = Pattern.compile("java", Pattern.CASE_INSENSITIVE);
```

**Matcher matcher(CharSequence input)**
创建匹配给定输入的 Matcher 对象。

```java
Matcher matcher = pattern.matcher("Java");
```

**static boolean matches(String regex, CharSequence input)**
直接对字符串进行匹配，返回是否完全匹配。这是一个便利方法。

```java
boolean isNumber = Pattern.matches("\\d+", "123");
```

**String pattern()**
返回编译时使用的正则表达式字符串。

```java
String regex = pattern.pattern();
```

### Matcher 类

`Matcher` 类用于对字符串进行匹配操作。

- 常用方法

**boolean matches()**
检查整个字符串是否与模式完全匹配。

```java
Pattern pattern = Pattern.compile("\\d{3}-\\d{3}-\\d{4}");
Matcher matcher = pattern.matcher("123-456-7890");
boolean isMatch = matcher.matches(); // true
```

**boolean find()**
查找下一个与模式匹配的子串。首次调用从字符串开始处查找。

```java
Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher("age: 25, height: 180");
while (matcher.find()) {
    System.out.println(matcher.group()); // 输出: 25, 180
}
```

**boolean find(int start)**
从指定位置开始查找下一个匹配项。

```java
matcher.find(10); // 从第 10 个字符位置开始查找
```

**String group()**
返回最后一次匹配的子串。

```java
Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher("price: 99");
matcher.find();
String result = matcher.group(); // "99"
```

**String group(int group)**
返回指定捕获组的内容。

```java
Pattern pattern = Pattern.compile("(\\d{3})-(\\d{3})-(\\d{4})");
Matcher matcher = pattern.matcher("123-456-7890");
matcher.find();
System.out.println(matcher.group(0)); // "123-456-7890" (整个匹配)
System.out.println(matcher.group(1)); // "123" (第一个捕获组)
System.out.println(matcher.group(2)); // "456" (第二个捕获组)
System.out.println(matcher.group(3)); // "7890" (第三个捕获组)
```

**int start()** 和 **int end()**
返回最后一次匹配的起始位置和结束位置（结束位置是匹配子串后的第一个字符位置）。

```java
Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher("age: 25");
matcher.find();
System.out.println(matcher.start()); // 5
System.out.println(matcher.end());   // 7
```

**String replaceAll(String replacement)**
替换所有匹配项。

```java
Pattern pattern = Pattern.compile("\\d+");
String result = pattern.matcher("price: 99, quantity: 10")
                       .replaceAll("X");
// 结果: "price: X, quantity: X"
```

**String replaceFirst(String replacement)**
替换第一个匹配项。

```java
Pattern pattern = Pattern.compile("\\d+");
String result = pattern.matcher("price: 99, quantity: 10")
                       .replaceFirst("X");
// 结果: "price: X, quantity: 10"
```

**String[] split(CharSequence input)**
根据模式分割字符串。

```java
Pattern pattern = Pattern.compile("\\s+");
String[] words = pattern.split("Hello   World  Java");
// 结果: ["Hello", "World", "Java"]
```

## 实用示例

### 简单匹配

**验证是否为数字**

```java
public static boolean isNumber(String str) {
    return Pattern.matches("\\d+", str);
}

// 使用
System.out.println(isNumber("123"));    // true
System.out.println(isNumber("12a"));    // false
```

**验证邮箱格式**

```java
public static boolean isValidEmail(String email) {
    String regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    return Pattern.matches(regex, email);
}

// 使用
System.out.println(isValidEmail("user@example.com"));   // true
System.out.println(isValidEmail("invalid.email"));       // false
```

**验证手机号码**

```java
public static boolean isValidPhone(String phone) {
    String regex = "^1[3-9]\\d{9}$"; // 中国手机号
    return Pattern.matches(regex, phone);
}

// 使用
System.out.println(isValidPhone("13912345678")); // true
System.out.println(isValidPhone("12912345678")); // false
```

### 提取子串

**提取文本中的所有数字**

```java
public static List<String> extractNumbers(String text) {
    List<String> numbers = new ArrayList<>();
    Pattern pattern = Pattern.compile("\\d+");
    Matcher matcher = pattern.matcher(text);
    while (matcher.find()) {
        numbers.add(matcher.group());
    }
    return numbers;
}

// 使用
List<String> nums = extractNumbers("I have 2 apples and 5 oranges");
// 结果: ["2", "5"]
```

**提取电话号码**

```java
public static List<String> extractPhones(String text) {
    List<String> phones = new ArrayList<>();
    Pattern pattern = Pattern.compile("\\d{3}-\\d{3}-\\d{4}");
    Matcher matcher = pattern.matcher(text);
    while (matcher.find()) {
        phones.add(matcher.group());
    }
    return phones;
}

// 使用
String text = "Call me at 123-456-7890 or 098-765-4321";
List<String> phones = extractPhones(text);
// 结果: ["123-456-7890", "098-765-4321"]
```

**提取捕获组信息**

```java
public static void extractPhoneInfo(String phone) {
    Pattern pattern = Pattern.compile("(\\d{3})-(\\d{3})-(\\d{4})");
    Matcher matcher = pattern.matcher(phone);
    
    if (matcher.find()) {
        System.out.println("完整号码: " + matcher.group(0)); // 123-456-7890
        System.out.println("区号: " + matcher.group(1));     // 123
        System.out.println("交换码: " + matcher.group(2));   // 456
        System.out.println("号码: " + matcher.group(3));     // 7890
    }
}

// 使用
extractPhoneInfo("123-456-7890");
```

### 替换文本

**简单文本替换**

```java
public static String replaceNumbers(String text) {
    return text.replaceAll("\\d+", "X");
}

// 使用
String result = replaceNumbers("I have 2 apples and 5 oranges");
// 结果: "I have X apples and X oranges"
```

**移除 HTML 标签**

```java
public static String removeHtmlTags(String html) {
    return html.replaceAll("<[^>]*>", "");
}

// 使用
String result = removeHtmlTags("<p>Hello <b>World</b></p>");
// 结果: "Hello World"
```

**格式化字符串（添加分隔符）**

```java
public static String formatPhoneNumber(String phone) {
    return phone.replaceAll("(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3");
}

// 使用
String result = formatPhoneNumber("1234567890");
// 结果: "123-456-7890"
```

> [!TIP]
> 在 `replaceAll` 中，`$1`、`$2` 等表示捕获组的内容。`$0` 表示整个匹配的字符串。

**驼峰命名转下划线**

```java
public static String camelToSnake(String camelCase) {
    return camelCase.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
}

// 使用
String result = camelToSnake("getUserName");
// 结果: "get_user_name"
```

### 拆分字符串

**按空白字符拆分**

```java
String text = "Java  is   great";
String[] words = text.split("\\s+");
// 结果: ["Java", "is", "great"]
```

**按指定分隔符拆分**

```java
String csv = "name,age,city";
String[] fields = csv.split(",");
// 结果: ["name", "age", "city"]
```

**按正则表达式拆分**

```java
String text = "2023-12-25";
String[] parts = text.split("-");
// 结果: ["2023", "12", "25"]

// 更复杂的例子
String text2 = "item1; item2 , item3  |  item4";
String[] items = text2.split("[;,|\\s]+");
// 结果: ["item1", "item2", "item3", "item4"]
```

**limit 参数限制拆分数量**

```java
String text = "a-b-c-d-e";
String[] parts = text.split("-", 3);
// 结果: ["a", "b", "c-d-e"]
// 限制结果数组长度为 3
```
