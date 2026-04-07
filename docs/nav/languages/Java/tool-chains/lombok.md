# Lombok 

Lombok 通过注解极大简化 Java 样板代码，常用于自动生成 getter/setter、构造方法、toString、equals/hashCode、日志、建造者等。本文涵盖 Lombok 常用及文档中提及的所有注解，便于快速查阅。

## 安装

Maven 依赖：

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>最新版本</version>
    <scope>provided</scope>
</dependency>
```

IDEA 默认集成 Lombok 插件，需开启注解处理。

---

## 常用注解

### @Getter / @Setter

为字段或类自动生成 getter/setter 方法。

```java
@Getter
@Setter
public class Account {
    private int id;
    private String name;
}
```

可用于类或字段。可指定访问级别：

```java
@Getter(AccessLevel.PRIVATE)
private int id;
```

**属性表：**

| 属性名称      | 属性说明（可选值/默认值）                                                                 |
|---------------|------------------------------------------------------------------------------------------|
| value         | 访问级别，`AccessLevel.PUBLIC`/`PRIVATE`/`PROTECTED`/`PACKAGE`/`MODULE`/`NONE`，默认 PUBLIC |
| onMethod      | 为生成方法添加额外注解，默认 {}                                                           |
| onParam       | （Setter）为参数添加注解，默认 {}                                                         |
| lazy          | （Getter）是否懒加载，仅支持 final 字段，默认 false                                       |

---

### @AllArgsConstructor / @NoArgsConstructor / @RequiredArgsConstructor

自动生成构造方法。

```java
@AllArgsConstructor      // 全参构造
@NoArgsConstructor       // 无参构造
@RequiredArgsConstructor // final/@NonNull 字段构造
public class Account {
    private final String sid;
    private String name;
}
```

**属性表：**

| 属性名称      | 属性说明（可选值/默认值）                                   |
|---------------|------------------------------------------------------------|
| staticName    | 生成静态工厂方法名，默认 ""                                |
| onConstructor | 为构造方法添加注解，默认 {}                                 |
| access        | 构造方法访问级别，默认 PUBLIC                              |

**属性表：**

| 属性名称      | 属性说明（可选值/默认值）                                   |
|---------------|------------------------------------------------------------|
| staticName    | 生成静态工厂方法名，默认 ""                                |
| onConstructor | 为构造方法添加注解，默认 {}                                 |
| access        | 构造方法访问级别，默认 PUBLIC                              |
| force         | 是否强制为 final 字段生成无参构造，默认 false              |

**属性表：**

| 属性名称      | 属性说明（可选值/默认值）                                   |
|---------------|------------------------------------------------------------|
| staticName    | 生成静态工厂方法名，默认 ""                                |
| onConstructor | 为构造方法添加注解，默认 {}                                 |
| access        | 构造方法访问级别，默认 PUBLIC                              |

---

### @ToString

自动生成 `toString()` 方法。

```java
@ToString
public class Account {
    private int id;
    private String name;
}
```

- `@ToString.Exclude` 排除字段。
- `@ToString.Include` 白名单模式，需配合 `onlyExplicitlyIncluded = true`。
- `doNotUseGetters = true` 直接打印字段值。

**属性表：**

| 属性名称              | 属性说明（可选值/默认值）                                      |
|-----------------------|---------------------------------------------------------------|
| includeFieldNames     | 是否包含字段名，默认 true                                      |
| exclude               | 排除字段名数组（不推荐），默认 {}                              |
| of                    | 仅包含指定字段名数组（不推荐），默认 {}                        |
| callSuper             | 是否调用父类 toString，默认 false                             |
| doNotUseGetters       | 是否直接访问字段而非 getter，默认 false                       |
| onlyExplicitlyIncluded| 是否仅包含显式标注字段，默认 false                            |

---

### @EqualsAndHashCode

自动生成 `equals()` 和 `hashCode()` 方法。

```java
@EqualsAndHashCode
public class Account {
    private int id;
    private String name;
}
```

- `@EqualsAndHashCode.Exclude` 排除字段。
- `@EqualsAndHashCode.Include` 白名单模式。

**属性表：**

| 属性名称              | 属性说明（可选值/默认值）                                      |
|-----------------------|---------------------------------------------------------------|
| exclude               | 排除字段名数组（不推荐），默认 {}                              |
| of                    | 仅包含指定字段名数组（不推荐），默认 {}                        |
| callSuper             | 是否调用父类 equals/hashCode，默认 false                      |
| doNotUseGetters       | 是否直接访问字段而非 getter，默认 false                       |
| onlyExplicitlyIncluded| 是否仅包含显式标注字段，默认 false                            |
| cacheStrategy         | hashCode 缓存策略，`NEVER`/`LAZY`，默认 NEVER                 |

---

### @Builder

实现建造者模式，链式创建对象。

```java
@Builder
public class Account {
    private int id;
    private String name;
}
```

- `@Builder.Default` 设置 builder 默认值。
- `@Builder.ObtainVia` 自定义 builder 获取字段方式。

**属性表：**

| 属性名称           | 属性说明（可选值/默认值）                                         |
|--------------------|-------------------------------------------------------------------|
| builderMethodName  | builder 静态方法名，默认 "builder"                                |
| buildMethodName    | build 方法名，默认 "build"                                        |
| builderClassName   | builder 类名，默认 类名+Builder                                   |
| toBuilder          | 是否生成 toBuilder 方法，默认 false                               |
| access             | builder 相关方法访问级别，默认 PUBLIC                             |
| setterPrefix       | builder 属性设置器前缀，默认 ""                                   |

---

### @Data

综合注解，等价于 `@Getter`、`@Setter`、`@ToString`、`@EqualsAndHashCode`、`@RequiredArgsConstructor`。

```java
@Data
public class Account {
    private int id;
    private String name;
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| 无       | 组合注解，无独立属性              |

---

### @Value

不可变对象注解，等价于 `@Data` + `final` 字段 + `private final` + `@AllArgsConstructor`。

```java
@Value
public class Account {
    int id;
    String name;
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| 无       | 组合注解，无独立属性              |

---

### @NonNull

为参数或字段生成非空检查。

```java
public void setName(@NonNull String name) {
    this.name = name;
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| 无       | 用于参数、字段，无独立属性        |

---

### @Cleanup

自动资源释放（类似 try-with-resources）。

```java
public void test() {
    @Cleanup InputStream in = new FileInputStream("a.txt");
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| value    | 指定关闭方法名，默认 "close"      |

---

### @Synchronized

线程安全同步方法（替代 `synchronized` 关键字）。

```java
@Synchronized
public void safeMethod() {
    // ...
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| value    | 指定锁对象名，默认 ""（自动生成） |

---

### @Log / @Slf4j / @Log4j2 等

自动为类生成日志对象。

```java
@Slf4j
public class Example {
    public void test() {
        log.info("Hello Lombok!");
    }
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| topic    | 日志主题（部分日志注解支持），默认 "" |

---

### @FieldDefaults

统一设置字段默认修饰符。

```java
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
class Account {
    int id;
    String name;
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| level    | 字段访问级别，默认 PUBLIC         |
| makeFinal| 是否全部 final，默认 false        |

---

### @UtilityClass

工具类注解，自动将类设为 final、构造私有、所有方法 static。

```java
@UtilityClass
public class Util {
    public int add(int a, int b) { return a + b; }
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| 无       | 无独立属性                        |

---

### @Delegate

委托属性，自动生成接口实现的代理方法。

```java
class Account {
    @Delegate
    List<String> list = new ArrayList<>();
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| types    | 只委托指定类型的方法，默认 {}     |
| excludes | 排除指定类型的方法，默认 {}       |

---

### @SneakyThrows

自动抛出受检异常，无需显式声明。

```java
@SneakyThrows
public void run() {
    throw new IOException("error");
}
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| value    | 指定异常类型，默认 {}             |

---

### @With

为字段生成带单字段变更的新对象方法（不可变对象常用）。

```java
@With
private final String name;
```

**属性表：**

| 属性名称 | 属性说明（可选值/默认值）         |
|----------|----------------------------------|
| 无       | 用于字段，无独立属性              |

---

### @SuperBuilder

支持继承的建造者模式。

```java
@SuperBuilder
public class Parent { ... }

@SuperBuilder
public class Child extends Parent { ... }
```

**属性表：**

| 属性名称           | 属性说明（可选值/默认值）                                         |
|--------------------|-------------------------------------------------------------------|
| builderMethodName  | builder 静态方法名，默认 "builder"                                |
| buildMethodName    | build 方法名，默认 "build"                                        |
| builderClassName   | builder 类名，默认 类名+Builder                                   |
| toBuilder          | 是否生成 toBuilder 方法，默认 false                               |
| access             | builder 相关方法访问级别，默认 PUBLIC                             |
| setterPrefix       | builder 属性设置器前缀，默认 ""                                   |

---

## 其他实验性/特殊注解

- `@Getter(lazy = true)`：懒加载 getter。
- `@Builder.ObtainVia`：自定义 builder 获取字段方式。
- `@Builder.Default`：builder 默认值。
- `@ToString.Include(rank, name)`：自定义 toString 字段顺序和名称。
- `@EqualsAndHashCode.OnlyExplicitlyIncluded`：仅包含显式标注字段。
- `@RequiredArgsConstructor(staticName = "of")`：生成静态工厂方法。
- `@AllArgsConstructor(access = AccessLevel.PRIVATE)`：私有构造器。

---

## 参考

- 官方文档：https://projectlombok.org
- 更多高级
用法请查阅官方文档或源码注释。

> [!TIP]
> Lombok 注解仅在编译期生效，实际生成代码可通过 IDE 反编译或查看字节码验证。
