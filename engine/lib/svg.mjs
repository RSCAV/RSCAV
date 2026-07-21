// SVG assembly helpers.

import { readFileSync } from 'node:fs'
import { fontFace, Charset } from './font.mjs'
import { paletteCss } from './tokens.mjs'
import { ditherDefs, ditherCss, tone, LEVELS } from './dither.mjs'
import { REDUCED } from './motion.mjs'

// Real advance widths per weight, pulled from InterVariable at build time.
// Guessing at text width is how a lime highlight block ends up two thirds the
// length of the word it is meant to sit behind.
const METRICS = JSON.parse(readFileSync(new URL('../data/inter-metrics.json', import.meta.url), 'utf8'))
const WEIGHTS = Object.keys(METRICS).map(Number).sort((a, b) => a - b)

const nearestWeight = (w) =>
  WEIGHTS.reduce((best, x) => (Math.abs(x - w) < Math.abs(best - w) ? x : best), WEIGHTS[0])

/** Width of a string in user units, tracking included. */
export function measure(str, { size = 14, weight = 400, track = 0 } = {}) {
  const t = METRICS[nearestWeight(weight)]
  let em = 0
  let count = 0
  for (const ch of String(str)) {
    em += t[ch] ?? t['n'] ?? 0.55
    count++
  }
  return em * size + Math.max(0, count - 1) * track
}

export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const n = (v) => (Math.round(v * 100) / 100).toString()

/**
 * A scene collects markup and the glyphs it needs, then seals itself into a
 * standalone SVG with the font subset inlined.
 */
export class Scene {
  constructor({ w, h, title }) {
    this.w = w
    this.h = h
    this.title = title
    this.cs = new Charset()
    this.defs = []
    this.css = []
    this.body = []
    this.usedDither = new Set()
  }

  /**
   * Ask for a dither level and get back the class that paints it in whichever
   * theme the reader is using. Records the pair so only what is used ships.
   */
  dither(ramp, t) {
    const lv = tone(t)
    if (lv <= 0) return null
    const level = Math.min(lv, LEVELS)
    this.usedDither.add(`${ramp}:${level}`)
    return `${ramp}${level}`
  }

  def(s) {
    this.defs.push(s)
    return this
  }
  style(s) {
    this.css.push(s)
    return this
  }
  add(s) {
    this.body.push(s)
    return this
  }

  /** Register text for subsetting and return it escaped. */
  t(s) {
    this.cs.add(s)
    return esc(s)
  }

  text(str, { x, y, size = 14, weight = 400, fill, anchor = 'start', track = 0, cls = '', opacity, italic = false, extra = '' } = {}) {
    const body = this.t(str)
    const attrs = [
      `x="${n(x)}"`,
      `y="${n(y)}"`,
      `font-size="${n(size)}"`,
      `font-weight="${weight}"`,
      fill ? `fill="${fill}"` : '',
      anchor !== 'start' ? `text-anchor="${anchor}"` : '',
      track ? `letter-spacing="${n(track)}"` : '',
      cls ? `class="${cls}"` : '',
      opacity != null ? `opacity="${opacity}"` : '',
      italic ? `font-style="italic"` : '',
      extra,
    ]
      .filter(Boolean)
      .join(' ')
    this.body.push(`<text ${attrs}>${body}</text>`)
    return this
  }

  /**
   * Accent text, following the brand's own highlight rule: on dark it is lime
   * type on the background; on light it is ink type on a lime block. One call
   * emits both, with the block sized from real font metrics.
   */
  accentText(str, { x, y, size = 11.5, weight = 700, track = 0, anchor = 'start', cls = '', extra = '' } = {}) {
    const w = measure(str, { size, weight, track })
    const padX = size * 0.5
    const padTop = size * 0.78
    const padBottom = size * 0.34
    const bx = anchor === 'end' ? x - w - padX : anchor === 'middle' ? x - w / 2 - padX : x - padX
    this.body.push(
      `<rect class="accBlock${cls ? ` ${cls}` : ''}"${extra ? ` ${extra.trim()}` : ''} x="${n(bx)}" y="${n(y - padTop)}" ` +
        `width="${n(w + padX * 2)}" height="${n(padTop + padBottom)}"/>`
    )
    return this.text(str, { x, y, size, weight, track, anchor, cls: `accInk${cls ? ` ${cls}` : ''}`, extra })
  }

  render() {
    const face = this.cs.chars.size > 1 ? fontFace(this.cs.text) : ''
    const css =
      face + paletteCss() + ditherCss(this.usedDither) + this.css.join('') + REDUCED
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" ` +
      `viewBox="0 0 ${this.w} ${this.h}" width="${this.w}" height="${this.h}" ` +
      `role="img" aria-label="${esc(this.title)}">` +
      `<title>${esc(this.title)}</title>` +
      `<defs>${ditherDefs(this.usedDither)}${this.defs.join('')}</defs>` +
      `<style>${css}</style>` +
      this.body.join('') +
      `</svg>`
    )
  }
}

/** Rounded-corner rect path (all corners equal). */
export function rrect(x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2)
  return (
    `M${n(x + rr)},${n(y)}H${n(x + w - rr)}A${n(rr)},${n(rr)} 0 0 1 ${n(x + w)},${n(y + rr)}` +
    `V${n(y + h - rr)}A${n(rr)},${n(rr)} 0 0 1 ${n(x + w - rr)},${n(y + h)}` +
    `H${n(x + rr)}A${n(rr)},${n(rr)} 0 0 1 ${n(x)},${n(y + h - rr)}` +
    `V${n(y + rr)}A${n(rr)},${n(rr)} 0 0 1 ${n(x + rr)},${n(y)}Z`
  )
}

export function poly(pts) {
  return pts.map(([x, y]) => `${n(x)},${n(y)}`).join(' ')
}

/** Deterministic PRNG so every rebuild produces the identical world. */
export function rng(seed) {
  let s = seed >>> 0
  return () => {
    s ^= s << 13
    s >>>= 0
    s ^= s >> 17
    s ^= s << 5
    s >>>= 0
    return s / 4294967296
  }
}
