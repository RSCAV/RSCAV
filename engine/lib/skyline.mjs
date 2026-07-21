// Elevation-view city furniture: ridges, skylines, towers, street level.
// Used by every band so the world holds together as one place.
//
// Everything paints through a semantic class rather than a literal colour, so
// the same geometry reads as a night city or a daylight one.

import { readFileSync } from 'node:fs'
import { n, rng } from './svg.mjs'

/**
 * El Avila. The ridge that sits behind Caracas, and behind this whole profile.
 * One fixed seed, so it is the same mountain every build.
 */
export function ridge({ x, w, baseY, height, seed = 7, cls, roughness = 0.55, peak = 0.42 }) {
  const rand = rng(seed)
  const steps = 54
  const pts = []
  let h = height * 0.35
  for (let i = 0; i <= steps; i++) {
    const p = i / steps
    // one dominant peak, the way El Avila reads from the valley floor
    const d = Math.abs(p - peak)
    const envelope = Math.exp(-(d * d) / 0.075) * 0.8 + 0.2 * Math.exp(-((p - 0.86) ** 2) / 0.02)
    h += (rand() - 0.5) * height * roughness * 0.45
    h = Math.max(height * 0.1, Math.min(height, h * 0.55 + height * envelope * 0.62))
    pts.push([x + p * w, baseY - h])
  }
  const d =
    `M${n(x)},${n(baseY)}` + pts.map(([px, py]) => `L${n(px)},${n(py)}`).join('') + `L${n(x + w)},${n(baseY)}Z`
  return `<path class="${cls}" d="${d}"/>`
}

/**
 * A run of buildings in elevation. Windows are emitted after the massing so
 * they always sit on top of it.
 */
export function skyline({
  x,
  w,
  baseY,
  minH,
  maxH,
  seed = 11,
  cls,
  windowCls = null,
  windowDensity = 0.32,
  gap = 3,
  minW = 16,
  maxW = 46,
  detail = true,
  windowPhase = 0,
  breatheEvery = 0.84,
}) {
  const rand = rng(seed)
  let cx = x
  let mass = ''
  let wins = ''
  let wi = windowPhase

  while (cx < x + w) {
    const bw = minW + rand() * (maxW - minW)
    const bh = minH + Math.pow(rand(), 1.5) * (maxH - minH)
    const by = baseY - bh
    const width = Math.min(bw, x + w - cx)
    if (width < 6) break

    mass += `<rect x="${n(cx)}" y="${n(by)}" width="${n(width)}" height="${n(bh)}"/>`

    if (detail) {
      const r = rand()
      if (r > 0.78) {
        const sw = width * 0.5
        const sh = 6 + rand() * 14
        mass += `<rect x="${n(cx + (width - sw) / 2)}" y="${n(by - sh)}" width="${n(sw)}" height="${n(sh)}"/>`
        if (rand() > 0.5) mass += `<rect x="${n(cx + width / 2 - 0.8)}" y="${n(by - sh - 13)}" width="1.6" height="13"/>`
      } else if (r > 0.64) {
        // rooftop water tanks, the giveaway detail of a Caracas roofline
        mass += `<rect x="${n(cx + width * 0.18)}" y="${n(by - 5)}" width="5" height="5"/>`
        mass += `<rect x="${n(cx + width * 0.56)}" y="${n(by - 7)}" width="5" height="7"/>`
      } else if (r > 0.56) {
        mass += `<rect x="${n(cx + width / 2 - 0.7)}" y="${n(by - 17)}" width="1.4" height="17"/>`
      }
    }

    if (windowCls && bh > 22 && width > 12) {
      const cols = Math.max(1, Math.floor((width - 6) / 7))
      const rows = Math.max(1, Math.floor((bh - 10) / 9))
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rand() > windowDensity) continue
          const wx = cx + 4 + c * 7
          const wy = by + 6 + r * 9
          if (wx + 3 > cx + width - 2) continue
          const lit = rand()
          const breathes = lit > breatheEvery
          wins +=
            `<rect${breathes ? ` class="w" style="animation-delay:${((wi % 53) * 0.31).toFixed(2)}s"` : ''}` +
            ` x="${n(wx)}" y="${n(wy)}" width="3" height="3.6" opacity="${
              lit > 0.9 ? '1' : lit > 0.7 ? '.7' : '.4'
            }"/>`
          wi++
        }
      }
    }

    cx += width + gap * (0.4 + rand())
  }

  return {
    markup: `<g class="${cls}">${mass}</g>` + (windowCls ? `<g class="${windowCls}">${wins}</g>` : ''),
    nextPhase: wi,
  }
}

/** Sparse star field, denser toward the top. A few of them breathe. */
export function stars({ x, y, w, h, count, seed = 3, cls = 'ink', accCls = 'acc', accEvery = 9 }) {
  const rand = rng(seed)
  let plain = ''
  let acc = ''
  for (let i = 0; i < count; i++) {
    const sx = x + rand() * w
    const sy = y + Math.pow(rand(), 1.6) * h
    const r = rand() > 0.86 ? 1.5 : 1
    const op = (0.14 + rand() * 0.42).toFixed(2)
    const twinkles = rand() > 0.78
    const el =
      `<rect${twinkles ? ` class="tw" style="animation-delay:${(rand() * 7).toFixed(2)}s"` : ''}` +
      ` x="${n(sx)}" y="${n(sy)}" width="${r}" height="${r}" opacity="${op}"/>`
    if (i % accEvery === 0) acc += el
    else plain += el
  }
  return `<g class="${cls}">${plain}</g><g class="${accCls}">${acc}</g>`
}

// Traced from the real brand lockups, so the geometry is the asset itself and
// never a redraw. See engine/data/brand-paths.json.
const BRAND = JSON.parse(readFileSync(new URL('../data/brand-paths.json', import.meta.url), 'utf8'))

// A CSS transform animation REPLACES an element's SVG transform attribute
// rather than composing with it, so anything animated has to sit in its own
// wrapper with the placement transform one level down. Getting this wrong
// renders the traced logo at raw path scale - a full-bleed lime rectangle.
function placed({ x, y, scale, cls, extra, inner }) {
  return (
    `<g class="${cls}"${extra}>` +
    `<g transform="translate(${n(x)},${n(y)}) scale(${n(scale)})">${inner}</g>` +
    `</g>`
  )
}

/** The Propiedash mark: a P whose counter is cut out as a house. Square. */
export function propiedashMark({ x, y, size, cls = 'acc', extra = '' }) {
  const o = BRAND.mark
  return placed({
    x,
    y,
    scale: size / o.vw,
    cls,
    extra,
    inner: `<g transform="${o.transform}"><path d="${o.d}"/></g>`,
  })
}

/** Full Propiedash lockup. `width` drives the scale; height follows the asset. */
export function propiedashLockup({ x, y, width, cls = 'ink', extra = '' }) {
  const o = BRAND.wordmark
  return {
    markup: placed({
      x,
      y,
      scale: width / o.vw,
      cls,
      extra,
      inner: `<g transform="${o.transform}"><path d="${o.d}"/></g>`,
    }),
    height: (width * o.vh) / o.vw,
  }
}

export const MARK_ASPECT = BRAND.mark.vh / BRAND.mark.vw
export const LOCKUP_ASPECT = BRAND.wordmark.vh / BRAND.wordmark.vw
