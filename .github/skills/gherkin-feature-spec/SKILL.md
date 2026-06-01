---
name: gherkin-feature-spec
description: "Create or update a declarative Gherkin feature file for a user-visible behavior change in this repository. Use when implementing a new feature, refining acceptance criteria, or keeping an existing .feature spec aligned with code changes."
license: MIT
infer: true
---

You are applying the `gherkin-feature-spec` skill for `my-magical-vip`.

## Goal

Keep repository behavior specifications current by creating or updating a `.feature` file under `features/` whenever user-visible functionality changes.

## Use this skill when

- A new feature is being implemented
- Acceptance criteria need to be captured as Gherkin
- Existing behavior changed and the current `.feature` file is now stale
- You need to express expected behavior in stakeholder-readable scenarios

## Workflow

1. Identify the externally observable behavior that changed.
2. Search `features/` for an existing `.feature` file that already covers the same area.
3. If a matching file exists, update it in place; otherwise create a new `features/<area>/<name>.feature` file.
4. Write declarative Gherkin:
   - describe business intent and outcomes
   - prefer stable domain language
   - avoid implementation details, selectors, and internal APIs
5. Use the smallest clear structure that fits:
   - `Feature` for the capability
   - `Rule` for distinct business constraints when useful
   - `Background` only for shared setup that improves readability
   - `Scenario` or `Scenario Outline` for examples of observable behavior
6. If old scenarios no longer match the product, revise or remove them rather than layering contradictory cases on top.
7. Ensure the final file reflects the current code change before you stop.

## Writing standards

- Prefer behavior over procedure
- Prefer outcomes over UI choreography
- Keep scenarios independent and readable
- Name scenarios after the business result being demonstrated
- Include negative or boundary cases only when they clarify the rule

## Output

- The `.feature` file path that was created or updated
- A short note describing the behaviors captured or changed
