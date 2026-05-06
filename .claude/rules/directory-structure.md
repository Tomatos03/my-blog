---
paths:
  - "docs/nav/**/*.md"
---

# Content Module Directory Structure

## Overview

All content modules use a standardized directory structure. Each content topic gets its own directory with an `index.md` file. The `assets/` subdirectory is only created when the content includes SVG diagrams, images, or other asset files.

## Directory Structure

```
docs/nav/languages/python/
├── compound-types/                    # Content module directory (lowercase, words separated by "-")
│   ├── index.md                       # Main document (must be named index.md)
│   └── assets/                        # Assets directory (only when assets exist)
│       ├── indexing-concept.svg       # SVG diagrams
│       └── ...
├── data-type/                         # Single-file content also gets its own directory
│   └── index.md
├── string/
│   └── index.md
└── exception/
    ├── index.md
    └── assets/
        └── error-handling.svg
```

## Rules

### 1. Directory Naming
- Use lowercase letters
- Separate multiple words with `-` (e.g., `compound-types`, `data-structures`)
- Name should be concise and reflect the content topic
- **Do not repeat parent directory prefix** in subdirectory names (e.g., use `data-type` not `python-data-type` under `languages/python/`)

### 2. Main Document File
- **Must** be named `index.md`
- Contains all content and documentation
- Navigation link in `config.mts` points to the directory path (with trailing `/`)

### 3. Asset Management
- Only create `assets/` directory when the content actually includes asset files
- Do **not** create an empty `assets/` directory
- All asset files go in the `assets/` subdirectory
- Supported asset types:
  - SVG diagrams (`.svg`)
  - Images (`.png`, `.jpg`, `.gif`)
  - Other media files

### 4. Asset References
In `index.md`, reference assets using relative paths:

```markdown
![Description](./assets/indexing-concept.svg)
```

### 5. Navigation Configuration

In `config.mts`, point to the directory, not the file:

```javascript
// ✅ Correct
{ text: 'Python容器类型', link: '/nav/languages/python/compound-types/' }

// ❌ Wrong
{ text: 'Python容器类型', link: '/nav/languages/python/compound-types/index.md' }
```

## When to Use This Structure

### Always use this structure:
- ✅ All content modules, regardless of whether they have assets
- ✅ Single-file content without assets (directory + `index.md`)
- ✅ Content with SVG diagrams or images (directory + `index.md` + `assets/`)

### Don't use:
- ❌ Standalone `.md` files outside of a directory

## Examples

### Example 1: Single-file Content (No Assets)

```
languages/python/data-type/
└── index.md                           # Complete documentation, no assets needed
```

### Example 2: Content with Assets

```
languages/python/compound-types/
├── index.md                           # Complete documentation for list, tuple, dict, set
└── assets/
    └── indexing-concept.svg           # Indexing concept diagram
```

### Example 3: Shared Assets (Multiple Files)

When multiple content modules share assets, keep the `assets/` directory at the parent level:

```
languages/css/
├── assets/                            # Shared assets directory
│   ├── box-model.svg
│   ├── flexbox-concept.svg
│   └── grid-layout.svg
├── selector/
│   └── index.md
├── box-model/
│   └── index.md
└── layout/
    └── index.md
```

### Example 4: Section Root as Index (No Redundant Subdirectory)

When a section directory itself IS the main topic (not just a container for subtopics), place `index.md` directly in the section root. Do NOT create a redundant subdirectory with the same name.

```
system-architecture/distributed/
├── index.md                           # Main topic: distributed system overview
├── cluster-architecture/              # Subtopic
│   └── index.md
└── microservice-architecture/         # Subtopic
    └── index.md
```

**Why**: Creating `distributed/distributed-system/index.md` adds unnecessary nesting when `distributed/` already represents the "distributed system" topic. The section directory name itself conveys the topic.

**How to apply**: When a section has both a main overview page and subtopic pages, place the overview `index.md` in the section root. Subtopics go in their own subdirectories.

## Migration Guide

To migrate existing single-file content:

1. Create new directory: `mkdir docs/nav/path/module-name`
2. Move content: Move original `.md` file content into `index.md` in the new directory
3. If assets are needed:
   - Create `assets/` directory: `mkdir docs/nav/path/module-name/assets`
   - Move asset files to `assets/` directory
   - Update asset reference paths in `index.md`
4. Update navigation link in `config.mts`
5. Delete the original `.md` file

## Best Practices

- Keep `assets/` directory clean, containing only used resources
- Use lowercase filenames with `-` for multiple words
- Regularly review and remove unused asset files
- Clearly document the purpose of each asset in `index.md`
- Never create empty `assets/` directories
