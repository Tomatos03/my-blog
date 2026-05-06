# 虚拟环境

虚拟环境为每个 Python 项目创建独立的依赖空间，避免不同项目之间的包版本冲突。

| 工具 | 安装方式 | 速度 | 特点 | 适用场景 |
|------|----------|------|------|----------|
| `venv` | Python 内置 | 一般 | 轻量、无额外依赖 | 简单项目 |
| `uv` | `curl -LsSf https://astral.sh/uv/install.sh \| sh` | 极快 | 兼容 pip、Rust 编写 | 现代项目 |
| `conda` | 安装 Miniconda/Anaconda | 一般 | 跨语言、自带编译工具链 | 数据科学、科学计算 |
| `poetry` | `pip install poetry` | 较快 | 依赖解析、打包发布 | 库开发 |
| `pdm` | `pip install pdm` | 较快 | PEP 标准、插件丰富 | 通用项目 |

- **venv（内置）**

  Python 3.3+ 内置的虚拟环境工具：

  ```bash
  # 创建
  python -m venv .venv

  # 激活
  source .venv/bin/activate      # Linux/macOS
  .venv\Scripts\activate         # Windows

  # 退出
  deactivate

  # 删除
  rm -rf .venv
  ```

  常用工作流：

  ```bash
  # 创建并激活虚拟环境
  python -m venv .venv
  source .venv/bin/activate

  # 安装依赖
  pip install requests flask

  # 导出依赖
  pip freeze > requirements.txt

  # 在新环境中还原
  pip install -r requirements.txt
  ```

- **uv**

  新一代 Python 包管理工具，速度极快：

  ```bash
  # 安装
  curl -LsSf https://astral.sh/uv/install.sh | sh

  # 创建虚拟环境
  uv venv

  # 安装包
  uv pip install requests flask

  # 同步依赖
  uv pip sync requirements.txt

  # 运行脚本
  uv run python main.py
  ```

- **conda**

  跨语言的包和环境管理器，适合数据科学场景：

  ```bash
  # 创建环境
  conda create -n myenv python=3.11

  # 激活
  conda activate myenv

  # 安装包
  conda install numpy pandas

  # 导出环境
  conda env export > environment.yml

  # 从文件创建
  conda env create -f environment.yml

  # 列出环境
  conda env list
  ```

- **导出与恢复依赖**

  导出依赖是将当前虚拟环境中安装的所有第三方包及其版本号记录到文件中，这样在其他机器或新环境中可以一键还原完全相同的依赖环境，确保代码行为一致。

  venv / uv（使用 `requirements.txt`）：

  ```bash
  # 导出当前环境所有包
  pip freeze > requirements.txt

  # 在新环境中还原
  pip install -r requirements.txt
  ```

  conda（使用 `environment.yml`）：

  ```bash
  # 导出当前环境
  conda env export > environment.yml

  # 从文件创建环境
  conda env create -f environment.yml
  ```
