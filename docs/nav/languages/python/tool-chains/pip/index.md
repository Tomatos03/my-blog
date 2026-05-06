# pip 包管理

pip 是 Python 官方的包管理工具，用于安装和管理第三方库。

## 基本命令

```bash
# 安装包
pip install requests
pip install requests==2.28.0
pip install "requests>=2.20,<3.0"

# 升级包
pip install --upgrade requests

# 卸载包
pip uninstall requests

# 查看已安装
pip list
pip show requests

# 搜索包
pip search requests  # 已弃用，建议直接在 pypi.org 搜索
```

## requirements.txt

```bash
# 导出依赖
pip freeze > requirements.txt

# 从文件安装
pip install -r requirements.txt
```

文件格式：

```txt
requests==2.28.0
flask>=2.0
django~=4.2       # 兼容版本，等价于 >=4.2, <5.0
pytest             # 最新版
```

## 镜像源

```bash
# 临时使用
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests

# 全局配置
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

常用国内镜像：

| 镜像 | 地址 |
|------|------|
| 清华 | `https://pypi.tuna.tsinghua.edu.cn/simple` |
| 阿里云 | `https://mirrors.aliyun.com/pypi/simple` |
| 中科大 | `https://pypi.mirrors.ustc.edu.cn/simple` |

## pyproject.toml

现代 Python 项目使用 `pyproject.toml` 管理依赖：

```toml
[project]
name = "my-project"
version = "0.1.0"
dependencies = [
    "requests>=2.28",
    "flask>=2.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "mypy>=1.0",
]
```

```bash
# 安装项目及依赖
pip install -e .

# 安装开发依赖
pip install -e ".[dev]"
```

## pip 高级用法

```bash
# 下载但不安装
pip download -d ./packages requests

# 安装本地包
pip install ./my_package-0.1.0.tar.gz

# 从 Git 安装
pip install git+https://github.com/user/repo.git

# 依赖树
pip install pipdeptree
pipdeptree
```
