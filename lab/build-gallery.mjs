// Builds lab/gallery.html: 50 live, animated directions the profile could take.
// Every tile is real HTML/CSS running in the page, not a picture of an idea.

import { writeFileSync, readFileSync } from 'node:fs'
import { A } from './concepts-a.mjs'
import { B } from './concepts-b.mjs'
import { C } from './concepts-c.mjs'

const ALL = [...A, ...B, ...C]

const CATS = {
  terminal: 'Terminal & code',
  retro: 'Retro computing',
  iso: 'Isometric & 3D',
  map: 'Maps & geography',
  data: 'Data & instruments',
  game: 'Games & playable',
  editorial: 'Editorial & print',
  generative: 'Generative art',
  product: 'Product showcase',
}

const FONT = readFileSync(new URL('../engine/data/InterVariable.woff2', import.meta.url).pathname).toString('base64')

const dupes = ALL.map((c) => c.id).filter((id, i, a) => a.indexOf(id) !== i)
if (dupes.length) throw new Error(`duplicate ids: ${dupes}`)

const card = (c, i) => `
<article class="card" id="${c.id}" data-cat="${c.cat}" data-feas="${c.feas}"
  data-q="${(c.name + ' ' + c.blurb + ' ' + c.tags.join(' ') + ' ' + CATS[c.cat]).toLowerCase()}">
  <header>
    <span class="num">${String(i + 1).padStart(2, '0')}</span>
    <h3>${c.name}</h3>
    <span class="feas ${c.feas}">${c.feas === 'yes' ? 'README-ready' : 'ambitious'}</span>
  </header>
  ${c.html}
  <p class="blurb">${c.blurb}</p>
  <div class="tags">${c.tags.map((t) => `<span>${t}</span>`).join('')}<span class="cat">${CATS[c.cat]}</span></div>
  <button class="zoom" data-id="${c.id}" aria-label="Expand ${c.name}">⤢</button>
</article>`

const html = `<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>50 directions · RSCAV profile lab</title>
<style>
@font-face{font-family:Inter;font-weight:100 900;src:url(data:font/woff2;base64,${FONT}) format('woff2')}
:root{
  --bg:#0b0f1a;--panel:#121827;--line:#222c45;--ink:#fff;--sub:#aeb2c0;--faint:#6c7286;--lime:#C7FF02;
}
:root[data-t="light"]{--bg:#f4f4f0;--panel:#fff;--line:#e0e0d8;--ink:#0a0a0a;--sub:#4a4f58;--faint:#8b909b}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit}

/* ---- masthead ---- */
.top{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--bg) 88%,transparent);
  backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.top .in{max-width:1500px;margin:0 auto;padding:16px 26px}
.brand{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap}
.brand b{font-size:19px;font-weight:800;letter-spacing:-.6px}
.chip{background:var(--lime);color:#0a0a0a;font-size:9.5px;font-weight:800;letter-spacing:2.2px;padding:4px 8px}
.brand p{color:var(--sub);font-size:13px}
.controls{display:flex;gap:9px;align-items:center;margin-top:14px;flex-wrap:wrap}
input[type=search]{background:var(--panel);border:1px solid var(--line);color:var(--ink);
  padding:8px 12px;border-radius:7px;font:500 13px Inter;min-width:210px;outline:none}
input[type=search]:focus{border-color:var(--lime)}
.f{background:transparent;border:1px solid var(--line);color:var(--sub);padding:7px 12px;border-radius:20px;
  font:600 11px Inter;cursor:pointer;white-space:nowrap}
.f:hover{color:var(--ink);border-color:var(--faint)}
.f.on{background:var(--lime);border-color:var(--lime);color:#0a0a0a}
.spacer{flex:1}
.count{color:var(--faint);font:600 11px Inter;letter-spacing:1px}

/* ---- grid ---- */
.grid{max-width:1500px;margin:0 auto;padding:26px;display:grid;gap:20px;
  grid-template-columns:repeat(auto-fill,minmax(330px,1fr))}
.card{background:var(--panel);border:1px solid var(--line);border-radius:13px;padding:14px;position:relative;
  transition:border-color .18s cubic-bezier(.4,0,.2,1),transform .18s cubic-bezier(.4,0,.2,1)}
.card:hover{border-color:var(--lime);transform:translateY(-3px)}
.card.hide{display:none}
header{display:flex;align-items:center;gap:9px;margin-bottom:11px}
.num{font:800 10px ui-monospace;color:var(--lime);letter-spacing:1px}
h3{font-size:14.5px;font-weight:700;letter-spacing:-.3px;flex:1}
.feas{font:700 7.5px Inter;letter-spacing:1.2px;padding:3px 6px;border-radius:4px;
  background:rgba(199,255,2,.13);color:var(--lime)}
.feas.hard{background:rgba(255,159,90,.14);color:#ff9f5a}
.cv{width:100%;aspect-ratio:16/10;border-radius:9px;overflow:hidden;position:relative}
.blurb{color:var(--sub);font-size:12.5px;line-height:1.5;margin-top:11px}
.tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:9px}
.tags span{font:600 8.5px Inter;letter-spacing:.6px;color:var(--faint);border:1px solid var(--line);
  padding:3px 6px;border-radius:4px}
.tags .cat{border-color:transparent;background:rgba(127,127,127,.1)}
.zoom{position:absolute;top:12px;right:12px;width:24px;height:24px;border-radius:6px;cursor:pointer;
  background:transparent;border:1px solid var(--line);color:var(--faint);font-size:11px;opacity:0;transition:opacity .16s}
.card:hover .zoom{opacity:1}
.zoom:hover{border-color:var(--lime);color:var(--lime)}

/* ---- lightbox ---- */
.lb{position:fixed;inset:0;z-index:100;background:rgba(4,6,12,.9);backdrop-filter:blur(9px);
  display:none;place-items:center;padding:34px}
.lb.on{display:grid}
.lb .stage{width:min(1080px,94vw)}
.lb .cv{aspect-ratio:16/9;border-radius:12px}
.lb .meta{display:flex;align-items:baseline;gap:12px;margin-bottom:14px;color:#fff}
.lb .meta h3{font-size:22px}
.lb .meta p{color:#aeb2c0;font-size:13px;flex:1}
.close{position:absolute;top:22px;right:26px;background:transparent;border:1px solid #333c55;color:#aeb2c0;
  width:34px;height:34px;border-radius:8px;cursor:pointer;font-size:15px}
.close:hover{border-color:var(--lime);color:var(--lime)}
.nav{position:absolute;top:50%;transform:translateY(-50%);background:transparent;border:1px solid #333c55;
  color:#aeb2c0;width:38px;height:56px;border-radius:9px;cursor:pointer;font-size:17px}
.nav:hover{border-color:var(--lime);color:var(--lime)}
.prev{left:22px}.next{right:22px}

/* ---- shared keyframes used by concepts ---- */
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes c17s{from{opacity:0;transform:translateX(-7px)}to{opacity:1;transform:none}}
footer{max-width:1500px;margin:0 auto;padding:10px 26px 60px;color:var(--faint);font-size:12px;line-height:1.7}
footer b{color:var(--ink)}
${ALL.map((c) => c.css).join('\n')}
</style>

<div class="top"><div class="in">
  <div class="brand">
    <span class="chip">PROFILE LAB</span>
    <b>50 directions</b>
    <p>Every tile is live and animated. Hover to inspect, click ⤢ to blow it up. Tell me the numbers you want.</p>
  </div>
  <div class="controls">
    <input type="search" id="q" placeholder="Search: terminal, map, game, dither…" autocomplete="off">
    <button class="f on" data-cat="all">All</button>
    ${Object.entries(CATS).map(([k, v]) => `<button class="f" data-cat="${k}">${v}</button>`).join('')}
    <span class="spacer"></span>
    <button class="f" id="feas">README-ready only</button>
    <button class="f" id="theme">Light</button>
    <span class="count"><i id="n">${ALL.length}</i> / ${ALL.length}</span>
  </div>
</div></div>

<main class="grid" id="grid">${ALL.map(card).join('')}</main>

<footer>
  <b>How to read this.</b> “README-ready” means I have verified the technique renders on github.com:
  animated SVG through an <code>&lt;img&gt;</code>, embedded fonts, theme-aware swaps, and repo-relative assets
  that bypass the image proxy. “Ambitious” means it needs more moving parts than a README comfortably holds,
  or a real canvas, and would be better as a page on casanovaaleman.com.
  <br><b>Sources.</b> Built after surveying 140 profiles across
  awesome-github-profile-readme and creative-profile-readme, plus a capability audit run directly against GitHub.
</footer>

<div class="lb" id="lb">
  <button class="close" id="x">✕</button>
  <button class="nav prev" id="p">‹</button>
  <button class="nav next" id="nx">›</button>
  <div class="stage"><div class="meta"><h3 id="lt"></h3><p id="lp"></p></div><div id="ls"></div></div>
</div>

<script>
const cards=[...document.querySelectorAll('.card')]
const nEl=document.getElementById('n')
let cat='all', feasOnly=false, q=''

function apply(){
  let n=0
  for(const c of cards){
    const okCat = cat==='all'||c.dataset.cat===cat
    const okFeas = !feasOnly||c.dataset.feas==='yes'
    const okQ = !q||c.dataset.q.includes(q)
    const show = okCat&&okFeas&&okQ
    c.classList.toggle('hide',!show); if(show)n++
  }
  nEl.textContent=n
}
document.querySelectorAll('.f[data-cat]').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.f[data-cat]').forEach(x=>x.classList.remove('on'))
  b.classList.add('on'); cat=b.dataset.cat; apply()
})
document.getElementById('q').oninput=e=>{q=e.target.value.toLowerCase().trim();apply()}
document.getElementById('feas').onclick=e=>{feasOnly=!feasOnly;e.target.classList.toggle('on',feasOnly);apply()}
document.getElementById('theme').onclick=e=>{
  const l=document.documentElement.dataset.t==='light'
  document.documentElement.dataset.t=l?'':'light'; e.target.textContent=l?'Light':'Dark'
}

// lightbox: clone the live tile so the animation keeps running at size
const lb=document.getElementById('lb'), ls=document.getElementById('ls')
const lt=document.getElementById('lt'), lp=document.getElementById('lp')
let cur=0
function open(i){
  const vis=cards.filter(c=>!c.classList.contains('hide'))
  if(!vis.length)return
  cur=(i+vis.length)%vis.length
  const c=vis[cur]
  lt.textContent=c.querySelector('h3').textContent
  lp.textContent=c.querySelector('.blurb').textContent
  ls.innerHTML=''
  const clone=c.querySelector('.cv').cloneNode(true)
  const wrap=document.createElement('div'); wrap.id=c.id; wrap.appendChild(clone)
  ls.appendChild(wrap)
  lb.classList.add('on')
}
document.querySelectorAll('.zoom').forEach(b=>b.onclick=()=>{
  const vis=cards.filter(c=>!c.classList.contains('hide'))
  open(vis.findIndex(c=>c.id===b.dataset.id))
})
document.getElementById('x').onclick=()=>lb.classList.remove('on')
document.getElementById('p').onclick=()=>open(cur-1)
document.getElementById('nx').onclick=()=>open(cur+1)
lb.onclick=e=>{if(e.target===lb)lb.classList.remove('on')}
addEventListener('keydown',e=>{
  if(e.key==='Escape')lb.classList.remove('on')
  if(!lb.classList.contains('on'))return
  if(e.key==='ArrowRight')open(cur+1); if(e.key==='ArrowLeft')open(cur-1)
})
apply()
</script>
</html>`

const out = new URL('./gallery.html', import.meta.url).pathname
writeFileSync(out, html)
console.log(`gallery.html · ${ALL.length} concepts · ${(html.length / 1024).toFixed(0)} KB`)
const byCat = {}
for (const c of ALL) byCat[c.cat] = (byCat[c.cat] || 0) + 1
console.log(Object.entries(byCat).map(([k, v]) => `${k}:${v}`).join('  '))
