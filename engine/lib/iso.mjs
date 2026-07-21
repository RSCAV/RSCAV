// Axonometric projection for the contribution city.
//
// A true 45-degree isometric turns 53 weeks x 7 days into a long thin diagonal
// ribbon that wastes most of a README's width. This is a wide dimetric
// instead: weeks run nearly horizontal, weekdays fall away to the lower right.
// The result is a city block seen from a low angle, 53 weeks wide, which is
// exactly the shape the page wants.

import { n, poly } from './svg.mjs'

export const CW = 19 // cell width along the week axis
export const SX = 7.5 // horizontal skew per weekday
export const SY = 11 // vertical drop per weekday

/** Grid corner -> screen. */
export const P = (col, row) => [col * CW + row * SX, row * SY]

export const cityWidth = (weeks) => (weeks + 1) * CW + 7 * SX
export const cityDepth = () => 7 * SY

/**
 * One extruded block. Three flat-shaded faces - no gradients, so depth is
 * carried by three discrete tones. The base point is returned so the caller
 * can set a transform-origin and have the building grow out of its own lot.
 */
export function block({ col, row, h, inset = 1.1, top, right, front, roofline = null, cls = '', delay = null }) {
  const [x, y] = P(col, row)
  const i = inset
  // footprint, inset so neighbouring lots read as separate plots
  const A = [x + i, y + i]
  const B = [x + CW - i, y + i]
  const Cc = [x + CW + SX - i, y + SY - i]
  const D = [x + SX + i, y + SY - i]
  const up = ([px, py]) => [px, py - h]

  const faces =
    `<polygon class="${front}" points="${poly([up(D), up(Cc), Cc, D])}"/>` +
    `<polygon class="${right}" points="${poly([up(B), up(Cc), Cc, B])}"/>` +
    `<polygon class="${top}" points="${poly([up(A), up(B), up(Cc), up(D)])}"/>` +
    // a lit roof edge rather than a filled lime roof - the brand keeps the
    // accent to a line, never a full surface
    (roofline
      ? `<polyline class="${roofline}" fill="none" stroke-width="1.6" ` +
        `points="${poly([up(D), up(Cc), up(B)])}"/>`
      : '')

  // the growth transform scales about the front-bottom edge of the lot
  const ox = x + SX / 2 + CW / 2
  const oy = y + SY

  return {
    markup: cls
      ? `<g class="${cls}" style="transform-origin:${n(ox)}px ${n(oy)}px${
          delay != null ? `;animation-delay:${delay.toFixed(2)}s` : ''
        }">${faces}</g>`
      : faces,
    x,
    y,
    topY: y - h,
    centerX: ox,
  }
}

/** Flat lot for a day with no contributions. */
export function lot({ col, row, inset = 1.1, cls }) {
  const [x, y] = P(col, row)
  const i = inset
  return `<polygon class="${cls}" points="${poly([
    [x + i, y + i],
    [x + CW - i, y + i],
    [x + CW + SX - i, y + SY - i],
    [x + SX + i, y + SY - i],
  ])}"/>`
}

/**
 * Lit windows on the front face, on that face's own skewed grid.
 * Returns markup and the running index so lighting stays staggered across
 * the whole city rather than restarting per building.
 */
/**
 * Lit windows down the centre of the front face.
 *
 * At this scale a front face is only about seven pixels wide, so a grid of
 * windows reads as scattered noise. One centred column on tall buildings only
 * reads as a lit tower, which is the point.
 */
export function windows({ col, row, h, cls, index = 0, seed = 1 }) {
  if (h < 46) return { markup: '', next: index }
  const [x, y] = P(col, row)
  const rows = Math.min(5, Math.floor((h - 18) / 11))
  if (rows <= 0) return { markup: '', next: index }

  let s = (seed * 2654435761) >>> 0
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }

  let out = ''
  let i = index
  const f = 0.5
  const wx = x + SX * f + CW / 2 - 1.2
  for (let r = 0; r < rows; r++) {
    if (rand() > 0.7) continue
    const wy = y + SY * f - h + 12 + r * 11
    out +=
      `<rect class="w" style="animation-delay:${((i % 61) * 0.23).toFixed(2)}s" ` +
      `x="${n(wx)}" y="${n(wy)}" width="2.4" height="3"/>`
    i++
  }
  return { markup: out ? `<g class="${cls}">${out}</g>` : '', next: i }
}
