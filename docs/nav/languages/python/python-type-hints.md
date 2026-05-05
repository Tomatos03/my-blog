# Python 类型提示

Python 3.5+ 支持类型提示（Type Hints），用于静态类型检查和 IDE 辅助，不影响运行时行为。

## 基本类型

```python
name: str = "Tom"
age: int = 25
height: float = 1.75
is_active: bool = True
```

## 容器类型

```python
from typing import List, Dict, Tuple, Set, Optional

# 列表
scores: List[int] = [90, 85, 88]

# 字典
user: Dict[str, str] = {"name": "Tom"}

# 元组
point: Tuple[int, int] = (3, 4)

# 集合
tags: Set[str] = {"python", "typing"}

# Python 3.9+ 原生支持
scores: list[int] = [90, 85]
user: dict[str, str] = {"name": "Tom"}
```

## 可选与联合类型

```python
from typing import Optional, Union

# 可选（可以是 None）
name: Optional[str] = None  # 等价于 Union[str, None]

# 联合类型
value: Union[int, str] = 42

# Python 3.10+ 用 | 语法
name: str | None = None
value: int | str = 42
```

## 函数类型提示

```python
def greet(name: str, times: int = 1) -> str:
    return f"Hello, {name}! " * times

# 回调函数
from typing import Callable

def apply(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)
```

## 泛型

```python
from typing import TypeVar, Generic

T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

int_stack: Stack[int] = Stack()
int_stack.push(1)
```

## TypeAlias 与 TypeVar

```python
from typing import TypeAlias, TypeVar

Vector: TypeAlias = list[float]

T = TypeVar("T")
U = TypeVar("U")

def first(items: list[T]) -> T:
    return items[0]
```

## typing 模块常用类型

| 类型 | 说明 |
|------|------|
| `Any` | 任意类型 |
| `NoReturn` | 不返回 |
| `Literal["a", "b"]` | 字面量类型 |
| `Final` | 不可变 |
| `Protocol` | 结构化子类型 |
| `TypedDict` | 带类型的字典 |
| `TypeGuard` | 类型守卫 |

## 类型检查工具

```bash
# mypy
pip install mypy
mypy script.py

# pyright
pip install pyright
pyright script.py
```
