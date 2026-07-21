// Band - THE SKYLINE ROW. The navigation, and the one genuinely interactive
// surface a README can have.
//
// An SVG embedded as <img> cannot receive a click, so a single skyline image
// could never be clickable per building. Instead each tower is its own image
// wrapped in its own <a>, sized in percentages that sum to 100. Inline images
// with no whitespace between them butt together with zero gap, so seven
// separate files render as one continuous skyline that happens to have seven
// independent links in it.
//
// Tower widths are multiples of the 24-unit dither tile and the percentages
// are proportional to those widths, so every tile scales by the same factor
// and the dot grid runs unbroken across the seams.

import { Scene, n, measure } from '../lib/svg.mjs'
import { TYPE, TRACK } from '../lib/tokens.mjs'
import { rampV } from '../lib/dither.mjs'
import { propiedashMark } from '../lib/skyline.mjs'
import { WINDOWS, STARS } from '../lib/motion.mjs'
import { rng } from '../lib/svg.mjs'
import { VENTURES } from '../data/ventures.mjs'

const H = 300
const GROUND = 246 // shared across every tile so the street line is continuous
const MAX_TOWER = 196

export function towerTiles() {
  return VENTURES.map((v, i) => ({
    name: `02-tower-${v.key}`,
    svg: tower(v, i),
    venture: v,
  }))
}

function tower(v, i) {
  const w = v.towerW
  const s = new Scene({ w, h: H, title: `${v.name} - ${v.tagline}` })
  s.style(WINDOWS + STARS)

  s.add(`<rect class="bg" width="${w}" height="${H}"/>`)

  // sky: same ramp geometry in every tile, so the tone matches across seams
  s.add(rampV(s, { ramp: 'sky', x: 0, y: 24, w, h: GROUND - 24, from: 0, to: 0.4, steps: 14 }))

  const bh = Math.round(MAX_TOWER * v.weight)
  const by = GROUND - bh
  const pad = 10
  const bw = w - pad * 2

  // massing: a slab with a setback crown, so the row does not read as a bar chart
  const crownH = Math.max(8, Math.round(bh * 0.11))
  const crownW = Math.round(bw * 0.46)
  s.add(
    `<g class="near">` +
      `<rect x="${pad}" y="${by}" width="${bw}" height="${bh}"/>` +
      `<rect x="${pad + (bw - crownW) / 2}" y="${by - crownH}" width="${crownW}" height="${crownH}"/>` +
      `<rect x="${pad + bw / 2 - 0.8}" y="${by - crownH - 16}" width="1.6" height="16"/>` +
      `</g>`
  )
  // lit roof edge, the accent kept to a line
  s.add(`<rect class="acc" x="${pad}" y="${by - 1.5}" width="${bw}" height="1.5"/>`)

  // windows
  const rand = rng(1000 + i * 37)
  let wins = ''
  const cols = Math.max(2, Math.floor((bw - 14) / 13))
  const rows = Math.max(1, Math.floor((bh - 18) / 15))
  let k = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rand() > 0.42) continue
      const wx = pad + 9 + c * 13
      const wy = by + 14 + r * 15
      if (wx + 4 > pad + bw - 7) continue
      const breathes = rand() > 0.72
      wins +=
        `<rect${breathes ? ` class="w" style="animation-delay:${((k % 29) * 0.33).toFixed(2)}s"` : ''}` +
        ` x="${n(wx)}" y="${n(wy)}" width="4" height="4.6" opacity="${rand() > 0.5 ? '.85' : '.45'}"/>`
      k++
    }
  }
  s.add(`<g class="acc">${wins}</g>`)

  // the flagship carries the mark on its facade
  if (v.mark) {
    s.add(propiedashMark({ x: pad + bw / 2 - 22, y: by + bh * 0.42, size: 44, cls: 'acc' }))
  }

  // street
  s.add(`<rect class="ground" y="${GROUND}" width="${w}" height="${H - GROUND}"/>`)
  s.add(`<rect class="hair" y="${GROUND}" width="${w}" height="1"/>`)

  // plaque: name, then role. Shrink the type rather than let it clip.
  let size = TYPE.micro
  let track = TRACK.micro
  while (measure(v.name, { size, weight: 700, track }) > w - 16 && size > 6.2) {
    size -= 0.35
    track = Math.max(0.6, track - 0.12)
  }
  s.text(v.name, {
    x: w / 2,
    y: GROUND + 24,
    size,
    weight: 700,
    cls: 'ink',
    anchor: 'middle',
    track,
  })
  s.text(v.status, {
    x: w / 2,
    y: GROUND + 40,
    size: 8,
    weight: 600,
    cls: 'faint',
    anchor: 'middle',
    track: 1.4,
  })

  return s.render()
}

/** The markdown for the row: percentages proportional to natural widths. */
export function towersMarkdown(tiles) {
  const total = tiles.reduce((a, t) => a + t.venture.towerW, 0)
  return (
    `<p align="center">` +
    tiles
      .map((t) => {
        const pct = ((t.venture.towerW / total) * 99.6).toFixed(3)
        return (
          `<a href="${t.venture.href}" title="${t.venture.name} - ${t.venture.tagline}">` +
          `<img src="assets/gen/${t.name}.svg" alt="${t.venture.name}" width="${pct}%"></a>`
        )
      })
      .join('') +
    `</p>`
  )
}
