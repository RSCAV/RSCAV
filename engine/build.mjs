// Builds the world.
//
// Every band is regenerated from live GitHub data and committed as a static
// SVG, so the README never depends on a third-party endpoint staying up and
// never gets stale-cached behind GitHub's image proxy.

import { writeFileSync, mkdirSync, statSync, rmSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fetchContributions } from './lib/data.mjs'
import { hero } from './scenes/hero.mjs'
import { city } from './scenes/city.mjs'
import { towerTiles, towersMarkdown } from './scenes/towers.mjs'
import { charts } from './scenes/charts.mjs'
import { studio } from './scenes/studio.mjs'
import { footer } from './scenes/footer.mjs'
import { lint } from './lib/lint.mjs'
import { veGeoJSON } from './lib/geo.mjs'
import { readme } from './readme.mjs'

const LOGIN = process.env.PROFILE_LOGIN || 'RSCAV'
const OUT = new URL('../assets/gen/', import.meta.url).pathname

// Wipe only the generated SVGs: renaming a band used to leave its old file
// behind and the README picks up whatever is here. The product showcases are
// committed .webp built by showcase.mjs from real screenshots, so they must
// survive a rebuild.
mkdirSync(OUT, { recursive: true })
for (const f of readdirSync(OUT)) if (f.endsWith('.svg')) rmSync(join(OUT, f), { force: true })

const t0 = Date.now()
console.log(`fetching contributions for ${LOGIN}...`)
const d = fetchContributions(LOGIN)
d.builtAt = new Date().toISOString().slice(0, 10)
console.log(
  `  ${d.total.toLocaleString('en-US')} contributions, ${d.activeDays} active days, ` +
    `peak ${d.max}, longest streak ${d.longestStreak}`
)

const BANDS = [
  ['01-hero', hero],
  ['05-studio', () => studio()],
  ['06-city', city],
  ['07-charts', charts],
  ['08-footer', footer],
]

let total = 0
const problems = []

// the skyline row is many small files rather than one, so each tower can carry
// its own link
const tiles = towerTiles()
for (const t of tiles) {
  problems.push(...lint(t.name, t.svg))
  writeFileSync(`${OUT}${t.name}.svg`, t.svg)
  total += statSync(`${OUT}${t.name}.svg`).size / 1024
}
console.log(`  ${tiles.length} tower tiles`)
for (const [name, fn] of BANDS) {
  const svg = fn(d)
  problems.push(...lint(name, svg))
  const path = `${OUT}${name}.svg`
  writeFileSync(path, svg)
  const kb = statSync(path).size / 1024
  total += kb
  console.log(`  ${name}.svg  ${kb.toFixed(1)} KB`)
}

writeFileSync(new URL('../README.md', import.meta.url).pathname, readme(d, tiles, veGeoJSON()))

console.log(
  `built ${BANDS.length} bands + ${tiles.length} tiles, ${total.toFixed(1)} KB total, ${Date.now() - t0}ms`
)

// A build that quietly loses the private contributions would draw an almost
// empty city and look like a bug in the art rather than a missing token.
if (d.total < 500) {
  console.error(
    `\nonly ${d.total} contributions came back. The token is probably missing read:user, ` +
      `so private contributions are being dropped. Refusing to commit a hollowed-out city.`
  )
  process.exit(1)
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`)
  for (const p of problems) console.error(`  ${p}`)
  process.exit(1)
}
