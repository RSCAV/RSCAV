// Full-world capture: every band stacked with GitHub's 6px seam, plus the
// skyline row rendered the way the README composes it.
import { chromium } from 'playwright'
import { readdirSync, statSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'
import { towerTiles, towersMarkdown } from './scenes/towers.mjs'

const ROOT = new URL('..', import.meta.url).pathname
const outDir = process.argv[2] || '/tmp/world'
const at = process.argv.includes('--at') ? parseFloat(process.argv[process.argv.indexOf('--at') + 1]) : 5
mkdirSync(outDir, { recursive: true })

const bands = readdirSync(join(ROOT, 'assets', 'gen'))
  .filter((f) => f.endsWith('.svg') && !f.startsWith('02-tower'))
  .sort()

const row = towersMarkdown(towerTiles())

const page = (scheme) => `<!doctype html><meta charset="utf-8">
<style>
 html{color-scheme:${scheme}}
 body{margin:0;background:${scheme === 'dark' ? '#0d1117' : '#fff'};padding:24px 0}
 .col{width:880px;margin:0 auto}
 img{display:inline;max-width:100%;vertical-align:baseline}
 .band{display:block;width:100%;margin-bottom:6px}
 p{margin:0 0 6px}
 a{font-size:0}
</style>
<div class="col">
 <img class="band" src="assets/gen/${bands[0]}">
 ${row}
 ${bands.slice(1).map((f) => `<img class="band" src="assets/gen/${f}">`).join('\n')}
</div>`

const shell = join(ROOT, '.shotworld.html')
const browser = await chromium.launch()
for (const scheme of ['dark', 'light']) {
  writeFileSync(shell, page(scheme))
  const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 940, height: 900 }, deviceScaleFactor: 1 })
  const p = await ctx.newPage()
  await p.goto(pathToFileURL(shell).href, { waitUntil: 'networkidle' })
  await p.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))))
  // Chromium pauses animations inside an offscreen <img>, so a tall page
  // screenshots its lower bands at frame zero. Growing the viewport to the
  // whole document puts every band on screen and lets them all run - which
  // also confirms the real behaviour: a band animates when it scrolls in.
  const full = await p.evaluate(() => document.documentElement.scrollHeight)
  await p.setViewportSize({ width: 940, height: Math.min(full + 40, 30000) })
  await p.waitForTimeout(at * 1000)
  const out = join(outDir, `world-${scheme}.png`)
  await p.screenshot({ path: out, fullPage: true })
  console.log(`${out}  ${(statSync(out).size / 1024).toFixed(0)} KB`)
  await ctx.close()
}
await browser.close()
rmSync(shell, { force: true })
