# Git Worktree

Git worktree 是一个强大的特性，允许你在同一个 Git 仓库中同时操作多个工作目录。与传统的分支切换不同，worktree 提供了真正的隔离工作环境，让你可以并行处理多个分支，而无需频繁地在不同分支之间切换。这对于多任务并行开发、紧急修复和历史版本调试都非常有帮助。

worktree 的核心原理是：每个 worktree 都有自己独立的工作目录，但它们共享同一个 Git 仓库数据库（`.git/objects`、`.git/refs` 等）。这意味着你可以在一个 worktree 中编辑代码，同时在另一个 worktree 中开展完全独立的工作，各不干扰。

> [!TIP]
> - 一个工作目录对应一个真实的物理目录
> - 一个worktree内容提交后才会对其他worktree可见，未提交的更改在其他worktree中不可见。

## 常见操作速查

| 操作 | 命令 | 说明 |
|------|------|------|
| 创建 worktree（已有分支） | `git worktree add <path> <branch>` | 为指定分支创建工作目录 |
| 创建 worktree（新分支） | `git worktree add <path> -b <branch>` | 基于当前分支创建新分支并添加为 worktree |
| 创建 worktree（分离 HEAD） | `git worktree add <path> --detach <commit>` | 在分离 HEAD 状态下创建 worktree，用于检查特定提交 |
| 基于标签创建修复分支 | `git worktree add <path> -b <branch> <tag>` | 基于特定版本标签创建修复分支的 worktree |
| 从远程分支创建 | `git worktree add <path> -b <branch> origin/<branch>` | 从远程分支创建本地分支并添加为 worktree，`--track` 设置跟踪关系 |
| 强制覆盖已有分支 | `git worktree add <path> -B <branch>` | `-B` 选项会覆盖已存在的分支 |
| 列出所有 worktree | `git worktree list` | 显示所有 worktree 及其关联分支 |
| 列出详细信息 | `git worktree list --verbose` | 显示分支状态、提交信息、创建时间等 |
| 机器可读格式输出 | `git worktree list --porcelain` | 便于脚本或自动化处理 |
| 删除 worktree | `git worktree remove <path>` | 删除指定 worktree，要求没有未提交的更改 |
| 强制删除 worktree | `git worktree remove -f <path>` | 强制删除，即使有未提交更改也会被丢弃 |
| 清理失效引用 | `git worktree prune` | 修复或清理被意外删除的 worktree 引用 |
| 修复损坏的 worktree | `git worktree repair` | 修复 worktree 的元数据和引用 |
| 锁定 worktree | `git worktree lock <path>` | 防止自动清理或被其他操作干扰 |
| 解锁 worktree | `git worktree unlock <path>` | 解除锁定状态 |

> [!WARNING]
> - 删除 worktree 时，工作树必须没有未提交的更改（除非使用 `--force`）
> - 使用 `--force` 会丢弃工作树中的所有未保存更改，请谨慎使用

## 典型应用场景

- **多分支并行开发**

当前你在 main 分支上工作，同时需要处理 feature-A 和 feature-B 两个功能分支。

```bash
# 为 feature-A 创建 worktree
$ git worktree add ../work-featureA feature-A

# 为 feature-B 创建 worktree
$ git worktree add ../work-featureB feature-B

# 在不同窗口中并行开发，完成后分别提交
$ cd ../work-featureA
$ git add . && git commit -m "feat: 完成 feature-A"
$ git push origin feature-A

$ cd ../work-featureB
$ git add . && git commit -m "feat: 完成 feature-B"
$ git push origin feature-B

# 回到主仓库，依次合并两个功能分支
$ cd ../myproject
$ git merge feature-A
$ git merge feature-B

# 功能已合并到主线，清理不再需要的 worktree
$ git worktree remove ../work-featureA
$ git worktree remove ../work-featureB
```

- **热修复与主线开发同步**

你正在 main 分支上进行大型重构，突然生产环境出现紧急 bug。你需要基于 v1.0.0 版本创建修复分支，同时不中断主线开发。

```bash
# 基于 v1.0.0 标签创建修复 worktree
$ git worktree add ../hotfix -b hotfix/critical v1.0.0

# 进入修复 worktree，完成修复
$ cd ../hotfix
$ git add src/bug.rs
$ git commit -m "Fix: 修复生产环境中的关键问题"
$ git push origin hotfix/critical

# 返回主仓库，主线开发继续进行（未受任何影响）
$ cd ../myproject

# 紧急修复已完成并推送，将 hotfix 分支合并回主线以同步修复
$ git merge hotfix/critical

# 修复已合并，清理 hotfix worktree
$ git worktree remove ../hotfix
```

- **代码回滚与历史版本调试**

某个功能存在 bug，你需要在历史版本中追踪问题的根源。你希望在不影响当前开发的情况下，在特定历史提交处进行调试。

```bash
# 在分离 HEAD 状态下创建 worktree 指向特定提交
$ git worktree add ../debug-def5678 --detach def5678

# 进入调试 worktree，检查代码并定位问题
$ cd ../debug-def5678
$ git log --oneline -1
def5678 重构数据库层

# 问题定位后，在 debug worktree 中基于该历史提交创建修复分支
$ git checkout -b fix/database-layer
$ git add . && git commit -m "fix: 修复数据库层问题"
$ git push origin fix/database-layer

# 返回主仓库，将修复分支合并到主线
$ cd ../myproject
$ git merge fix/database-layer

# 修复已合并，清理调试 worktree
$ git worktree remove ../debug-def5678
```
