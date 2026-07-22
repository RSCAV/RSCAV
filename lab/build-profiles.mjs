// Builds lab/profiles.html — ten complete profiles, each rendered inside real
// GitHub chrome so you are judging the page, not a swatch.

import { writeFileSync, readFileSync } from 'node:fs'
import { SET1 } from './p-directions-1.mjs'
import { SET2 } from './p-directions-2.mjs'
import { D } from './p-shared.mjs'

const ALL = [...SET1, ...SET2]
const FONT = readFileSync(new URL('../engine/data/InterVariable.woff2', import.meta.url).pathname).toString('base64')

const dupes = ALL.map((d) => d.id).filter((x, i, a) => a.indexOf(x) !== i)
if (dupes.length) throw new Error('duplicate ids: ' + dupes)

/** The GitHub profile page around a README. */
const chrome = (d) => `
<section class="page ${d.dark ? 'gh-dark' : 'gh-light'}" data-id="${d.id}" ${d.id === ALL[0].id ? '' : 'hidden'}>
  <div class="ghbar">
    <span class="ghlogo">‹/›</span>
    <span class="ghsearch">Type <kbd>/</kbd> to search</span>
    <span class="ghgrow"></span><span class="ghav"></span>
  </div>
  <div class="ghtabs"><b>Overview</b><span>Repositories 21</span><span>Projects</span><span>Packages</span><span>Stars 1</span></div>
  <div class="ghbody">
    <aside class="ghside">
      <div class="avatar">RC</div>
      <div class="whoami"><b>Rodrigo Casanova-Aleman</b><span>RSCAV</span></div>
      <p class="bio">${D.role}. Building Propiedash. Author of OpenNodo.</p>
      <button class="ghbtn">Follow</button>
      <ul class="ghmeta">
        <li>Caracas · Gainesville, FL</li><li>casanovaaleman.com</li><li>rscav06@gmail.com</li>
      </ul>
    </aside>
    <main class="ghmain">
      <div class="readmebox">
        <div class="rmhdr"><span class="bk">📖</span> RSCAV / README.md</div>
        <article class="rm" id="${d.id}">${d.body}</article>
      </div>
      <div class="ghcontrib">
        <b>${D.total} contributions in the last year</b>
        <div class="ghgrid">${Array.from({ length: 371 }, (_, i) => {
          const c = i % 53, p = c / 52
          const lv = p < 0.62 ? (((i * 7) % 29 === 0) ? 1 : 0) : Math.max(0, Math.min(4, Math.floor(((p - 0.6) / 0.4) * 4.6) - ((i * 3) % 3)))
          return `<i data-l="${lv}"></i>`
        }).join('')}</div>
      </div>
    </main>
  </div>
</section>`

const html = `<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>What your profile could look like · 10 directions</title>
<style>
@font-face{font-family:Inter;font-weight:100 900;src:url(data:font/woff2;base64,${FONT}) format('woff2')}
*{margin:0;padding:0;box-sizing:border-box}
body{background:#07080c;color:#e8eaf0;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;display:flex;min-height:100vh}

/* ---- rail ---- */
.rail{width:264px;flex:none;background:#0c0e15;border-right:1px solid #1c2030;padding:20px 0;position:sticky;top:0;height:100vh;overflow-y:auto}
.rail h1{font:800 15px Inter;padding:0 18px;letter-spacing:-.3px}
.rail .lede{font:400 11.5px/1.5 Inter;color:#767d90;padding:6px 18px 16px}
.rail .chip{display:inline-block;background:#C7FF02;color:#0a0a0a;font:800 8.5px Inter;letter-spacing:2px;padding:3px 6px;margin:0 18px 10px}
.rail button{display:block;width:100%;text-align:left;background:none;border:0;cursor:pointer;padding:11px 18px;border-left:2px solid transparent;color:#a8afc0}
.rail button b{display:block;font:700 13px Inter;color:#e8eaf0}
.rail button i{display:block;font:400 11px/1.45 Inter;font-style:normal;color:#767d90;margin-top:2px}
.rail button:hover{background:#11141d}
.rail button.on{background:#141826;border-left-color:#C7FF02}
.rail button.on b{color:#C7FF02}
.rail .foot{padding:16px 18px;font:400 10.5px/1.6 Inter;color:#5e6474;border-top:1px solid #1c2030;margin-top:12px}

/* ---- stage ---- */
.stage{flex:1;min-width:0;display:flex;flex-direction:column}
.bar{display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid #1c2030;background:#0c0e15;position:sticky;top:0;z-index:10}
.bar .nm{font:700 13px Inter}
.bar .tg{font:400 12px Inter;color:#767d90;flex:1}
.bar .b{background:none;border:1px solid #262c3d;color:#a8afc0;border-radius:7px;padding:6px 11px;font:600 11px Inter;cursor:pointer}
.bar .b:hover{border-color:#C7FF02;color:#C7FF02}
.scroll{flex:1;overflow-y:auto;padding:22px;background:#07080c}

/* ---- github chrome ---- */
.page{max-width:1012px;margin:0 auto 40px;border-radius:10px;overflow:hidden;border:1px solid #30363d}
.gh-dark{background:#0d1117;color:#e6edf3;--bd:#30363d;--mut:#8b949e;--box:#161b22}
.gh-light{background:#fff;color:#1f2328;--bd:#d1d9e0;--mut:#59636e;--box:#f6f8fa}
.ghbar{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--bd);background:var(--box)}
.ghlogo{font:800 15px Inter}
.ghsearch{flex:none;border:1px solid var(--bd);border-radius:6px;padding:3px 60px 3px 9px;font:400 11.5px Inter;color:var(--mut)}
.ghsearch kbd{border:1px solid var(--bd);border-radius:3px;padding:0 4px;font-size:10px}
.ghgrow{flex:1}
.ghav{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#C7FF02,#5ad1ff)}
.ghtabs{display:flex;gap:20px;padding:0 16px;border-bottom:1px solid var(--bd);font:400 12.5px Inter;color:var(--mut)}
.ghtabs b,.ghtabs span{padding:10px 0;display:block}
.ghtabs b{font-weight:600;color:inherit;border-bottom:2px solid #fd8c73}
.ghbody{display:grid;grid-template-columns:270px 1fr;gap:24px;padding:20px 16px 26px}
.ghside .avatar{width:180px;height:180px;border-radius:50%;background:#1f6feb;display:grid;place-items:center;
  font:800 54px Inter;color:#fff;background-image:linear-gradient(135deg,#121827,#2b3a5e)}
.ghside .whoami{margin-top:14px}
.ghside .whoami b{display:block;font:600 22px Inter;line-height:1.2}
.ghside .whoami span{display:block;font:300 18px Inter;color:var(--mut)}
.ghside .bio{font:400 13px/1.5 Inter;margin:12px 0 14px}
.ghbtn{width:100%;background:var(--box);border:1px solid var(--bd);border-radius:6px;padding:5px;font:600 12px Inter;color:inherit;cursor:pointer}
.ghmeta{list-style:none;margin-top:14px;font:400 12.5px/1.9 Inter;color:var(--mut)}
.readmebox{border:1px solid var(--bd);border-radius:6px;overflow:hidden}
.rmhdr{padding:8px 14px;border-bottom:1px solid var(--bd);font:600 12px Inter;color:var(--mut);background:transparent}
.rm{overflow:hidden;max-width:100%}
.rm *{max-width:100%}
.rm img{height:auto}
.ghcontrib{margin-top:20px;border:1px solid var(--bd);border-radius:6px;padding:14px}
.ghcontrib b{font:400 13px Inter;display:block;margin-bottom:10px}
.ghgrid{display:grid;grid-template-columns:repeat(53,1fr);gap:3px}
.ghgrid i{aspect-ratio:1;border-radius:2px;background:#161b22}
.gh-light .ghgrid i{background:#ebedf0}
.ghgrid i[data-l="1"]{background:#0e4429}.gh-light .ghgrid i[data-l="1"]{background:#9be9a8}
.ghgrid i[data-l="2"]{background:#006d32}.gh-light .ghgrid i[data-l="2"]{background:#40c463}
.ghgrid i[data-l="3"]{background:#26a641}.gh-light .ghgrid i[data-l="3"]{background:#30a14e}
.ghgrid i[data-l="4"]{background:#39d353}.gh-light .ghgrid i[data-l="4"]{background:#216e39}

/* shared bits used by direction bodies */
.heat i{display:block}
.bars{display:flex;align-items:flex-end;gap:6px}
.bcol{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}
.bcol i{display:block;width:100%}
${ALL.map((d) => d.css).join('\n')}
</style>

<nav class="rail">
  <span class="chip">PROFILE LAB</span>
  <h1>What your profile could look like</h1>
  <p class="lede">Ten complete directions, each rendered end to end inside real GitHub chrome. Pick one and I will build it.</p>
  ${ALL.map((d, i) => `<button data-go="${d.id}" class="${i === 0 ? 'on' : ''}"><b>${String(i + 1).padStart(2, '0')} · ${d.name}</b><i>${d.tagline}</i></button>`).join('')}
  <div class="foot">Real numbers throughout: ${D.total} contributions, ${D.active} active days, peak ${D.peak}, ${D.listings} Propiedash listings, ${D.onPlaces} OpenNodo places.</div>
</nav>

<div class="stage">
  <div class="bar">
    <span class="nm" id="nm">${ALL[0].name}</span>
    <span class="tg" id="tg">${ALL[0].note}</span>
    <button class="b" id="prev">‹ Prev</button>
    <button class="b" id="next">Next ›</button>
  </div>
  <div class="scroll" id="scroll">${ALL.map(chrome).join('')}</div>
</div>

<script>
const D=${JSON.stringify(ALL.map((d) => ({ id: d.id, name: d.name, note: d.note })))}
const pages=[...document.querySelectorAll('.page')]
const btns=[...document.querySelectorAll('[data-go]')]
let i=0
function show(n){
  i=(n+D.length)%D.length
  pages.forEach(p=>p.hidden=p.dataset.id!==D[i].id)
  btns.forEach(b=>b.classList.toggle('on',b.dataset.go===D[i].id))
  document.getElementById('nm').textContent=D[i].name
  document.getElementById('tg').textContent=D[i].note
  document.getElementById('scroll').scrollTop=0
}
btns.forEach(b=>b.onclick=()=>show(D.findIndex(d=>d.id===b.dataset.go)))
document.getElementById('prev').onclick=()=>show(i-1)
document.getElementById('next').onclick=()=>show(i+1)
addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'||e.key==='ArrowRight')show(i+1)
  if(e.key==='ArrowUp'||e.key==='ArrowLeft')show(i-1)
  if(/^[1-9]$/.test(e.key))show(+e.key-1)
  if(e.key==='0')show(9)
})
</script>
</html>`

writeFileSync(new URL('./profiles.html', import.meta.url).pathname, html)
console.log(`profiles.html · ${ALL.length} full profiles · ${(html.length / 1024).toFixed(0)} KB`)
