# Rules 规则系统

Rules 是 Claude Code 的持久化指令机制，通过 `.claude/rules/` 目录下的 Markdown 文件为 Claude 提供项目特定的指导。Rules 与 `CLAUDE.md` 互补——`CLAUDE.md` 保持简洁，Rules 按主题拆分为多个文件，支持路径限定加载，让大型项目的指令管理更加灵活。

## Rules 存放位置

| 级别 | 路径 | 作用域 | 加载时机 |
|------|------|--------|----------|
| 企业策略 | Linux: `/etc/claude-code/CLAUDE.md`；macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md` | 组织内所有用户 | 每次会话，不可排除 |
| 用户级 | `~/.claude/rules/*.md` | 当前用户的所有项目 | 每次会话，在项目规则之前加载 |
| 项目级 | `.claude/rules/*.md` | 当前项目，可提交到 Git 供团队共享 | 每次会话（无 `paths`）或匹配文件时（有 `paths`） |
| 项目指令 | `.claude/CLAUDE.md` 或 `./CLAUDE.md` | 当前项目，可提交到 Git | 每次会话 |
| 本地指令 | `./CLAUDE.local.md` | 仅当前用户，当前项目 | 每次会话，建议加入 `.gitignore` |

> [!NOTE]
> `.claude/rules/` 支持子目录递归发现，所有 `.md` 文件都会被加载。例如 `.claude/rules/frontend/components.md` 和 `.claude/rules/backend/database.md` 都是有效的规则文件。

## CLAUDE.md 与 Rules 的关系

两者都是 Markdown 指令文件，内容会被拼接后注入 Claude 的上下文。区别在于组织方式：

| 方面 | CLAUDE.md | `.claude/rules/` |
|------|-----------|-------------------|
| 结构 | 单文件 | 多文件，按主题拆分 |
| 加载方式 | 每次会话完整加载 | 无 `paths` 时完整加载，有 `paths` 时按需懒加载 |
| 适合内容 | 核心约定、构建命令、项目概述 | 语言规范、目录级指导、大型项目的模块化指令 |
| 建议行数 | 控制在 200 行以内 | 每个文件聚焦一个主题 |

推荐的做法是：`CLAUDE.md` 只保留最核心的约定，补充内容拆分到 `rules/` 中。例如：

```
.claude/
├── CLAUDE.md                  # 核心约定（简短）
└── rules/
    ├── architecture.md        # 架构指导
    ├── code-style.md          # 代码风格
    └── testing.md             # 测试规范
```

## 创建 Rules

每个 Rule 是一个 `.md` 文件，内容为纯 Markdown 指令：

**示例：`.claude/rules/api-design.md`**

```markdown
# API 设计规范

- 所有 API 端点必须包含输入校验
- 使用统一的错误响应格式：`{ code, message, data }`
- RESTful 路径使用 kebab-case
- 分页接口统一使用 `page` 和 `pageSize` 参数
```

也可以使用 YAML Frontmatter 添加元数据（目前主要支持 `paths` 字段）：

```yaml
---
paths:
  - "src/api/**/*.ts"
---

# API 开发规则

- 所有端点必须包含输入校验
- 使用标准错误响应格式
```

## 路径限定规则

通过 `paths` Frontmatter 字段，可以将 Rule 限定为仅在 Claude 读取匹配文件时才加载，节省上下文空间：

```yaml
---
paths:
  - "src/components/**/*.tsx"
  - "src/styles/**/*.css"
---

# 前端组件规范

- 组件使用函数式声明，不使用 class 组件
- 样式优先使用 Tailwind CSS
- 组件文件使用 PascalCase 命名
```

### Glob 模式参考

| 模式 | 匹配范围 |
|------|----------|
| `**/*.ts` | 所有目录下的 TypeScript 文件 |
| `src/**/*` | `src/` 目录下的所有文件 |
| `*.md` | 项目根目录的 Markdown 文件 |
| `src/components/*.tsx` | 特定目录下的 React 组件 |
| `src/**/*.{ts,tsx}` | TypeScript 和 TSX 文件（大括号展开） |

> [!TIP]
> 路径限定规则采用懒加载机制——只在 Claude 实际读取匹配文件时触发，不会在会话开始时占用上下文。这对于大型项目中按目录划分的规则非常有用。

## 加载顺序与优先级

所有规则文件按以下顺序加载，从广到具体：

1. 企业策略 CLAUDE.md（不可排除）
2. 用户级 `~/.claude/CLAUDE.md`
3. 用户级 `~/.claude/rules/*.md`
4. 目录树中的 CLAUDE.md（从文件系统根目录到工作目录逐级加载）
5. 项目级 `.claude/rules/*.md`
6. `CLAUDE.local.md`（追加在同级 CLAUDE.md 之后）

> [!NOTE]
> 所有规则文件是**拼接**而非覆盖关系。当指令冲突时，Claude 会自行判断，通常更具体的指令（后加载的、更接近工作目录的）优先。

## 导入语法

CLAUDE.md 和 Rules 支持 `@path/to/file` 语法引用其他文件的内容：

```markdown
项目概述见 @README.md，可用脚本见 @package.json。
```

- 支持相对路径和绝对路径
- 递归导入最多 5 层

## 注释的使用

Rules 中的注释（`<!-- ... -->`）在注入上下文前会被剥离，不会消耗 token。这适合放置给人看的维护说明：

```markdown
<!-- 此规则由后端团队维护，修改前请先讨论 -->

# 后端规范

- 数据库操作必须使用事务
- N+1 查询视为 bug
```

## 最佳实践

- **CLAUDE.md 保持精简**：控制在 200 行以内，补充内容拆到 Rules
- **一个文件一个主题**：使用描述性文件名，如 `testing.md`、`api-design.md`
- **善用子目录组织**：大型项目可用 `.claude/rules/frontend/`、`.claude/rules/backend/` 分类
- **路径限定节省上下文**：只在特定目录下生效的规则，用 `paths` 限定加载范围
- **指令具体可验证**：「使用 2 空格缩进」优于「格式化代码」
- **避免矛盾指令**：定期审查所有 CLAUDE.md 和 Rules，移除过时或冲突的内容
- **用符号链接共享规则**：多个项目可链接同一份规则目录

```bash
ln -s ~/shared-claude-rules .claude/rules/shared
ln -s ~/company-standards/security.md .claude/rules/security.md
```
