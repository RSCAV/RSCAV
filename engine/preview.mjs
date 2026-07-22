// Local preview harness. Renders every generated band into one page, in both
// themes, exactly the way GitHub embeds them - as <img>, so what shows here is
// what the README will do.

import { readdirSync, writeFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const GEN = new URL('../assets/gen/', import.meta.url).pathname
const files = readdirSync(GEN)
  .filter((f) => f.endsWith('.svg'))
  .sort()

const rows = files
  .map((f) => {
    const kb = (statSync(join(GEN, f)).size / 1024).toFixed(1)
    return `<figure><figcaption>${f} &middot; ${kb} KB</figcaption><img src="assets/gen/${f}"></figure>`
  })
  .join('\n')

const page = `<!doctype html><meta charset="utf-8"><title>world preview</title>
<style>
  :root{color-scheme:dark}
  body{margin:0;font:13px ui-monospace,monospace;background:#0d1117;color:#8b949e}
  .wrap{display:grid;grid-template-columns:1fr 1fr;gap:0;min-height:100vh}
  .pane{padding:24px}
  .pane.dark{background:#0d1117}
  .pane.light{background:#fff;color:#57606a;color-scheme:light}
  h2{font:600 11px ui-monospace,monospace;letter-spacing:2px;margin:0 0 16px}
  figure{margin:0 0 6px}
  figcaption{font-size:10px;opacity:.5;padding:2px 0}
  img{display:block;width:100%;max-width:900px}
</style>
<div class="wrap">
  <div class="pane dark"><h2>GITHUB DARK</h2>${rows}</div>
  <div class="pane light"><h2>GITHUB LIGHT</h2>${rows}</div>
</div>`

writeFileSync(new URL('../preview.html', import.meta.url).pathname, page)
console.log(`preview.html  ${files.length} bands`)
