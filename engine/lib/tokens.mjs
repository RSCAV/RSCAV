// Propiedash brand tokens, expressed as semantic classes so one geometry can
// render as a night city or a daylight one depending on the reader's theme.
//
// Hard brand rules encoded here:
//   - no gradients, no glows anywhere: every tonal ramp is ordered dither
//   - lime is one accent, never a full fill
//   - on dark, lime is the text colour; on light, lime is a block behind ink

export const W = 1200

export const C = {
  navy: '#121827',
  lime: '#C7FF02',
  white: '#FFFFFF',
  ink: '#0A0A0A',
}

/**
 * dark  = the night city, on GitHub's dark theme
 * light = the same city in daylight, on GitHub's light theme
 */
export const THEME = {
  dark: {
    bg: '#121827',
    ground: '#0C111C',
    far: '#1B2338', // El Avila, furthest plane
    mid: '#151C2D', // mid-ground blocks
    near: '#0A0F19', // foreground blocks
    edge: '#232C45', // roof lines and separators
    ink: '#FFFFFF',
    sub: '#AEB2C0',
    faint: '#6C7286',
    hair: '#2A3350',
    acc: '#C7FF02',
    accInk: '#C7FF02', // accent used as text
    accBlock: 'none', // on dark the accent needs no block behind it
    // three flat tones carry the depth of an extruded block, since the brand
    // forbids the gradient that would normally do that job
    faceTop: '#333E60',
    faceRight: '#212A44',
    faceFront: '#161D30',
    lotEmpty: '#1A2137',
  },
  light: {
    bg: '#FFFFFF',
    ground: '#F2F2EE',
    far: '#E4E4DE',
    mid: '#3A4258',
    near: '#121827',
    edge: '#5A6070',
    ink: '#0A0A0A',
    sub: '#5B5F66',
    faint: '#9AA0AA',
    hair: '#D8D8D2',
    acc: '#C7FF02',
    accInk: '#0A0A0A', // accent text sits on a lime block instead
    accBlock: '#C7FF02',
    faceTop: '#5C6480',
    faceRight: '#333B52',
    faceFront: '#1C2338',
    lotEmpty: '#E6E6E0',
  },
}

/** Ink colour the dither ramps lay down, per theme and per plane. */
export const DITHER_INK = {
  dark: { sky: '#2C3352', ground: '#1B2338', acc: '#C7FF02', ink: '#FFFFFF' },
  light: { sky: '#C9CBD4', ground: '#D6D6D0', acc: '#C7FF02', ink: '#121827' },
}

export const RAMPS = ['sky', 'ground', 'acc', 'ink']

export const TYPE = {
  mega: 96,
  display: 58,
  title: 30,
  lead: 19,
  body: 14.5,
  label: 11.5,
  micro: 9.5,
}

export const TRACK = { label: 2.6, micro: 2 }

const SEMANTIC = [
  ['bg', 'bg'],
  ['ground', 'ground'],
  ['far', 'far'],
  ['mid', 'mid'],
  ['near', 'near'],
  ['edge', 'edge'],
  ['ink', 'ink'],
  ['sub', 'sub'],
  ['faint', 'faint'],
  ['hair', 'hair'],
  ['acc', 'acc'],
  ['accInk', 'accInk'],
  ['accBlock', 'accBlock'],
  ['faceTop', 'faceTop'],
  ['faceRight', 'faceRight'],
  ['faceFront', 'faceFront'],
  ['lotEmpty', 'lotEmpty'],
]

/** Semantic fill classes, defined once per theme. Dark is the default. */
export function paletteCss() {
  const rules = (t) =>
    SEMANTIC.map(([cls, key]) => `.${cls}{fill:${t[key]}}`).join('') +
    `.sHair{stroke:${t.hair}}.sAcc{stroke:${t.acc}}.sInk{stroke:${t.ink}}.sSub{stroke:${t.sub}}`

  return rules(THEME.dark) + `@media (prefers-color-scheme:light){${rules(THEME.light)}}`
}

/**
 * Dither level classes. A shape gets class="sky7" and picks up the right ink
 * for the reader's theme without the geometry knowing which theme it is in.
 */
export function ditherClassCss(levels) {
  const set = (prefix) =>
    RAMPS.map((r) =>
      Array.from({ length: levels }, (_, i) => `.${r}${i + 1}{fill:url(#${prefix}_${r}_${i + 1})}`).join('')
    ).join('')

  return set('d') + `@media (prefers-color-scheme:light){${set('l')}}`
}
