# Architecture & Key Concepts

## VitePress Configuration (docs/.vitepress/config.mts)

- **Markdown Plugins**: Integrates Mermaid (diagrams), MathJax3 (math), and PlantUML (UML diagrams)
- **Theme**: Catppuccin color scheme (latte for light mode, macchiato for dark mode)
- **Navigation**: Hardcoded in config.mts with nested items and sidebars per section
- **Search**: Local search provider (no external service)
- **Tailwind CSS**: Integrated via @tailwindcss/vite plugin

## Navigation System

Navigation is defined in `config.mts` with two parts:

1. **Top nav** (`themeConfig.nav`): Main menu items with dropdowns
2. **Sidebars** (`themeConfig.sidebar`): Context-specific navigation per route prefix (e.g., `/nav/uml/`, `/nav/languages/Java/`)

The `generateNav.ts` utility can auto-generate navigation from the file structure using `meta.json` for naming and ordering, but it's currently commented out in the config.

## Content Organization

Content is organized hierarchically in `/docs/nav/`. Each section has:

- Markdown files (`.md`) for content
- Subdirectories for grouping related topics
- SVG assets in `assets/` subdirectories for diagrams

The `meta.json` file controls:

- `file_or_dir_name_map`: Display names for files/directories
- `order`: Sort order for navigation items
- `exclude_files`: Files to skip when generating navigation

## Theme & Styling

- **Base Theme**: VitePress default theme extended in `docs/.vitepress/theme/index.ts`
- **Tailwind CSS**: Full Tailwind v4 integration for utility-first styling
- **Custom CSS**: `docs/.vitepress/theme/style/index.css` for animations and overrides
- **Vue Components**: Custom components like `QAList` registered globally in theme setup
- **Rainbow Animation**: Homepage has a CSS animation applied via router watch

## Markdown Features

- **Mermaid**: Render diagrams with ` ```mermaid ` code blocks
- **PlantUML**: Render UML with ` ```plantuml ` code blocks (custom plugin)
- **MathJax3**: Render math with `$...$` (inline) or `$$...$$` (block)
- **Standard Markdown**: All VitePress markdown features supported
