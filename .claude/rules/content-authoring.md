---
paths:
  - "docs/nav/**/*.md"
---

# Content Authoring

## Adding New Content

1. Create a `.md` file in the appropriate `/docs/nav/` subdirectory
2. If adding a new top-level section, update `config.mts` navigation
3. If using auto-nav generation, update `meta.json` for naming/ordering
4. Use markdown with Mermaid/PlantUML/MathJax as needed

## Adding Diagrams

- **Mermaid**: Use ` ```mermaid ` blocks for flowcharts, sequence diagrams, etc.
- **PlantUML**: Use ` ```plantuml ` blocks for UML diagrams (renders via plantuml.com)
  - Do NOT use `@startuml`/`@enduml` markers inside the code block
- **SVG Assets**: Store in `docs/nav/assets/` and reference in markdown
