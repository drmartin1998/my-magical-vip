---
applyTo: "features/**/*.feature"
---

# Gherkin feature file instructions

- Write declarative Gherkin that describes observable business behavior.
- Prefer domain language over UI mechanics, implementation details, selectors, component names, or internal APIs.
- Keep `Feature`, optional `Rule`, and scenarios concise and stakeholder-readable.
- Use `Background` sparingly and only when it meaningfully reduces repetition.
- Update or remove stale scenarios when behavior changes; do not leave conflicting expectations in the same file.
- Prefer extending an existing feature file in the same area before creating a duplicate spec elsewhere.
