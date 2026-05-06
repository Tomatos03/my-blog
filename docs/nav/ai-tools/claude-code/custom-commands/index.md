# 自定义 Slash Commands

Claude Code 支持自定义 slash commands，让你可以通过 `/command-name` 的方式快速执行预定义的提示词。这是将常用工作流标准化和团队共享的有效方式。

## 创建方式

在项目根目录或用户目录下创建 `.claude/commands/` 文件夹，然后添加 `.md` 文件即可。

```
.claude/
└── commands/
    ├── review.md
    ├── test.md
    └── refactor.md
```

每个 `.md` 文件的内容就是该命令对应的提示词（prompt）。文件名即为命令名，例如 `review.md` 对应 `/review`。

## 命令文件格式

命令文件是纯 Markdown，直接写你希望 Claude 执行的指令即可。

**示例：`.claude/commands/review.md`**

```markdown
请对当前暂存区的代码变更进行审查，关注以下方面：
- 潜在的 bug 或边界情况
- 命名是否清晰
- 是否有更好的实现方式
```

使用时输入 `/review`，Claude 会按照该提示词执行。

## 使用变量占位符

命令文件中可以使用 `$ARGUMENTS` 占位符，在调用命令时传入额外参数。

**示例：`.claude/commands/explain.md`**

```markdown
请用简洁的中文解释以下概念：$ARGUMENTS
```

调用方式：

```
/explain 什么是闭包
```

Claude 会将 `$ARGUMENTS` 替换为「什么是闭包」。

## 存放位置和作用域

| 类型 | 路径 | 作用域 |
|------|------|--------|
| 项目级 | `<项目根目录>/.claude/commands/` | 仅当前项目，可提交到 Git 供团队共享 |
| 用户级 | `~/.claude/commands/` | 所有项目通用，适合个人常用命令 |

两者可以同时存在，命令名冲突时项目级优先。

## 实际使用

在 Claude Code 的交互式对话中，直接输入 `/` 即可看到所有可用的命令列表，选择后即可执行。

```
> /review
```

这等价于手动输入 `review.md` 文件中的完整提示词内容。
