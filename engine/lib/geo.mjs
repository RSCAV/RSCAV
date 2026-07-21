// The one interactive element a README can have.
//
// GitHub renders a ```geojson fence server-side through its viewscreen service
// into a real pan-and-zoom map that follows the reader's theme. An <img> SVG
// can animate but can never be touched; this can. It costs no assets, no image
// proxy and no Action.

import { readFileSync, writeFileSync } from 'node:fs'

const SEED = new URL('../../../opennodo/opennodo_seed_v0_1/', import.meta.url).pathname

const strip = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/**
 * One marker per federal entity, carrying the counts OpenNodo actually holds.
 * Falls back to a committed copy when the OpenNodo checkout is not present, so
 * a CI build never silently drops the map.
 */
export function veGeoJSON() {
  const cached = new URL('../data/ve-entities.json', import.meta.url).pathname
  try {
    const csv = readFileSync(`${SEED}summary_by_entity.csv`, 'utf8').trim().split('\n')
    const hdr = csv[0].split(',')
    const rows = csv.slice(1).map((l) => {
      const c = l.split(',')
      return Object.fromEntries(hdr.map((h, i) => [h, c[i]]))
    })
    const ents = readFileSync(`${SEED}places_federal_entities.geojsonl`, 'utf8')
      .trim()
      .split('\n')
      .map((l) => JSON.parse(l))
      .map((f) => ({ name: f.properties.canonical_name, c: f.properties.centroid }))

    const features = []
    for (const r of rows) {
      const key = strip(r.entity_name)
      const m =
        ents.find((e) => strip(e.name) === key) ||
        ents.find((e) => strip(e.name).includes(key.slice(0, 7)) || key.includes(strip(e.name).slice(0, 7)))
      if (!m) continue
      const parishes = +r.parishes_total_records_actual
      features.push({
        type: 'Feature',
        properties: {
          name: m.name,
          municipios: +r.municipalities_actual,
          parroquias: parishes,
          'marker-color': '#C7FF02',
          'marker-size': parishes > 60 ? 'large' : parishes > 25 ? 'medium' : 'small',
        },
        geometry: { type: 'Point', coordinates: [round(m.c[0]), round(m.c[1])] },
      })
    }
    if (features.length < 20) throw new Error(`only ${features.length} entities matched`)
    const out = JSON.stringify({ type: 'FeatureCollection', features })
    writeFileSync(cached, out)
    return out
  } catch (err) {
    console.warn(`  geojson: using committed copy (${err.message})`)
    return readFileSync(cached, 'utf8').trim()
  }
}

const round = (v) => Math.round(v * 1000) / 1000
