# Animation plans

| # | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Add three mark animation variants to the lab | LOW | DONE |
| 002 | Add grounded qalam swipe variations to the lab | LOW | DONE |
| 003 | Port winner J (think, then hand over) to site | LOW | DONE |

## Winner

**J · think, then hand over** is the official Phikra brand motion on `index.html` (`.mark-thinking`).

Sequence: qalam write → bouncing-dots think → hand over to **You**.

Lab keeps A–I as alternatives; J stays marked as winner.

## Inspiration agencies (showcase)

| Agency | URL |
| --- | --- |
| Immersive Garden | https://immersive-g.com/ |
| BASIC | https://www.basicagency.com/ |
| Flabbergast | https://flabbergast.agency/ |
| Ribbit | https://ribbit.dk/ |
| Plus X | https://www.plus-ex.com/ |
| Haus | https://madeinhaus.com/ |
| Atoll | https://atoll.studio/ |
| Extract | https://www.extract.studio/ |

Links live in `animation-lab.html` under Inspiration.

## Entry

`loader.html` — standalone brand dots (one cycle), then fades into `index.html` site layer.

First visit each session: `index.html` redirects to `loader.html` until `sessionStorage.phikra-loader === "done"`.
