// Band - THE CITY.
//
// The contribution graph as a place. One lot per day, 53 weeks wide, seven
// weekdays deep. A day's contribution count is the height of the building on
// it, so the year reads as a skyline: bare lots where nothing was built,
// towers where a lot was.
//
// Two thirds of this particular year is empty. That is not a hole in the
// chart, it is the shape of the year, so it gets labelled rather than hidden.
//
// The build wave sweeps left to right across the year, holds, then resets, so
// someone who lands mid-scroll still watches the city assemble.

import { Scene, n } from '../lib/svg.mjs'
import { W, TYPE, TRACK } from '../lib/tokens.mjs'
import { rampV } from '../lib/dither.mjs'
import { block, lot, windows, P, SX, SY, cityWidth } from '../lib/iso.mjs'
import { WINDOWS, GROW, SETTLE, DRAW } from '../lib/motion.mjs'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

/** Compressive, so a single 518-day does not flatten the rest of the year. */
const heightOf = (count, max, tallest) => (count <= 0 ? 0 : Math.pow(count / max, 0.55) * tallest)

// vertical rhythm, top down
const L = {
  eyebrow: 58,
  sub: 84,
  skyTop: 46,
  ground: 312, // back row of lots
  get lotsBottom() {
    return this.ground + SY * 7
  },
  get ruler() {
    return this.lotsBottom + 16
  },
  get rule() {
    return this.ruler + 44
  },
  get stat() {
    return this.rule + 38
  },
  get statLabel() {
    return this.stat + 19
  },
}
const H = L.statLabel + 34

export function city(d) {
  const TALLEST = 176
  const s = new Scene({
    w: W,
    h: H,
    title: `The year as a city: ${d.total} contributions, one building per day`,
  })
  s.style(WINDOWS + GROW + SETTLE + DRAW)
  s.add(`<rect class="bg" width="${W}" height="${H}"/>`)

  const weeks = d.weeks
  const originX = (W - cityWidth(weeks.length)) / 2 + 10
  const originY = L.ground

  // Night sky, dithered rather than graded, faded at both edges so the ramp
  // never shows a hard rectangular border.
  const skyH = L.ground - L.skyTop + 8
  s.def(
    `<mask id="skyMask">` +
      `<rect x="90" y="0" width="${W - 180}" height="${H}" fill="#fff"/>` +
      Array.from({ length: 11 }, (_, i) => {
        const o = (1 - i / 11).toFixed(2)
        return (
          `<rect x="${90 - (i + 1) * 8}" y="0" width="8" height="${H}" fill="#fff" opacity="${o}"/>` +
          `<rect x="${W - 90 + i * 8}" y="0" width="8" height="${H}" fill="#fff" opacity="${o}"/>`
        )
      }).join('') +
      `</mask>`
  )
  s.add(
    `<g mask="url(#skyMask)">${rampV(s, {
      ramp: 'sky',
      x: 0,
      y: L.skyTop,
      w: W,
      h: skyH,
      from: 0,
      to: 0.32,
      steps: 20,
    })}</g>`
  )

  // --- heading -------------------------------------------------------------
  s.accentText('THE YEAR AS A CITY', {
    x: 64,
    y: L.eyebrow,
    size: TYPE.label,
    weight: 700,
    cls: 's',
    track: TRACK.label,
  })
  s.text('One building per day. Its height is that day’s contribution count.', {
    x: 64,
    y: L.sub,
    size: TYPE.body,
    cls: 'sub s',
    extra: 'style="animation-delay:.1s"',
  })

  // --- ground plane --------------------------------------------------------
  const corners = [P(0, 0), P(weeks.length, 0), P(weeks.length, 7), P(0, 7)]
  s.add(
    `<g transform="translate(${n(originX)},${n(originY)})">` +
      `<polygon class="ground" points="${corners.map(([x, y]) => `${n(x)},${n(y)}`).join(' ')}"/></g>`
  )

  // --- the city ------------------------------------------------------------
  // painter's order: back row first, so front rows draw over what they occlude
  const nonzero = d.days.map((x) => x.c).filter((c) => c > 0)
  const p90 = percentile(nonzero, 0.9)

  let bodyMarkup = ''
  let winIndex = 0
  let peak = null

  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < weeks.length; col++) {
      const day = weeks[col][row]
      if (!day) continue
      if (day.c <= 0) {
        bodyMarkup += lot({ col, row, cls: 'lotEmpty' })
        continue
      }
      const h = heightOf(day.c, d.max, TALLEST)
      const b = block({
        col,
        row,
        h,
        top: 'faceTop',
        right: 'faceRight',
        front: 'faceFront',
        roofline: day.c >= p90 ? 'sAcc' : null,
        cls: 'b',
        delay: col * 0.042 + row * 0.012, // the wave crosses the year west to east
      })
      bodyMarkup += b.markup

      const wn = windows({ col, row, h, cls: 'acc', index: winIndex, seed: col * 7 + row })
      bodyMarkup += wn.markup
      winIndex = wn.next

      if (!peak || day.c > peak.c) peak = { ...day, h, x: b.centerX, topY: b.topY }
    }
  }
  s.add(`<g transform="translate(${n(originX)},${n(originY)})">${bodyMarkup}</g>`)

  // --- month ruler ---------------------------------------------------------
  let ruler = ''
  let lastMonth = -1
  for (let col = 0; col < weeks.length; col++) {
    const first = weeks[col].find(Boolean)
    if (!first) continue
    const m = +first.date.slice(5, 7) - 1
    if (m === lastMonth) continue
    lastMonth = m
    const [x] = P(col, 7)
    ruler +=
      `<rect class="hair" x="${n(x)}" y="0" width="1" height="6"/>` +
      `<text class="faint" x="${n(x + 5)}" y="15" font-size="${TYPE.micro}" font-weight="600" ` +
      `letter-spacing="${TRACK.micro}">${MONTHS[m]}</text>`
    s.t(MONTHS[m])
  }
  s.add(`<g transform="translate(${n(originX + SX * 7)},${n(L.ruler)})">${ruler}</g>`)

  // --- the empty half, named ----------------------------------------------
  const rampStart = d.days.findIndex((x) => x.c >= 20)
  if (rampStart > 0) {
    const markerX = originX + P(Math.floor(rampStart / 7), 0)[0]
    s.text('EMPTY LOTS', {
      x: originX + 40,
      y: originY - 13,
      size: TYPE.micro,
      weight: 600,
      cls: 'faint s',
      track: TRACK.micro,
      extra: 'style="animation-delay:.8s"',
    })
    s.add(
      `<rect class="acc s" x="${n(markerX - 6)}" y="${n(originY - 54)}" width="1.5" height="52" ` +
        `style="animation-delay:.9s"/>`
    )
    const startLabel = new Date(d.days[rampStart].date + 'T12:00:00Z')
      .toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
      .toUpperCase()
    s.accentText(`GROUND BROKEN ${startLabel}`, {
      x: markerX + 8,
      y: originY - 44,
      size: TYPE.micro,
      weight: 700,
      cls: 's',
      track: TRACK.micro,
      extra: ' style="animation-delay:1s"',
    })
  }

  // --- the tallest tower, called out ---------------------------------------
  if (peak) {
    const px = originX + peak.x
    const py = originY + peak.topY
    const labelY = Math.max(L.skyTop + 78, py - 40)
    const dateLabel = new Date(peak.date + 'T12:00:00Z')
      .toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' })
      .toUpperCase()

    s.add(
      `<rect class="acc s" x="${n(px - 0.5)}" y="${n(labelY)}" width="1" height="${n(py - labelY - 3)}" ` +
        `style="animation-delay:4.2s"/>`
    )
    s.add(`<circle class="acc s" cx="${n(px)}" cy="${n(labelY)}" r="2.5" style="animation-delay:4.2s"/>`)
    s.accentText(`${peak.c} IN ONE DAY`, {
      x: px + 12,
      y: labelY + 4,
      size: TYPE.label,
      weight: 700,
      cls: 's',
      track: TRACK.label,
      extra: ' style="animation-delay:4.3s"',
    })
    s.text(dateLabel, {
      x: px + 10,
      y: labelY + 20,
      size: TYPE.micro,
      weight: 500,
      cls: 'faint s',
      track: TRACK.micro,
      extra: 'style="animation-delay:4.4s"',
    })
  }

  // --- readout -------------------------------------------------------------
  const stats = [
    [d.total.toLocaleString('en-US'), 'CONTRIBUTIONS'],
    [String(d.activeDays), 'DAYS BUILT ON'],
    [String(d.longestStreak), 'DAY STREAK'],
    [String(d.max), 'PEAK DAY'],
  ]
  const sx = 64
  const gap = 158
  s.add(
    `<rect class="hair d" x="${sx}" y="${L.rule}" width="${gap * stats.length - 30}" height="1" ` +
      `style="transform-origin:${sx}px ${L.rule}px;animation-delay:.2s"/>`
  )
  stats.forEach(([v, k], i) => {
    const x = sx + i * gap
    s.text(v, {
      x,
      y: L.stat,
      size: 29,
      weight: 700,
      cls: 'ink s',
      track: -1,
      extra: `style="animation-delay:${(0.3 + i * 0.06).toFixed(2)}s"`,
    })
    s.text(k, {
      x,
      y: L.statLabel,
      size: TYPE.micro,
      weight: 600,
      cls: 'faint s',
      track: TRACK.micro,
      extra: `style="animation-delay:${(0.35 + i * 0.06).toFixed(2)}s"`,
    })
  })

  s.text('AN EMPTY LOT IS A DAY I DID NOT SHIP', {
    x: W - 64,
    y: L.statLabel,
    size: TYPE.micro,
    weight: 500,
    cls: 'faint',
    anchor: 'end',
    track: TRACK.micro,
  })

  return s.render()
}

function percentile(arr, p) {
  if (!arr.length) return 0
  const a = [...arr].sort((x, y) => x - y)
  return a[Math.min(a.length - 1, Math.floor(a.length * p))]
}
