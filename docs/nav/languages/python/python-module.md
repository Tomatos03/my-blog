# Python 模块与包

Python 通过模块和包组织代码。模块是单个 `.py` 文件，包是包含 `__init__.py` 的目录。

## 模块导入

```python
# 导入整个模块
import math
math.sqrt(16)

# 导入特定成员
from math import sqrt, pi
sqrt(16)

# 别名
import numpy as np
from datetime import datetime as dt

# 导入所有（不推荐）
from math import *
```

## 包结构

```
mypackage/
├── __init__.py
├── core.py
├── utils/
│   ├── __init__.py
│   ├── helpers.py
│   └── validators.py
└── models.py
```

```python
# __init__.py 可以控制导出
from .core import App
from .models import User, Role

__all__ = ["App", "User", "Role"]
```

## 相对导入

```python
# 在 mypackage/core.py 中
from .models import User          # 同包
from .utils.helpers import format  # 子包
from .. import config              # 上级包
```

## 搜索路径

Python 按以下顺序查找模块：

1. 当前目录
2. `PYTHONPATH` 环境变量
3. 标准库目录
4. 第三方包目录（`site-packages`）

```python
import sys
sys.path.append("/custom/path")
```

## `__name__` 与 `__main__`

```python
def main():
    print("直接运行时执行")

if __name__ == "__main__":
    main()
```

模块被 `import` 时 `__name__` 为模块名，直接运行时为 `"__main__"`。

## 常用标准库

| 模块 | 用途 |
|------|------|
| `os` / `sys` | 系统操作 |
| `datetime` | 日期时间 |
| `json` | JSON 解析 |
| `re` | 正则表达式 |
| `pathlib` | 路径操作 |
| `collections` | 高级数据结构 |
| `itertools` | 迭代工具 |
| `functools` | 函数工具 |
| `typing` | 类型提示 |
| `logging` | 日志 |
| `unittest` | 单元测试 |
