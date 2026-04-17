# Git Worktree 功能详解

Git worktree 是一个强大的特性，允许你在同一个 Git 仓库中同时操作多个工作目录。与传统的分支切换不同，worktree 提供了真正的隔离工作环境，让你可以并行处理多个分支，而无需频繁地在不同分支之间切换。这对于多任务并行开发、紧急修复和历史版本调试都非常有帮助。

worktree 的核心原理是：每个 worktree 都有自己独立的工作目录，但它们共享同一个 Git 仓库数据库（`.git/objects`、`.git/refs` 等）。这意味着你可以在一个 worktree 中编辑代码，同时在另一个 worktree 中开展完全独立的工作，各不干扰。

> [!TIP]
> - 一个工作目录对应一个真实的物理目录
> - 一个worktree内容提交后才会对其他worktree可见，未提交的更改在其他worktree中不可见。

## 创建工作树

**基础语法**

```bash
git worktree add <path> <branch>
```

**示例**

```bash
# 为 feature 分支创建工作树，路径为 ../work-feature
git worktree add ../work-feature feature

# 基于当前分支创建新分支并同时添加为 worktree
# -b 选项用于创建新分支
git worktree add ../work-new -b new-feature

# 在分离 HEAD 状态下创建 worktree（用于检查特定提交或标签）
git worktree add ../work-temp --detach abc1234

# 基于特定版本标签创建修复分支的 worktree
git worktree add ../hotfix hotfix/critical -b hotfix/critical v1.0.0

# 从远程分支创建本地分支并添加为 worktree
# --track 设置跟踪关系
git worktree add ../work-remote -b feature origin/feature

# 强制创建新分支（如果已存在则覆盖）
# -B 选项会覆盖已存在的分支
git worktree add ../work-override -B my-branch
```

## 列出所有工作树

```bash
# 基础列表：显示所有 worktree 及其关联分支
git worktree list

# 输出示例：
# /home/user/project                    abcd1234 [main]
# /home/user/project/../work-feature    def5678 [feature]
# /home/user/project/../work-hotfix     ghi9012 [hotfix]

# 显示详细信息（包括分支状态、提交信息、创建时间等）
git worktree list --verbose

# 输出示例：
# /home/user/project                    abcd1234 [main] 2024-01-15
# /home/user/project/../work-feature    def5678 [feature] 2024-01-15
# /home/user/project/../work-hotfix     ghi9012 [hotfix] (detached)

# 以机器可读格式输出（便于脚本或自动化处理）
git worktree list --porcelain

# 输出示例：
# worktree /home/user/project
# branch refs/heads/main
# detached
#
# worktree /home/user/project/../work-feature
# branch refs/heads/feature
```

## 删除工作树

**基础语法**

```bash
git worktree remove ../work-feature
```

> [!WARNING]
> 工作树必须没有未提交的更改

示例
```bash
# 强制删除工作树（即使有未提交更改，也会被丢弃）
# -f 或 --force 选项会跳过安全检查
git worktree remove --force ../work-hotfix

# 或简写形式
git worktree remove -f ../work-hotfix
```

> [!WARNING]
> 使用 `--force` 会丢弃工作树中的所有未保存更改，请谨慎使用。

## 其他辅助命令

```bash
# 修复或清理被意外删除的 worktree 引用
# 当手动删除 worktree 目录但没有正常调用 remove 时，使用此命令清理
git worktree prune

# 修复 worktree 的元数据和引用（修复损坏的 worktree）
git worktree repair

# 锁定工作树（防止自动清理或被其他操作干扰）
git worktree lock ../work-important

# 解锁工作树
git worktree unlock ../work-important
```

## 典型应用场景

### 多分支并行开发

当前你在 main 分支上工作，同时需要处理 feature-A 和 feature-B 两个功能分支。

**操作步骤**

```bash
# 步骤 1：查看当前分支状态
$ git branch -a
* main
  feature-A
  feature-B

# 步骤 2：为 feature-A 创建 worktree
$ git worktree add ../work-featureA feature-A
Branch 'feature-A' set up to track 'origin/feature-A'.
$ cd ../work-featureA
$ ls  # 独立的工作目录，可进行 feature-A 开发

# 步骤 3：为 feature-B 创建 worktree
$ cd ../myproject
$ git worktree add ../work-featureB feature-B
Branch 'feature-B' set up to track 'origin/feature-B'.

# 步骤 4：查看三个并行的 worktree
$ git worktree list
/home/user/myproject          abc1234 [main]
/home/user/myproject-featureA def5678 [feature-A]
/home/user/myproject-featureB ghi9012 [feature-B]

# 步骤 5：在不同窗口中并行工作
# 窗口 1：cd /home/user/myproject        → 继续在 main 上开发
# 窗口 2：cd /home/user/myproject-featureA → 开发 feature-A
# 窗口 3：cd /home/user/myproject-featureB → 开发 feature-B
# 所有改动完全隔离，互不影响
```

> [!TIP]
> - 三个工作空间对应三个物理文件工作目录，但共享一份`.git`目录.   
> - 一个worktree的暂存内容提交之后才会对其他worktree可见，未提交的更改在其他worktree中不可见。

### 热修复与主线开发同步

你正在 main 分支上进行大型重构，突然生产环境出现紧急 bug。你需要基于 v1.0.0 版本创建修复分支，同时不中断主线开发。

**操作步骤**

```bash
# 步骤 1：主仓库当前状态（正在大型重构）
$ pwd
/home/user/myproject
$ git status
On branch main
Changes not staged for commit:
  modified: src/core.rs
  modified: src/utils.rs

# 步骤 2：为紧急修复创建独立的 worktree（基于 v1.0.0 标签）
$ git worktree add ../hotfix -b hotfix/critical v1.0.0
Branch 'hotfix/critical' set up to track starting point 'v1.0.0'.

# 步骤 3：进入修复 worktree，完成修复
$ cd ../hotfix
$ cat src/bug.rs  # 查看 bug 代码
$ # 进行修复...
$ git add src/bug.rs
$ git commit -m "Fix: 修复生产环境中的关键问题"

# 步骤 4：推送修复分支
$ git push origin hotfix/critical
# 创建 PR 或直接合并到主线

# 步骤 5：返回主仓库，主线开发继续进行（未受任何影响）
$ cd ../myproject
$ git status
On branch main
Changes not staged for commit:
  modified: src/core.rs    # 本地更改保持完好
  modified: src/utils.rs

# 步骤 6：修复完成后，清理修复 worktree
$ git worktree remove ../hotfix
Removing worktree information for '/home/user/myproject/../hotfix'
```

### 代码回滚与历史版本调试

某个功能存在 bug，你需要在历史版本中追踪问题的根源。你希望在不影响当前开发的情况下，在特定历史提交处进行调试。

**操作步骤**

```bash
# 步骤 1：当前开发分支状态
$ git log --oneline -3
abc1234 (HEAD -> main) 新增用户认证功能
def5678 重构数据库层
ghi9012 修复缓存问题

# 步骤 2：需要检查 def5678 提交中是否包含问题根源
# 在分离 HEAD 状态下创建 worktree 指向该提交
$ git worktree add ../debug-def5678 --detach def5678
HEAD is now at def5678 重构数据库层

# 步骤 3：进入调试 worktree，检查代码
$ cd ../debug-def5678
$ git log --oneline -1
def5678 重构数据库层
$ # 进行调试、打印日志、运行测试等
$ cat src/database.rs  # 检查数据库层实现

# 步骤 4：继续向前追踪，检查更早的提交
$ cd ../myproject
$ git worktree add ../debug-ghi9012 --detach ghi9012
HEAD is now at ghi9012 修复缓存问题

# 步骤 5：查看调试 worktree 列表
$ git worktree list
/home/user/myproject             abc1234 [main]
/home/user/myproject-debug-def5678  def5678 (detached)
/home/user/myproject-debug-ghi9012  ghi9012 (detached)

# 步骤 6：完成问题溯源后，清理所有调试 worktree
$ git worktree remove ../debug-def5678
$ git worktree remove ../debug-ghi9012

# 主开发分支保持原状（abc1234）
$ pwd
/home/user/myproject
$ git log --oneline -1
abc1234 (HEAD -> main) 新增用户认证功能
```
