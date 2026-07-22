// Shared data + building blocks for the full-profile mockups.
// Real numbers throughout, so each direction is judged on design, not fiction.

export const D = {
  name: 'Rodrigo Casanova-Aleman',
  handle: 'RSCAV',
  role: 'Founder and builder',
  places: 'Caracas · Madrid · Miami · Gainesville',
  total: '5,154',
  active: 90,
  peak: 518,
  streak: 14,
  listings: '2,122',
  zones: 319,
  estados: 17,
  onPlaces: '2,870',
  entities: 26,
  months: [0, 3, 11, 3, 0, 0, 0, 0, 13, 400, 1060, 1541, 2023],
  monthLabels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
}

export const VENTURES = [
  ['Propiedash', 'The real-estate marketplace for Venezuela', 'LIVE', 'propiedash.com'],
  ['OpenNodo', 'An open place standard for Venezuela', 'ALPHA', 'opennodo.org'],
  ['casanovaaleman', 'Design and web studio', 'OPEN', 'casanovaaleman.com'],
  ['Gradvisr', 'AI degree planner for students', 'BUILDING', 'gradvisr.com'],
  ["Pink's", 'Family burger company, Madrid', 'SCALING', 'pinks.com'],
  ['Hearts in Motion', 'Event platform for a childrens charity', 'LIVE', 'heartsinmotion.events'],
]

export const SHOTS = {
  pd: '../engine/data/shots/c-pd-desktop.png',
  pdm: '../engine/data/shots/c-pd-mobile.png',
  on: '../engine/data/shots/c-on-map.png',
  onx: '../engine/data/shots/c-on-explorer.png',
}

/** 53x7 contribution heat grid. `theme` picks the colour ramp. */
export function heat({ cell = 9, gap = 3, ramp = ['#161b22', '#2c4a12', '#5c8f16', '#98d41c', '#C7FF02'], cls = '' } = {}) {
  let out = `<div class="heat ${cls}" style="--c:${cell}px;--g:${gap}px">`
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 53; c++) {
      // the real shape of the year: nothing until spring, then a wall
      const p = c / 52
      const intensity = p < 0.62 ? (((c * 7 + r * 3) % 29 === 0) ? 1 : 0) : Math.min(4, Math.floor(((p - 0.6) / 0.4) * 4.6) - ((c * 3 + r * 5) % 3))
      const lvl = Math.max(0, Math.min(4, intensity))
      out += `<i style="background:${ramp[lvl]};animation-delay:${(c * 0.02).toFixed(2)}s"></i>`
    }
  }
  return out + '</div>'
}

/** Monthly bars, used by several directions. */
export function bars({ w = 26, maxH = 90, color = '#C7FF02', track = 'transparent', labels = true } = {}) {
  const max = Math.max(...D.months)
  return `<div class="bars">${D.months
    .map((v, i) => {
      const h = v > 0 ? Math.max(3, (v / max) * maxH) : 1
      return `<div class="bcol"><i style="height:${h}px;background:${color};animation-delay:${(i * 0.06).toFixed(2)}s"></i>${
        labels ? `<u>${D.monthLabels[i]}</u>` : ''
      }</div>`
    })
    .join('')}</div>`
}

/** Wide dimetric skyline built from the real monthly shape. */
export function citySVG({ acc = '#C7FF02', top = '#333E60', right = '#212A44', front = '#161D30', h = 190 } = {}) {
  const heights = [3, 3, 3, 4, 3, 3, 3, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 8, 26, 44, 34, 62, 48, 76, 56, 92, 68, 108, 80, 124, 96, 74, 116, 88, 130, 100]
  const CW = 9, SX = 5, SY = 7, base = 150
  return `<svg viewBox="0 0 400 ${h}" preserveAspectRatio="xMidYMax meet">
    ${heights
      .map((bh, i) => {
        const x = i * 10.2, y = base - bh
        return `<g class="bld" style="animation-delay:${(i * 0.045).toFixed(2)}s">
        <polygon fill="${front}" points="${x + SX},${base + SY} ${x + SX + CW},${base + SY} ${x + SX + CW},${y + SY} ${x + SX},${y + SY}"/>
        <polygon fill="${right}" points="${x + CW},${base} ${x + SX + CW},${base + SY} ${x + SX + CW},${y + SY} ${x + CW},${y}"/>
        <polygon fill="${top}" points="${x},${y} ${x + CW},${y} ${x + SX + CW},${y + SY} ${x + SX},${y + SY}"/>
        ${bh > 70 ? `<polyline points="${x + SX},${y + SY} ${x + SX + CW},${y + SY} ${x + CW},${y}" fill="none" stroke="${acc}" stroke-width="1.3"/>` : ''}
      </g>`
      })
      .join('')}
  </svg>`
}

/** Elevation skyline silhouette, for hero bands. */
export function skylineSVG({ fill = '#0A0F19', win = '#C7FF02', w = 1200, h = 150, seed = 7 } = {}) {
  let s = seed, rand = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff)
  let mass = '', wins = '', x = -10
  while (x < w) {
    const bw = 26 + rand() * 42, bh = 34 + Math.pow(rand(), 1.5) * (h - 42)
    mass += `<rect x="${x.toFixed(0)}" y="${(h - bh).toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}"/>`
    for (let r = 0; r < Math.floor((bh - 12) / 12); r++)
      for (let c = 0; c < Math.floor((bw - 8) / 10); c++)
        if (rand() > 0.62)
          wins += `<rect x="${(x + 6 + c * 10).toFixed(0)}" y="${(h - bh + 8 + r * 12).toFixed(0)}" width="4" height="5" opacity="${rand() > 0.6 ? 1 : 0.45}"/>`
    x += bw + 4 + rand() * 7
  }
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="skl">
    <g fill="${fill}">${mass}</g><g fill="${win}" class="wins">${wins}</g></svg>`
}
