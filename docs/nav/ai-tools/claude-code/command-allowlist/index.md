# 命令白名单

Claude Code 在执行 Bash 命令、调用 MCP 工具等操作时，默认会弹出权限确认提示。通过配置命令白名单（Allowlist），可以让 Claude 自动放行已授权的操作，减少交互中断。

## 配置位置

白名单定义在 `settings.json` 或 `settings.local.json` 的 `permissions.allow` 数组中：

```json
{
    "permissions": {
        "allow": [
            "Bash(pnpm docs:build)",
            "Bash(git add *)",
            "Bash(git commit *)"
        ]
    }
}
```

| 文件 | 路径 | 作用域 |
|------|------|--------|
| 项目级 | `<项目>/.claude/settings.json` | 仅当前项目，可提交到 Git |
| 项目本地 | `<项目>/.claude/settings.local.json` | 仅当前项目，不提交到 Git |
| 用户级 | `~/.claude/settings.json` | 所有项目通用 |

项目本地配置（`settings.local.json`）不会被 Git 追踪，适合存放个人偏好或敏感权限。

## 权限格式

### Bash 命令

```
Bash(<命令模式>)
```

支持通配符 `*` 匹配参数：

```json
{
    "permissions": {
        "allow": [
            "Bash(pnpm docs:build)",
            "Bash(pnpm docs:dev)",
            "Bash(git add *)",
            "Bash(git commit *)",
            "Bash(git mv *)",
            "Bash(npm test *)"
        ]
    }
}
```

- `Bash(git add *)`：允许所有 `git add` 操作
- `Bash(pnpm docs:build)`：只允许精确的构建命令

### MCP 工具

```
mcp__<server>__<tool>
```

```json
{
    "permissions": {
        "allow": [
            "mcp__context7__query-docs",
            "mcp__context7__resolve-library-id",
            "mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_pages",
            "mcp__plugin_chrome-devtools-mcp_chrome-devtools__navigate_page",
            "mcp__plugin_chrome-devtools-mcp_chrome-devtools__take_screenshot"
        ]
    }
}
```

### 其他工具

```json
{
    "permissions": {
        "allow": [
            "WebSearch",
            "WebFetch(domain:github.com)",
            "WebFetch(domain:raw.githubusercontent.com)"
        ]
    }
}
```

`WebFetch` 可通过 `domain:` 前缀限制允许访问的域名。

**实际示例:**

以下是一个完整的项目级配置：

```json
{
    "permissions": {
        "allow": [
            "Bash(pnpm docs:build)",
            "Bash(git mv *)",
            "Bash(git add *)",
            "Bash(git reset *)",
            "Bash(git commit *)",
            "mcp__context7__query-docs",
            "mcp__context7__resolve-library-id",
            "WebSearch",
            "WebFetch(domain:github.com)"
        ]
    }
}
```

> [!TIP] 安全建议
> - 通配符要谨慎使用，`Bash(*)` 会放行所有命令，存在安全风险
> - 只白名单高频使用且安全的命令，如 `git`、`pnpm build` 等
> - 避免将 `rm -rf`、`curl` 外部资源等命令加入白名单
> - 敏感操作（如部署、数据库操作）保持手动确认
