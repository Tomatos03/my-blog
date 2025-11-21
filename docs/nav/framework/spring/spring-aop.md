# Spring AOP

AOP即面向切面编程(Aspect-Oriented Programming). Spring AOP是Spring框架提供的面向切面编程的实现。AOP的核心思想是将程序中那些与业务无关但又需要在多个模块中重复出现的功能（比如日志记录、事务管理、安全控制等）抽取出来，形成“切面”，从而实现业务逻辑与这些横切关注点的解耦。

AOP常用的术语包括：

- **切面（Aspect）**：横切关注点的模块化，比如日志切面、事务切面。
- **连接点（JoinPoint）**：程序执行的某个点，比如方法调用。在Spring AOP中，一个连接点总是代表一个方法的执行。
- **通知（Advice）**：切面在特定连接点上执行的动作，比如前置通知、后置通知、异常通知等。
- **切入点（Pointcut）**：定义哪些连接点需要织入通知, 即匹配连接点的谓词（predicate）
- **织入（Weaving）**：将切面应用到目标对象并创建代理对象的过程。Spring AOP和其他纯Java AOP框架一样，在运行时进行织入

> [!NOTE]
> Spring AOP主要基于代理实现，默认使用JDK动态代理（针对接口）或CGLIB字节码生成（针对类）

---

## 定义切面

在Spring中，可以通过`@Aspect`注解定义一个切面类。例如：

```java
@Aspect
@Component
public class LoggingAspect {
    // 切面内容
}

// 如果是非SpringBoot项目, 需要在配置类上添加@EnableAspectJAutoProxy注解以启用AOP支持.
// Spring Boot项目会自动启用AOP支持.
@EnableAspectJAutoProxy
@Configuration
public class AppConfig {
}
```

## 定义切点

连接点是程序执行的某个点，Spring AOP中的连接点通常是方法的执行。通过切入点表达式可以指定哪些方法作为连接点。常用的切入点表达式有：

| 表达式         | 作用                                                         |
| -------------- | ------------------------------------------------------------ |
| execution      | 匹配方法的执行（可根据方法的修饰符、返回值、类、方法名、参数等进行精确匹配） |
| within         | 匹配指定包或类下的所有方法                                    |
| this           | 匹配当前AOP代理对象的类型（通常是接口类型）                   |
| target         | 匹配目标对象（被代理对象）的类型                              |
| @annotation    | 匹配被指定注解修饰的方法                                      |
| @within        | 匹配被指定注解修饰的类中的所有方法                            |
| args           | 匹配参数类型符合指定条件的方法                                |

##### execution

这个表达式用于匹配某个方法。

- 语法：

```java
execution([修饰符] 返回值类型 包名.类名.方法名(参数))
```

- 示例：

```java
// 匹配所有 public 方法
execution(public * *(..))

// 匹配 com.example.service 包下所有类的所有方法
execution(* com.example.service.*.*(..))

// 匹配 com.example.service.UserService 类的所有方法
execution(* com.example.service.UserService.*(..))

// 匹配以 get 开头的方法
execution(* get*(..))
```

##### within

这个表达式用于匹配某个包或类下的所有方法。

- 语法：

```java
within(包名.类名)
```

- 示例：

```java
// 匹配 com.example.service 包下所有类的方法
within(com.example.service.*)

// 匹配 com.example.service 包及其子包下所有类的方法
within(com.example.service..*)
```

##### this 与 target

这两个表达式用于根据类型匹配代理对象或目标对象。

- 语法：

```java
this(类型全名)
target(类型全名)
```

- 示例：

```java
// 匹配当前 AOP 代理对象类型为 UserService 的连接点
this(com.example.service.UserService)

// 匹配目标对象类型为 UserServiceImpl 的连接点
target(com.example.service.UserServiceImpl)
```

##### @annotation

这个表达式用于匹配被指定注解修饰的方法。

- 语法：

```java
@annotation(注解类型全名)
```

- 示例：

```java
// 匹配被 @Transactional 注解修饰的方法
@annotation(org.springframework.transaction.annotation.Transactional)
```

##### @within

这个表达式用于匹配被指定注解修饰的类中的所有方法。

- 语法：

```java
@within(注解类型全名)
```

- 示例：

```java
// 匹配被 @Service 注解修饰的类中的所有方法
@within(org.springframework.stereotype.Service)
```

##### args

这个表达式用于匹配参数类型的方法。

- 语法：

```java
args(参数类型列表)
```

- 示例：

```java
// 匹配第一个参数为 String 类型的方法
args(java.lang.String,..)

// 匹配所有参数都是 Serializable 类型的方法
args(java.io.Serializable,..)
```

## 连接点常见类

在通知方法中，可以通过以下类获取连接点的信息：

- `JoinPoint` 表示连接点的上下文信息, 常用方法：
    - `getArgs()`：获取方法参数数组。
    - `getSignature()`：获取被通知方法的签名信息（如方法名、声明类型等）。
    - `getTarget()`：获取目标对象（被代理对象）。
    - `getThis()`：获取AOP代理对象自身。

- `ProceedingJoinPoint` 是`JoinPoint`的子接口，专门用于环绕通知，可以控制目标方法的执行：
    - `proceed()`：执行目标方法，相当于调用原方法。
    - `proceed(Object[] args)`：带新参数执行目标方法，可用于修改参数。

## 定义通知

通知是切面在特定连接点上执行的动作。常见的通知类型有：

- `@Before`：前置通知，在方法执行前执行
- `@After`：后置通知，在方法执行后执行
- `@AfterReturning`：返回通知，在方法成功返回(方法正常执行完成并返回结果)后执行
- `@AfterThrowing`：异常通知，在方法抛出异常后执行
- `@Around`：环绕通知，包裹方法执行的全过程(方法执行前后增强)

```java
@Aspect
@Component
public class LoggingAspect {
    // 方式一: 先定义切点, 在通知中引用切点
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceMethods() {}

    @Before("serviceMethods()")
    public void beforeMethod(JoinPoint joinPoint) {
        System.out.println("方法调用前: " + joinPoint.getSignature().getName());
    }

    // 方式二: 直接在通知中定义切点表达式
    @Before("execution(* com.example.service.*.*(..))")
    public void beforeMethod(JoinPoint joinPoint) {
        System.out.println("方法调用前: " + joinPoint.getSignature().getName());
    }
}
```
