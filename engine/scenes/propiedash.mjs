// Band - PROPIEDASH. The main thing.
//
// Given the whole world is already built in Propiedash's palette, this plate
// does not need to shout. It gives the lockup room, states what the product
// is, and stands one tower up beside it with the mark cut into the facade the
// way the mark itself cuts a house out of a P.

import { Scene, n } from '../lib/svg.mjs'
import { W, TYPE, TRACK } from '../lib/tokens.mjs'
import { rampV } from '../lib/dither.mjs'
import { propiedashLockup, propiedashMark, stars } from '../lib/skyline.mjs'
import { WINDOWS, STARS, SETTLE, DRAW } from '../lib/motion.mjs'
import { rng } from '../lib/svg.mjs'

const H = 440
const GROUND = 396

export function propiedash() {
  const s = new Scene({ w: W, h: H, title: 'Propiedash - the real-estate marketplace for Venezuela' })
  s.style(WINDOWS + STARS + SETTLE + DRAW)
  s.add(`<rect class="bg" width="${W}" height="${H}"/>`)
  s.add(stars({ x: 620, y: 18, w: 560, h: 150, count: 70, seed: 903 }))
  s.add(rampV(s, { ramp: 'sky', x: 0, y: 60, w: W, h: GROUND - 60, from: 0, to: 0.3, steps: 16 }))

  // --- the tower -----------------------------------------------------------
  const TX = 792
  const TW = 300
  const TH = 286
  const ty = GROUND - TH
  s.add(`<g class="near"><rect x="${TX}" y="${ty}" width="${TW}" height="${TH}"/>` +
    `<rect x="${TX + TW * 0.3}" y="${ty - 26}" width="${TW * 0.4}" height="26"/>` +
    `<rect x="${TX + TW / 2 - 1}" y="${ty - 56}" width="2" height="30"/></g>`)
  s.add(`<rect class="acc" x="${TX}" y="${ty - 1.6}" width="${TW}" height="1.6"/>`)

  // windows, with a clear block left for the mark
  const rand = rng(4242)
  const markBox = { x: TX + TW / 2 - 62, y: ty + 46, w: 124, h: 124 }
  let wins = ''
  let k = 0
  for (let r = 0; r < Math.floor((TH - 30) / 20); r++) {
    for (let c = 0; c < Math.floor((TW - 30) / 22); c++) {
      const wx = TX + 20 + c * 22
      const wy = ty + 24 + r * 20
      if (
        wx + 8 > markBox.x - 10 &&
        wx < markBox.x + markBox.w + 10 &&
        wy + 9 > markBox.y - 10 &&
        wy < markBox.y + markBox.h + 10
      )
        continue
      if (rand() > 0.5) continue
      const breathes = rand() > 0.7
      wins +=
        `<rect${breathes ? ` class="w" style="animation-delay:${((k % 37) * 0.29).toFixed(2)}s"` : ''}` +
        ` x="${n(wx)}" y="${n(wy)}" width="7" height="8" opacity="${rand() > 0.5 ? '.8' : '.4'}"/>`
      k++
    }
  }
  s.add(`<g class="acc">${wins}</g>`)
  s.add(propiedashMark({ x: markBox.x, y: markBox.y, size: markBox.w, cls: 'acc' }))

  // street
  s.add(`<rect class="ground" y="${GROUND}" width="${W}" height="${H - GROUND}"/>`)
  s.add(`<rect class="hair" y="${GROUND}" width="${W}" height="1"/>`)

  // --- type ----------------------------------------------------------------
  const X = 64
  s.accentText('THE MAIN THING', { x: X, y: 76, size: TYPE.label, weight: 700, cls: 's', track: TRACK.label })

  const lock = propiedashLockup({ x: X - 2, y: 108, width: 340, cls: 'ink s', extra: ' style="animation-delay:.1s"' })
  s.add(lock.markup)

  s.text('The real-estate marketplace for Venezuela.', {
    x: X,
    y: 196,
    size: 22,
    weight: 500,
    cls: 'sub s',
    extra: 'style="animation-delay:.2s"',
  })
  const copy = [
    'Listings, agents, demand and the map underneath all of it. Built for a',
    'country whose addresses were never standardised, which is why it comes',
    'with its own place standard.',
  ]
  copy.forEach((line, i) =>
    s.text(line, {
      x: X,
      y: 232 + i * 21,
      size: TYPE.body,
      cls: 'faint s',
      extra: `style="animation-delay:${(0.26 + i * 0.03).toFixed(2)}s"`,
    })
  )

  const facts = [
    ['LIVE', 'SINCE JUN 2026'],
    ['VENEZUELA', 'NATIONWIDE'],
    ['WEB', 'NOT AN APP'],
  ]
  s.add(
    `<rect class="hair d" x="${X}" y="322" width="480" height="1" ` +
      `style="transform-origin:${X}px 322px;animation-delay:.4s"/>`
  )
  facts.forEach(([v, k2], i) => {
    const x = X + i * 168
    s.text(v, {
      x,
      y: 352,
      size: 19,
      weight: 700,
      cls: 'ink s',
      track: -0.4,
      extra: `style="animation-delay:${(0.45 + i * 0.05).toFixed(2)}s"`,
    })
    s.text(k2, {
      x,
      y: 370,
      size: 8.5,
      weight: 600,
      cls: 'faint s',
      track: 1.4,
      extra: `style="animation-delay:${(0.5 + i * 0.05).toFixed(2)}s"`,
    })
  })

  s.text('propiedash.com', {
    x: X,
    y: GROUND + 26,
    size: TYPE.micro,
    weight: 600,
    cls: 'faint',
    track: TRACK.micro,
  })

  return s.render()
}
