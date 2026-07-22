// Band 1 - ARRIVAL.
// The establishing shot: a valley city at night under El Avila, name set over
// the sky, the skyline forming the ground that the next band continues from.

import { Scene, n, measure } from '../lib/svg.mjs'
import { W, TYPE, TRACK } from '../lib/tokens.mjs'
import { rampV } from '../lib/dither.mjs'
import { ridge, skyline, stars, propiedashMark } from '../lib/skyline.mjs'
import { WINDOWS, STARS, SETTLE, DRAW } from '../lib/motion.mjs'

export function hero(d) {
  const H = 430
  const HORIZON = 300 // where El Avila meets the valley floor
  const GROUND = 396 // street level, shared with the band below

  const s = new Scene({ w: W, h: H, title: 'Rodrigo Casanova-Aleman - builder, Caracas to Gainesville' })
  s.style(WINDOWS + STARS + SETTLE + DRAW)

  // --- sky -----------------------------------------------------------------
  s.add(`<rect class="bg" width="${W}" height="${H}"/>`)
  s.add(stars({ x: 0, y: 10, w: W, h: 210, count: 190, seed: 41 }))
  // no gradient: the glow above the city is a dither ramp climbing off the ridge
  s.add(rampV(s, { ramp: 'sky', x: 0, y: 96, w: W, h: HORIZON - 96, from: 0, to: 0.62, steps: 18 }))

  // --- El Avila, furthest plane -------------------------------------------
  s.add(ridge({ x: -40, w: W + 80, baseY: HORIZON + 6, height: 118, seed: 21, cls: 'far', peak: 0.36 }))
  s.add(ridge({ x: -60, w: W + 120, baseY: HORIZON + 14, height: 74, seed: 58, cls: 'mid', peak: 0.72, roughness: 0.7 }))

  // --- the city ------------------------------------------------------------
  // Both skyline runs are split at the type zone. On the light theme the
  // buildings are dark and so is the copy, so anything the type overlaps
  // disappears; keeping the left runs low reserves a clear zone in both
  // themes without painting a scrim over the art.
  const TYPE_ZONE = 470

  let phase = 0
  const midLeft = skyline({
    x: -20,
    w: TYPE_ZONE + 20,
    baseY: HORIZON + 30,
    minH: 18,
    maxH: 40,
    seed: 91,
    cls: 'mid',
    windowCls: 'acc',
    windowDensity: 0.14,
    minW: 14,
    maxW: 34,
    windowPhase: phase,
    breatheEvery: 0.9,
  })
  s.add(midLeft.markup)

  const far = skyline({
    x: TYPE_ZONE,
    w: W - TYPE_ZONE + 40,
    baseY: HORIZON + 30,
    minH: 26,
    maxH: 92,
    seed: 417,
    cls: 'mid',
    windowCls: 'acc',
    windowDensity: 0.18,
    minW: 14,
    maxW: 34,
    windowPhase: midLeft.nextPhase,
    breatheEvery: 0.9,
  })
  s.add(far.markup)
  phase = far.nextPhase

  const nearLeft = skyline({
    x: -30,
    w: TYPE_ZONE + 30,
    baseY: GROUND,
    minH: 34,
    maxH: 74,
    seed: 137,
    cls: 'near',
    windowCls: 'acc',
    windowDensity: 0.3,
    minW: 22,
    maxW: 58,
    windowPhase: phase,
    breatheEvery: 0.8,
  })
  s.add(nearLeft.markup)

  const near = skyline({
    x: TYPE_ZONE,
    w: W - TYPE_ZONE + 40,
    baseY: GROUND,
    minH: 46,
    maxH: 132,
    seed: 311,
    cls: 'near',
    windowCls: 'acc',
    windowDensity: 0.34,
    minW: 22,
    maxW: 58,
    windowPhase: nearLeft.nextPhase,
    breatheEvery: 0.8,
  })
  s.add(near.markup)

  // street level: the plate ends on a solid band the next plate picks up
  s.add(`<rect class="ground" y="${GROUND}" width="${W}" height="${H - GROUND}"/>`)
  s.add(`<rect class="hair" y="${GROUND}" width="${W}" height="1"/>`)

  // --- type ----------------------------------------------------------------
  const X = 64
  const eb = 'FOUNDER'
  s.accentText(eb, { x: X, y: 74, size: TYPE.label, weight: 700, cls: 's', track: TRACK.label })
  const ebRight = X + measure(eb, { size: TYPE.label, weight: 700, track: TRACK.label }) + TYPE.label * 0.5
  s.text('BUILDER · CARACAS · MADRID · MIAMI · GAINESVILLE', {
    x: ebRight + 16,
    y: 74,
    size: TYPE.label,
    weight: 500,
    cls: 'faint s',
    track: TRACK.label,
    extra: 'style="animation-delay:.15s"',
  })

  s.text('RODRIGO', {
    x: X - 5,
    y: 168,
    size: TYPE.mega,
    weight: 800,
    cls: 'ink s',
    track: -3.5,
    extra: 'style="animation-delay:.25s"',
  })
  s.text('CASANOVA-ALEMAN', {
    x: X - 4,
    y: 236,
    size: 55,
    weight: 300,
    cls: 'ink s',
    track: -1.4,
    extra: 'style="animation-delay:.35s"',
  })

  // a hairline that draws itself, then the one line of copy
  s.add(
    `<rect class="hair d" x="${X}" y="264" width="360" height="1" style="transform-origin:${X}px 264px;animation-delay:.5s"/>`
  )
  s.text('I build things. All of them.', {
    x: X,
    y: 293,
    size: TYPE.lead,
    weight: 400,
    cls: 'sub s',
    extra: 'style="animation-delay:.6s"',
  })

  // --- the mark, top right -------------------------------------------------
  s.add(propiedashMark({ x: W - 64 - 34, y: 46, size: 34, cls: 'acc s', extra: ' style="animation-delay:.7s"' }))

  // live readout, bottom right - proof the world is regenerated, not painted once
  s.text(`${d.total.toLocaleString('en-US')} CONTRIBUTIONS  ${d.from} TO ${d.to}`, {
    x: W - 64,
    y: GROUND + 22,
    size: TYPE.micro,
    weight: 500,
    cls: 'faint',
    anchor: 'end',
    track: TRACK.micro,
  })
  void n
  return s.render()
}
