# JUC

JUC（Java Util Concurrent）是Java并发编程的核心库之一，主要用于支持多线程环境下的高效、安全的并发操作。JUC包含了丰富的工具类，如线程池（Executor框架）、锁机制（Lock接口及其实现）、原子变量（Atomic包）、并发集合（Concurrent包）、同步器（如CountDownLatch、Semaphore、CyclicBarrier等）以及Future和Callable等异步任务处理方式。通过JUC，开发者可以更方便地实现线程安全、性能优良的并发程序，有效提升Java应用的响应速度和资源利用率。

## JUC核心接口和抽象类体系

**线程池相关接口和类**

| 接口/类                      | 位置                 | 说明                           | 用途                                             |
| ---------------------------- | -------------------- | ------------------------------ | ------------------------------------------------ |
| **Executor**                 | java.util.concurrent | 顶层接口，定义了execute()方法  | 任务执行的统一入口                               |
| **ExecutorService**          | java.util.concurrent | 扩展Executor，支持生命周期管理 | 线程池的标准接口，支持submit()、shutdown()等     |
| **ScheduledExecutorService** | java.util.concurrent | 支持定时和周期性任务           | 定时任务执行，如scheduleAtFixedRate()            |
| **AbstractExecutorService**  | java.util.concurrent | 抽象类，实现ExecutorService    | 提供execute()和submit()的默认实现                |
| **ThreadPoolExecutor**       | java.util.concurrent | 最重要的实现类                 | 具体的线程池实现，支持核心线程、队列、拒绝策略等 |
| **ForkJoinPool**             | java.util.concurrent | 工作窃取线程池                 | 用于分治算法，如ForkJoinTask                     |
| **Executors**                | java.util.concurrent | 工厂类（非接口）               | 提供便捷的线程池创建方法                         |

**锁相关接口和类**

| 接口/类                              | 位置                       | 说明                   | 用途                                                     |
| ------------------------------------ | -------------------------- | ---------------------- | -------------------------------------------------------- |
| **Lock**                             | java.util.concurrent.locks | 显式锁接口             | 比synchronized更灵活的锁机制                             |
| **ReadWriteLock**                    | java.util.concurrent.locks | 读写锁接口             | 支持多个线程同时读，但写操作互斥                         |
| **Condition**                        | java.util.concurrent.locks | 条件变量接口           | 与Lock配合，提供await()和signal()机制                    |
| **ReentrantLock**                    | java.util.concurrent.locks | 可重入互斥锁实现       | Lock的实现，支持同一线程重复获取                         |
| **ReentrantReadWriteLock**           | java.util.concurrent.locks | 可重入读写锁实现       | ReadWriteLock的实现                                      |
| **AbstractQueuedSynchronizer (AQS)** | java.util.concurrent.locks | 抽象基类，构建锁的基础 | 大多数JUC同步器的基础，如ReentrantLock、CountDownLatch等 |

**原子变量接口和类**

| 接口/类                               | 位置                        | 说明               | 用途                              |
| ------------------------------------- | --------------------------- | ------------------ | --------------------------------- |
| **AtomicInteger**                     | java.util.concurrent.atomic | 原子整数           | 无锁地进行整数原子操作            |
| **AtomicLong**                        | java.util.concurrent.atomic | 原子长整数         | 无锁地进行长整数原子操作          |
| **AtomicBoolean**                     | java.util.concurrent.atomic | 原子布尔值         | 无锁地进行布尔值原子操作          |
| **AtomicReference\<V>**               | java.util.concurrent.atomic | 原子引用           | 无锁地更新对象引用                |
| **AtomicStampedReference\<V>**        | java.util.concurrent.atomic | 带版本戳的原子引用 | 解决ABA问题的引用型原子变量       |
| **AtomicMarkableReference\<V>**       | java.util.concurrent.atomic | 带标记的原子引用   | 另一种解决ABA问题的方案           |
| **AtomicIntegerArray**                | java.util.concurrent.atomic | 原子整数数组       | 对数组中的元素进行原子操作        |
| **AtomicLongArray**                   | java.util.concurrent.atomic | 原子长整数数组     | 对数组中的元素进行原子操作        |
| **AtomicReferenceArray\<E>**          | java.util.concurrent.atomic | 原子引用数组       | 对数组中的引用进行原子操作        |
| **AtomicIntegerFieldUpdater\<T>**     | java.util.concurrent.atomic | 字段更新器         | 原子地更新对象的volatile int字段  |
| **AtomicLongFieldUpdater\<T>**        | java.util.concurrent.atomic | 字段更新器         | 原子地更新对象的volatile long字段 |
| **AtomicReferenceFieldUpdater\<T,V>** | java.util.concurrent.atomic | 字段更新器         | 原子地更新对象的volatile引用字段  |

**并发集合接口和类**

| 接口/类                          | 位置                 | 说明              | 用途                           |
| -------------------------------- | -------------------- | ----------------- | ------------------------------ |
| **ConcurrentMap\<K,V>**          | java.util.concurrent | 并发哈希表接口    | 定义线程安全的Map操作          |
| **ConcurrentHashMap\<K,V>**      | java.util.concurrent | 高并发哈希表实现  | 分段锁/桶级锁，支持高并发读写  |
| **ConcurrentNavigableMap\<K,V>** | java.util.concurrent | 并发导航式Map接口 | 支持排序和导航的并发Map        |
| **ConcurrentSkipListMap\<K,V>**  | java.util.concurrent | 跳表实现的并发Map | 支持排序的并发Map              |
| **CopyOnWriteArrayList\<E>**     | java.util.concurrent | 写时复制List实现  | 适合读多写少的场景，迭代时安全 |
| **CopyOnWriteArraySet\<E>**      | java.util.concurrent | 写时复制Set实现   | 基于CopyOnWriteArrayList的Set  |
| **ConcurrentLinkedQueue\<E>**    | java.util.concurrent | 无锁并发队列      | 基于CAS的高效并发队列          |
| **ConcurrentLinkedDeque\<E>**    | java.util.concurrent | 无锁并发双向队列  | 基于CAS的高效并发双向队列      |
| **LinkedBlockingQueue\<E>**      | java.util.concurrent | 阻塞队列          | 有界或无界，支持线程间协调     |
| **ArrayBlockingQueue\<E>**       | java.util.concurrent | 有界阻塞队列      | 基于数组的阻塞队列             |
| **PriorityBlockingQueue\<E>**    | java.util.concurrent | 优先级阻塞队列    | 元素按优先级排序的阻塞队列     |
| **SynchronousQueue\<E>**         | java.util.concurrent | 同步队列          | 不存储元素，直接传递           |

**同步器接口和类**

| 接口/类            | 位置                 | 说明       | 用途                           |
| ------------------ | -------------------- | ---------- | ------------------------------ |
| **CountDownLatch** | java.util.concurrent | 倒计时门栓 | 一个或多个线程等待其他线程完成 |
| **CyclicBarrier**  | java.util.concurrent | 循环栅栏   | 多个线程相互等待，然后一起继续 |
| **Semaphore**      | java.util.concurrent | 信号量     | 限制同时访问某个资源的线程数   |
| **Phaser**         | java.util.concurrent | 阶段同步器 | 支持多个阶段的线程同步         |

**异步任务相关接口和类**

| 接口/类                   | 位置                 | 说明                 | 用途                         |
| ------------------------- | -------------------- | -------------------- | ---------------------------- |
| **Callable\<V>**          | java.util.concurrent | 可返回结果的任务接口 | 定义有返回值的任务           |
| **Future\<V>**            | java.util.concurrent | 异步计算结果接口     | 获取异步任务的结果和状态     |
| **RunnableFuture\<V>**    | java.util.concurrent | 可运行的Future接口   | 既是Runnable又是Future       |
| **FutureTask\<V>**        | java.util.concurrent | Future的实现类       | 将Callable包装成Future       |
| **CompletionStage\<T>**   | java.util.concurrent | 异步计算阶段接口     | 支持异步链式调用             |
| **CompletableFuture\<T>** | java.util.concurrent | Future的增强实现     | 支持链式调用、组合、异常处理 |
| **ScheduledFuture\<V>**   | java.util.concurrent | 定时任务Future接口   | 代表定时任务的结果           |

**其他重要接口和类**

| 接口/类                        | 位置                 | 说明                 | 用途                            |
| ------------------------------ | -------------------- | -------------------- | ------------------------------- |
| **ThreadFactory**              | java.util.concurrent | 线程工厂接口         | 自定义线程创建逻辑              |
| **RejectedExecutionHandler**   | java.util.concurrent | 拒绝策略接口         | 定义线程池任务被拒绝时的处理    |
| **ThreadLocal\<T>**            | java.lang            | 线程本地变量         | 为每个线程提供独立的变量副本    |
| **InheritableThreadLocal\<T>** | java.lang            | 可继承的线程本地变量 | 子线程继承父线程的ThreadLocal值 |
| **Exchanger\<V>**              | java.util.concurrent | 数据交换器           | 两个线程交换数据                |

**核心接口关系图**

```
Executor (顶层接口)
  ├── ExecutorService(接口)
  │   └── AbstractExecutorService (抽象类)
  │       └── ThreadPoolExecutor
  │
  └── ScheduledExecutorService(接口)
      └── ScheduledThreadPoolExecutor

Lock (接口)
  └── ReentrantLock

ReadWriteLock (接口)
  └── ReentrantReadWriteLock
    
Condition (接口)
  └── 由Lock实现类（如ReentrantLock）通过newCondition()方法创建

Future (接口)
  └── CompletableFuture (Java 8+增强)

AbstractQueuedSynchronizer (抽象类, 简称AQS)
  ├── ReentrantLock
  ├── CountDownLatch
  ├── CyclicBarrier
  └── Semaphore
```
> [!NOTE]
> 仅展示了一部分类, 存在部分类没有展示

---

## Executor框架

Executor框架是一个基于生产者-消费者模式的线程池实现体系。它提供了线程的创建、管理和调度的统一接口，将任务的提交与任务的执行解耦。核心接口包括：

- **Executor**：最顶层接口，只定义了 `execute(Runnable command)` 方法
- **ExecutorService**：扩展Executor，支持任务的生命周期管理（shutdown、shutdownNow等）以及Future返回
- **ScheduledExecutorService**：支持定时和周期性任务执行

### ThreadPoolExecutor

ThreadPoolExecutor是线程池的核心实现，使用一个有界的阻塞队列来存储待执行任务。其构造函数包含以下关键参数：

```java
public ThreadPoolExecutor(
    int corePoolSize,              // 核心线程数
    int maximumPoolSize,           // 最大线程数
    long keepAliveTime,            // 非核心线程的闲置超时时间
    TimeUnit unit,                 // keepAliveTime的时间单位
    BlockingQueue<Runnable> workQueue,  // 任务队列
    ThreadFactory threadFactory,   // 线程工厂
    RejectedExecutionHandler handler    // 拒绝策略
)
```

**线程池执行流程：**

1. 当任务到达时，若当前线程数 < corePoolSize，创建核心线程直接执行任务
2. 若核心线程已满，任务加入到 workQueue 等待
3. 若队列满且线程数 < maximumPoolSize，创建非核心线程执行任务
4. 若线程数也达到上限，根据 RejectedExecutionHandler 处理被拒绝的任务
5. 非核心线程在空闲 keepAliveTime 后被回收

**创建和使用自定义线程池**

```java
// 创建一个核心线程数为5、最大线程数为10、队列容量为100的线程池
ThreadPoolExecutor threadPool = new ThreadPoolExecutor(
    5,                                      // corePoolSize
    10,                                     // maximumPoolSize
    60,                                     // keepAliveTime
    TimeUnit.SECONDS,                       // timeUnit
    new LinkedBlockingQueue<>(100),         // workQueue - 有界阻塞队列
    new ThreadFactory() {
        private final AtomicInteger count = new AtomicInteger(1);
        @Override
        public Thread newThread(Runnable r) {
            // 自定义线程创建逻辑，方便线程标识和调试
            Thread thread = new Thread(r);
            thread.setName("CustomPool-Thread-" + count.getAndIncrement());
            thread.setDaemon(false);
            return thread;
        }
    },
    new ThreadPoolExecutor.AbortPolicy()    // 拒绝策略 - 任务被拒绝时抛异常
);

// 提交任务
for (int i = 0; i < 20; i++) {
    final int taskId = i;
    // Runable接口是函数式接口, 可以使用lambda表达式简化
    threadPool.execute(() -> {
        try {
            System.out.println("Task " + taskId + " 执行中");
            Thread.sleep(2000);  // 模拟业务耗时
            System.out.println("Task " + taskId + " 完成");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    });
}

// 优雅关闭线程池
threadPool.shutdown();  // 不再接收新任务，但等待已提交任务完成
// 或者 threadPool.shutdownNow();  // 立即停止，返回未执行的任务列表

// 等待线程池终止，最多等待30秒
try {
    if (!threadPool.awaitTermination(30, TimeUnit.SECONDS)) {
        // 超时，可选择调用 shutdownNow()
        threadPool.shutdownNow();
    }
} catch (InterruptedException e) {
    threadPool.shutdownNow();
    Thread.currentThread().interrupt();
}
```

### Executors工厂类

Executors提供了便捷的静态工厂方法来创建常用的线程池：

```java
// 创建固定大小的线程池，所有线程都是核心线程
ExecutorService fixedPool = Executors.newFixedThreadPool(5);

// 创建只有一个线程的线程池，所有任务串行执行
ExecutorService singlePool = Executors.newSingleThreadExecutor();

// 创建无界线程池，按需创建线程，闲置60秒后回收
ExecutorService cachedPool = Executors.newCachedThreadPool();

// 创建支持定时和周期性任务的线程池
ScheduledExecutorService scheduledPool = Executors.newScheduledThreadPool(5);

// 定时执行任务：5秒后执行
scheduledPool.schedule(() -> {
    System.out.println("延迟任务执行");
}, 5, TimeUnit.SECONDS);

// 周期性执行任务：初始延迟2秒，之后每3秒执行一次
ScheduledFuture<?> future = scheduledPool.scheduleAtFixedRate(() -> {
    System.out.println("周期任务执行");
}, 2, 3, TimeUnit.SECONDS);

// 取消周期任务
future.cancel(true);
```

**工作队列选择的影响：**

| 队列类型 | 存储特性 | 适用场景 | 优点 | 缺点 |
| -------- | -------- | -------- | ---- | ---- |
| **SynchronousQueue** | 不存储任务，直接交接给线程 | 实时性要求高的场景 | 响应迅速，无队列延迟 | 容易触发拒绝策略 |
| **LinkedBlockingQueue** | 无界队列 | 任务量不确定的场景 | 任务永不被拒绝 | 可能导致内存溢出 |
| **ArrayBlockingQueue** | 有界队列 | 生产环境常用场景 | 平衡缓冲和拒绝，可控 | 队列满时触发拒绝策略 |

**拒绝策略的选择：**

| 拒绝策略 | 行为 | 适用场景 | 特点 |
| -------- | ---- | -------- | ---- |
| **AbortPolicy**（默认） | 直接抛出 RejectedExecutionException | 任务不能丢失，需要快速感知 | 会中断提交方，强制处理异常 |
| **DiscardPolicy** | 默默丢弃任务，无日志无通知 | 可以容忍少量任务丢失 | 静默处理，不影响主线程 |
| **DiscardOldestPolicy** | 丢弃队列中最老的任务，再次尝试提交当前任务 | 优先保证新任务执行 | 自动清理过期任务 |
| **CallerRunsPolicy** | 由提交任务的线程在当前线程中直接执行任务 | 防止任务丢失，可接受同步执行 | 确保任务不丢失，但会阻塞提交方 |


**电商订单处理系统**

在电商系统中，订单处理涉及多个步骤（验证、库存检查、支付、发货），需要高效地处理并发订单。使用线程池可以避免为每个订单创建新线程的开销。

```java
public class OrderProcessingSystem {
    private static final ThreadPoolExecutor orderPool = new ThreadPoolExecutor(
        10,                                 // 核心线程数 - 预期的并发订单数
        20,                                 // 最大线程数 - 处理峰值流量
        60,                                 // 非核心线程60秒后回收
        TimeUnit.SECONDS,
        new LinkedBlockingQueue<>(500),     // 队列大小为500个订单
        r -> {
            Thread t = new Thread(r);
            t.setName("OrderProcess-" + System.nanoTime());
            return t;
        },
        new ThreadPoolExecutor.CallerRunsPolicy()  // 使用CallerRunsPolicy，确保订单不会丢失
    );

    public static void submitOrder(Order order) {
        orderPool.execute(() -> {
            try {
                // 订单验证
                validateOrder(order);

                // 库存检查和预留
                reserveInventory(order);

                // 支付处理（可能很耗时）
                processPayment(order);

                // 发货
                shipOrder(order);

                System.out.println("订单 " + order.getId() + " 处理完成");
            } catch (Exception e) {
                // 订单处理失败，记录日志并执行回滚逻辑
                handleOrderFailure(order, e);
            }
        });
    }

    private static void validateOrder(Order order) {
        // 验证订单信息
    }

    private static void reserveInventory(Order order) {
        // 检查并预留库存
    }

    private static void processPayment(Order order) throws InterruptedException {
        // 模拟支付耗时
        Thread.sleep(1000);
    }

    private static void shipOrder(Order order) {
        // 安排发货
    }

    private static void handleOrderFailure(Order order, Exception e) {
        // 处理订单失败的业务逻辑
    }

    public static void shutdown() {
        orderPool.shutdown();
        try {
            if (!orderPool.awaitTermination(5, TimeUnit.MINUTES)) {
                orderPool.shutdownNow();
            }
        } catch (InterruptedException e) {
            orderPool.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }

    static class Order {
        private long id;
        Order(long id) { this.id = id; }
        public long getId() { return id; }
    }
}
```

**批量数据处理中避免阻塞主线程**

在处理大量离线数据时，如果用同步方式处理会阻塞主线程。使用线程池处理可以提高响应速度。

```java
public class BatchDataProcessor {
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(3);
    private final ExecutorService workerPool = Executors.newFixedThreadPool(8);

    // 每天凌晨2点执行批处理任务
    public void scheduleNightlyBatch() {
        scheduler.scheduleAtFixedRate(() -> {
            // 分批加载和处理数据，避免一次性加载大量数据导致OOM
            processDataInBatches(1000);  // 每批1000条
        }, calculateInitialDelay(), 24, TimeUnit.HOURS);  // 每24小时执行一次
    }

    private void processDataInBatches(int batchSize) {
        try {
            List<String> allData = fetchAllData();  // 从数据库加载所有需要处理的数据

            // 将数据分批处理
            for (int i = 0; i < allData.size(); i += batchSize) {
                int end = Math.min(i + batchSize, allData.size());
                List<String> batch = allData.subList(i, end);

                // 提交批处理任务到工作线程池
                workerPool.submit(() -> {
                    processBatch(batch);
                });
            }

            // 等待所有批处理完成
            workerPool.shutdown();
            if (!workerPool.awaitTermination(1, TimeUnit.HOURS)) {
                workerPool.shutdownNow();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private void processBatch(List<String> batch) {
        for (String item : batch) {
            // 执行复杂的数据处理逻辑
            transformAndStore(item);
        }
    }

    private long calculateInitialDelay() {
        // 计算到凌晨2点的延迟时间
        return 0;  // 简化示例
    }

    private List<String> fetchAllData() {
        return new java.util.ArrayList<>();  // 简化示例
    }

    private void transformAndStore(String item) {
        // 数据转换和存储逻辑
    }
}
```

---

## Lock接口及其实现

Lock接口是JUC中提供的显式锁机制，相比synchronized的隐式锁，提供了更灵活的锁控制能力。主要的实现类包括ReentrantLock（可重入锁）和ReadWriteLock（读写锁）。Lock接口主要方法包括：

- `lock()`：获取锁，如果锁不可用则阻塞当前线程
- `lockInterruptibly()`：获取锁，但可以被中断
- `tryLock()`：非阻塞地尝试获取锁，立即返回
- `unlock()`：释放锁

**公平锁 vs 非公平锁：**

- **非公平锁**：新到达的线程有机会在当前线程释放锁时立即获取锁，无需加入等待队列。吞吐量更高但可能导致线程饥饿
- **公平锁**：严格按照线程请求锁的顺序分配。保证公平性但性能略低

### ReentrantLock

ReentrantLock(可重入锁)是Lock接口最重要的实现类，支持同一个线程重复获取同一个锁。与synchronized不同，它提供了更多的控制能力。

**构造函数和参数：**

```java
// 创建非公平锁（默认）- 性能更好，但可能导致线程饥饿
ReentrantLock lock1 = new ReentrantLock();

// 创建公平锁 - 按照线程的请求顺序获取锁，性能稍差但更公平
ReentrantLock lock2 = new ReentrantLock(true);
```

**工作流程：**

1. 当线程调用 `lock()` 时，如果锁当前未被持有，立即获取锁并继续执行
2. 如果锁已被其他线程持有，当前线程进入锁对应的等待队列中，并被阻塞
3. 当持有锁的线程调用 `unlock()` 时，会唤醒等待队列中的下一个线程
4. ReentrantLock支持重入，同一线程可以多次获取同一个锁

**使用ReentrantLock和Condition实现生产者-消费者**

```java
public class ProducerConsumerWithLock {
    private static final int BUFFER_SIZE = 10;
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();   // 缓冲区非满条件
    private final Condition notEmpty = lock.newCondition();  // 缓冲区非空条件
    private final Queue<Integer> buffer = new LinkedList<>();

    // 生产者线程调用此方法
    public void produce(int value) throws InterruptedException {
        lock.lock();  // 显式获取锁
        try {
            // 等待直到缓冲区未满
            while (buffer.size() == BUFFER_SIZE) {
                System.out.println(Thread.currentThread().getName() + " 缓冲区满，等待...");
                notFull.await();  // 释放锁并等待
            }

            buffer.offer(value);
            System.out.println(Thread.currentThread().getName() +
                             " 生产: " + value + ", 缓冲区大小: " + buffer.size());

            // 唤醒等待的消费者线程
            notEmpty.signalAll();
        } finally {
            lock.unlock();  // 确保总是释放锁
        }
    }

    // 消费者线程调用此方法
    public int consume() throws InterruptedException {
        lock.lock();
        try {
            // 等待直到缓冲区非空
            while (buffer.isEmpty()) {
                System.out.println(Thread.currentThread().getName() + " 缓冲区空，等待...");
                notEmpty.await();
            }

            Integer value = buffer.poll();
            System.out.println(Thread.currentThread().getName() +
                             " 消费: " + value + ", 缓冲区大小: " + buffer.size());

            // 唤醒等待的生产者线程
            notFull.signalAll();
            return value;
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        ProducerConsumerWithLock pc = new ProducerConsumerWithLock();

        // 启动多个生产者线程
        for (int i = 0; i < 3; i++) {
            final int producerId = i;
            new Thread(() -> {
                try {
                    for (int j = 0; j < 5; j++) {
                        pc.produce(producerId * 10 + j);
                        Thread.sleep(100);
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }, "Producer-" + i).start();
        }

        // 启动多个消费者线程
        for (int i = 0; i < 2; i++) {
            final int consumerId = i;
            new Thread(() -> {
                try {
                    for (int j = 0; j < 7; j++) {
                        pc.consume();
                        Thread.sleep(200);
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }, "Consumer-" + i).start();
        }

        Thread.sleep(5000);
    }
}
```

**使用ReentrantLock实现计数器**

在多线程环境下，需要对某个计数器进行增减操作。使用Lock可以避免synchronized的局限性。

```java
public class ThreadSafeCounter {
    private final ReentrantLock lock = new ReentrantLock();
    private volatile long count = 0;

    public void increment() {
        lock.lock();
        try {
            // 关键业务逻辑，需要原子性
            long temp = count;
            // 模拟耗时操作
            Thread.sleep(1);
            count = temp + 1;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            lock.unlock();
        }
    }

    public long getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        ThreadSafeCounter counter = new ThreadSafeCounter();
        int threadCount = 10;
        ExecutorService pool = Executors.newFixedThreadPool(threadCount);

        // 每个线程执行1000次increment
        for (int i = 0; i < threadCount; i++) {
            pool.submit(() -> {
                for (int j = 0; j < 1000; j++) {
                    counter.increment();
                }
            });
        }

        pool.shutdown();
        pool.awaitTermination(1, TimeUnit.MINUTES);
        System.out.println("最终计数: " + counter.getCount() + " (预期: " + (threadCount * 1000) + ")");
    }
}
```

### ReadWriteLock

ReadWriteLock(读写锁)允许多个线程同时读取共享资源，但只允许一个线程写入。这种设计适合读多写少的场景。

**ReadWriteLock的工作流程：**

1. 读锁可以被多个线程同时持有（只要没有线程持有写锁）
2. 写锁是互斥的，获取写锁的线程会独占该锁
3. 当有线程等待写锁时，新的读锁请求通常会被阻塞（具体行为依赖实现）
4. 这种设计适合读操作远多于写操作的场景

```java
public class ReadWriteLockExample {
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private int count = 0;

    // 读操作 - 多个线程可以同时执行
    public int read() {
        rwLock.readLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + " 执行读操作，当前值: " + count);
            Thread.sleep(1000);  // 模拟读操作耗时
            return count;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return -1;
        } finally {
            rwLock.readLock().unlock();
        }
    }

    // 写操作 - 只有一个线程可以执行，且不能与读操作并发
    public void write(int value) {
        rwLock.writeLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + " 执行写操作，设置值为: " + value);
            Thread.sleep(1000);  // 模拟写操作耗时
            count = value;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    public static void main(String[] args) {
        ReadWriteLockExample rwLockDemo = new ReadWriteLockExample();

        // 启动5个读线程
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                for (int j = 0; j < 3; j++) {
                    rwLockDemo.read();
                }
            }, "Reader-" + i).start();
        }

        // 启动2个写线程
        for (int i = 0; i < 2; i++) {
            final int writerId = i;
            new Thread(() -> {
                for (int j = 0; j < 2; j++) {
                    rwLockDemo.write(writerId * 100 + j);
                }
            }, "Writer-" + i).start();
        }
    }
}
```


**场景2：使用ReadWriteLock实现缓存**

在缓存场景中，读操作远多于写操作。使用ReadWriteLock可以显著提升性能。

```java
public class CacheWithReadWriteLock<K, V> {
    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    private final Map<K, V> cache = new HashMap<>();

    public V get(K key) {
        lock.readLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + " 读取缓存: " + key);
            return cache.get(key);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void put(K key, V value) {
        lock.writeLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + " 更新缓存: " + key + " = " + value);
            cache.put(key, value);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void clear() {
        lock.writeLock().lock();
        try {
            System.out.println(Thread.currentThread().getName() + " 清空缓存");
            cache.clear();
        } finally {
            lock.writeLock().unlock();
        }
    }

    public static void main(String[] args) {
        CacheWithReadWriteLock<String, String> cache = new CacheWithReadWriteLock<>();

        // 初始化缓存
        cache.put("user:1", "Alice");
        cache.put("user:2", "Bob");

        ExecutorService pool = Executors.newFixedThreadPool(10);

        // 启动9个读线程
        for (int i = 0; i < 9; i++) {
            final int readerId = i;
            pool.submit(() -> {
                for (int j = 0; j < 5; j++) {
                    cache.get("user:" + (j % 2 + 1));
                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            });
        }

        // 启动1个写线程
        pool.submit(() -> {
            for (int i = 3; i <= 5; i++) {
                try {
                    Thread.sleep(50);
                    cache.put("user:" + i, "User" + i);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        pool.shutdown();
    }
}
```
---

## Atomic原子变量类

原子变量类提供了无锁的线程安全操作。与Lock相比，原子变量基于CAS（Compare-And-Swap）机制，避免了锁带来的上下文切换和线程阻塞，在并发竞争不剧烈的场景下性能更好。JUC提供了多个Atomic类族，可分为四大类：基本类型、数组类型、引用类型和字段更新器。

### 基本类型

最常用的包括AtomicInteger、AtomicLong和AtomicBoolean。

```java
public class AtomicBasicExample {
    // 原子整数
    private static AtomicInteger counter = new AtomicInteger(0);

    // 原子长整数 - 用于计数器或时间戳
    private static AtomicLong timestamp = new AtomicLong(System.currentTimeMillis());

    // 原子布尔值 - 用于标志位
    private static AtomicBoolean running = new AtomicBoolean(true);

    public static void main(String[] args) throws InterruptedException {
        // 1. AtomicInteger的常用操作
        System.out.println("=== AtomicInteger操作 ===");

        // 原子递增并返回新值
        System.out.println("递增后: " + counter.incrementAndGet());  // 输出: 1

        // 原子递减并返回旧值
        System.out.println("递减前的值: " + counter.getAndDecrement());  // 输出: 1

        // 原子地加上指定值
        System.out.println("加50后: " + counter.addAndGet(50));  // 输出: 50

        // 原子地执行CAS操作 - 如果当前值等于期望值，则更新为新值
        boolean success = counter.compareAndSet(50, 100);
        System.out.println("CAS操作成功: " + success + ", 当前值: " + counter.get());

        // 2. AtomicLong的应用 - 实现简单的计时
        System.out.println("\n=== AtomicLong应用 ===");
        long oldTime = timestamp.getAndSet(System.currentTimeMillis());
        System.out.println("旧时间戳: " + oldTime);
        System.out.println("新时间戳: " + timestamp.get());

        // 3. AtomicBoolean的应用 - 实现开关控制
        System.out.println("\n=== AtomicBoolean应用 ===");
        System.out.println("运行状态: " + running.get());
        running.compareAndSet(true, false);
        System.out.println("修改后状态: " + running.get());

        // 4. 并发场景下的性能对比
        System.out.println("\n=== 多线程竞争场景 ===");
        testAtomicPerformance();
    }

    private static void testAtomicPerformance() throws InterruptedException {
        AtomicInteger atomicCounter = new AtomicInteger(0);
        int threadCount = 10;
        int operationsPerThread = 10000;

        ExecutorService pool = Executors.newFixedThreadPool(threadCount);
        long startTime = System.currentTimeMillis();

        for (int i = 0; i < threadCount; i++) {
            pool.submit(() -> {
                for (int j = 0; j < operationsPerThread; j++) {
                    atomicCounter.incrementAndGet();
                }
            });
        }

        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);
        long duration = System.currentTimeMillis() - startTime;

        System.out.println("最终计数: " + atomicCounter.get() +
                         " (预期: " + (threadCount * operationsPerThread) + ")");
        System.out.println("耗时: " + duration + "ms");
    }
}
```

### 引用类型原子变量

AtomicReference用于原子地更新对象引用，支持复杂对象的线程安全操作。

```java
public class AtomicReferenceExample {
    // 表示用户对象
    static class User {
        private String name;
        private int age;

        public User(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public String toString() {
            return "User{" + "name='" + name + '\'' + ", age=" + age + '}';
        }
    }

    public static void main(String[] args) throws InterruptedException {
        // 创建原子引用，初始值为一个User对象
        AtomicReference<User> userRef = new AtomicReference<>(new User("Alice", 25));

        System.out.println("初始用户: " + userRef.get());

        // 原子地替换引用
        User oldUser = userRef.getAndSet(new User("Bob", 30));
        System.out.println("被替换的用户: " + oldUser);
        System.out.println("新用户: " + userRef.get());

        // CAS操作 - 原子地条件性更新
        User expectedUser = userRef.get();
        User newUser = new User("Charlie", 28);
        boolean success = userRef.compareAndSet(expectedUser, newUser);
        System.out.println("CAS更新成功: " + success);
        System.out.println("当前用户: " + userRef.get());

        // 模拟并发场景
        System.out.println("\n=== 并发场景 ===");
        testConcurrentUpdate(userRef);
    }

    private static void testConcurrentUpdate(AtomicReference<User> userRef)
            throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        // 线程1: 不断尝试更新用户信息
        pool.submit(() -> {
            for (int i = 0; i < 5; i++) {
                User current = userRef.get();
                User updated = new User(current.name + "_v" + (i + 1), current.age + i);

                // 尝试CAS更新，如果失败则重试
                while (!userRef.compareAndSet(current, updated)) {
                    current = userRef.get();
                    updated = new User(current.name + "_v" + (i + 1), current.age + i);
                }

                System.out.println("线程1更新成功: " + userRef.get());
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        // 线程2: 读取用户信息
        pool.submit(() -> {
            for (int i = 0; i < 10; i++) {
                System.out.println("线程2读取: " + userRef.get());
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
    }
}
```
### AtomicStampedReference

AtomicStampedReference是AtomicReference带时间戳版本, 解决了ABA问题：一个值从A变到B再变回A，普通的CAS无法检测到这种变化。

**基本使用**

```java
public class AtomicStampedReferenceExample {
    static class Account {
        private long balance;

        public Account(long balance) {
            this.balance = balance;
        }

        @Override
        public String toString() {
            return "Account{balance=" + balance + '}';
        }
    }

    public static void main(String[] args) throws InterruptedException {
        // 初始值为balance=100，版本号为0
        AtomicStampedReference<Account> accountRef =
            new AtomicStampedReference<>(new Account(100), 0);

        System.out.println("初始账户: " + accountRef.getReference());

        // 获取当前值和版本号
        Account[] acc = new Account[1];
        int[] stamp = new int[1];
        accountRef.get(acc, stamp);
        System.out.println("当前版本号: " + stamp[0]);

        // 原子地更新值和版本号
        Account newAccount = new Account(150);
        boolean success = accountRef.compareAndSet(
            accountRef.getReference(),
            newAccount,
            stamp[0],
            stamp[0] + 1
        );
        System.out.println("更新成功: " + success);
        accountRef.get(acc, stamp);
        System.out.println("更新后账户: " + acc[0] + ", 版本号: " + stamp[0]);

        // 演示ABA问题的检测
        System.out.println("\n=== ABA问题演示 ===");
        testABAProblem();
    }

    private static void testABAProblem() throws InterruptedException {
        AtomicStampedReference<Integer> valueRef =
            new AtomicStampedReference<>(100, 0);

        // 线程1: 尝试进行CAS更新
        Thread thread1 = new Thread(() -> {
            System.out.println("线程1: 开始获取值");
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

            // 虽然值又变回100了，但版本号不同，CAS会失败
            int stamp = valueRef.getStamp();
            boolean success = valueRef.compareAndSet(100, 200, stamp, stamp + 1);
            System.out.println("线程1: CAS更新结果 = " + success +
                             " (值已被修改过，即使最终还是原值)");
        });

        // 线程2: 进行ABA操作（100 -> 200 -> 100）
        Thread thread2 = new Thread(() -> {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

            int stamp = valueRef.getStamp();
            System.out.println("线程2: 修改值为200");
            valueRef.compareAndSet(100, 200, stamp, stamp + 1);

            stamp = valueRef.getStamp();
            System.out.println("线程2: 修改值回到100");
            valueRef.compareAndSet(200, 100, stamp, stamp + 1);
        });

        thread1.start();
        thread2.start();
        thread1.join();
        thread2.join();

        System.out.println("最终值: " + valueRef.getReference() +
                         ", 最终版本号: " + valueRef.getStamp());
    }
}
```

**使用AtomicReference实现服务配置热更新**

在生产环境中，需要支持不停机地更新服务配置。使用AtomicReference可以实现线程安全的原子切换。

```java
public class ServiceConfigWithHotUpdate {
    static class ServiceConfig {
        private final String serviceName;
        private final int timeout;
        private final int maxConnections;
        private final long lastUpdated;

        public ServiceConfig(String serviceName, int timeout, int maxConnections) {
            this.serviceName = serviceName;
            this.timeout = timeout;
            this.maxConnections = maxConnections;
            this.lastUpdated = System.currentTimeMillis();
        }

        @Override
        public String toString() {
            return "ServiceConfig{" +
                    "serviceName='" + serviceName + '\'' +
                    ", timeout=" + timeout +
                    ", maxConnections=" + maxConnections +
                    ", lastUpdated=" + lastUpdated +
                    '}';
        }
    }

    private final AtomicReference<ServiceConfig> configRef;

    public ServiceConfigWithHotUpdate(ServiceConfig initialConfig) {
        this.configRef = new AtomicReference<>(initialConfig);
    }

    // 获取当前配置 - 读操作，无锁
    public ServiceConfig getConfig() {
        return configRef.get();
    }

    // 更新配置 - 原子操作
    public void updateConfig(ServiceConfig newConfig) {
        ServiceConfig oldConfig = configRef.getAndSet(newConfig);
        System.out.println("配置已更新 - 旧配置: " + oldConfig);
        System.out.println("        新配置: " + newConfig);
    }

    // 条件更新 - 仅当配置未被修改时才更新（乐观锁）
    public boolean updateConfigIfUnchanged(ServiceConfig expected, ServiceConfig newConfig) {
        return configRef.compareAndSet(expected, newConfig);
    }

    public static void main(String[] args) throws InterruptedException {
        ServiceConfig initialConfig = new ServiceConfig("api-service", 5000, 100);
        ServiceConfigWithHotUpdate service = new ServiceConfigWithHotUpdate(initialConfig);

        System.out.println("初始配置: " + service.getConfig());

        ExecutorService pool = Executors.newFixedThreadPool(4);

        // 线程1: 不断使用当前配置
        pool.submit(() -> {
            for (int i = 0; i < 10; i++) {
                ServiceConfig config = service.getConfig();
                System.out.println("线程1使用配置: timeout=" + config.timeout);
                try {
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        // 线程2: 每隔一段时间更新配置
        pool.submit(() -> {
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            service.updateConfig(new ServiceConfig("api-service", 10000, 200));

            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            service.updateConfig(new ServiceConfig("api-service", 8000, 150));
        });

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
    }
}
```

---

## Concurrent并发集合

Concurrent包中提供的并发集合是线程安全的集合实现，相比在所有方法上加synchronized的Collections.synchronizedXxx()，这些集合采用更细粒度的锁策略或无锁算法，提供了更高的并发性能。主要包括ConcurrentHashMap、ConcurrentLinkedQueue、CopyOnWriteArrayList等。

### ConcurrentHashMap

ConcurrentHashMap使用分段锁（Segment）或桶级别的锁，允许多个线程同时访问不同的数据段，大大提高了并发性能。

```java
public class ConcurrentHashMapExample {
    public static void main(String[] args) throws InterruptedException {
        // 创建ConcurrentHashMap
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

        // 1. 基本的put和get操作 - 原子性
        map.put("count", 0);
        System.out.println("初始值: " + map.get("count"));

        // 2. 原子的putIfAbsent操作 - 只有当key不存在时才put
        Integer previousValue = map.putIfAbsent("count", 100);
        System.out.println("putIfAbsent返回值: " + previousValue + ", 当前值: " + map.get("count"));

        previousValue = map.putIfAbsent("newKey", 200);
        System.out.println("putIfAbsent返回值: " + previousValue + ", newKey: " + map.get("newKey"));

        // 3. 原子的replace操作 - 条件性替换
        boolean replaced = map.replace("count", 0, 50);  // 当值为0时替换为50
        System.out.println("replace成功: " + replaced + ", 当前值: " + map.get("count"));

        // 4. compute操作 - 原子地计算和更新值
        map.compute("count", (key, oldValue) -> {
            System.out.println("compute被调用，当前值: " + oldValue);
            return (oldValue == null) ? 1 : oldValue + 1;
        });

        // 5. computeIfAbsent - 如果key不存在则计算值
        Integer result = map.computeIfAbsent("newValue", key -> {
            System.out.println("计算newValue的值");
            return 999;
        });
        System.out.println("computeIfAbsent结果: " + result);

        // 6. 并发修改场景
        System.out.println("\n=== 并发修改场景 ===");
        testConcurrentModification();
    }

    private static void testConcurrentModification() throws InterruptedException {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

        // 初始化数据
        for (int i = 0; i < 10; i++) {
            map.put("key" + i, i);
        }

        ExecutorService pool = Executors.newFixedThreadPool(4);

        // 线程1: 不断增加value
        pool.submit(() -> {
            for (int i = 0; i < 20; i++) {
                map.compute("key0", (k, v) -> (v == null) ? 1 : v + 1);
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        // 线程2: 读取所有值并求和
        pool.submit(() -> {
            for (int i = 0; i < 5; i++) {
                int sum = map.values().stream().mapToInt(Integer::intValue).sum();
                System.out.println("当前总和: " + sum);
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        // 线程3: 添加新key
        pool.submit(() -> {
            for (int i = 10; i < 15; i++) {
                map.put("key" + i, i * 100);
                System.out.println("添加了 key" + i);
                try {
                    Thread.sleep(30);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("最终map大小: " + map.size());
    }
}
```

**使用ConcurrentHashMap缓存用户数据**

在高并发的Web应用中，需要缓存用户数据并频繁更新。ConcurrentHashMap相比synchronized Map性能更好。

```java
public class UserCacheWithConcurrentHashMap {
    static class User {
        private long id;
        private String name;
        private long lastAccessTime;

        public User(long id, String name) {
            this.id = id;
            this.name = name;
            this.lastAccessTime = System.currentTimeMillis();
        }

        @Override
        public String toString() {
            return "User{id=" + id + ", name='" + name + ", lastAccessTime=" + lastAccessTime + '}';
        }
    }

    private final ConcurrentHashMap<Long, User> userCache = new ConcurrentHashMap<>();

    public User getUser(long userId) {
        // 获取用户，如果不存在则返回null
        return userCache.get(userId);
    }

    public User getOrLoadUser(long userId) {
        // 使用computeIfAbsent原子地实现"读取或加载"
        return userCache.computeIfAbsent(userId, id -> {
            System.out.println("从数据库加载用户: " + id);
            return new User(id, "User_" + id);
        });
    }

    public void updateUserAccessTime(long userId) {
        // 原子地更新访问时间
        userCache.compute(userId, (id, user) -> {
            if (user != null) {
                user.lastAccessTime = System.currentTimeMillis();
            }
            return user;
        });
    }

    public int getCacheSize() {
        return userCache.size();
    }

    public static void main(String[] args) throws InterruptedException {
        UserCacheWithConcurrentHashMap cache = new UserCacheWithConcurrentHashMap();

        ExecutorService pool = Executors.newFixedThreadPool(8);

        // 模拟多个用户并发访问
        for (int i = 0; i < 8; i++) {
            final int threadId = i;
            pool.submit(() -> {
                for (int j = 0; j < 10; j++) {
                    long userId = (j % 5) + 1;  // 5个用户在轮流访问
                    User user = cache.getOrLoadUser(userId);
                    System.out.println("线程" + threadId + "访问用户: " + user.name);
                    cache.updateUserAccessTime(userId);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            });
        }

        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);
        System.out.println("缓存最终大小: " + cache.getCacheSize());
    }
}
```

### CopyOnWriteArrayList

CopyOnWriteArrayList采用写时复制策略：写操作会创建底层数组的副本并在副本上修改，读操作直接在原数组上进行，因此特别适合读多写少的场景。

```java
public class CopyOnWriteArrayListExample {
    public static void main(String[] args) throws InterruptedException {
        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();

        // 初始化
        list.add("item1");
        list.add("item2");
        list.add("item3");

        System.out.println("初始列表: " + list);

        // 修改操作会创建新数组
        list.add("item4");
        System.out.println("添加后: " + list);

        // 移除操作
        list.remove(0);
        System.out.println("移除后: " + list);

        // 迭代时安全地添加/删除（避免ConcurrentModificationException）
        System.out.println("\n=== 迭代安全性 ===");
        testIterationSafety();
    }

    private static void testIterationSafety() throws InterruptedException {
        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();

        for (int i = 0; i < 10; i++) {
            list.add("item" + i);
        }

        ExecutorService pool = Executors.newFixedThreadPool(3);

        // 线程1: 不断迭代（读）
        pool.submit(() -> {
            for (int i = 0; i < 5; i++) {
                StringBuilder sb = new StringBuilder();
                for (String item : list) {
                    sb.append(item).append(" ");
                }
                System.out.println("线程1遍历: " + sb);
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        // 线程2: 添加元素（写）
        pool.submit(() -> {
            for (int i = 10; i < 15; i++) {
                list.add("item" + i);
                System.out.println("线程2添加: item" + i);
                try {
                    Thread.sleep(80);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        // 线程3: 移除元素（写）
        pool.submit(() -> {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            for (int i = 0; i < 3; i++) {
                if (!list.isEmpty()) {
                    String removed = list.remove(0);
                    System.out.println("线程3移除: " + removed);
                }
                try {
                    Thread.sleep(80);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("最终列表: " + list);
    }
}
```

**使用CopyOnWriteArrayList存储事件监听器**

在事件驱动的应用中，需要维护监听器列表。读操作（触发事件）远多于写操作（添加/移除监听器），CopyOnWriteArrayList非常适合。

```java
public class EventDispatcher {
    interface EventListener {
        void onEvent(String event);
    }

    private final CopyOnWriteArrayList<EventListener> listeners = new CopyOnWriteArrayList<>();

    public void addListener(EventListener listener) {
        listeners.add(listener);
        System.out.println("监听器已添加，当前总数: " + listeners.size());
    }

    public void removeListener(EventListener listener) {
        listeners.remove(listener);
        System.out.println("监听器已移除，当前总数: " + listeners.size());
    }

    public void fireEvent(String event) {
        // 触发事件，遍历所有监听器 - 无需同步
        System.out.println("触发事件: " + event);
        for (EventListener listener : listeners) {
            try {
                listener.onEvent(event);
            } catch (Exception e) {
                System.err.println("监听器执行异常: " + e);
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        EventDispatcher dispatcher = new EventDispatcher();

        // 添加若干监听器
        EventListener listener1 = e -> System.out.println("  监听器1收到: " + e);
        EventListener listener2 = e -> System.out.println("  监听器2收到: " + e);
        EventListener listener3 = e -> System.out.println("  监听器3收到: " + e);

        dispatcher.addListener(listener1);
        dispatcher.addListener(listener2);
        dispatcher.addListener(listener3);

        ExecutorService pool = Executors.newFixedThreadPool(4);

        // 一个线程不断触发事件（读多）
        pool.submit(() -> {
            for (int i = 0; i < 10; i++) {
                dispatcher.fireEvent("Event_" + i);
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        // 另一个线程偶尔添加监听器
        pool.submit(() -> {
            try {
                Thread.sleep(150);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            dispatcher.addListener(e -> System.out.println("  新监听器收到: " + e));
        });

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
    }
}
```

### ConcurrentLinkedQueue

ConcurrentLinkedQueue使用CAS操作实现无锁队列，适合高并发的生产者-消费者场景。

```java
public class ConcurrentLinkedQueueExample {
    static class Task {
        private int id;
        private String name;

        public Task(int id, String name) {
            this.id = id;
            this.name = name;
        }

        @Override
        public String toString() {
            return "Task{" + "id=" + id + ", name='" + name + '\'' + '}';
        }
    }

    public static void main(String[] args) throws InterruptedException {
        ConcurrentLinkedQueue<Task> queue = new ConcurrentLinkedQueue<>();

        // 1. 基本操作
        queue.offer(new Task(1, "Task1"));
        queue.offer(new Task(2, "Task2"));
        System.out.println("队列大小: " + queue.size());
        System.out.println("队首元素: " + queue.peek());

        // 2. 出队
        Task task = queue.poll();
        System.out.println("出队: " + task);

        // 3. 并发生产者-消费者
        System.out.println("\n=== 并发生产者-消费者 ===");
        testConcurrentProducerConsumer();
    }

    private static void testConcurrentProducerConsumer() throws InterruptedException {
        ConcurrentLinkedQueue<Task> queue = new ConcurrentLinkedQueue<>();
        AtomicInteger consumerCount = new AtomicInteger(0);

        ExecutorService pool = Executors.newFixedThreadPool(5);

        // 2个生产者线程
        for (int i = 0; i < 2; i++) {
            final int producerId = i;
            pool.submit(() -> {
                for (int j = 0; j < 10; j++) {
                    Task task = new Task(producerId * 100 + j, "Producer" + producerId + "-Task" + j);
                    queue.offer(task);
                    System.out.println("生产者" + producerId + "生产: " + task);
                    try {
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            });
        }

        // 3个消费者线程
        for (int i = 0; i < 3; i++) {
            final int consumerId = i;
            pool.submit(() -> {
                while (consumerCount.get() < 20 || !queue.isEmpty()) {
                    Task task = queue.poll();
                    if (task != null) {
                        System.out.println("消费者" + consumerId + "消费: " + task);
                        consumerCount.incrementAndGet();
                        try {
                            Thread.sleep(30);
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                        }
                    } else {
                        try {
                            Thread.sleep(10);
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                        }
                    }
                }
            });
        }

        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);
        System.out.println("队列处理完成，消费总数: " + consumerCount.get());
    }
}
```

---

## 同步器

JUC提供的同步器是用于线程间协调的工具类，包括CountDownLatch、CyclicBarrier、Semaphore、Phaser等。这些工具使用内部的计数器或状态来协调多个线程的执行。

### CountDownLatch

CountDownLatch允许一个或多个线程等待，直到其他线程完成一组操作。常用于主线程等待工作线程完成。

**基本使用**

```java
public class CountDownLatchExample {
    public static void main(String[] args) throws InterruptedException {
        // 创建一个初始计数为3的CountDownLatch
        CountDownLatch latch = new CountDownLatch(3);

        System.out.println("主线程开始等待其他线程完成...");

        // 启动3个工作线程
        for (int i = 1; i <= 3; i++) {
            final int threadId = i;
            new Thread(() -> {
                try {
                    System.out.println("线程" + threadId + "开始执行");
                    Thread.sleep(1000 * threadId);  // 模拟不同的耗时
                    System.out.println("线程" + threadId + "执行完毕");
                    latch.countDown();  // 计数器减1
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }).start();
        }

        // 主线程阻塞，等待计数器变为0
        latch.await();
        System.out.println("所有线程执行完毕，主线程继续");
    }
}
```

**使用CountDownLatch等待多个初始化步骤完成**

在应用启动时，需要完成多个初始化操作（如加载配置、连接数据库、预加载缓存等），主线程需要等待所有初始化完成后才启动服务。

```java
public class ApplicationStartup {
    static class InitializationTask implements Runnable {
        private String taskName;
        private CountDownLatch latch;

        public InitializationTask(String taskName, CountDownLatch latch) {
            this.taskName = taskName;
            this.latch = latch;
        }

        @Override
        public void run() {
            try {
                System.out.println(taskName + " 开始初始化");
                Thread.sleep(1000 + (long)(Math.random() * 2000));  // 模拟初始化耗时
                System.out.println(taskName + " 初始化完成");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                latch.countDown();  // 通知已完成
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("应用启动中...");

        // 5个初始化任务
        CountDownLatch startupLatch = new CountDownLatch(5);
        ExecutorService pool = Executors.newFixedThreadPool(5);

        pool.submit(new InitializationTask("配置加载", startupLatch));
        pool.submit(new InitializationTask("数据库连接", startupLatch));
        pool.submit(new InitializationTask("缓存预热", startupLatch));
        pool.submit(new InitializationTask("线程池初始化", startupLatch));
        pool.submit(new InitializationTask("监听器注册", startupLatch));

        // 等待所有初始化完成
        startupLatch.await();
        System.out.println("所有初始化完成，应用启动成功");
        System.out.println("服务开始处理请求...");

        pool.shutdown();
    }
}
```

### CyclicBarrier

CyclicBarrier让多个线程在某个点相互等待，直到所有线程都到达该点后才继续执行。与CountDownLatch不同，CyclicBarrier可以重复使用。

```java
public class CyclicBarrierExample {
    public static void main(String[] args) throws InterruptedException {
        // 创建一个CyclicBarrier，等待5个线程到达
        CyclicBarrier barrier = new CyclicBarrier(5, () -> {
            // 所有线程到达时执行的操作
            System.out.println(">>> 第" + barrier.getNumberWaiting() + "批线程全部到达，开始新阶段");
        });

        ExecutorService pool = Executors.newFixedThreadPool(5);

        // 第一轮：5个线程执行阶段1，然后同步等待
        System.out.println("=== 第一轮 ===");
        for (int i = 1; i <= 5; i++) {
            final int threadId = i;
            pool.submit(() -> {
                try {
                    System.out.println("线程" + threadId + "正在阶段1工作");
                    Thread.sleep((long) (Math.random() * 1000));
                    System.out.println("线程" + threadId + "完成阶段1，等待其他线程");

                    barrier.await();  // 等待所有线程到达此点

                    System.out.println("线程" + threadId + "进入阶段2");
                    Thread.sleep((long) (Math.random() * 1000));
                    System.out.println("线程" + threadId + "完成阶段2");
                } catch (InterruptedException | BrokenBarrierException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);
    }
}
```

### Semaphore

Semaphore用于限制同时访问某个资源的线程数量，类似于操作系统的信号量机制。常用于连接池、线程池等资源管理。

**基本使用**

```java
public class SemaphoreExample {
    static class Resource {
        private int id;

        public Resource(int id) {
            this.id = id;
        }

        @Override
        public String toString() {
            return "Resource{" + id + '}';
        }
    }

    public static void main(String[] args) throws InterruptedException {
        // 创建一个只允许2个线程同时访问的信号量
        Semaphore semaphore = new Semaphore(2);

        ExecutorService pool = Executors.newFixedThreadPool(5);

        // 模拟有限的资源
        List<Resource> resources = new CopyOnWriteArrayList<>();
        for (int i = 0; i < 2; i++) {
            resources.add(new Resource(i + 1));
        }

        // 5个线程竞争2个资源
        for (int i = 1; i <= 5; i++) {
            final int threadId = i;
            pool.submit(() -> {
                try {
                    System.out.println("线程" + threadId + "尝试获取资源");
                    semaphore.acquire();  // 获取许可证，如果没有可用许可证则阻塞
                    System.out.println("线程" + threadId + "获取了资源，当前活跃线程数: " +
                                     (semaphore.availablePermits() == 0 ? 2 : 1));

                    // 使用资源
                    Thread.sleep(2000);
                    System.out.println("线程" + threadId + "使用资源完毕");
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    semaphore.release();  // 释放许可证
                    System.out.println("线程" + threadId + "释放了资源");
                }
            });
        }

        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);
    }
}
```

**使用Semaphore限制数据库连接池**

数据库连接是有限的资源，使用Semaphore可以限制同时活跃的连接数。

```java
public class DatabaseConnectionPool {
    static class Connection implements AutoCloseable {
        private int id;
        private long createdTime;

        public Connection(int id) {
            this.id = id;
            this.createdTime = System.currentTimeMillis();
        }

        public void executeQuery(String sql) {
            System.out.println("执行查询: " + sql);
        }

        @Override
        public void close() throws Exception {
            System.out.println("连接" + id + "已释放");
        }
    }

    private final Semaphore semaphore;
    private final int poolSize;
    private final ConcurrentLinkedQueue<Connection> availableConnections;

    public DatabaseConnectionPool(int poolSize) {
        this.poolSize = poolSize;
        this.semaphore = new Semaphore(poolSize);
        this.availableConnections = new ConcurrentLinkedQueue<>();

        // 初始化连接池
        for (int i = 0; i < poolSize; i++) {
            availableConnections.offer(new Connection(i + 1));
        }
    }

    public Connection getConnection() throws InterruptedException {
        semaphore.acquire();  // 获取许可证
        Connection connection = availableConnections.poll();
        if (connection == null) {
            // 如果没有可用连接，创建新的（这里简化处理）
            connection = new Connection(-1);
        }
        System.out.println(Thread.currentThread().getName() + " 获取了连接");
        return connection;
    }

    public void releaseConnection(Connection connection) {
        availableConnections.offer(connection);
        semaphore.release();  // 释放许可证
        System.out.println(Thread.currentThread().getName() + " 释放了连接");
    }

    public static void main(String[] args) throws InterruptedException {
        DatabaseConnectionPool pool = new DatabaseConnectionPool(3);  // 最多3个并发连接
        ExecutorService executor = Executors.newFixedThreadPool(8);

        // 8个线程竞争3个连接
        for (int i = 0; i < 8; i++) {
            final int threadId = i;
            executor.submit(() -> {
                try {
                    Connection conn = pool.getConnection();
                    System.out.println("线程" + threadId + "获取连接成功");

                    // 使用连接
                    conn.executeQuery("SELECT * FROM users");
                    Thread.sleep(1000);

                    pool.releaseConnection(conn);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        executor.shutdown();
        executor.awaitTermination(10, TimeUnit.SECONDS);
    }
}
```

### Phaser

Phaser是CyclicBarrier和CountDownLatch的更强大的组合，支持多个阶段，每个阶段可以有不同数量的线程。

```java
public class PhaserExample {
    public static void main(String[] args) throws InterruptedException {
        // 创建一个Phaser，初始注册3个参与者
        Phaser phaser = new Phaser(3);

        System.out.println("=== Phaser多阶段同步 ===");

        ExecutorService pool = Executors.newFixedThreadPool(3);

        for (int i = 1; i <= 3; i++) {
            final int threadId = i;
            pool.submit(() -> {
                try {
                    System.out.println("线程" + threadId + "开始，当前阶段: " + phaser.getPhase());

                    // 阶段1
                    System.out.println("线程" + threadId + "执行阶段1");
                    Thread.sleep(1000 + threadId * 500);
                    System.out.println("线程" + threadId + "完成阶段1，等待其他线程");
                    phaser.arriveAndAwaitAdvance();  // 到达并等待进入下一阶段

                    // 阶段2
                    System.out.println("线程" + threadId + "执行阶段2");
                    Thread.sleep(1000);
                    System.out.println("线程" + threadId + "完成阶段2，等待其他线程");
                    phaser.arriveAndAwaitAdvance();

                    // 阶段3
                    System.out.println("线程" + threadId + "执行阶段3");
                    Thread.sleep(500);
                    System.out.println("线程" + threadId + "完成阶段3");
                    phaser.arriveAndDeregister();  // 到达并注销此线程
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);
        System.out.println("所有线程完成");
    }
}
```

---

## Future和Callable异步任务

Callable接口代表一个可以返回结果或抛出异常的任务，类似于Runnable但支持返回值。Future接口代表一个异步计算的结果，可以用来查询计算是否完成、获取结果或取消任务。这两个接口使异步编程变得更加方便。

**Future的工作流程：**

1. 提交Callable任务到ExecutorService，返回Future对象
2. Future在后台异步执行任务
3. 调用get()方法会阻塞当前线程，直到任务完成或超时
4. 可以通过isDone()非阻塞地查询任务状态

**Callable与Future的基本使用**

```java
public class CallableAndFutureExample {
    // 定义一个有返回值的任务
    static class CalculationTask implements Callable<Integer> {
        private int a;
        private int b;

        public CalculationTask(int a, int b) {
            this.a = a;
            this.b = b;
        }

        @Override
        public Integer call() throws Exception {
            System.out.println(Thread.currentThread().getName() +
                             " 计算 " + a + " + " + b);
            Thread.sleep(2000);  // 模拟耗时计算
            int result = a + b;
            System.out.println("计算完成，结果: " + result);
            return result;
        }
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        // 提交Callable任务，得到Future对象
        Future<Integer> future1 = executor.submit(new CalculationTask(10, 20));
        Future<Integer> future2 = executor.submit(new CalculationTask(30, 40));

        System.out.println("任务已提交，主线程继续执行其他操作");

        // 查询任务是否完成
        System.out.println("任务1是否完成: " + future1.isDone());

        // 获取任务结果（会阻塞直到任务完成）
        Integer result1 = future1.get();
        System.out.println("任务1结果: " + result1);

        // 带超时的获取结果
        try {
            Integer result2 = future2.get(5, TimeUnit.SECONDS);
            System.out.println("任务2结果: " + result2);
        } catch (TimeoutException e) {
            System.out.println("任务2超时！");
        }

        // 取消任务（如果还未开始执行）
        Future<Integer> future3 = executor.submit(new CalculationTask(100, 200));
        boolean cancelled = future3.cancel(false);  // false表示不中断正在执行的任务
        System.out.println("任务3是否被取消: " + cancelled);

        executor.shutdown();
    }
}
```

**使用Future实现异步任务批处理**

在处理大量数据时，使用Future可以并行执行多个任务并收集结果。

```java
public class BatchProcessingWithFuture {
    static class DataProcessor {
        public int processData(String data) throws InterruptedException {
            System.out.println("处理数据: " + data);
            Thread.sleep((long)(Math.random() * 1000));
            return data.length();
        }
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        DataProcessor processor = new DataProcessor();
        ExecutorService executor = Executors.newFixedThreadPool(4);

        List<String> dataList = Arrays.asList(
            "data1", "data2", "data3", "data4", "data5",
            "data6", "data7", "data8"
        );

        // 提交所有任务
        List<Future<Integer>> futures = new ArrayList<>();
        for (String data : dataList) {
            Future<Integer> future = executor.submit(() -> processor.processData(data));
            futures.add(future);
        }

        System.out.println("所有任务已提交");

        // 收集结果
        int totalLength = 0;
        for (int i = 0; i < futures.size(); i++) {
            try {
                Integer length = futures.get(i).get(5, TimeUnit.SECONDS);
                totalLength += length;
                System.out.println("任务" + (i + 1) + "完成，结果: " + length);
            } catch (TimeoutException e) {
                System.err.println("任务" + (i + 1) + "超时");
                futures.get(i).cancel(true);  // 取消超时任务
            }
        }

        System.out.println("所有任务完成，总长度: " + totalLength);
        executor.shutdown();
    }
}
```

#### CompletableFuture

CompletableFuture(JDK8+提供)提供了链式调用、组合等高级功能，使异步编程更加灵活。

```java
public class CompletableFutureExample {
    static class UserService {
        public String getUserName(long userId) throws InterruptedException {
            System.out.println("获取用户名: " + userId);
            Thread.sleep(1000);
            return "User_" + userId;
        }

        public String getUserEmail(long userId) throws InterruptedException {
            System.out.println("获取用户邮箱: " + userId);
            Thread.sleep(1000);
            return "user" + userId + "@example.com";
        }

        public String getUserPhone(long userId) throws InterruptedException {
            System.out.println("获取用户电话: " + userId);
            Thread.sleep(800);
            return "1380000" + userId;
        }
    }

    static class UserInfo {
        public String name;
        public String email;
        public String phone;

        @Override
        public String toString() {
            return "UserInfo{" + "name='" + name + '\'' + ", email='" + email +
                   '\'' + ", phone='" + phone + '\'' + '}';
        }
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        UserService service = new UserService();
        ExecutorService executor = Executors.newFixedThreadPool(3);

        long userId = 123;

        // 1. 基本的异步执行
        System.out.println("=== 基本异步执行 ===");
        CompletableFuture<String> nameFuture = CompletableFuture.supplyAsync(
            () -> {
                try {
                    return service.getUserName(userId);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return null;
                }
            },
            executor
        );

        System.out.println("异步任务已提交");
        String name = nameFuture.get();
        System.out.println("获取结果: " + name);

        // 2. 链式调用 - thenApply
        System.out.println("\n=== 链式调用 ===");
        CompletableFuture<String> chainResult = CompletableFuture.supplyAsync(
            () -> {
                try {
                    return service.getUserName(userId);
                } catch (InterruptedException e) {
                    return "Unknown";
                }
            },
            executor
        ).thenApply(name1 -> name1.toUpperCase())  // 将结果转为大写
         .thenApply(name1 -> "欢迎, " + name1);

        System.out.println("链式调用结果: " + chainResult.get());

        // 3. 组合多个异步任务
        System.out.println("\n=== 组合多个异步任务 ===");
        CompletableFuture<UserInfo> userInfoFuture = CompletableFuture.supplyAsync(
            () -> {
                try {
                    UserInfo info = new UserInfo();
                    info.name = service.getUserName(userId);
                    return info;
                } catch (InterruptedException e) {
                    return null;
                }
            },
            executor
        ).thenCombine(
            // 并行执行获取邮箱
            CompletableFuture.supplyAsync(() -> {
                try {
                    return service.getUserEmail(userId);
                } catch (InterruptedException e) {
                    return null;
                }
            }, executor),
            (info, email) -> {
                info.email = email;
                return info;
            }
        ).thenCombine(
            // 并行执行获取电话
            CompletableFuture.supplyAsync(() -> {
                try {
                    return service.getUserPhone(userId);
                } catch (InterruptedException e) {
                    return null;
                }
            }, executor),
            (info, phone) -> {
                info.phone = phone;
                return info;
            }
        );

        System.out.println("用户信息: " + userInfoFuture.get());

        // 4. 异常处理
        System.out.println("\n=== 异常处理 ===");
        CompletableFuture<String> exceptionFuture = CompletableFuture.supplyAsync(
            () -> {
                throw new RuntimeException("模拟异常");
            }
        ).exceptionally(ex -> {
            System.out.println("捕获到异常: " + ex.getMessage());
            return "默认值";
        });

        System.out.println("异常处理结果: " + exceptionFuture.get());

        executor.shutdown();
    }
}
```

**使用CompletableFuture实现微服务聚合**

在微服务架构中，往往需要调用多个服务获取数据并聚合。CompletableFuture可以优雅地处理这种场景。

```java
public class MicroserviceAggregation {
    static class UserService {
        public CompletableFuture<String> getUserNameAsync(long userId) {
            return CompletableFuture.supplyAsync(() -> {
                System.out.println("调用用户服务获取用户名");
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                return "User_" + userId;
            });
        }
    }

    static class OrderService {
        public CompletableFuture<String> getUserOrdersAsync(long userId) {
            return CompletableFuture.supplyAsync(() -> {
                System.out.println("调用订单服务获取订单");
                try {
                    Thread.sleep(800);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                return "Order_" + userId;
            });
        }
    }

    static class RecommendService {
        public CompletableFuture<String> getRecommendationsAsync(long userId) {
            return CompletableFuture.supplyAsync(() -> {
                System.out.println("调用推荐服务");
                try {
                    Thread.sleep(600);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                return "Recommendations_" + userId;
            });
        }
    }

    static class UserProfile {
        public String name;
        public String orders;
        public String recommendations;

        @Override
        public String toString() {
            return "UserProfile{" + "name='" + name + '\'' + ", orders='" + orders +
                   '\'' + ", recommendations='" + recommendations + '\'' + '}';
        }
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        UserService userService = new UserService();
        OrderService orderService = new OrderService();
        RecommendService recommendService = new RecommendService();

        long userId = 1001;
        long startTime = System.currentTimeMillis();

        // 并行调用所有服务
        CompletableFuture<UserProfile> profileFuture = userService.getUserNameAsync(userId)
            .thenCombine(
                orderService.getUserOrdersAsync(userId),
                (name, orders) -> {
                    UserProfile profile = new UserProfile();
                    profile.name = name;
                    profile.orders = orders;
                    return profile;
                }
            )
            .thenCombine(
                recommendService.getRecommendationsAsync(userId),
                (profile, recommendations) -> {
                    profile.recommendations = recommendations;
                    return profile;
                }
            );

        UserProfile profile = profileFuture.get();
        long duration = System.currentTimeMillis() - startTime;

        System.out.println("用户信息: " + profile);
        System.out.println("耗时: " + duration + "ms (三个服务的最长耗时约800ms，而非2.5s)");
    }
}
```

**CompletableFuture与Future的区别：**

- Future只能被动地等待结果，CompletableFuture可以主动完成（complete()方法）
- CompletableFuture支持链式调用和组合，Future无法直接组合
- CompletableFuture提供了更丰富的异步编程能力

---

## 其他工具

除了上述主要工具外，JUC还提供了其他有用的工具类。ThreadLocal用于存储线程本地变量，Condition提供了更灵活的线程等待/通知机制，Exchange用于线程间交换数据等。

### ThreadLocal

ThreadLocal为每个线程维护一份独立的变量副本，各个线程之间的值互不干扰。常用于存储与线程相关的上下文信息。

**基本使用**

```java
public class ThreadLocalExample {
    // 创建ThreadLocal
    private static final ThreadLocal<String> threadLocalUserId = ThreadLocal.withInitial(() -> "unknown");
    private static final ThreadLocal<SimpleDateFormat> dateFormatTL =
        ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== ThreadLocal基本用法 ===");

        // 主线程设置值
        threadLocalUserId.set("user_main");
        System.out.println("主线程设置userId: " + threadLocalUserId.get());

        ExecutorService pool = Executors.newFixedThreadPool(3);

        // 子线程有独立的副本
        for (int i = 1; i <= 3; i++) {
            final int threadId = i;
            pool.submit(() -> {
                threadLocalUserId.set("user_" + threadId);
                System.out.println("线程" + threadId + "设置userId: " + threadLocalUserId.get());

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }

                // 各线程的值互不影响
                System.out.println("线程" + threadId + "读取userId: " + threadLocalUserId.get());
            });
        }

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);

        // 主线程的值也不受影响
        System.out.println("主线程最终userId: " + threadLocalUserId.get());

        // ThreadLocal用于存储非线程安全的对象（如SimpleDateFormat）
        System.out.println("\n=== ThreadLocal用于日期格式化 ===");
        testDateFormatWithThreadLocal();
    }

    private static void testDateFormatWithThreadLocal() throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(5);

        for (int i = 0; i < 5; i++) {
            pool.submit(() -> {
                // 每个线程有自己的SimpleDateFormat实例，避免线程安全问题
                SimpleDateFormat sdf = dateFormatTL.get();
                String formatted = sdf.format(new Date());
                System.out.println(Thread.currentThread().getName() + ": " + formatted);
            });
        }

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
    }
}
```

**使用ThreadLocal存储用户会话信息**

在Web应用中，需要在请求处理过程中传递用户会话信息。使用ThreadLocal可以避免作为参数层层传递。

```java
public class UserSessionContext {
    static class UserSession {
        private long userId;
        private String username;
        private long loginTime;

        public UserSession(long userId, String username) {
            this.userId = userId;
            this.username = username;
            this.loginTime = System.currentTimeMillis();
        }

        @Override
        public String toString() {
            return "UserSession{" + "userId=" + userId + ", username='" +
                   username + '\'' + ", loginTime=" + loginTime + '}';
        }
    }

    private static final ThreadLocal<UserSession> sessionTL = ThreadLocal.withInitial(() -> null);

    // 设置当前线程的会话信息
    public static void setSession(UserSession session) {
        sessionTL.set(session);
    }

    // 获取当前线程的会话信息
    public static UserSession getSession() {
        return sessionTL.get();
    }

    // 清除会话信息（防止内存泄漏）
    public static void clearSession() {
        sessionTL.remove();
    }

    // 模拟请求处理过程
    static class RequestHandler {
        public void handleRequest(long userId, String username) {
            // 请求开始时设置会话
            UserSession session = new UserSession(userId, username);
            UserSessionContext.setSession(session);

            try {
                System.out.println(Thread.currentThread().getName() +
                                 " 处理请求，会话: " + getSession());

                // 在业务逻辑各处都可以直接获取会话，无需传参
                processBusinessLogic();

            } finally {
                // 请求结束时清除会话，防止线程复用时的信息泄漏
                UserSessionContext.clearSession();
            }
        }

        private void processBusinessLogic() {
            UserSession session = UserSessionContext.getSession();
            System.out.println("  业务逻辑执行中，当前用户: " + session.username);

            callServiceMethod();
        }

        private void callServiceMethod() {
            UserSession session = UserSessionContext.getSession();
            System.out.println("  服务方法执行中，当前用户ID: " + session.userId);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        RequestHandler handler = new RequestHandler();
        ExecutorService pool = Executors.newFixedThreadPool(3);

        // 模拟3个并发请求
        pool.submit(() -> handler.handleRequest(101, "Alice"));
        pool.submit(() -> handler.handleRequest(102, "Bob"));
        pool.submit(() -> handler.handleRequest(103, "Charlie"));

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
    }
}
```

### Condition

Condition与Lock配合使用，提供了比Object.wait()/notify()更灵活的线程等待/通知机制。一个Lock可以关联多个Condition。

```java
public class ConditionExample {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notEmpty = lock.newCondition();   // 缓冲区非空条件
    private final Condition notFull = lock.newCondition();    // 缓冲区非满条件

    private final Queue<Integer> buffer = new LinkedList<>();
    private final int capacity = 5;

    // 往缓冲区添加元素
    public void put(Integer value) throws InterruptedException {
        lock.lock();
        try {
            // 等待直到缓冲区未满
            while (buffer.size() >= capacity) {
                System.out.println(Thread.currentThread().getName() +
                                 " 缓冲区满，等待...");
                notFull.await();  // 释放锁并等待
            }

            buffer.offer(value);
            System.out.println(Thread.currentThread().getName() +
                             " 添加: " + value + ", 缓冲区大小: " + buffer.size());

            // 唤醒等待非空条件的线程
            notEmpty.signalAll();
        } finally {
            lock.unlock();
        }
    }

    // 从缓冲区取元素
    public Integer take() throws InterruptedException {
        lock.lock();
        try {
            // 等待直到缓冲区非空
            while (buffer.isEmpty()) {
                System.out.println(Thread.currentThread().getName() +
                                 " 缓冲区空，等待...");
                notEmpty.await();
            }

            Integer value = buffer.poll();
            System.out.println(Thread.currentThread().getName() +
                             " 取出: " + value + ", 缓冲区大小: " + buffer.size());

            // 唤醒等待非满条件的线程
            notFull.signalAll();
            return value;
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        ConditionExample buffer = new ConditionExample();
        ExecutorService pool = Executors.newFixedThreadPool(5);

        // 2个生产者
        for (int i = 0; i < 2; i++) {
            final int producerId = i;
            pool.submit(() -> {
                try {
                    for (int j = 0; j < 5; j++) {
                        buffer.put(producerId * 10 + j);
                        Thread.sleep(200);
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        // 3个消费者
        for (int i = 0; i < 3; i++) {
            pool.submit(() -> {
                try {
                    for (int j = 0; j < 4; j++) {
                        buffer.take();
                        Thread.sleep(500);
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);
    }
}
```

**使用Condition实现信号量功能**

实现一个简单的信号系统，允许多个消费者等待生产者的信号。

```java
public class SignalSystem {
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition signalCondition = lock.newCondition();
    private volatile boolean signaled = false;

    // 生产者发送信号
    public void signal() {
        lock.lock();
        try {
            signaled = true;
            System.out.println("信号已发送");
            signalCondition.signalAll();  // 唤醒所有等待线程
        } finally {
            lock.unlock();
        }
    }

    // 消费者等待信号
    public void waitForSignal(String consumerName) throws InterruptedException {
        lock.lock();
        try {
            while (!signaled) {
                System.out.println(consumerName + " 等待信号...");
                signalCondition.await();
            }
            System.out.println(consumerName + " 收到信号");
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        SignalSystem system = new SignalSystem();
        ExecutorService pool = Executors.newFixedThreadPool(4);

        // 启动3个消费者
        for (int i = 1; i <= 3; i++) {
            final int consumerId = i;
            pool.submit(() -> {
                try {
                    system.waitForSignal("消费者" + consumerId);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        // 等待1秒后发送信号
        Thread.sleep(1000);
        system.signal();

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);
    }
}
```

### Exchanger

Exchanger用于两个线程交换数据。一个线程调用exchange()会等待另一个线程也调用exchange()，然后两者交换数据。

```java
public class ExchangerExample {
    public static void main(String[] args) throws InterruptedException {
        Exchanger<String> exchanger = new Exchanger<>();

        // 线程1：生产数据并交换
        Thread thread1 = new Thread(() -> {
            try {
                for (int i = 1; i <= 3; i++) {
                    String data = "Data_from_Thread1_" + i;
                    System.out.println("线程1准备发送: " + data);

                    String received = exchanger.exchange(data);

                    System.out.println("线程1接收到: " + received);
                    Thread.sleep(500);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // 线程2：生产数据并交换
        Thread thread2 = new Thread(() -> {
            try {
                for (int i = 1; i <= 3; i++) {
                    Thread.sleep(300);  // 确保线程1先调用exchange

                    String data = "Data_from_Thread2_" + i;
                    System.out.println("线程2准备发送: " + data);

                    String received = exchanger.exchange(data);

                    System.out.println("线程2接收到: " + received);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        thread1.start();
        thread2.start();
        thread1.join();
        thread2.join();

        System.out.println("数据交换完成");
    }
}
```
