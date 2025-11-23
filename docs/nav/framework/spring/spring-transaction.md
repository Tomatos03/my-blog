# Spring 事务

## 基本使用

Spring 事务管理用于保证数据的一致性和完整性。通过声明式和编程式两种方式实现事务控制。

### 声明式事务

最常用方式是通过 `@Transactional` 注解：

```java
@Service
public class UserService {
    @Transactional
    public void createUser(User user) {
        // 数据库操作
    }
}
```

可以在类或方法上添加注解，Spring 会自动管理事务的开启、提交和回滚。

### 编程式事务

通过 `TransactionTemplate` 手动管理事务：

```java
@Autowired
private TransactionTemplate transactionTemplate;

public void createUser(User user) {
    transactionTemplate.execute(status -> {
        // 数据库操作
        return null;
    });
}
```

## 事务传播行为

事务传播行为定义了一个方法在调用时，遇到已有事务时应如何处理。它决定了当前方法是否需要在现有事务中执行、开启新事务，或在没有事务的情况下运行。合理配置传播行为可以满足不同业务场景下的事务需求。

假设有如下两个方法：

```java
@Transactional(propagation = Propagation.REQUIRED)
public void methodA() {
    // ...
    methodB();
}

@Transactional(propagation = Propagation.REQUIRES_NEW)
public void methodB() {
    // ...
}
```

当 `methodA()` 调用 `methodB()` 时，不同传播行为的表现如下：

| 传播行为      | 说明                                           | 示例中的表现                                                                     | 常用场景                                                         |
| ------------- | ---------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| REQUIRED      | 默认行为，有事务则加入，没有则新建事务         | `methodB()`加入`methodA()`的事务，二者属于同一个事务                             | 大多数业务方法，保证同一事务上下文                               |
| REQUIRES_NEW  | 总是新建事务，挂起当前事务                     | `methodB()`挂起`methodA()`的事务，单独开启新事务                                 | 日志记录、异步任务、独立子流程                                   |
| SUPPORTS      | 有事务则加入，没有则以非事务方式执行           | `methodB()`加入`methodA()`的事务，如果`methodA()`无事务则非事务方式运行          | 查询方法、可选事务参与的操作                                     |
| NOT_SUPPORTED | 总是以非事务方式执行，挂起当前事务             | 挂起`methodA()`的事务，`methodB()`以非事务方式运行                               | 只读操作、性能优化、事务外部调用                                 |
| MANDATORY     | 必须在事务中运行，否则抛异常                   | `methodA()`有事务, `methodB()`加入事务. `methodA()`无事务, 执行`methodB()`抛异常 | 依赖事务环境的底层方法                                           |
| NEVER         | 必须在非事务环境下运行，否则抛异常             | `methodB()`在有事务环境下（如`methodA()`）调用会抛异常                           | 非事务操作、工具类方法                                           |
| NESTED        | 有事务则嵌套事务，没有则新建事务               | `methodB()`在`methodA()`事务内开启嵌套事务，methodB发生异常时只回滚自身操作，不影响methodA的其他操作，但如果methodA最终回滚，则methodB的操作也会一起回滚。 | 局部回滚、复杂业务流程、分段提交                                 |

> [!TIP]
> `REQUIRES_NEW`和`NESTED`很相似(方法中发生异常都会回滚), 主要区别在于外部方法发生异常时, `REQUIRES_NEW`不会回滚内部方法的操作, 而`NESTED`会回滚内部方法的操作。

> [!NOTE]
> `NESTED`传播行为，底层数据库必须支持事务嵌套或保存点功能，否则无法实现预期效果。

## 事务回滚规则

通过设置`rollbackFor`和`noRollbackFor`属性可以指定哪些异常会触发回滚或不回滚。

> [!NOTE]
> 默认情况下, 只有未捕获的`RuntimeException`和`Error`异常才会触发事务回滚。

```java
    @Transactional
    public void testRuntimeException(String name) {
        People people = new People();
        people.setName(name + "-RUNTIME");
        peopleMapper.insert(people);
        throw new RuntimeException("RuntimeException回滚");
    }

    @Transactional
    public void testCheckedException(String name) throws Exception {
        People people = new People();
        people.setName(name + "-CHECKED");
        peopleMapper.insert(people);
        throw new Exception("CheckedException不回滚");
    }

    @Transactional
    public void testError(String name) {
        People people = new People();
        people.setName(name + "-ERROR");
        peopleMapper.insert(people);
        throw new Error("Error回滚");
    }

    @Transactional(rollbackFor = Exception.class) // 指定CheckedException也回滚
    public void testCheckedExceptionRollback(String name) throws Exception {
        People people = new People();
        people.setName(name + "-CHECKED-ROLLBACK");
        peopleMapper.insert(people);
        throw new Exception("测试CheckedException回滚");
    }
```

## 事务隔离级别

默认情况下Spring事务的隔离级别为`DEFAULT`(Spring事务的隔离级别与数据库一致), 可通过 `isolation` 属性来修改事务的隔离级别. 

```java
// 显示指定事务隔离级别为 READ_COMMITTED
// 如果Spring设置的隔离级别与数据库默认隔离级别不一致，Spring会尝试切换数据库连接的隔离级别，可能导致性能下降或部分数据库不支持动态切换而报错。
@Transactional(isolation = Isolation.READ_COMMITTED)
public void getUser(Long id) {
    // ...
}
```

## 事务失效

Spring 事务在以下场景下会失效：

### 事务方法无法被子类重写

`@Transactional` 修饰的方法必须能够被子类重写, 否则事务不会生效

```java
@Transactional
private void updateUser(User user) {   // 当前方法对子类不可见(无法被子类重写)
    // 事务不会生效
}

@Transactional
final void updateUser(User user) {   // 当前方法无法被子类重写
    // 事务不会生效
}
```

- 为什么事务方法必须能够被子类重写?  
答: 因为 Spring 对于类的动态代理使用的是 CGLIB, CGLIB 通过生成子类来实现对目标类的代理, 如果方法被声明为 `private` 或 `final`, 则子类无法重写这些方法, 导致 Spring 无法在调用这些方法时插入事务管理逻辑, 从而使得事务注解失效。


### 自调用

当类内部一个方法调用另一个带有 `@Transactional` 注解的方法时，事务不会生效，因为 Spring 的事务是通过代理实现的，只有通过 Spring 代理类调用才会被代理拦截。

```java
// 自调用事务失效示例
@Service
public class UserService {
    @Transactional
    public void methodA() {
    }

    public void methodB() {
        methodA(); // 事务不会生效
    }
}
```

获取 Spring 代理对象有以下几种方式:

-   方式一: 通过 ApplicationContext 获取代理对象

```java
@Service
public class UserService {
    @Autowired
    private ApplicationContext applicationContext;

    @Transactional
    public void methodA() {
    }

    public void methodB() {
        UserService proxy = applicationContext.getBean(UserService.class); // 获取当前类的代理对象
        proxy.methodA(); // 事务生效
    }
}
```

-   方式二: 通过 AopContext 获取代理对象

```java
@Service
public class UserService {
    @Transactional
    public void methodA() {
    }

    public void methodB() {
        UserService proxy = (UserService) AopContext.currentProxy(); // 获取当前类的代理对象
        proxy.methodA(); // 事务生效
    }
}

// 注意: 需要要在启动类上配置暴露代理对象, 否则AopContext.currentProxy()获取不到对应的代理对象
@EnableAspectJAutoProxy(exposeProxy = true) // 暴露代理对象
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 异常未抛出或被捕获

默认只有未捕获的`RuntimeException`和`Error`异常才会触发回滚。若异常被捕获或为`CheckedException`异常，事务不会回滚。

```java
@Transactional
public void updateUser(User user) {
    try {
        // 代码
        throw new Exception("异常");
    } catch (Exception e) {
        // 异常被捕获，事务不会回滚
    }
}

// 想要让CheckedException也回滚，需要指定rollbackFor = Exception.class
@Transactional
public void updateUser2(User user) {
    // 代码
    throw new Exception("异常"); // CheckedException，事务不会回滚
}
```

### 多线程操作

事务只在当前线程有效，若在事务方法中启动新线程，子线程中的操作不受事务管理。

```java
@Transactional
public void updateUser(User user) {
    new Thread(() -> {
        // 这里的操作不受事务控制
    }).start();
}
```

### 数据库不支持事务

某些数据库操作（如 MyISAM 引擎的表）本身不支持事务，Spring 事务也无法生效。

### 配置错误或未被 Spring 管理

类未被 Spring 容器管理或事务配置不正确时，事务也不会生效。
