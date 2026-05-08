# Memory 记忆系统

Claude Code 的每个会话都从空白上下文开始，Memory 机制让 Claude 能够跨会话积累和保留知识。Memory 包含两种互补的方式：开发者编写的 **CLAUDE.md 文件**和 Claude 自动维护的 **Auto Memory**。两者都作为上下文注入，而非强制配置——具体、简洁、结构清晰的指令效果最好。

## 两种记忆机制

| 机制 | 谁来写入 | 内容 | 作用域 | 加载方式 |
|------|----------|------|--------|----------|
| CLAUDE.md 文件 | 开发者 | 指令与规则 | 项目级 / 用户级 / 组织级 | 每次会话自动加载 |
| Auto Memory | Claude 自动 | 学到的经验与模式 | 每个 Git 仓库 | 每次会话加载 MEMORY.md 前 200 行 |

## CLAUDE.md 文件

CLAUDE.md 是你编写的 Markdown 指令文件，Claude 在每次会话开始时读取。它们在系统提示之后、用户消息之前被注入上下文。

### 存放位置

| 级别 | 路径 | 作用域 | 加载时机 |
|------|------|--------|----------|
| 企业策略 | Linux: `/etc/claude-code/CLAUDE.md`；macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md` | 组织内所有用户 | 每次会话，不可排除 |
| 项目指令 | `./CLAUDE.md` 或 `./.claude/CLAUDE.md` | 当前项目，可提交到 Git 供团队共享 | 每次会话 |
| 用户指令 | `~/.claude/CLAUDE.md` | 当前用户的所有项目 | 每次会话 |
| 本地指令 | `./CLAUDE.local.md` | 仅当前用户，当前项目 | 每次会话，建议加入 `.gitignore` |

### 加载顺序

Claude 从当前工作目录**向上遍历目录树**，在每一级加载 CLAUDE.md 和 CLAUDE.local.md。所有文件按以下顺序**拼接**注入：

1. 企业策略 CLAUDE.md（不可排除）
2. 用户级 `~/.claude/CLAUDE.md`
3. 目录树中的 CLAUDE.md（从文件系统根目录到工作目录逐级加载）
4. 同级 `CLAUDE.local.md`（追加在对应 CLAUDE.md 之后）

子目录中的 CLAUDE.md 不会在会话开始时加载，而是在 Claude 读取该目录下的文件时**按需加载**。

### 文件组织

推荐将核心约定放在 CLAUDE.md，补充内容拆分到 `.claude/rules/` 中：

```
项目根目录/
├── CLAUDE.md                  # 核心约定（控制在 200 行以内）
├── CLAUDE.local.md            # 个人偏好（加入 .gitignore）
└── .claude/
    └── rules/
        ├── architecture.md    # 架构指导
        ├── code-style.md      # 代码风格
        └── testing.md         # 测试规范
```

### 导入语法

CLAUDE.md 支持 `@path/to/file` 语法引用其他文件的内容：

```markdown
项目概述见 @README.md，可用脚本见 @package.json。
```

- 支持相对路径和绝对路径
- 递归导入最多 5 层

> [!TIP]
> Rules 目录（`.claude/rules/`）中的文件支持 `paths` Frontmatter 字段，可以按文件路径限定加载范围，节省上下文空间。详见 [Rules 规则系统](../rules/)。

## Auto Memory 自动记忆

Auto Memory 让 Claude 自动跨会话积累知识。Claude 会判断哪些信息值得记住，并将其写入磁盘。

### 存储位置

```
~/.claude/projects/<project>/memory/
├── MEMORY.md          # 索引文件，每次会话加载前 200 行
├── debugging.md       # 主题文件，按需读取
├── api-conventions.md
└── ...
```

`<project>` 路径由 Git 仓库派生，同一仓库的所有 worktree 和子目录共享同一个 Auto Memory 目录。非 Git 仓库则使用项目根目录。

### 工作原理

- `MEMORY.md` 是一个**索引文件**，Claude 将详细笔记拆分到独立的主题文件中
- 每次会话开始时加载 `MEMORY.md` 的前 200 行（或 25KB）
- 主题文件**不会**在启动时加载，Claude 在需要时按需读取
- 当界面显示 "Writing memory" 或 "Recalled memory" 时，Claude 正在更新或读取记忆

### 记忆类型

Auto Memory 中的记忆分为四种类型：

| 类型 | 用途 | 示例 |
|------|------|------|
| **user** | 用户的角色、偏好、知识背景 | "用户是 Java 开发者，正在学习 Agent 开发" |
| **feedback** | 用户对 Claude 行为的纠正与确认 | "不要在测试中 mock 数据库——之前出过问题" |
| **project** | 项目的进行中工作、目标、截止日期 | "3 月 5 日起冻结非关键合并" |
| **reference** | 外部系统中的信息位置 | "Bug 跟踪在 Linear 的 INGEST 项目中" |

> [!NOTE]
> 记忆文件是纯 Markdown，你可以随时手动编辑或删除。运行 `/memory` 命令可以浏览、审查和编辑 Claude 保存的内容。

### 开关与配置

| 方式 | 操作 |
|------|------|
| 会话内切换 | 输入 `/memory` |
| 项目设置 | `"autoMemoryEnabled": false` |
| 环境变量 | `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` |
| 自定义存储路径 | `"autoMemoryDirectory": "自定义路径"`（在 `~/.claude/settings.json` 中设置） |

Auto Memory 需要 Claude Code v2.1.59 或更高版本。

> [!NOTE]
> Auto Memory 是**本机本地**的，不会在不同机器或云环境之间同步。

## 何时写入 CLAUDE.md vs Auto Memory

| 场景 | 推荐方式 |
|------|----------|
| Claude 反复犯同一个错误 | 写入 CLAUDE.md 或 Rules |
| 代码审查发现 Claude 应该知道的事情 | 写入 CLAUDE.md |
| 你在多个会话中重复同样的纠正 | 写入 CLAUDE.md |
| 新同事也需要同样的上下文 | 写入 CLAUDE.md（提交到 Git） |
| Claude 学到了你的偏好或工作方式 | Auto Memory 自动保存 |
| 关于项目当前状态的临时信息 | Auto Memory 自动保存 |

> [!TIP]
> 如果你想让 Claude 把某条信息写入 CLAUDE.md 而非 Auto Memory，直接说"把这个加到 CLAUDE.md"。

## 最佳实践

- **CLAUDE.md 保持精简**：控制在 200 行以内，过长会消耗上下文并降低遵从度
- **指令具体可验证**：「使用 2 空格缩进」优于「格式化代码」
- **一个文件一个主题**：Rules 使用描述性文件名，如 `testing.md`、`api-design.md`
- **定期审查**：移除过时或冲突的指令，避免 CLAUDE.md 和 Rules 之间的矛盾
- **善用 /memory 命令**：定期检查 Claude 保存了什么，清理不再相关的内容
- **提交 CLAUDE.md 到 Git**：项目级指令应版本化管理，Auto Memory 则不需要
