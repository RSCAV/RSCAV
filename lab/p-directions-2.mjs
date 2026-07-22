// Full profile directions 6-10.

import { D, VENTURES, SHOTS, heat, bars, skylineSVG } from './p-shared.mjs'

export const SET2 = [
{
  id: 'landing', name: 'The Landing Page', dark: true,
  tagline: 'Your profile as a real product site. Hero, proof, features, stats, call to action.',
  note: 'Reads like a company, not a hobbyist.',
  css: `
  #landing{background:#0b1020;color:#fff;font-family:Inter}
  #landing .nav{display:flex;align-items:center;gap:26px;padding:16px 40px;border-bottom:1px solid #1b2540;font:600 13px Inter}
  #landing .nav b{font-weight:800;font-size:15px;margin-right:auto}
  #landing .nav a{color:#9fb0cc;text-decoration:none}
  #landing .nav .cta{background:#C7FF02;color:#0a0a0a;padding:7px 14px;border-radius:7px;font-weight:700}
  #landing .hero{text-align:center;padding:58px 40px 0}
  #landing .pill{display:inline-flex;align-items:center;gap:7px;border:1px solid #2a3a5e;border-radius:20px;padding:5px 13px;
    font:600 11.5px Inter;color:#9fb0cc}
  #landing .pill i{width:6px;height:6px;border-radius:50%;background:#C7FF02;animation:lpulse 2s ease-in-out infinite}
  #landing h1{font:800 58px/1.03 Inter;letter-spacing:-2.6px;margin:20px auto 14px;max-width:16ch}
  #landing h1 em{font-style:normal;color:#C7FF02}
  #landing .sub{color:#9fb0cc;font:400 17px/1.5 Inter;max-width:52ch;margin:0 auto}
  #landing .btns{display:flex;gap:11px;justify-content:center;margin:26px 0 40px}
  #landing .btns a{padding:11px 20px;border-radius:9px;font:700 13px Inter;text-decoration:none}
  #landing .b1{background:#C7FF02;color:#0a0a0a}
  #landing .b2{border:1px solid #2a3a5e;color:#fff}
  #landing .shot{max-width:820px;margin:0 auto;border:1px solid #2a3a5e;border-radius:12px 12px 0 0;overflow:hidden;background:#0a0f19}
  #landing .shot .bar{height:26px;background:#16203a;display:flex;align-items:center;gap:5px;padding:0 11px}
  #landing .shot .bar i{width:7px;height:7px;border-radius:50%;background:#33456b}
  #landing .shot img{display:block;width:100%}
  #landing .logos{display:flex;justify-content:center;gap:34px;padding:26px 40px;border-top:1px solid #1b2540;border-bottom:1px solid #1b2540;
    font:700 12px Inter;color:#4d5f80;letter-spacing:1.4px;flex-wrap:wrap}
  #landing .feat{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:44px 40px}
  #landing .card{border:1px solid #1b2540;border-radius:12px;padding:20px;background:#0e1428}
  #landing .card b{display:block;font:700 15px Inter;margin-bottom:7px}
  #landing .card p{color:#8ea0be;font:400 13px/1.55 Inter}
  #landing .card u{display:inline-block;margin-top:11px;font:700 10px Inter;letter-spacing:1.4px;color:#C7FF02;text-decoration:none}
  #landing .statband{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #1b2540;border-bottom:1px solid #1b2540}
  #landing .statband div{padding:26px;text-align:center;border-right:1px solid #1b2540}
  #landing .statband div:last-child{border:0}
  #landing .statband b{display:block;font:800 34px Inter;letter-spacing:-1.4px}
  #landing .statband u{font:700 9px Inter;letter-spacing:1.8px;color:#5f7093;text-decoration:none}
  #landing .foot{text-align:center;padding:40px}
  #landing .foot h3{font:800 30px Inter;letter-spacing:-1.2px;margin-bottom:9px}
  #landing .foot p{color:#8ea0be;font-size:14px;margin-bottom:18px}
  @keyframes lpulse{0%,100%{opacity:1}50%{opacity:.3}}`,
  body: `
  <div class="nav"><b>RSCAV</b><a>Propiedash</a><a>OpenNodo</a><a>Studio</a><a>Work</a><a class="cta">Get in touch</a></div>
  <div class="hero">
    <span class="pill"><i></i>Shipping daily · ${D.total} contributions this year</span>
    <h1>I build things.<br><em>All of them.</em></h1>
    <div class="sub">Founder and builder. A real-estate marketplace for Venezuela, an open place standard underneath it, and a studio that ships the rest.</div>
    <div class="btns"><a class="b1">See Propiedash →</a><a class="b2">Read OpenNodo</a></div>
    <div class="shot"><div class="bar"><i></i><i></i><i></i></div><img src="${SHOTS.pd}"></div>
  </div>
  <div class="logos">${VENTURES.map(([n]) => `<span>${n.toUpperCase()}</span>`).join('')}</div>
  <div class="feat">
    <div class="card"><b>Propiedash</b><p>The real-estate marketplace for Venezuela. ${D.listings} active listings across ${D.zones} zones.</p><u>PROPIEDASH.COM →</u></div>
    <div class="card"><b>OpenNodo</b><p>An open place standard. ${D.onPlaces} places, ${D.entities} federal entities, open data and an open API.</p><u>OPENNODO.ORG →</u></div>
    <div class="card"><b>casanovaaleman</b><p>Design and web studio. I take a brand from nothing to shipped, then keep it running.</p><u>CASANOVAALEMAN.COM →</u></div>
  </div>
  <div class="statband">
    <div><b>${D.total}</b><u>CONTRIBUTIONS</u></div><div><b>${D.active}</b><u>DAYS BUILT ON</u></div>
    <div><b>${D.peak}</b><u>PEAK DAY</u></div><div><b>${D.onPlaces}</b><u>PLACES MAPPED</u></div>
  </div>
  <div class="foot"><h3>Building something ambitious?</h3><p>I am easy to find.</p>
    <div class="btns"><a class="b1">rscav06@gmail.com</a><a class="b2">casanovaaleman.com</a></div></div>`
},
{
  id: 'dossier', name: 'The Dossier', dark: false,
  tagline: 'A classified field file. Typewriter, stamps, redactions, and a subject photo.',
  note: 'Memorable and a little funny, without trying too hard.',
  css: `
  #dossier{background:#d9cfb4;color:#221f18;font-family:'Courier New',ui-monospace,monospace;padding:22px 24px;position:relative;overflow:hidden}
  #dossier::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 20% 10%,rgba(0,0,0,.06),transparent 60%);pointer-events:none}
  #dossier .file{background:#f2ece0;border:1px solid #a89b7c;padding:20px 22px;position:relative;box-shadow:0 6px 22px rgba(0,0,0,.18)}
  #dossier .stamp{position:absolute;top:16px;right:20px;border:3px solid #a52a2a;color:#a52a2a;font:800 15px 'Courier New';
    letter-spacing:3px;padding:6px 12px;transform:rotate(-11deg);opacity:.82}
  #dossier h1{font:700 21px 'Courier New';letter-spacing:2px;border-bottom:2px solid #221f18;padding-bottom:7px;margin-bottom:4px}
  #dossier .sub{font:12px 'Courier New';color:#6b6353;margin-bottom:18px}
  #dossier .row{display:grid;grid-template-columns:118px 1fr;gap:10px;padding:5px 0;border-bottom:1px dotted #b3a88c}
  #dossier .row b{font-weight:700;letter-spacing:1px;font-size:12px}
  #dossier .row span{font-size:13px}
  #dossier .red{background:#221f18;color:transparent;user-select:none;border-radius:1px}
  #dossier .two{display:grid;grid-template-columns:1fr 168px;gap:16px;margin-top:16px}
  #dossier .photo{border:1px solid #a89b7c;padding:7px;background:#fff}
  #dossier .photo img{width:100%;display:block;filter:grayscale(1) contrast(1.25) sepia(.22)}
  #dossier .photo u{display:block;text-align:center;font:10px 'Courier New';color:#6b6353;margin-top:5px;text-decoration:none}
  #dossier h2{font:700 14px 'Courier New';letter-spacing:2px;border-bottom:1px solid #221f18;margin:20px 0 8px;padding-bottom:4px}
  #dossier .log{font:12px/1.75 'Courier New'}
  #dossier .log b{font-weight:700}
  #dossier .heat{display:grid;grid-template-columns:repeat(53,var(--c));gap:var(--g);margin-top:8px}
  #dossier .heat i{width:var(--c);height:var(--c)}
  #dossier .sig{margin-top:22px;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid #221f18;padding-top:10px}
  #dossier .sig i{font:italic 22px Georgia;color:#1c2e6b}`,
  body: `
  <div class="file">
    <div class="stamp">CONFIDENTIAL</div>
    <h1>SUBJECT FILE 5154</h1>
    <div class="sub">DEPT. OF THINGS THAT GOT BUILT — FILED 2026</div>
    <div class="row"><b>NAME</b><span>${D.name}</span></div>
    <div class="row"><b>ALIAS</b><span>@${D.handle}</span></div>
    <div class="row"><b>OCCUPATION</b><span>${D.role}</span></div>
    <div class="row"><b>LAST SEEN</b><span>${D.places}</span></div>
    <div class="row"><b>MOTIVE</b><span>Builds things. <span class="red">REDACTED REDACTED REDACTED</span> all of them.</span></div>
    <div class="two">
      <div>
        <h2>KNOWN OPERATIONS</h2>
        <div class="log">${VENTURES.map(([n, t, s]) => `<div><b>${n.toUpperCase()}</b> — ${t}. STATUS: ${s}.</div>`).join('')}</div>
        <h2>ACTIVITY LOG</h2>
        ${heat({ cell: 7, gap: 2, ramp: ['#ded4b8', '#b9ae86', '#8a7f56', '#5c5232', '#221f18'] })}
        <div class="log" style="margin-top:8px">${D.total} recorded events · ${D.active} active days · peak ${D.peak} in one day.</div>
      </div>
      <div class="photo"><img src="${SHOTS.pd}"><u>EXHIBIT A — PROPIEDASH</u></div>
    </div>
    <h2>ASSESSMENT</h2>
    <div class="log">Subject shows no intention of stopping. Recommend <span class="red">immediate collaboration</span>.<br>
      Contact: casanovaaleman.com · rscav06@gmail.com</div>
    <div class="sig"><span style="font-size:11px;color:#6b6353">AUTHORISED BY</span><i>R. Casanova-Aleman</i></div>
  </div>`
},
{
  id: 'arcade', name: 'The Arcade', dark: true,
  tagline: 'A cabinet attract-screen. Title, high scores, sprite roster, insert coin.',
  note: 'The most fun of the ten. Still says everything.',
  css: `
  #arcade{background:#07000f;color:#fff;font-family:ui-monospace,monospace;padding:0;position:relative;overflow:hidden}
  #arcade::after{content:'';position:absolute;inset:0;pointer-events:none;
    background:repeating-linear-gradient(0deg,rgba(0,0,0,.32) 0 1px,transparent 1px 3px)}
  #arcade .scr{padding:34px 40px;text-align:center}
  #arcade .title{font:800 62px/1 Inter;letter-spacing:-2px;color:#C7FF02;
    text-shadow:3px 3px 0 #ff2fd0,6px 6px 0 #00e5ff;animation:aflick 5s steps(1) infinite}
  #arcade .st{font:700 13px ui-monospace;color:#4dffd5;letter-spacing:4px;margin-top:10px}
  #arcade .ins{font:700 14px ui-monospace;color:#ffe600;letter-spacing:3px;margin:22px 0;animation:ablink 1.1s steps(2) infinite}
  #arcade .hs{max-width:520px;margin:0 auto;text-align:left;border:2px solid #2a1a4a;padding:16px 20px;background:rgba(20,4,40,.6)}
  #arcade .hs h3{font:700 14px ui-monospace;color:#ff2fd0;letter-spacing:3px;text-align:center;margin-bottom:12px}
  #arcade .hs .r{display:grid;grid-template-columns:34px 1fr 84px;gap:10px;font:12px/2 ui-monospace;color:#4dffd5}
  #arcade .hs .r span:last-child{text-align:right;color:#fff}
  #arcade .roster{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin:28px auto 0;max-width:640px}
  #arcade .sp{border:2px solid #2a1a4a;padding:10px 6px;background:rgba(20,4,40,.5)}
  #arcade .sp .px{width:34px;height:34px;margin:0 auto 8px;image-rendering:pixelated;
    background:conic-gradient(from 0deg,#C7FF02 25%,#ff2fd0 25% 50%,#00e5ff 50% 75%,#ffe600 75%);
    animation:aspin 6s steps(4) infinite}
  #arcade .sp b{display:block;font:700 7px ui-monospace;letter-spacing:.6px;color:#fff}
  #arcade .sp u{display:block;font:6.5px ui-monospace;color:#8a7fb0;text-decoration:none;margin-top:3px}
  #arcade .heat{display:grid;grid-template-columns:repeat(53,var(--c));gap:var(--g);max-width:600px;margin:26px auto 0}
  #arcade .heat i{width:var(--c);height:var(--c)}
  #arcade .credits{font:11px ui-monospace;color:#6a5f90;letter-spacing:2px;margin-top:26px}
  @keyframes ablink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes aflick{0%,96%,100%{opacity:1}97%{opacity:.72}}
  @keyframes aspin{to{transform:rotate(360deg)}}`,
  body: `
  <div class="scr">
    <div class="title">RODRIGO</div>
    <div class="st">CASANOVA-ALEMAN · FOUNDER &amp; BUILDER</div>
    <div class="ins">INSERT COIN TO COLLABORATE</div>
    <div class="hs"><h3>HIGH SCORES</h3>
      <div class="r"><span>1ST</span><span>CONTRIBUTIONS</span><span>${D.total.replace(',', '')}</span></div>
      <div class="r"><span>2ND</span><span>PEAK SINGLE DAY</span><span>0${D.peak}</span></div>
      <div class="r"><span>3RD</span><span>PLACES MAPPED</span><span>${D.onPlaces.replace(',', '')}</span></div>
      <div class="r"><span>4TH</span><span>LISTINGS LIVE</span><span>${D.listings.replace(',', '')}</span></div>
      <div class="r"><span>5TH</span><span>DAY STREAK</span><span>000${D.streak}</span></div>
    </div>
    <div class="roster">
      ${VENTURES.map(([n, , s]) => `<div class="sp"><div class="px"></div><b>${n.toUpperCase().slice(0, 10)}</b><u>${s}</u></div>`).join('')}
    </div>
    ${heat({ cell: 6, gap: 2, ramp: ['#160a2c', '#3a1a5e', '#7a2aa8', '#c92fd0', '#C7FF02'] })}
    <div class="credits">CREDITS: casanovaaleman.com · rscav06@gmail.com</div>
  </div>`
},
{
  id: 'atlas', name: 'The Atlas', dark: false,
  tagline: 'A cartographic plate. Venezuela, routes, place data, legend, compass.',
  note: 'Leans hard into OpenNodo and where you are from.',
  css: `
  #atlas{background:#efe7d3;color:#2b3a2f;font-family:Inter;padding:0}
  #atlas .plate{padding:30px 34px;border-bottom:1px solid #cdbfa0}
  #atlas .hdr{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #2b3a2f;padding-bottom:9px}
  #atlas .hdr b{font:800 30px Inter;letter-spacing:-1px}
  #atlas .hdr span{font:600 10px Inter;letter-spacing:2.6px;color:#7a6f57}
  #atlas .lead{font:400 15px/1.55 Inter;color:#5c5544;max-width:60ch;margin-top:12px}
  #atlas .map{position:relative;margin-top:18px;background:#e6dcc2;border:1px solid #cdbfa0;padding:14px}
  #atlas svg{width:100%;height:290px;display:block}
  #atlas .rl{stroke:#c9b995;stroke-width:.7}
  #atlas .co{fill:#d8e3cd;stroke:#4a6b4f;stroke-width:1.4}
  #atlas .dot{fill:#b5462b;animation:aig 5s ease-in-out infinite backwards}
  #atlas .route{fill:none;stroke:#2b3a2f;stroke-width:1.3;stroke-dasharray:4 3}
  #atlas text{font:700 8px Inter;fill:#2b3a2f}
  #atlas .cmp{transform-origin:center;animation:aspin2 26s linear infinite}
  #atlas .legend{display:flex;gap:26px;margin-top:14px;font:600 10px Inter;color:#5c5544;letter-spacing:1px;flex-wrap:wrap}
  #atlas .legend i{display:inline-block;width:9px;height:9px;background:#b5462b;margin-right:5px}
  #atlas .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:18px}
  #atlas .grid3 b{display:block;font:800 30px Inter;letter-spacing:-1.2px}
  #atlas .grid3 u{font:700 8px Inter;letter-spacing:1.8px;color:#7a6f57;text-decoration:none}
  #atlas table{width:100%;border-collapse:collapse;margin-top:8px;font:13px Inter}
  #atlas td{padding:9px 0;border-bottom:1px solid #cdbfa0;color:#5c5544}
  #atlas td:first-child{font-weight:700;color:#2b3a2f;width:190px}
  #atlas td:last-child{text-align:right;font:700 9px Inter;letter-spacing:1.4px}
  @keyframes aig{0%{opacity:0}14%{opacity:1}86%{opacity:1}100%{opacity:0}}
  @keyframes aspin2{to{transform:rotate(360deg)}}`,
  body: `
  <div class="plate">
    <div class="hdr"><b>${D.name}</b><span>PLATE I · FOUNDER &amp; BUILDER</span></div>
    <div class="lead">Born in Caracas, working between Madrid, Miami and Gainesville. Everything below is drawn from OpenNodo, an open place standard I wrote for Venezuela.</div>
    <div class="map"><svg viewBox="0 0 400 290">
      ${Array.from({ length: 14 }, (_, i) => `<line class="rl" x1="200" y1="130" x2="${200 + 260 * Math.cos((i * Math.PI) / 7)}" y2="${130 + 260 * Math.sin((i * Math.PI) / 7)}"/>`).join('')}
      <path class="co" d="M52 106 L96 74 L150 66 L198 82 L250 68 L306 86 L344 108 L336 142 L296 162 L268 198 L232 218 L196 202 L168 160 L120 150 L76 140 Z"/>
      ${(() => { let o = ''; for (let i = 0; i < 190; i++) { const t = (i * 2654435761) % 1000 / 1000, u = (i * 40503) % 1000 / 1000
        const x = 74 + Math.pow(t, .78) * 250, y = 80 + Math.pow(u, 1.6) * (x < 200 ? 54 : 76) + (x - 74) * .3
        if (y > 210 || x > 338) continue
        o += `<rect class="dot" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${i % 12 === 0 ? 2.8 : 1.8}" height="${i % 12 === 0 ? 2.8 : 1.8}" style="animation-delay:${((x - 74) / 264 * 2.8).toFixed(2)}s"/>` } return o })()}
      <circle cx="228" cy="100" r="6" fill="none" stroke="#2b3a2f" stroke-width="1.3"/><text x="240" y="103">CARACAS</text>
      <path class="route" d="M228 100 Q300 40 372 66"/><text x="330" y="58">MADRID</text>
      <path class="route" d="M228 100 Q250 34 330 30"/><text x="292" y="24">MIAMI · GNV</text>
      <g class="cmp" style="transform-box:fill-box"><polygon points="366,232 370,248 366,264 362,248" fill="#2b3a2f"/></g>
      <text x="352" y="278">N</text>
    </svg></div>
    <div class="legend"><span><i></i>PLACE RECORD (${D.onPlaces})</span><span>— — ROUTE FLOWN</span><span>SCALE 1:2,000,000</span><span>PROJECTION: EQUIRECTANGULAR</span></div>
    <div class="grid3">
      <div><b>${D.onPlaces}</b><u>PLACES</u></div><div><b>${D.entities}</b><u>FEDERAL ENTITIES</u></div><div><b>${D.listings}</b><u>PROPIEDASH LISTINGS</u></div>
    </div>
  </div>
  <div class="plate">
    <div class="hdr"><b style="font-size:22px">Gazetteer</b><span>PLATE II · THE WORK</span></div>
    <table>${VENTURES.map(([n, t, s]) => `<tr><td>${n}</td><td>${t}</td><td>${s}</td></tr>`).join('')}</table>
  </div>
  <div class="plate" style="border:0">
    <div class="hdr"><b style="font-size:22px">Survey Log</b><span>PLATE III · ${D.total} OBSERVATIONS</span></div>
    ${bars({ maxH: 84, color: '#b5462b' })}
    <div class="lead" style="font-size:13px">Three observations in August. ${D.months[12].toLocaleString()} this month. Correspondence to casanovaaleman.com.</div>
  </div>`
},
{
  id: 'minimal', name: 'The Minimal', dark: false,
  tagline: 'Almost nothing. Name, one line, four links, one thin year.',
  note: 'The anti-profile. Confident enough to say very little.',
  css: `
  #minimal{background:#fbfbf9;color:#0a0a0a;font-family:Inter;padding:96px 64px}
  #minimal .n{font:500 26px Inter;letter-spacing:-.6px}
  #minimal .r{font:400 15px Inter;color:#8b8f96;margin-top:6px}
  #minimal .line{font:400 19px/1.6 Inter;margin-top:52px;max-width:34ch}
  #minimal .line b{font-weight:600;border-bottom:2px solid #C7FF02;padding-bottom:1px}
  #minimal .idx{margin-top:56px;display:grid;grid-template-columns:1fr;gap:0;max-width:420px}
  #minimal .idx a{display:flex;justify-content:space-between;padding:13px 0;border-bottom:1px solid #ececE6;
    text-decoration:none;color:#0a0a0a;font:400 14px Inter}
  #minimal .idx a span:last-child{color:#b0b4bb;font-size:12px}
  #minimal .idx a:hover span:last-child{color:#0a0a0a}
  #minimal .yr{margin-top:60px;max-width:420px}
  #minimal .yr u{font:600 9px Inter;letter-spacing:2px;color:#b0b4bb;text-decoration:none}
  #minimal .strip{display:flex;gap:2px;margin-top:11px;height:26px;align-items:flex-end}
  #minimal .strip i{flex:1;background:#0a0a0a;animation:mrise 2.6s cubic-bezier(.22,1,.36,1) backwards}
  #minimal .cap{font:400 12px Inter;color:#8b8f96;margin-top:11px}
  #minimal .cap b{color:#0a0a0a;font-weight:600}
  @keyframes mrise{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}`,
  body: `
  <div class="n">${D.name}</div>
  <div class="r">${D.role}</div>
  <div class="line">I build things. <b>All of them.</b></div>
  <div class="idx">
    ${VENTURES.slice(0, 4).map(([n, t, , u]) => `<a><span>${n}</span><span>${u}</span></a>`).join('')}
    <a><span>Email</span><span>rscav06@gmail.com</span></a>
  </div>
  <div class="yr">
    <u>THE YEAR</u>
    <div class="strip">${D.months.map((v, i) => `<i style="height:${v > 0 ? Math.max(3, (v / 2023) * 26) : 1}px;animation-delay:${(i * 0.05).toFixed(2)}s"></i>`).join('')}</div>
    <div class="cap"><b>${D.total}</b> contributions · <b>${D.active}</b> days · peak <b>${D.peak}</b></div>
  </div>`
},
]
