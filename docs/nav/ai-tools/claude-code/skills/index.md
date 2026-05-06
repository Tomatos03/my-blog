# Skills 技能系统

Skills 是 Claude Code 的扩展机制，通过 `SKILL.md` 文件为 Claude 提供可复用的指令。Claude 会在相关时自动加载 Skills，你也可以通过 `/skill-name` 手动触发。

> [!NOTE]
> Skills 和 Custom Slash Commands（`.claude/commands/` 中的 `.md` 文件）现已合并，两者都能通过 `/` 调用。但 Skills 支持额外功能：目录形式的辅助文件、Frontmatter 元数据、自动发现和动态上下文注入。

## Skill 存放位置

| 级别 | 路径 | 作用域 |
|------|------|--------|
| 企业 | 通过 Managed Settings 配置 | 组织内所有用户 |
| 个人 | `~/.claude/skills/<skill-name>/SKILL.md` | 所有项目 |
| 项目 | `.claude/skills/<skill-name>/SKILL.md` | 当前项目 |
| 插件 | `<plugin>/skills/<skill-name>/SKILL.md` | 启用该插件的范围 |

同名 Skill 优先级：企业 > 个人 > 项目。插件 Skill 使用 `plugin-name:skill-name` 命名空间，不会与其他级别冲突。

## 创建一个 Skill

每个 Skill 是一个包含 `SKILL.md` 的目录：

```
~/.claude/skills/
└── summarize-changes/
    ├── SKILL.md           # 必需，主指令文件
    ├── template.md        # 可选，模板文件
    ├── examples/          # 可选，示例目录
    │   └── sample.md
    └── scripts/           # 可选，脚本目录
        └── validate.sh
```

`SKILL.md` 由 YAML Frontmatter（`---` 分隔）和 Markdown 内容两部分组成：

```yaml
---
description: 汇总未提交的变更并标记风险项。当用户询问变更内容或提交信息时使用。
---

## 当前变更

!`git diff HEAD`

## 指令

用两三个要点总结上述变更，列出注意到的风险（如缺失的错误处理、硬编码值、需要更新的测试）。
```


## Frontmatter 配置

| 字段 | 是否必填 | 说明 |
|------|---------|------|
| `name` | 否 | 显示名称，默认取目录名 |
| `description` | 推荐 | 描述功能和使用场景，Claude 据此决定何时自动加载 |
| `when_to_use` | 否 | 附加的触发条件说明，会拼接到 `description` 后 |
| `disable-model-invocation` | 否 | 设为 `true` 后 Claude 不会自动触发，仅用户可通过 `/name` 手动调用 |
| `user-invocable` | 否 | 设为 `false` 后从 `/` 菜单中隐藏 |
| `allowed-tools` | 否 | Skill 激活时免审批的工具列表 |
| `model` | 否 | 指定该 Skill 使用的模型 |
| `effort` | 否 | 推理深度：`low`、`medium`、`high`、`xhigh`、`max` |
| `context` | 否 | 设为 `fork` 时在子代理中运行 |
| `agent` | 否 | `context: fork` 时使用的子代理类型 |
| `arguments` | 否 | 声明命名参数，用于 `$name` 替换 |
| `paths` | 否 | Glob 模式，限制 Skill 仅在匹配的文件路径下激活 |

## 触发方式

- 用户手动触发

在对话中输入 `/skill-name` 即可触发。输入 `/` 可查看所有可用 Skill 的列表。

- Claude 自动触发

Claude 根据 Skill 的 `description` 内容判断是否加载。描述中应包含用户自然会说的关键词。

可通过 `disable-model-invocation: true` 禁止自动触发，仅保留手动调用。

## 参数与变量替换

Skill 内容支持以下变量：

| 变量 | 说明 |
|------|------|
| `$ARGUMENTS` | 调用时传入的全部参数 |
| `$0` / `$1` | 按位置获取单个参数 |
| `$name` | Frontmatter 中 `arguments` 声明的命名参数 |
| `${CLAUDE_SESSION_ID}` | 当前会话 ID |
| `${CLAUDE_SKILL_DIR}` | Skill 文件所在目录路径 |

示例：

```yaml
---
name: fix-issue
description: 修复 GitHub Issue
arguments: [issue, branch]
---

修复 Issue #$issue，分支为 $branch。
```

调用 `/fix-issue 123 main` 时 `$issue` 替换为 `123`，`$branch` 替换为 `main`。

## 动态上下文注入

使用 `` !`<command>` `` 语法在 Skill 内容发送给 Claude 之前执行 Shell 命令，命令输出会替换占位符：

```yaml
---
description: 生成 PR 摘要
---

## PR 上下文
- 差异：!`gh pr diff`
- 评论：!`gh pr view --comments`
```

多行命令使用 `` ```! `` 代码块：

````yaml
## 环境信息
```!
node --version
npm --version
git status --short
```
````

## 内置 Skills

Claude Code 自带一批内置 Skills：

- `/init` — 扫描项目并生成 `CLAUDE.md`
- `/review` — 审查代码变更
- `/security-review` — 安全审查
- `/simplify` — 检查代码质量
- `/debug` — 调试问题
- `/loop` — 按间隔重复执行任务
- `/claude-api` — 构建和优化 Claude API / Anthropic SDK 应用

## 常见问题

### Skill 没有自动触发

- 检查 `description` 是否包含用户会自然使用的关键词
- 尝试更直接地复述描述中的关键词
- 使用 `/skill-name` 手动触发

### Skill 触发过于频繁

- 让 `description` 更具体，排除歧义场景
- 加上 `disable-model-invocation: true` 限制为手动调用
