# Animation plans

| # | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Add three mark animation variants to the lab | LOW | DONE |
| 002 | Add grounded qalam swipe variations to the lab | LOW | DONE |

## Execution order

1. `001` done — A–E lab variants landed.
2. Run `002-qalam-swipe-variations.md` next (lab only). Keeps F’s hard mask swipe; adds G/H/I timing dialects only.
3. After human picks a winner among F–I (or earlier A–E), open a **new** plan to port into `index.html` `.mark-thinking`. Do not improvise that port inside 002.

## Dependencies

- 002 assumes F’s mask wipe (`@property --qalam-wipe`, 135deg hard edge) already exists in `animation-lab.html`. If F is missing or reverted to clip-path/stroke, fix F first or stop per plan boundaries.

## How to execute

From chat: `/improve-animations execute 002` or hand `plans/002-qalam-swipe-variations.md` to any agent.
