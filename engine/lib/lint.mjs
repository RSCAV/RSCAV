// Build-time checks for the ways an SVG can look fine in source and render
// wrong as an <img> on GitHub.

const ANIMATED = ['w', 'tw', 's', 'd', 'b', 'ig', 'sc']

export function lint(name, svg) {
  const problems = []

  // A CSS transform animation replaces the SVG transform attribute instead of
  // composing with it. Any element carrying both loses its placement the
  // moment the animation starts.
  const tagRe = /<(g|rect|path|polygon|text|use|circle)\b([^>]*)>/g
  let m
  while ((m = tagRe.exec(svg))) {
    const attrs = m[2]
    if (!attrs.includes('transform=')) continue
    const cls = attrs.match(/class="([^"]*)"/)
    if (!cls) continue
    const hit = cls[1].split(/\s+/).filter((c) => ANIMATED.includes(c))
    if (hit.length) {
      problems.push(
        `${name}: <${m[1]}> carries transform= and animated class .${hit.join('/.')} - ` +
          `the animation will drop the placement transform. Wrap it instead.`
      )
    }
  }

  // A scaleX/scaleY animation with no transform-origin scales from the user
  // space origin, which throws the element off screen.
  const scaleAnim = /class="[^"]*\b(d|b)\b[^"]*"/g
  while ((m = scaleAnim.exec(svg))) {
    const tagStart = svg.lastIndexOf('<', m.index)
    const tagEnd = svg.indexOf('>', m.index)
    const tag = svg.slice(tagStart, tagEnd)
    if (!/transform-origin/.test(tag)) {
      problems.push(`${name}: element with scaling class has no transform-origin: ${tag.slice(0, 110)}`)
    }
  }

  // External references cannot resolve inside an <img>.
  if (/(?:href|src)="https?:/.test(svg)) {
    problems.push(`${name}: references an external URL, which will not load when embedded as <img>`)
  }
  if (/<(script|foreignObject)\b/.test(svg)) {
    problems.push(`${name}: contains script/foreignObject, stripped or inert in a README`)
  }

  // Every url(#id) must resolve inside this file.
  const ids = new Set([...svg.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]))
  for (const r of svg.matchAll(/url\(#([^)]+)\)/g)) {
    if (!ids.has(r[1])) problems.push(`${name}: url(#${r[1]}) has no matching id`)
  }
  for (const r of svg.matchAll(/\shref="#([^"]+)"/g)) {
    if (!ids.has(r[1])) problems.push(`${name}: href="#${r[1]}" has no matching id`)
  }

  return problems
}
