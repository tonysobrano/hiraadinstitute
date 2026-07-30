# Project Instructions

## Mobile responsive quality gate

- The document must never scroll horizontally at viewport widths from 320px through 430px.
- Fix the element that causes overflow; do not rely only on hiding overflow at the document root.
- For single-column CSS Grid layouts, use `minmax(0, 1fr)` instead of `1fr`. Add `min-width: 0` to grid or flex children that contain long text, media, or fixed-width descendants.
- Do not use `100vw` inside padded containers. Prefer `width: 100%` with `max-width: 100%` and global `box-sizing: border-box`.
- Fixed-width content must have a responsive cap such as `max-width: 100%`.
- Off-canvas drawers and translated elements must be contained by a viewport-sized wrapper with clipped or hidden overflow.
- Flex rows must wrap or collapse before their content can exceed the viewport.
- After responsive UI changes, test at 320px, 375px, 390px, and 430px. At each width, verify:

  ```js
  document.documentElement.scrollWidth === document.documentElement.clientWidth
  ```
