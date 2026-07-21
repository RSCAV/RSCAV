// Band - STREET LEVEL.
//
// The bottom of the world. Ends on the same ground line the hero opened on, so
// the whole README closes where it started.

import { Scene, n } from '../lib/svg.mjs'
import { W, TYPE, TRACK } from '../lib/tokens.mjs'
import { rampV } from '../lib/dither.mjs'
import { skyline, stars, propiedashMark } from '../lib/skyline.mjs'
import { WINDOWS, STARS, SETTLE, DRAW } from '../lib/motion.mjs'

const H = 300
const GROUND = 244

export function footer(d) {
  const s = new Scene({ w: W, h: H, title: 'Rodrigo Casanova-Aleman - get in touch' })
  s.style(WINDOWS + STARS + SETTLE + DRAW)

  s.add(`<rect class="bg" width="${W}" height="${H}"/>`)
  s.add(stars({ x: 0, y: 6, w: W, h: 90, count: 80, seed: 77 }))
  s.add(rampV(s, { ramp: 'sky', x: 0, y: 40, w: W, h: GROUND - 40, from: 0, to: 0.4, steps: 14 }))

  // the far edge of town, quieter than the hero's
  const far = skyline({
    x: -20,
    w: W + 40,
    baseY: GROUND,
    minH: 20,
    maxH: 76,
    seed: 555,
    cls: 'mid',
    windowCls: 'acc',
    windowDensity: 0.16,
    minW: 18,
    maxW: 44,
    breatheEvery: 0.88,
  })
  s.add(far.markup)

  s.add(`<rect class="ground" y="${GROUND}" width="${W}" height="${H - GROUND}"/>`)
  s.add(`<rect class="hair" y="${GROUND}" width="${W}" height="1"/>`)

  const X = 64
  s.text('If you are building something ambitious, I am easy to find.', {
    x: X,
    y: 96,
    size: 26,
    weight: 500,
    cls: 'ink s',
    track: -0.6,
  })

  const links = [
    ['casanovaaleman.com', 'STUDIO'],
    ['propiedash.com', 'PROPIEDASH'],
    ['opennodo.org', 'OPENNODO'],
    ['rscav06@gmail.com', 'EMAIL'],
  ]
  s.add(
    `<rect class="hair d" x="${X}" y="132" width="${W - 128}" height="1" ` +
      `style="transform-origin:${X}px 132px;animation-delay:.2s"/>`
  )
  links.forEach(([v, k], i) => {
    const x = X + i * 250
    s.text(k, {
      x,
      y: 156,
      size: 8.5,
      weight: 700,
      cls: 'faint s',
      track: 1.6,
      extra: `style="animation-delay:${(0.25 + i * 0.05).toFixed(2)}s"`,
    })
    s.text(v, {
      x,
      y: 180,
      size: TYPE.body,
      weight: 600,
      cls: 'sub s',
      extra: `style="animation-delay:${(0.3 + i * 0.05).toFixed(2)}s"`,
    })
  })

  s.text('Always forward.', {
    x: X,
    y: 222,
    size: TYPE.lead,
    weight: 300,
    italic: true,
    cls: 'ink s',
    extra: 'style="animation-delay:.5s"',
  })

  s.add(propiedashMark({ x: W - 64 - 26, y: 200, size: 26, cls: 'acc s', extra: ' style="animation-delay:.6s"' }))

  // The world is regenerated from live data every day. Saying so is the point:
  // it is why the numbers above are worth reading.
  s.text(`THIS WORLD REBUILDS ITSELF DAILY  ·  LAST BUILT ${d.builtAt}`, {
    x: X,
    y: GROUND + 24,
    size: TYPE.micro,
    weight: 500,
    cls: 'faint',
    track: TRACK.micro,
  })
  s.text('BUILT WITH NODE, NO DEPENDENCIES, NO GRADIENTS', {
    x: W - 64,
    y: GROUND + 24,
    size: TYPE.micro,
    weight: 500,
    cls: 'faint',
    anchor: 'end',
    track: TRACK.micro,
  })

  void n
  return s.render()
}
