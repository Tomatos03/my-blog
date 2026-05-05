# Python 并发编程

Python 提供多线程、多进程和异步编程三种并发模型，适用于不同场景。

## 多线程（threading）

受 GIL 限制，适合 I/O 密集型任务：

```python
import threading

def worker(n):
    print(f"Worker {n} running")

threads = [threading.Thread(target=worker, args=(i,)) for i in range(3)]
for t in threads:
    t.start()
for t in threads:
    t.join()
```

### 线程池

```python
from concurrent.futures import ThreadPoolExecutor

def download(url):
    return f"Downloaded {url}"

with ThreadPoolExecutor(max_workers=4) as pool:
    futures = [pool.submit(download, url) for url in urls]
    results = [f.result() for f in futures]
```

### 线程同步

```python
import threading

lock = threading.Lock()
shared_data = 0

def increment():
    global shared_data
    with lock:
        shared_data += 1

# 条件变量
condition = threading.Condition()

def producer():
    with condition:
        # 生产数据
        condition.notify()

def consumer():
    with condition:
        condition.wait()
        # 消费数据
```

## 多进程（multiprocessing）

绕过 GIL，适合 CPU 密集型任务：

```python
from multiprocessing import Process, Pool

def compute(n):
    return sum(i * i for i in range(n))

# 进程池
with Pool(4) as pool:
    results = pool.map(compute, [10**6, 10**6, 10**6])

# 进程间通信
from multiprocessing import Queue, Pipe

q = Queue()
q.put("data")
data = q.get()
```

### 进程池执行器

```python
from concurrent.futures import ProcessPoolExecutor

with ProcessPoolExecutor(max_workers=4) as pool:
    futures = [pool.submit(compute, n) for n in [10**6] * 4]
    results = [f.result() for f in futures]
```

## 异步编程（asyncio）

适合高并发 I/O 场景：

```python
import asyncio

async def fetch(url):
    print(f"Fetching {url}")
    await asyncio.sleep(1)  # 模拟 I/O
    return f"Result from {url}"

async def main():
    # 并发执行
    tasks = [fetch(url) for url in ["url1", "url2", "url3"]]
    results = await asyncio.gather(*tasks)
    print(results)

asyncio.run(main())
```

### 异步上下文管理与迭代

```python
import aiohttp
import asyncio

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [session.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
        return [await r.text() for r in responses]

# 异步生成器
async def async_range(n):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def main():
    async for i in async_range(5):
        print(i)
```

## 选择建议

| 场景 | 推荐方案 |
|------|----------|
| I/O 密集（网络请求、文件操作） | `asyncio` 或 `ThreadPoolExecutor` |
| CPU 密集（计算、数据处理） | `ProcessPoolExecutor` |
| 混合场景 | `asyncio` + 进程池 |
