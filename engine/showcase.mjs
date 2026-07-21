// Product showcase bands.
//
// The abstract art is for the GitHub-stats bands. The products get shown for
// real: a live screenshot in a branded browser frame on the Propiedash panel,
// desktop plus a second view, with the name, what it is, the role, and the
// live numbers pulled off the site itself.
//
// Rendered to PNG (not SVG) because the payload is a raster screenshot - a
// committed PNG referenced repo-relative bypasses GitHub's image proxy just
// like the SVGs do, and embeds cleanly. No gradients, no glows: depth is a
// hard offset plate and a 1px lime edge, the brand's flat language.

import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SHOTS = join(HERE, 'data', 'shots')
const OUT = join(HERE, '..', 'assets', 'gen')

const FONT = readFileSync(join(HERE, 'data', 'InterVariable.woff2')).toString('base64')
const fileUrl = (p) => pathToFileURL(p).href

const C = {
  navy: '#121827',
  panel: '#0A0F19',
  lift: '#1B2338',
  edge: '#2A3350',
  lime: '#C7FF02',
  white: '#FFFFFF',
  sub: '#AEB2C0',
  faint: '#6C7286',
}

/** A macOS-style browser window around a screenshot. Grey lights, URL pill. */
function windowHTML({ src, url, w, top = 0, left = 0, z = 1, radius = 12 }) {
  return `
  <div class="win" style="width:${w}px;top:${top}px;left:${left}px;z-index:${z};border-radius:${radius}px">
    <div class="bar">
      <span class="light"></span><span class="light"></span><span class="light"></span>
      <div class="pill"><span class="lock"></span>${url}</div>
    </div>
    <img class="shot" src="${fileUrl(src)}" style="width:100%;display:block">
  </div>`
}

function phoneHTML({ src, w, top, left, z = 3 }) {
  return `
  <div class="phone" style="width:${w}px;top:${top}px;left:${left}px;z-index:${z}">
    <img src="${fileUrl(src)}" style="width:100%;display:block">
  </div>`
}

function page(cfg) {
  const W = 1200
  const H = cfg.height
  const facts = cfg.facts
    .map(
      ([v, k]) =>
        `<div class="fact"><div class="fv">${v}</div><div class="fk">${k}</div></div>`
    )
    .join('')

  return `<!doctype html><meta charset="utf-8">
<style>
  @font-face{font-family:Inter;font-weight:100 900;src:url(data:font/woff2;base64,${FONT}) format('woff2')}
  *{margin:0;padding:0;box-sizing:border-box}
  .band{width:${W}px;height:${H}px;position:relative;overflow:hidden;background:${C.navy};
        font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
  /* dither dot texture, the same language as the rest of the profile */
  .band::before{content:'';position:absolute;inset:0;opacity:.5;
    background-image:radial-gradient(${C.edge} 1px,transparent 0);background-size:7px 7px;
    -webkit-mask-image:linear-gradient(90deg,#000,#000 55%,transparent);mask-image:linear-gradient(90deg,#000,#000 55%,transparent)}
  .col{position:absolute;left:64px;top:${cfg.textTop}px;width:420px;z-index:5}
  .eyebrow{display:inline-block;background:${C.lime};color:#0A0A0A;font-size:11.5px;font-weight:800;
    letter-spacing:2.4px;padding:5px 9px 4px;margin-bottom:26px}
  .role{color:${C.faint};font-size:11.5px;font-weight:600;letter-spacing:2.4px;margin:0 0 26px}
  .title{color:${C.white};font-size:64px;font-weight:800;letter-spacing:-2.4px;line-height:.98;margin-bottom:18px}
  .tag{color:${C.sub};font-size:20px;font-weight:500;line-height:1.3;margin-bottom:14px}
  .desc{color:${C.faint};font-size:14.5px;font-weight:400;line-height:1.5;margin-bottom:30px;max-width:380px}
  .facts{display:flex;gap:30px;border-top:1px solid ${C.edge};padding-top:20px;margin-bottom:28px}
  .fv{color:${C.white};font-size:26px;font-weight:700;letter-spacing:-.6px}
  .fk{color:${C.faint};font-size:8.5px;font-weight:600;letter-spacing:1.4px;margin-top:3px}
  .link{color:${C.lime};font-size:14px;font-weight:700;letter-spacing:.4px}
  .link .arrow{display:inline-block;margin-left:6px}
  .stage{position:absolute;inset:0;z-index:2}
  /* hard offset plate = flat depth, no shadow */
  .plate{position:absolute;background:${C.panel};border-radius:14px;z-index:0}
  .win{position:absolute;overflow:hidden;background:${C.panel};border:1px solid ${C.edge};box-shadow:none}
  .bar{height:34px;background:${C.lift};display:flex;align-items:center;padding:0 13px;gap:7px;border-bottom:1px solid ${C.edge}}
  .light{width:10px;height:10px;border-radius:50%;background:#3A4358}
  .pill{margin-left:11px;height:21px;background:${C.panel};border:1px solid ${C.edge};border-radius:6px;
    color:${C.sub};font-size:11.5px;display:flex;align-items:center;gap:7px;padding:0 12px}
  .lock{width:7px;height:6px;border:1.4px solid ${C.faint};border-radius:2px;position:relative;margin-top:1px}
  .phone{position:absolute;overflow:hidden;background:${C.panel};border:6px solid ${C.panel};
    border-radius:26px;box-shadow:0 0 0 1px ${C.edge}}
  .phone .notch{position:absolute;top:6px;left:50%;transform:translateX(-50%);width:44px;height:6px;
    background:${C.panel};border-radius:0 0 7px 7px;z-index:2}
  .limeEdge{position:absolute;background:${C.lime};z-index:4}
</style>
<div class="band">
  <div class="col">
    <span class="eyebrow">${cfg.eyebrow}</span>
    ${cfg.role ? `<div class="role">${cfg.role}</div>` : ''}
    <div class="title">${cfg.title}</div>
    <div class="tag">${cfg.tag}</div>
    <div class="desc">${cfg.desc}</div>
    <div class="facts">${facts}</div>
    <div class="link">${cfg.link}<span class="arrow">→</span></div>
  </div>
  <div class="stage">${cfg.stage}</div>
</div>`
}

const CONFIGS = {
  '03-propiedash': {
    height: 560,
    textTop: 92,
    stageLeft: 470,
    eyebrow: 'THE MAIN THING',
    title: 'Propiedash',
    tag: 'The real-estate marketplace for Venezuela.',
    desc: 'Listings, agents, demand, and the map underneath all of it. Built for a country whose addresses were never standardised.',
    facts: [
      ['2,122', 'ACTIVE LISTINGS'],
      ['319', 'ZONES'],
      ['17', 'STATES'],
    ],
    link: 'propiedash.com',
    stage: [
      `<div class="plate" style="left:532px;top:116px;width:620px;height:352px"></div>`,
      `<div class="limeEdge" style="left:508px;top:104px;width:3px;height:352px"></div>`,
      windowHTML({ src: `${SHOTS}/c-pd-desktop.png`, url: 'propiedash.com', w: 620, left: 520, top: 104, z: 2 }),
      phoneHTML({ src: `${SHOTS}/c-pd-mobile.png`, w: 142, left: 1046, top: 238, z: 3 }),
    ].join(''),
  },
  '04-opennodo': {
    height: 560,
    textTop: 92,
    stageLeft: 470,
    eyebrow: 'OPEN SOURCE',
    role: 'FOUNDER & LEAD DEVELOPER',
    title: 'OpenNodo',
    tag: 'An open place standard for Venezuela.',
    desc: 'Stable identifiers and canonical names for every administrative and settlement place in the country. Open data, open API.',
    facts: [
      ['2,870', 'PLACES'],
      ['26', 'ENTITIES'],
      ['CC BY 4.0', 'OPEN DATA'],
    ],
    link: 'opennodo.org',
    stage: [
      `<div class="plate" style="left:532px;top:116px;width:620px;height:352px"></div>`,
      `<div class="limeEdge" style="left:508px;top:104px;width:3px;height:352px"></div>`,
      windowHTML({ src: `${SHOTS}/c-on-map.png`, url: 'opennodo.org/map', w: 620, left: 520, top: 104, z: 2 }),
      windowHTML({ src: `${SHOTS}/c-on-explorer.png`, url: 'opennodo.org/explorer', w: 300, left: 860, top: 300, z: 3, radius: 10 }),
    ].join(''),
  },
}

const only = process.argv[2]
const browser = await chromium.launch()
for (const [name, cfg] of Object.entries(CONFIGS)) {
  if (only && name !== only) continue
  const ctx = await browser.newContext({ viewport: { width: 1200, height: cfg.height }, deviceScaleFactor: 2 })
  const p = await ctx.newPage()
  const html = join(HERE, `.showcase-${name}.html`)
  writeFileSync(html, page(cfg))
  await p.goto(fileUrl(html), { waitUntil: 'networkidle' })
  await p.waitForTimeout(500)
  const raw = await p.screenshot({ type: 'png' })
  const tmpPng = join(OUT, `${name}.tmp.png`)
  writeFileSync(tmpPng, raw)
  // WebP keeps a 2x screenshot-heavy band around 200 KB instead of ~900 KB,
  // which matters when a README ships several of them
  execFileSync('cwebp', ['-q', '86', '-quiet', tmpPng, '-o', join(OUT, `${name}.webp`)])
  const { statSync, rmSync: rm } = await import('node:fs')
  rm(tmpPng, { force: true })
  console.log(`${name}.webp  ${(statSync(join(OUT, `${name}.webp`)).size / 1024).toFixed(0)} KB`)
  await ctx.close()
  const { rmSync } = await import('node:fs')
  rmSync(html, { force: true })
}
await browser.close()
