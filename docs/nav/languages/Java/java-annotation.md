# Java 注解

## 定义注解

使用`@interface`来声明自己的注解, 通过无参数的方法声明注解的属性，其中`方法名`即为`属性名`，`方法返回值类型`即为`属性值需要的类型`。如果想要指定默认值，可以使用 `default` 关键字

```java
public @interface Example {
    String name();           // 必须赋值的属性
    int count() default 1;   // 有默认值的属性，可选赋值
}
```

> [!NOTE]
> 如果注解只有一个名为 `value` 的属性，使用时可以省略属性名直接赋值。 \
> 如果注解要求的值是数组, 使用大括号 `{}` 来指定多个值, 在只有一个值的时候, 可以省略大括号.
> 注解属性类型只能是基本类型、`String`、`Class`、枚举、注解或这些类型的数组。

使用注解时，必须为没有默认值的属性赋值：

```java
@Example(name = "test")
public void foo() {}

@Example(name = "test", count = 5)
public void bar() {}
```

## 组合注解

组合注解（Meta-Annotation Composition）是指在定义注解时, 使用了其他注解. 这样的做法会将多个注解的功能组合在一起, 在使用组合注解时, 就相当于同时使用了这些注解。

Spring 中的 `@RestController` 就是一个组合注解，它本身被 `@Controller` 和 `@ResponseBody` 注解所修饰：

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Controller
@ResponseBody
public @interface RestController {
    String value() default "";
}
```

使用 `@RestController` 注解的类，实际上同时具备了 `@Controller` 和 `@ResponseBody` 的功能。

> [!TIP]
> 组合注解可以减少重复注解，提高开发效率，常用于框架设计和规范约定。

## 内置注解

### @Override

用于标记方法是重写父类方法，编译器会检查方法签名是否正确。

### @Deprecated

标记方法或类已过时，使用这个注解标柱的类或方法时会有警告。

### @SuppressWarnings

用于抑制编译器警告。

### @FunctionalInterface

标记接口为函数式接口

> [!TIP]
> 只有一个抽象方法的接口才能被标记为函数式接口。

### 元注解

#### @Retention

指定当前注解的保留策略, 即注解在什么阶段还有效。常见的保留策略有：

| 级别      | 编译后 class 文件 | 运行时可反射获取 | 典型用途           |
|-----------|------------------|------------------|--------------------|
| SOURCE    | 不保留           | 不可获取         | 编译检查、IDE      |
| CLASS     | 保留             | 不可获取         | 编译器处理         |
| RUNTIME   | 保留             | 可获取           | 运行时反射         |

- 示例

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {}
```

#### @Target

指定当前注解可以应用于哪些 Java 程序元素。常见的目标有：

| 目标               | 说明                     |
|--------------------|--------------------------|
| TYPE               | 类、接口（包括注解类型）、枚举 |
| FIELD              | 字段（成员变量、枚举常量）|
| METHOD             | 方法                     |
| PARAMETER          | 方法参数                 |
| CONSTRUCTOR        | 构造方法                 |
| LOCAL_VARIABLE     | 局部变量                 |
| ANNOTATION_TYPE    | 注解类型                 |
| PACKAGE            | 包                       |

- 示例

```java
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface MyAnnotation {}
```

#### @Documented 

指示将使用该注解的元素包含在 Javadoc 中。对于1Java程序的运行没有任何影响

#### @Inherited

指示一个注解类型是自动继承的。如果一个类使用了被 `@Inherited` 注解修饰的注解，那么其子类将自动继承该注解。

- 示例

```java
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface MyInheritedAnnotation {}

@MyInheritedAnnotation
public class Parent {}

public class Child extends Parent {}

public class Test {
    public static void main(String[] args) {
        // 这里父类使用了 @Inherited注解, 子类class对象才能够拿到该注解
        System.out.println(Child.class.isAnnotationPresent(MyInheritedAnnotation.class)); // 输出 true
    }
}
```

> [!TIP]
> `Child` 类虽然没有直接使用 `@MyInheritedAnnotation`，但由于该注解被 `@Inherited` 修饰，`Child` 继承自 `Parent` 后也自动拥有了该注解。