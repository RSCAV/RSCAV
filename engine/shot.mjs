// Verification harness.
//
// Renders the generated bands in real Chromium, once per colour scheme, with
// the SVGs loaded as <img> - the same way GitHub embeds them. Anything that
// only works when an SVG is inlined will visibly fail here, which is the
// point.
//
// Usage: node shot.mjs [outDir] [--band 03-city] [--at 4.5]

import { chromium } from 'playwright'
import { readdirSync, statSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const GEN = join(ROOT, 'assets', 'gen')

const args = process.argv.slice(2)
const outDir = args.find((a) => !a.startsWith('--')) || '/tmp/world-shots'
const only = args.includes('--band') ? args[args.indexOf('--band') + 1] : null
// seconds into the animation to freeze at; animations are paused there so a
// still frame shows a real moment of the loop rather than frame zero
const at = args.includes('--at') ? parseFloat(args[args.indexOf('--at') + 1]) : 3.2

mkdirSync(outDir, { recursive: true })

const files = readdirSync(GEN)
  .filter((f) => f.endsWith('.svg') && (!only || f.startsWith(only)))
  .sort()

if (!files.length) {
  console.error('no bands to shoot')
  process.exit(1)
}

const page = (scheme) => `<!doctype html><meta charset="utf-8">
<style>
  html{color-scheme:${scheme}}
  body{margin:0;background:${scheme === 'dark' ? '#0d1117' : '#ffffff'};padding:32px 0}
  .col{width:880px;margin:0 auto}
  img{display:block;width:100%}
  /* GitHub's own 6px seam between stacked README images */
  img + img{margin-top:6px}
</style>
<div class="col">${files.map((f) => `<img src="assets/gen/${f}">`).join('')}</div>`

// Chromium refuses file:// subresources from an about:blank document, so the
// harness page is written into the repo and navigated to for real.
const shell = join(ROOT, '.shot.html')

// reduced-motion is captured too: the scene has to be correct, not merely
// still, when a reader has motion switched off
const PASSES = [
  ['dark', 'no-preference'],
  ['light', 'no-preference'],
  ['dark-reduced', 'reduce'],
]

const browser = await chromium.launch()
for (const [name, reducedMotion] of PASSES) {
  const scheme = name.startsWith('light') ? 'light' : 'dark'
  writeFileSync(shell, page(scheme))
  const ctx = await browser.newContext({
    colorScheme: scheme,
    reducedMotion,
    viewport: { width: 940, height: 700 },
    deviceScaleFactor: 2,
  })
  const p = await ctx.newPage()
  await p.goto(pathToFileURL(shell).href, { waitUntil: 'networkidle' })
  await p.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))))
  await p.waitForTimeout(at * 1000)
  const out = join(outDir, `${name}.png`)
  await p.screenshot({ path: out, fullPage: true })
  const kb = (statSync(out).size / 1024).toFixed(0)
  console.log(`${out}  ${kb} KB`)
  await ctx.close()
}
await browser.close()
rmSync(shell, { force: true })

console.log(
  files.map((f) => `${f} ${(statSync(join(GEN, f)).size / 1024).toFixed(1)}KB`).join('  ')
)
