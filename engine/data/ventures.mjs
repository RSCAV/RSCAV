// The roster, in the order it matters.
//
// `weight` drives how tall a venture's tower stands in the skyline row, so the
// hierarchy is something you see before you read anything.
// Tower widths are multiples of the 24-unit dither tile, which keeps the dot
// grid continuous across the seams between separate <img> tiles.

export const VENTURES = [
  {
    key: 'propiedash',
    name: 'PROPIEDASH',
    display: 'Propiedash',
    href: 'https://propiedash.com',
    tagline: 'The real-estate marketplace for Venezuela',
    // no role stated here on purpose - see the intro line instead
    role: null,
    status: 'LIVE',
    towerW: 264,
    weight: 1.0,
    mark: true,
  },
  {
    key: 'opennodo',
    name: 'OPENNODO',
    display: 'OpenNodo',
    href: 'https://opennodo.org',
    tagline: 'An open place standard for Venezuela',
    role: 'Founder & lead developer',
    status: 'ALPHA',
    towerW: 192,
    weight: 0.64,
  },
  {
    key: 'studio',
    name: 'CASANOVAALEMAN',
    display: 'casanovaaleman studio',
    href: 'https://casanovaaleman.com',
    tagline: 'Design and web studio',
    role: 'Founder',
    status: 'OPEN',
    towerW: 192,
    weight: 0.6,
  },
  {
    key: 'gradvisr',
    name: 'GRADVISR',
    display: 'Gradvisr',
    href: 'https://gradvisr.com',
    tagline: 'AI degree planner for university students',
    role: 'Founder',
    status: 'BUILDING',
    towerW: 144,
    weight: 0.42,
  },
  {
    key: 'pinks',
    name: 'PINK’S',
    display: 'Pink’s',
    href: 'https://pinks.com',
    tagline: 'Family burger company, Madrid. I run tech and ops',
    role: 'Tech & ops',
    status: 'SCALING',
    towerW: 144,
    weight: 0.38,
  },
  {
    key: 'him',
    name: 'HEARTS IN MOTION',
    display: 'Hearts in Motion',
    href: 'https://heartsinmotion.events',
    tagline: 'Event platform for a pediatric cancer charity',
    role: 'Studio work',
    status: 'LIVE',
    towerW: 120,
    weight: 0.3,
  },
  {
    key: 'yntegra',
    name: 'YNTEGRA',
    display: 'Yntegra',
    href: 'https://github.com/RSCAV',
    tagline: 'Brand and platform for a luxury pickleball Pro-Am',
    role: 'Studio work',
    status: 'LIVE',
    towerW: 120,
    weight: 0.26,
  },
]

/** Everything smaller, listed rather than built. */
export const ALSO = [
  ['uf-api', 'https://github.com/RSCAV/uf-api', 'Verified public catalog for University of Florida web APIs'],
  ['Hammerforge MMA', null, 'Site for a combat arts training hall'],
  ['MaxStrong', 'https://maxstrong.org', 'Nonprofit built alongside Hearts in Motion'],
]
