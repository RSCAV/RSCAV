// Band - THE READOUT.
//
// Ordered-dither data visualisation. The brand bans gradients, which is
// normally a constraint on charts - no soft area fills, no heat ramps. Bayer
// dithering gives back the whole tonal range using nothing but a dot grid, so
// an area chart can still read as dense-under-the-curve and thinning-out
// toward the top without a single gradient stop.

import { Scene, n, measure } from '../lib/svg.mjs'
import { W, TYPE, TRACK } from '../lib/tokens.mjs'
import { byMonth, byWeekday } from '../lib/data.mjs'
import { SETTLE, DRAW, SCAN } from '../lib/motion.mjs'

const MONTH_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const WD = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const H = 402

export function charts(d) {
  const s = new Scene({ w: W, h: H, title: 'Contributions by month and by weekday, rendered in ordered dither' })
  s.style(SETTLE + DRAW + SCAN)
  s.add(`<rect class="bg" width="${W}" height="${H}"/>`)

  s.accentText('THE READOUT', { x: 64, y: 58, size: TYPE.label, weight: 700, cls: 's', track: TRACK.label })
  s.text('Ordered dither instead of gradients. Same tonal range, no soft edges.', {
    x: 64,
    y: 84,
    size: TYPE.body,
    cls: 'sub s',
    extra: 'style="animation-delay:.1s"',
  })

  areaChart(s, d, { x: 64, y: 132, w: 700, h: 226 })
  weekdayChart(s, d, { x: 824, y: 132, w: 312, h: 226 })

  return s.render()
}

/**
 * Monthly totals as a dithered area. Each column is filled with a stack of
 * dither steps that thin out toward the top of the bar, so density itself
 * encodes magnitude a second time.
 */
function areaChart(s, d, { x, y, w, h }) {
  const months = byMonth(d.days)
  const max = Math.max(...months.map((m) => m.total), 1)
  const colW = w / months.length
  const barW = colW - 6

  s.text('BY MONTH', { x, y: y - 16, size: 9, weight: 700, cls: 'faint', track: 1.8 })

  // baseline
  s.add(
    `<rect class="hair d" x="${x}" y="${y + h}" width="${w}" height="1" ` +
      `style="transform-origin:${x}px ${y + h}px;animation-delay:.2s"/>`
  )

  months.forEach((m, i) => {
    const bx = x + i * colW + 3
    // a month with any activity at all has to be visible, or the chart
    // silently lies about the quiet months
    const bh = m.total > 0 ? Math.max(3, (m.total / max) * h) : 0
    const by = y + h - bh
    if (bh > 0.5) {
      // stack of dither steps: solid at the base, thinning toward the top
      const STEPS = 9
      for (let k = 0; k < STEPS; k++) {
        const p = k / (STEPS - 1)
        const segH = bh / STEPS
        const segY = y + h - bh + k * segH
        // k counts down from the top, so tone climbs with k: sparse at the
        // crown, solid where the bar meets the axis
        const cls = s.dither('acc', 0.16 + p * 0.84)
        if (!cls) continue
        s.add(
          `<rect class="${cls} s" x="${n(bx)}" y="${n(segY)}" width="${n(barW)}" height="${n(segH + 0.6)}" ` +
            `style="animation-delay:${(0.3 + i * 0.045).toFixed(2)}s"/>`
        )
      }
      // a solid cap line, the accent kept to a rule
      s.add(
        `<rect class="acc s" x="${n(bx)}" y="${n(by)}" width="${n(barW)}" height="1.6" ` +
          `style="animation-delay:${(0.3 + i * 0.045).toFixed(2)}s"/>`
      )
    }

    // month label, every other one when they get tight
    const label = MONTH_SHORT[+m.month.slice(5, 7) - 1]
    if (colW > 42 || i % 2 === 0) {
      s.text(label, {
        x: bx + barW / 2,
        y: y + h + 16,
        size: 8.5,
        weight: 600,
        cls: 'faint',
        anchor: 'middle',
        track: 1.2,
      })
    }
    // value on the tall ones only, so the chart never gets noisy
    if (m.total >= max * 0.28) {
      s.text(m.total.toLocaleString('en-US'), {
        x: bx + barW / 2,
        y: by - 9,
        size: 10.5,
        weight: 700,
        cls: 'ink s',
        anchor: 'middle',
        extra: `style="animation-delay:${(0.45 + i * 0.045).toFixed(2)}s"`,
      })
    }
  })

  // the one sentence the shape is saying
  const first = months.find((m) => m.total > 0)
  const last = months[months.length - 1]
  if (first && last) {
    const copy = `${first.total} in ${MONTH_SHORT[+first.month.slice(5, 7) - 1]} to ${last.total.toLocaleString(
      'en-US'
    )} this month`
    s.text(copy, {
      x,
      y: y + h + 42,
      size: TYPE.body,
      weight: 500,
      cls: 'sub s',
      extra: 'style="animation-delay:1.1s"',
    })
  }
}

/** Which days of the week the work actually lands on. */
function weekdayChart(s, d, { x, y, w, h }) {
  const wd = byWeekday(d.days)
  const max = Math.max(...wd, 1)
  const rowH = h / 7
  const barH = rowH - 7
  const labelW = 34
  const trackW = w - labelW - 54

  s.text('BY WEEKDAY', { x, y: y - 16, size: 9, weight: 700, cls: 'faint', track: 1.8 })

  wd.forEach((v, i) => {
    const by = y + i * rowH
    s.text(WD[i], { x, y: by + barH - 2, size: 8.5, weight: 600, cls: 'faint', track: 1.2 })

    const bw = (v / max) * trackW
    const bx = x + labelW

    // empty track, so short bars still read against something
    s.add(`<rect class="lotEmpty" x="${n(bx)}" y="${n(by)}" width="${n(trackW)}" height="${n(barH)}"/>`)

    if (bw > 0.5) {
      const STEPS = 7
      for (let k = 0; k < STEPS; k++) {
        const p = k / (STEPS - 1)
        const segW = bw / STEPS
        // densest at the axis end, thinning toward the bar's tip
        const cls = s.dither('acc', 1 - p * 0.82)
        if (!cls) continue
        s.add(
          `<rect class="${cls} s" x="${n(bx + k * segW)}" y="${n(by)}" width="${n(segW + 0.6)}" ` +
            `height="${n(barH)}" style="animation-delay:${(0.4 + i * 0.05).toFixed(2)}s"/>`
        )
      }
      s.add(
        `<rect class="acc s" x="${n(bx + bw - 1.6)}" y="${n(by)}" width="1.6" height="${n(barH)}" ` +
          `style="animation-delay:${(0.4 + i * 0.05).toFixed(2)}s"/>`
      )
    }

    const val = v.toLocaleString('en-US')
    s.text(val, {
      x: x + w,
      y: by + barH - 2,
      size: 10,
      weight: 700,
      cls: 'ink s',
      anchor: 'end',
      extra: `style="animation-delay:${(0.5 + i * 0.05).toFixed(2)}s"`,
    })
    void measure
  })

  const busiest = wd.indexOf(Math.max(...wd))
  s.text(`Busiest day: ${WD[busiest]}`, {
    x,
    y: y + h + 42,
    size: TYPE.body,
    weight: 500,
    cls: 'sub s',
    extra: 'style="animation-delay:1.1s"',
  })
}
