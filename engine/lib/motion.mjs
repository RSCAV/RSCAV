// Shared motion.
//
// GitHub loads README images eagerly, so a one-shot animation has already
// finished by the time anyone scrolls to it. Everything here loops, on long
// cycles with a long hold, so the resting state is what you see most of the
// time and the motion is something you catch rather than something that nags.
//
// Every animation moves *toward* the element's natural state, which means
// prefers-reduced-motion can simply switch animation off and the scene is
// still correct.

export const EASE = 'cubic-bezier(.22,1,.36,1)'
export const EASE_IO = 'cubic-bezier(.4,0,.2,1)'

/** Windows breathing in an occupied building. */
export const WINDOWS = `
.w{animation:wbreath 9s ${EASE_IO} infinite}
@keyframes wbreath{0%,100%{opacity:.14}42%,58%{opacity:1}}
`

/** Stars. Slower and shallower than the windows so they sit behind them. */
export const STARS = `
.tw{animation:twk 7s ${EASE_IO} infinite}
@keyframes twk{0%,100%{opacity:.12}50%{opacity:.85}}
`

/**
 * A wavefront that builds the isometric city, holds it, then lets it go.
 * Buildings carry their own transform-origin at their base so they grow up
 * out of their lot instead of sliding.
 */
export const GROW = `
.b{animation:grow 22s ${EASE} infinite backwards}
@keyframes grow{0%{transform:scaleY(0)}16%{transform:scaleY(1)}90%{transform:scaleY(1)}100%{transform:scaleY(0)}}
`

/** A single element easing up into place, for type and cards. */
export const SETTLE = `
.s{animation:settle 16s ${EASE} infinite backwards}
@keyframes settle{0%{opacity:0;transform:translateY(10px)}9%,94%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(10px)}}
`

/** A hairline that draws itself across, then holds. */
export const DRAW = `
.d{animation:draw 16s ${EASE} infinite backwards}
@keyframes draw{0%{transform:scaleX(0)}12%,96%{transform:scaleX(1)}100%{transform:scaleX(0)}}
`

/** Map nodes igniting. */
export const IGNITE = `
.ig{animation:ignite 18s ${EASE_IO} infinite backwards}
@keyframes ignite{0%{opacity:0}10%{opacity:1}86%{opacity:1}100%{opacity:0}}
`

/** A scan line sweeping a data surface. */
export const SCAN = `
.sc{animation:scan 14s linear infinite}
@keyframes scan{0%{opacity:0}4%{opacity:.5}50%{opacity:.5}96%{opacity:0}100%{opacity:0}}
`

// Every animation above resolves toward the element's natural state, so
// switching animation off is enough. This must never touch `transform`:
// layout transforms position the traced logo paths and the isometric blocks,
// and clearing them would detonate the scene.
export const REDUCED = `
@media (prefers-reduced-motion:reduce){.w,.tw,.s,.d,.b,.ig,.sc{animation:none!important}}
`

/** Themed pair: dark styles by default in the browser's dark scheme. */
export function themed(darkCss, lightCss) {
  return (
    `@media (prefers-color-scheme:dark){${darkCss}}` +
    `@media (prefers-color-scheme:light){${lightCss}}`
  )
}
