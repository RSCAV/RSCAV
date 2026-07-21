// Band - THE DISTRICT.
//
// Everything that is not Propiedash or OpenNodo: the studio, and the work it
// has shipped. A low-rise block after two towers, which is the correct
// hierarchy and also just what a city looks like.

import { Scene, n, measure } from '../lib/svg.mjs'
import { W, TYPE, TRACK } from '../lib/tokens.mjs'
import { rampV } from '../lib/dither.mjs'
import { SETTLE, DRAW } from '../lib/motion.mjs'
import { VENTURES, ALSO } from '../data/ventures.mjs'

const H = 424
const ROWS = VENTURES.filter((v) => !['propiedash', 'opennodo'].includes(v.key))

export function studio() {
  const s = new Scene({ w: W, h: H, title: 'casanovaaleman studio and the rest of the work' })
  s.style(SETTLE + DRAW)
  s.add(`<rect class="bg" width="${W}" height="${H}"/>`)
  s.add(rampV(s, { ramp: 'ground', x: 0, y: H - 120, w: W, h: 120, from: 0, to: 0.22, steps: 10 }))

  const X = 64
  s.accentText('THE DISTRICT', { x: X, y: 66, size: TYPE.label, weight: 700, cls: 's', track: TRACK.label })

  s.text('casanovaaleman', {
    x: X - 2,
    y: 126,
    size: 54,
    weight: 300,
    cls: 'ink s',
    italic: true,
    track: -1.4,
    extra: 'style="animation-delay:.1s"',
  })
  s.text('Design and web studio. I take a brand from nothing to shipped.', {
    x: X,
    y: 160,
    size: TYPE.lead,
    cls: 'sub s',
    extra: 'style="animation-delay:.18s"',
  })

  // --- the ledger ----------------------------------------------------------
  const top = 206
  const rowH = 34
  const colName = X
  const colWhat = X + 210
  const colRole = W - 64

  s.text('WHAT', { x: colName, y: top - 14, size: 8.5, weight: 700, cls: 'faint', track: 1.6 })
  s.text('WHAT IT IS', { x: colWhat, y: top - 14, size: 8.5, weight: 700, cls: 'faint', track: 1.6 })
  s.text('ROLE', { x: colRole, y: top - 14, size: 8.5, weight: 700, cls: 'faint', track: 1.6, anchor: 'end' })

  ROWS.forEach((v, i) => {
    const y = top + i * rowH
    const delay = (0.24 + i * 0.05).toFixed(2)
    s.add(
      `<rect class="hair d" x="${X}" y="${n(y - 20)}" width="${W - 128}" height="1" ` +
        `style="transform-origin:${X}px ${n(y - 20)}px;animation-delay:${delay}s"/>`
    )
    const label = v.key === 'studio' ? 'casanovaaleman.com' : v.display
    s.text(label, {
      x: colName,
      y,
      size: 15,
      weight: 600,
      cls: 'ink s',
      extra: `style="animation-delay:${delay}s"`,
    })
    s.text(v.tagline, {
      x: colWhat,
      y,
      size: TYPE.body,
      cls: 'sub s',
      extra: `style="animation-delay:${delay}s"`,
    })
    s.text(v.role, {
      x: colRole,
      y,
      size: TYPE.body,
      cls: 'faint s',
      anchor: 'end',
      extra: `style="animation-delay:${delay}s"`,
    })
  })

  // --- everything else, one line ------------------------------------------
  const y2 = top + ROWS.length * rowH + 18
  s.add(
    `<rect class="hair d" x="${X}" y="${n(y2 - 20)}" width="${W - 128}" height="1" ` +
      `style="transform-origin:${X}px ${n(y2 - 20)}px;animation-delay:.5s"/>`
  )
  s.text('ALSO', { x: colName, y: y2, size: 8.5, weight: 700, cls: 'faint', track: 1.6 })
  let cx = colWhat
  ALSO.forEach(([name, , what], i) => {
    s.text(name, {
      x: cx,
      y: y2,
      size: TYPE.body,
      weight: 600,
      cls: 'sub s',
      extra: `style="animation-delay:${(0.55 + i * 0.04).toFixed(2)}s"`,
    })
    cx += measure(name, { size: TYPE.body, weight: 600 }) + 10
    if (i < ALSO.length - 1) {
      s.text('·', { x: cx, y: y2, size: TYPE.body, cls: 'faint' })
      cx += 14
    }
    void what
  })

  return s.render()
}
