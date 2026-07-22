// Ordered (Bayer) dithering as SVG <pattern> defs.
//
// The brand forbids gradients, so every tonal ramp in this world is a dither
// ramp instead. Patterns tile from the user-space origin, which means two
// shapes filled with the same level share one continuous dot grid - the join
// between them disappears the way it would on a printed halftone.
//
// Bayer levels are nested: every dot in level N is also in level N+1. So each
// level is emitted as the handful of dots it *adds*, and level N is
// <use>-composed from level N-1. The whole 12-step ramp costs one 64-dot grid
// rather than twelve overlapping copies of it.

import { n } from './svg.mjs'
import { DITHER_INK } from './tokens.mjs'

const BAYER8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]

export const LEVELS = 12
export const CELL = 3
export const TILE = CELL * 8

/** Map a 0..1 tone to a 0..LEVELS step. */
export const tone = (t) => Math.max(0, Math.min(LEVELS, Math.round(t * LEVELS)))

/** Dots added at each level, as compact path data. */
function deltas(cell) {
  const out = []
  for (let lv = 1; lv <= LEVELS; lv++) {
    const lo = ((lv - 1) / LEVELS) * 64
    const hi = (lv / LEVELS) * 64
    let d = ''
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const v = BAYER8[y][x]
        if (v >= lo && v < hi) d += `M${x * cell} ${y * cell}h${cell}v${cell}h-${cell}z`
      }
    }
    out.push(d)
  }
  return out
}

/**
 * Emit defs for exactly the (ramp, level) pairs a scene asked for.
 * @param used Set of "ramp:level" strings, collected by Scene.dither()
 */
export function ditherDefs(used, cell = CELL) {
  if (!used || used.size === 0) return ''

  const ramps = new Set()
  let maxLevel = 0
  for (const k of used) {
    const [r, lv] = k.split(':')
    ramps.add(r)
    maxLevel = Math.max(maxLevel, +lv)
  }

  const dl = deltas(cell)
  let out = ''

  // the shared dot geometry, once
  for (let lv = 1; lv <= maxLevel; lv++) {
    if (dl[lv - 1]) out += `<path id="k${lv}" d="${dl[lv - 1]}"/>`
  }
  // cumulative stacks
  for (let lv = 1; lv <= maxLevel; lv++) {
    out +=
      `<g id="s${lv}">` +
      (lv > 1 ? `<use href="#s${lv - 1}"/>` : '') +
      (dl[lv - 1] ? `<use href="#k${lv}"/>` : '') +
      `</g>`
  }
  // one wrapper per requested pair, per theme, coloured at the pattern
  const t = cell * 8
  for (const key of used) {
    const [ramp, lvStr] = key.split(':')
    const lv = +lvStr
    for (const [prefix, inks] of [
      ['d', DITHER_INK.dark],
      ['l', DITHER_INK.light],
    ]) {
      out +=
        `<pattern id="${prefix}_${ramp}_${lv}" width="${t}" height="${t}" patternUnits="userSpaceOnUse">` +
        `<g fill="${inks[ramp]}"><use href="#s${lv}"/></g></pattern>`
    }
  }
  return out
}

/** CSS binding each used pair to its per-theme pattern. */
export function ditherCss(used) {
  if (!used || used.size === 0) return ''
  const rule = (prefix) =>
    [...used]
      .map((k) => {
        const [r, lv] = k.split(':')
        return `.${r}${lv}{fill:url(#${prefix}_${r}_${lv})}`
      })
      .join('')
  return rule('d') + `@media (prefers-color-scheme:light){${rule('l')}}`
}

/**
 * A vertical dither ramp built from horizontal slices. The no-gradient sky.
 * Slices overlap slightly so float rounding cannot open a hairline seam.
 */
export function rampV(scene, { ramp, x, y, w, h, from, to, steps = 16 }) {
  let out = ''
  const sh = h / steps
  for (let i = 0; i < steps; i++) {
    const p = steps === 1 ? 0 : i / (steps - 1)
    const cls = scene.dither(ramp, from + (to - from) * p)
    if (!cls) continue
    out += `<rect class="${cls}" x="${n(x)}" y="${n(y + i * sh)}" width="${n(w)}" height="${n(sh + 0.6)}"/>`
  }
  return out
}

/** Horizontal equivalent, for chart washes and edge fades. */
export function rampH(scene, { ramp, x, y, w, h, from, to, steps = 16 }) {
  let out = ''
  const sw = w / steps
  for (let i = 0; i < steps; i++) {
    const p = steps === 1 ? 0 : i / (steps - 1)
    const cls = scene.dither(ramp, from + (to - from) * p)
    if (!cls) continue
    out += `<rect class="${cls}" x="${n(x + i * sw)}" y="${n(y)}" width="${n(sw + 0.6)}" height="${n(h)}"/>`
  }
  return out
}
