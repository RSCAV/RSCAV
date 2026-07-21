// Band - OPENNODO.
//
// The map is not decoration. Every polygon is a Venezuelan federal entity and
// every dot is a real record out of OpenNodo's own seed pack - 2,870 places
// with canonical names, stable identifiers and centroids. The project draws
// itself.

import { readFileSync } from 'node:fs'
import { Scene, n } from '../lib/svg.mjs'
import { W, TYPE, TRACK } from '../lib/tokens.mjs'
import { IGNITE, SETTLE, DRAW } from '../lib/motion.mjs'

const STATES = JSON.parse(readFileSync(new URL('../data/ve-states.json', import.meta.url), 'utf8'))
const PLACES = JSON.parse(readFileSync(new URL('../data/opennodo-places.json', import.meta.url), 'utf8'))

const H = 432
const MAP = { x: 596, y: 30, w: 560, h: 366 }

// Caracas, so the one place everybody knows is findable on the map
const CARACAS = [-66.9036, 10.4806]

export function opennodo() {
  const s = new Scene({
    w: W,
    h: H,
    title: 'OpenNodo - an open place standard for Venezuela, 2,870 places',
  })
  s.style(IGNITE + SETTLE + DRAW)
  s.add(`<rect class="bg" width="${W}" height="${H}"/>`)

  // --- projection ----------------------------------------------------------
  // equirectangular with a cos(lat) correction; over Venezuela's 9 degrees of
  // latitude that is indistinguishable from a proper conic and far simpler
  const bounds = boundsOf(STATES)
  const midLat = (bounds.minY + bounds.maxY) / 2
  const kx = Math.cos((midLat * Math.PI) / 180)
  const spanX = (bounds.maxX - bounds.minX) * kx
  const spanY = bounds.maxY - bounds.minY
  const scale = Math.min(MAP.w / spanX, MAP.h / spanY)
  const offX = MAP.x + (MAP.w - spanX * scale) / 2
  const offY = MAP.y + (MAP.h - spanY * scale) / 2
  const project = ([lon, lat]) => [
    offX + (lon - bounds.minX) * kx * scale,
    offY + (bounds.maxY - lat) * scale,
  ]

  // --- the country ---------------------------------------------------------
  // one path, referenced twice: filled once and stroked once, rather than the
  // 40 KB of duplicated coordinates that emitting it twice would cost
  const r1 = (v) => Math.round(v * 10) / 10
  let outlines = ''
  for (const f of STATES.features) {
    for (const ring of ringsOf(f.geometry)) {
      outlines +=
        ring.map((p, i) => `${i ? 'L' : 'M'}${project(p).map(r1).join(',')}`).join('') + 'Z'
    }
  }
  s.def(`<path id="ve" d="${outlines}"/>`)
  s.add(`<use href="#ve" class="lotEmpty"/><use href="#ve" class="sHair" fill="none" stroke-width="0.7"/>`)

  // --- the records ---------------------------------------------------------
  // 2,870 places. As individual <circle> elements with their own animation
  // delays that is 290 KB of markup, so they are batched into a handful of
  // paths: one per size tier per ignition band. Same picture, a fifth of the
  // bytes.
  const BANDS = 14
  const TIERS = [
    { max: 1, r: 1.6, op: '1' },
    { max: 2, r: 1.1, op: '.9' },
    { max: 9, r: 0.8, op: '.5' },
  ]
  const buckets = new Map()
  const sorted = [...PLACES].sort((a, b) => a[0] - b[0])
  sorted.forEach(([lon, lat, type], i) => {
    const [x, y] = project([lon, lat])
    const ti = TIERS.findIndex((t) => type <= t.max)
    const band = Math.min(BANDS - 1, Math.floor((i / sorted.length) * BANDS))
    const key = `${ti}:${band}`
    const t = TIERS[ti]
    const d = t.r * 2
    if (!buckets.has(key)) buckets.set(key, [])
    // a square this small is indistinguishable from a dot and costs a third
    // of the bytes of a <circle>
    buckets.get(key).push(`M${r1(x - t.r)} ${r1(y - t.r)}h${d}v${d}h-${d}z`)
  })

  let dots = ''
  for (const [key, segs] of buckets) {
    const [ti, band] = key.split(':').map(Number)
    const delay = ((band / BANDS) * 3.4).toFixed(2)
    dots +=
      `<path class="ig" opacity="${TIERS[ti].op}" style="animation-delay:${delay}s" d="${segs.join('')}"/>`
  }
  s.add(`<g class="acc">${dots}</g>`)

  // Caracas, pinned
  const [cx, cy] = project(CARACAS)
  s.add(`<circle class="sInk" fill="none" stroke-width="1" cx="${n(cx)}" cy="${n(cy)}" r="7"/>`)
  s.text('CARACAS', {
    x: cx + 13,
    y: cy + 3.5,
    size: TYPE.micro,
    weight: 700,
    cls: 'ink',
    track: TRACK.micro,
  })

  // --- type ----------------------------------------------------------------
  const X = 64
  s.accentText('OPEN SOURCE', { x: X, y: 78, size: TYPE.label, weight: 700, cls: 's', track: TRACK.label })
  s.text('OpenNodo', {
    x: X - 3,
    y: 148,
    size: 62,
    weight: 700,
    cls: 'ink s',
    track: -2.2,
    extra: 'style="animation-delay:.1s"',
  })
  s.text('An open place standard for Venezuela.', {
    x: X,
    y: 184,
    size: TYPE.lead,
    cls: 'sub s',
    extra: 'style="animation-delay:.2s"',
  })
  s.text('Stable identifiers, canonical names and structured relationships for', {
    x: X,
    y: 216,
    size: TYPE.body,
    cls: 'faint s',
    extra: 'style="animation-delay:.25s"',
  })
  s.text('every administrative and settlement place in the country, with the', {
    x: X,
    y: 236,
    size: TYPE.body,
    cls: 'faint s',
    extra: 'style="animation-delay:.28s"',
  })
  s.text('honest distinction between where the state says places are and', {
    x: X,
    y: 256,
    size: TYPE.body,
    cls: 'faint s',
    extra: 'style="animation-delay:.31s"',
  })
  s.text('where people actually live.', {
    x: X,
    y: 276,
    size: TYPE.body,
    cls: 'faint s',
    extra: 'style="animation-delay:.34s"',
  })

  // counts, straight out of the seed pack
  const counts = tally(PLACES)
  const stats = [
    [PLACES.length.toLocaleString('en-US'), 'PLACES'],
    [String(counts[1]), 'FEDERAL ENTITIES'],
    [String(counts[2]), 'MUNICIPALITIES'],
    [counts[3].toLocaleString('en-US'), 'PARISHES'],
  ]
  s.add(
    `<rect class="hair d" x="${X}" y="312" width="430" height="1" ` +
      `style="transform-origin:${X}px 312px;animation-delay:.4s"/>`
  )
  stats.forEach(([v, k], i) => {
    const x = X + i * 112
    s.text(v, {
      x,
      y: 348,
      size: 26,
      weight: 700,
      cls: 'ink s',
      track: -0.8,
      extra: `style="animation-delay:${(0.45 + i * 0.05).toFixed(2)}s"`,
    })
    s.text(k, {
      x,
      y: 366,
      size: 8.5,
      weight: 600,
      cls: 'faint s',
      track: 1.4,
      extra: `style="animation-delay:${(0.5 + i * 0.05).toFixed(2)}s"`,
    })
  })

  s.text('opennodo.org  ·  api.opennodo.org  ·  CC BY 4.0 data', {
    x: X,
    y: 404,
    size: TYPE.micro,
    weight: 500,
    cls: 'faint',
    track: TRACK.micro,
  })

  return s.render()
}

function ringsOf(geom) {
  if (geom.type === 'Polygon') return geom.coordinates
  if (geom.type === 'MultiPolygon') return geom.coordinates.flat()
  return []
}

function boundsOf(fc) {
  let minX = 180
  let maxX = -180
  let minY = 90
  let maxY = -90
  for (const f of fc.features) {
    for (const ring of ringsOf(f.geometry)) {
      for (const [x, y] of ring) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  return { minX, maxX, minY, maxY }
}

function tally(places) {
  const c = {}
  for (const [, , t] of places) c[t] = (c[t] || 0) + 1
  return c
}
