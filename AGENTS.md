# Agent instructions for my-magical-vip

## Feature behavior specs

- Store repository Gherkin specs under `features/` using kebab-case file and directory names.
- Every user-visible feature change must create a new `.feature` file or update an existing one in the same change.
- Prefer updating an existing feature file when the behavior belongs to an established area rather than creating duplicates.
- Write declarative Gherkin that describes observable business behavior, not implementation details, selectors, or internal APIs.
- Keep scenarios focused on outcomes a stakeholder can verify. Use `Background` only for shared context that materially improves readability.
- When feature behavior is being implemented, prefer the `@gherkin-feature-writer` agent or `/gherkin-feature-spec` skill to create or revise the spec.

## Spec Kit workflow

- Spec Kit is installed in this repository through `.specify/`, `.github/prompts/`, and the `speckit.*` agents.
- Use Spec Kit for feature discovery, clarification, planning, and task breakdown in `specs/`.
- Do not use Spec Kit artifacts as a replacement for `features/*.feature`; the Gherkin files remain the canonical acceptance criteria for shipped behavior.
