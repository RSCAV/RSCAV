// Inter, subset per scene and inlined as a data URI.
//
// A README image is fetched by the browser as an <img>, so it cannot reach out
// for a webfont - anything not embedded in the file falls back to the system
// sans. Subsetting to the exact glyphs a scene uses keeps each band under a
// few KB instead of shipping the whole face seven times.

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdtempSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC = join(HERE, '..', 'data', 'InterVariable.woff2')
const CACHE = new Map()

/** Collect every character a scene renders so the subset is exact. */
export class Charset {
  constructor() {
    this.chars = new Set(' ')
  }
  add(s) {
    for (const ch of String(s)) this.chars.add(ch)
    return s
  }
  get text() {
    return [...this.chars].join('')
  }
}

export function subsetBase64(text) {
  const key = [...new Set(text)].sort().join('')
  if (CACHE.has(key)) return CACHE.get(key)
  if (!existsSync(SRC)) throw new Error(`missing font source: ${SRC}`)

  const dir = mkdtempSync(join(tmpdir(), 'inter-'))
  const txt = join(dir, 'chars.txt')
  const out = join(dir, 'sub.woff2')
  writeFileSync(txt, key, 'utf8')

  execFileSync('pyftsubset', [
    SRC,
    `--text-file=${txt}`,
    '--flavor=woff2',
    `--output-file=${out}`,
    '--layout-features=kern,liga',
    '--no-hinting',
    '--desubroutinize',
    '--drop-tables+=DSIG',
  ])

  const b64 = readFileSync(out).toString('base64')
  CACHE.set(key, b64)
  return b64
}

/** <style> block declaring the embedded face. Variable axis kept so weights work. */
export function fontFace(text) {
  const b64 = subsetBase64(text)
  return (
    `@font-face{font-family:"Inter";font-style:normal;font-weight:100 900;` +
    `src:url("data:font/woff2;base64,${b64}") format("woff2")}` +
    `text{font-family:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;` +
    `font-optical-sizing:none}`
  )
}
