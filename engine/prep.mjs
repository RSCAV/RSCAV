// One-time data preparation, committed so the nightly build stays fast.
//
// Run: node prep.mjs
//
// Source geometry carries far more precision than a 600px map can show. At
// that size one pixel is about 0.02 degrees of longitude, so simplifying to
// 0.012 is invisible and takes the band from 767 KB to something a README
// should be asking anyone to download.

import { readFileSync, writeFileSync, statSync } from 'node:fs'

const HERE = new URL('./data/', import.meta.url).pathname

/** Perpendicular distance from p to the segment ab. */
function dist(p, a, b) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1])
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))
}

/** Douglas-Peucker, iterative so a 30k-point ring cannot blow the stack. */
function simplify(points, tol) {
  if (points.length < 3) return points
  const keep = new Uint8Array(points.length)
  keep[0] = 1
  keep[points.length - 1] = 1
  const stack = [[0, points.length - 1]]
  while (stack.length) {
    const [lo, hi] = stack.pop()
    let worst = 0
    let idx = -1
    for (let i = lo + 1; i < hi; i++) {
      const d = dist(points[i], points[lo], points[hi])
      if (d > worst) {
        worst = d
        idx = i
      }
    }
    if (idx >= 0 && worst > tol) {
      keep[idx] = 1
      stack.push([lo, idx], [idx, hi])
    }
  }
  const out = []
  for (let i = 0; i < points.length; i++) if (keep[i]) out.push(points[i])
  return out
}

const round = (p) => [Math.round(p[0] * 1000) / 1000, Math.round(p[1] * 1000) / 1000]

const TOL = 0.012
const src = JSON.parse(readFileSync(`${HERE}ve-states.src.json`, 'utf8'))

let before = 0
let after = 0
for (const f of src.features) {
  const g = f.geometry
  const doRing = (ring) => {
    before += ring.length
    let r = simplify(ring.map(round), TOL)
    // a ring needs at least a triangle to still be a shape
    if (r.length < 4) r = ring.map(round)
    after += r.length
    return r
  }
  if (g.type === 'Polygon') g.coordinates = g.coordinates.map(doRing)
  else if (g.type === 'MultiPolygon') g.coordinates = g.coordinates.map((poly) => poly.map(doRing))
  // properties beyond the name are not drawn
  f.properties = { id: f.properties.id, name: f.properties.name }
}

writeFileSync(`${HERE}ve-states.json`, JSON.stringify(src))
console.log(
  `ve-states: ${before} -> ${after} points, ` +
    `${(statSync(`${HERE}ve-states.src.json`).size / 1024).toFixed(0)} KB -> ` +
    `${(statSync(`${HERE}ve-states.json`).size / 1024).toFixed(0)} KB`
)
