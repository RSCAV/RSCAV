# engine

Draws the world in `../assets/gen/` and regenerates `../README.md`.

    node build.mjs        rebuild everything from live GitHub data
    node shot.mjs OUT     render the bands in Chromium: dark, light, reduced-motion
    node shotworld.mjs O  render the whole README stack, both themes
    node prep.mjs         one-off: simplify the Venezuela geometry (already committed)

## How it fits together

    lib/tokens.mjs    the Propiedash palette as semantic classes, per theme
    lib/dither.mjs    ordered Bayer dithering; the brand bans gradients, so this
                      is every tonal ramp in the whole profile
    lib/svg.mjs       Scene assembly, real Inter metrics, the lime-block rule
    lib/font.mjs      Inter subset to the exact glyphs a band uses, inlined
    lib/skyline.mjs   ridges, skylines, the traced Propiedash lockups
    lib/iso.mjs       the wide dimetric projection the contribution city uses
    lib/motion.mjs    every animation, all looping, all reduced-motion safe
    lib/lint.mjs      catches the SVG mistakes that only show up once rendered
    scenes/*.mjs      one file per band

## Things that will bite you

- A CSS `transform` animation **replaces** an element's SVG `transform`
  attribute instead of composing with it. Animate a wrapper, place the child.
  `lint.mjs` fails the build on this.
- README images are **not** lazy-loaded by GitHub, so a one-shot animation has
  already finished before anyone scrolls to it. Everything loops.
- An SVG loaded through `<img>` cannot run script or fetch anything external.
  The font is inlined as a data URI for that reason.
- Inline images with no whitespace between them butt together with zero gap;
  stacked ones get a 6px seam. That asymmetry is why the skyline row is
  horizontal and the bands are plates.
- The build refuses to commit if the contribution total looks like private
  contributions were dropped. That means the token is missing `read:user`.
