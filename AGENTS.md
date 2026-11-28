# AGENTS.md

## Commit messages

Every commit must use this exact format:

```
type(scope): What was changed
```

- `type` is one of: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`.
- `scope` is required and names the affected area (for example `site`, `apps/viz`, `apps/geo`, `apps/charts`, `bot`, `docs`, `deps`, `monorepo`).
- The description starts with a capital letter, is one line, and says what changed in the past tense or imperative: `Add`, `Fix`, `Move`, `Remove`, `Update`.
- No merge-style or free-form messages such as `update`, `wip`, or `fix stuff`.

Examples:

```
feat(monorepo): Add viz, geo and charts as workspace packages
fix(site): Correct channel avatar links
docs(changelog): Group entries by date
chore(deps): Bump dependencies and pin TypeScript 6.0.3
```
