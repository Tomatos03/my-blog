# Python 模块与包

Python 通过模块和包组织代码，实现代码的复用和管理。

## 模块

**模块**是单个 `.py` 文件。当你创建一个 Python 文件时，该文件就是一个模块。

```
myproject/
├── math_utils.py      # 这是一个模块
└── string_utils.py    # 这也是一个模块
```

**`__name__` 与 `__main__`**

每个模块都有一个 `__name__` 变量，用于标识模块的执行上下文：

- **被导入时**：`__name__` 为模块名（如 `"mypackage.core"`）
- **直接运行时**：`__name__` 为 `"__main__"`

```python
def main():
    print("直接运行时执行")

if __name__ == "__main__":
    main()
```

这样模块既可以被导入使用，也可以直接运行，避免导入时执行不必要的代码。

## 包

**包**是包含 `__init__.py` 文件的目录。包允许你将相关的模块组织在一起。

```
mypackage/            # 这是一个包（目录）
├── __init__.py       # 标记这个目录为包
├── core.py           # 包内的模块
├── models.py         # 包内的模块
└── utils/            # 子包
    ├── __init__.py
    ├── helpers.py
    └── validators.py
```

`__init__.py` 可以为空，但它的存在告诉 Python 这个目录是一个包，而不是普通目录。

```python
# mypackage/__init__.py
# 这个文件可以为空，也可以包含初始化代码
```

在 `__init__.py` 中定义导入语句和 `__all__`，可以控制包对外暴露的接口：

```python
# mypackage/__init__.py
from .core import App
from .models import User, Role

__all__ = ["App", "User", "Role"]
```

> [!TIP]
> - `__all__` 列表定义了使用 `from mypackage import *` 时导入的成员，明确指定了包的公共接口。  
> - 对于明确的导入，`__all__` 不会影响导入行为

## import

导入模块时需要指定包名。对于工作空间根目录的模块，包名可以省略。

- **基本导入**

  ```python
  # 导入工作空间根目录的模块
  import math_utils
  result = math_utils.add(1, 2)

  # 导入包内的模块
  import mypackage.core
  app = mypackage.core.App()
  ```

- **导入特定成员**

  ```python
  from mypackage.core import App
  app = App()

  from mypackage.models import User, Role
  ```

- **使用别名**

  ```python
  import mypackage.core as core
  from mypackage.models import User as UserModel
  ```

- **导入所有（不推荐）**

  ```python
  from mypackage.core import *
  ```

  **问题**：
  - 不清楚导入了哪些名称
  - 容易造成命名冲突
  - 降低代码可读性

- **绝对导入**

  从项目根目录开始指定完整的导入路径：

  ```python
  from mypackage.core import App
  from mypackage.utils.helpers import format_string
  import mypackage.models
  ```

- **相对导入**

  使用 `.` 和 `..` 相对于当前包的位置进行导入：

  ```python
  # 在 mypackage/core.py 中
  from .models import User          # . 表示当前包（mypackage）
  from .utils.helpers import format # 访问子包

  # 在 mypackage/utils/helpers.py 中
  from ..core import App            # .. 表示上级包（mypackage）
  from .validators import validate  # . 表示当前包（mypackage.utils）
  ```

  **符号含义**：
  - `.` = 当前包
  - `..` = 上级包
  - `...` = 上上级包（以此类推）

  相对导入使代码更灵活，包可以被重命名或移动而不需要修改导入语句。

## 模块搜索路径

Python 按以下顺序查找模块：

1. 当前目录
2. `PYTHONPATH` 环境变量指定的目录
3. 标准库目录
4. 第三方包目录（`site-packages`）

```python
import sys
print(sys.path)  # 查看搜索路径列表

sys.path.append("/custom/path")  # 添加自定义搜索路径
```
