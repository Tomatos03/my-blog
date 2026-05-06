---
paths:
  - "docs/.vitepress/config.mts"
---

# VitePress Configuration

## Updating Navigation

Edit `config.mts` directly for the hardcoded navigation structure. To use auto-generation:

1. Uncomment the import in `config.mts`
2. Update `meta.json` with display names and sort order
3. Call `autoGenerateNavItems()` in the config
