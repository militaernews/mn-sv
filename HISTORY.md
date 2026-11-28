# Repository history

The three tools moved into this repository with **full, un-squashed history** via `git subtree add`.

| App           | Old repository          | Tip carried over                           | Commits | Missing from mn-sv |
| ------------- | ----------------------- | ------------------------------------------ | ------- | ------------------ |
| `apps/viz`    | `militaernews/viz-sv`   | `f192e693502ce7e67d98e17cb175eb0b113924ec` | 77      | 0                  |
| `apps/geo`    | `militaernews/geo-sv`   | `e0a2eed735fad72f94b338eb907cdc927831a583` | 85      | 0                  |
| `apps/charts` | `militaernews/chart-sv` | `b294e09196acb54009c17469e858b615013e59e4` | 30      | 0                  |

Verified by comparing every commit ID reachable from each old tip against `git rev-list HEAD`: no commit is missing.

`newsmix`, `tartaros` and `litfass` remain separate apps/bots and were intentionally not moved here.
