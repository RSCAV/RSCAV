// Full profile directions 1-5. Each `body` is an entire README, top to bottom.

import { D, VENTURES, SHOTS, heat, bars, citySVG, skylineSVG } from './p-shared.mjs'

export const SET1 = [
{
  id: 'city', name: 'The Night City', dark: true,
  tagline: 'A Venezuelan city at night. Navy, lime, ordered dither, no gradients anywhere.',
  note: 'This is what is on your profile right now.',
  css: `
  #city{background:#121827;color:#fff;font-family:Inter}
  #city .band{padding:36px 40px;position:relative;overflow:hidden;border-bottom:1px solid #1c2540}
  #city .eyebrow{display:inline-block;background:#C7FF02;color:#0a0a0a;font:800 10px Inter;letter-spacing:2.4px;padding:4px 8px}
  #city .mega{font:800 62px/.92 Inter;letter-spacing:-2.6px;margin:16px 0 4px}
  #city .mega span{font-weight:300}
  #city .lead{color:#AEB2C0;font:400 17px Inter;margin-top:12px}
  #city .hero{padding-bottom:0}
  #city .skl{display:block;height:150px;margin:26px -40px -37px;width:calc(100% + 80px)}
  #city .wins rect{animation:cityw 9s ease-in-out infinite}
  #city .towers{display:flex;background:#0d1424;border-bottom:1px solid #1c2540}
  #city .tw{flex:1;padding:16px 0 12px;text-align:center;border-right:1px solid #172038;position:relative}
  #city .tw:last-child{border:0}
  #city .tw .blk{margin:0 auto;width:64%;background:#0a0f19;border-top:2px solid #C7FF02;
    background-image:radial-gradient(#C7FF02 20%,transparent 21%);background-size:8px 10px}
  #city .tw b{display:block;font:700 8px Inter;letter-spacing:1.2px;margin-top:9px;color:#fff}
  #city .tw u{display:block;font:600 7px Inter;letter-spacing:1px;color:#6C7286;text-decoration:none}
  #city .show{display:grid;grid-template-columns:1fr 1.3fr;gap:26px;align-items:center}
  #city .win{border:1px solid #2A3350;border-radius:9px;overflow:hidden;background:#0A0F19}
  #city .wbar{height:22px;background:#1B2338;display:flex;align-items:center;gap:4px;padding:0 9px}
  #city .wbar i{width:6px;height:6px;border-radius:50%;background:#3A4358}
  #city .wbar span{margin-left:8px;font:500 9px Inter;color:#AEB2C0;background:#0A0F19;border:1px solid #2A3350;border-radius:4px;padding:1px 8px}
  #city .win img{display:block;width:100%}
  #city h2{font:800 34px Inter;letter-spacing:-1.2px;margin:12px 0 8px}
  #city .stats{display:flex;gap:34px;border-top:1px solid #2A3350;padding-top:16px;margin-top:20px}
  #city .stats b{display:block;font:700 26px Inter;letter-spacing:-.8px}
  #city .stats u{font:600 8px Inter;letter-spacing:1.4px;color:#6C7286;text-decoration:none}
  #city .bld{animation:citygrow 7s cubic-bezier(.22,1,.36,1) infinite backwards;transform-box:fill-box;transform-origin:bottom}
  #city svg.city{width:100%;height:200px;display:block}
  #city .bars{display:flex;align-items:flex-end;gap:7px;height:100px;margin-top:18px}
  #city .bcol{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}
  #city .bcol i{width:100%;display:block;animation:cityrise 3s cubic-bezier(.22,1,.36,1) infinite backwards;transform-origin:bottom;
    background-image:radial-gradient(#0a0f19 34%,transparent 35%)!important;background-size:4px 4px;background-color:#C7FF02}
  #city .bcol u{font:600 7px Inter;color:#6C7286;margin-top:6px;text-decoration:none}
  #city table{width:100%;border-collapse:collapse;margin-top:6px}
  #city td{padding:10px 0;border-bottom:1px solid #1c2540;font:400 13px Inter;color:#AEB2C0}
  #city td:first-child{color:#fff;font-weight:600;width:180px}
  #city td:last-child{text-align:right;color:#6C7286;font-size:12px}
  #city .foot{display:flex;gap:44px;margin-top:18px}
  #city .foot div u{display:block;font:600 8px Inter;letter-spacing:1.4px;color:#6C7286;text-decoration:none}
  #city .foot div b{font:600 13px Inter;color:#AEB2C0}
  @keyframes cityw{0%,100%{opacity:.18}45%,60%{opacity:1}}
  @keyframes citygrow{0%{transform:scaleY(0)}18%{transform:scaleY(1)}88%{transform:scaleY(1)}100%{transform:scaleY(0)}}
  @keyframes cityrise{0%{transform:scaleY(0)}28%{transform:scaleY(1)}90%{transform:scaleY(1)}100%{transform:scaleY(0)}}`,
  body: `
  <div class="band hero">
    <span class="eyebrow">FOUNDER</span>
    <div class="mega">RODRIGO<br><span>CASANOVA-ALEMAN</span></div>
    <div class="lead">I build things. All of them. &nbsp;·&nbsp; ${D.places}</div>
    ${skylineSVG({ w: 1200, h: 150 })}
  </div>
  <div class="towers">
    ${VENTURES.map(([n, , st], i) => `<div class="tw"><div class="blk" style="height:${[92, 66, 60, 44, 40, 32][i]}px"></div><b>${n.toUpperCase()}</b><u>${st}</u></div>`).join('')}
  </div>
  <div class="band">
    <div class="show">
      <div><span class="eyebrow">THE MAIN THING</span><h2>Propiedash</h2>
        <div class="lead" style="font-size:15px">The real-estate marketplace for Venezuela.</div>
        <div class="stats"><div><b>${D.listings}</b><u>LISTINGS</u></div><div><b>${D.zones}</b><u>ZONES</u></div><div><b>${D.estados}</b><u>ESTADOS</u></div></div>
      </div>
      <div class="win"><div class="wbar"><i></i><i></i><i></i><span>propiedash.com</span></div><img src="${SHOTS.pd}"></div>
    </div>
  </div>
  <div class="band">
    <div class="show">
      <div><span class="eyebrow">OPEN SOURCE</span><h2>OpenNodo</h2>
        <div class="lead" style="font-size:15px">An open place standard for Venezuela.</div>
        <div class="stats"><div><b>${D.onPlaces}</b><u>PLACES</u></div><div><b>${D.entities}</b><u>ENTITIES</u></div></div>
      </div>
      <div class="win"><div class="wbar"><i></i><i></i><i></i><span>opennodo.org/map</span></div><img src="${SHOTS.on}"></div>
    </div>
  </div>
  <div class="band">
    <span class="eyebrow">THE DISTRICT</span><h2 style="font-size:26px">Everything else</h2>
    <table>${VENTURES.slice(2).map(([n, t, , u]) => `<tr><td>${n}</td><td>${t}</td><td>${u}</td></tr>`).join('')}</table>
  </div>
  <div class="band">
    <span class="eyebrow">THE YEAR AS A CITY</span>
    <div class="lead" style="font-size:14px;margin-bottom:8px">One building per day. Its height is that day's contribution count.</div>
    <svg class="city" viewBox="0 0 400 190">${citySVG().replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>
    <div class="stats"><div><b>${D.total}</b><u>CONTRIBUTIONS</u></div><div><b>${D.active}</b><u>DAYS BUILT ON</u></div><div><b>${D.streak}</b><u>DAY STREAK</u></div><div><b>${D.peak}</b><u>PEAK DAY</u></div></div>
  </div>
  <div class="band">
    <span class="eyebrow">THE READOUT</span>
    <div class="lead" style="font-size:14px">Ordered dither instead of gradients.</div>
    ${bars({ color: '#C7FF02' })}
  </div>
  <div class="band" style="border:0">
    <h2 style="font-size:24px">If you are building something ambitious, I am easy to find.</h2>
    <div class="foot">
      <div><u>STUDIO</u><b>casanovaaleman.com</b></div><div><u>PROPIEDASH</u><b>propiedash.com</b></div>
      <div><u>OPENNODO</u><b>opennodo.org</b></div><div><u>EMAIL</u><b>rscav06@gmail.com</b></div>
    </div>
  </div>`
},
{
  id: 'terminal', name: 'The Terminal', dark: true,
  tagline: 'The whole profile is one shell session. Nothing but a prompt and real output.',
  note: 'Deadpan, very engineer, zero decoration.',
  css: `
  #terminal{background:#05070c;color:#8fe8a4;font:13px/1.85 ui-monospace,SFMono-Regular,monospace;padding:26px 30px}
  #terminal .p{color:#5ad1ff}#terminal .p b{color:#C7FF02;font-weight:400}
  #terminal .cmd{color:#fff}
  #terminal .dim{color:#3d5c46}
  #terminal .ok{color:#C7FF02}
  #terminal .warn{color:#ffb000}
  #terminal .blk{margin:2px 0 18px}
  #terminal .cur{display:inline-block;width:8px;height:15px;background:#C7FF02;vertical-align:-3px;animation:tblink 1.05s steps(2) infinite}
  #terminal .heat{display:grid;grid-template-columns:repeat(53,var(--c));gap:var(--g);margin:8px 0 4px}
  #terminal .heat i{width:var(--c);height:var(--c);border-radius:1px}
  #terminal table{border-collapse:collapse}
  #terminal td{padding:1px 26px 1px 0;color:#8fe8a4}
  #terminal td:first-child{color:#fff}
  #terminal a{color:#5ad1ff}
  @keyframes tblink{0%,100%{opacity:1}50%{opacity:0}}`,
  body: `
  <div class="blk"><span class="p">rodrigo@caracas<b>:~$</b></span> <span class="cmd">whoami</span>
    <div>${D.name} <span class="dim">—</span> <span class="ok">founder and builder</span></div>
    <div class="dim">${D.places}</div></div>

  <div class="blk"><span class="p">rodrigo@caracas<b>:~$</b></span> <span class="cmd">ls -1 ventures/</span>
    <table>${VENTURES.map(([n, t, s]) => `<tr><td>${n.toLowerCase().replace(/[^a-z]/g, '')}/</td><td class="${s === 'LIVE' ? 'ok' : 'warn'}">${s}</td><td class="dim">${t}</td></tr>`).join('')}</table></div>

  <div class="blk"><span class="p">rodrigo@caracas<b>:~$</b></span> <span class="cmd">cat ventures/propiedash/ABOUT</span>
    <div>The real-estate marketplace for Venezuela.</div>
    <div class="dim">Listings, agents, demand, and the map underneath all of it.</div>
    <div><span class="ok">${D.listings}</span> listings &nbsp; <span class="ok">${D.zones}</span> zones &nbsp; <span class="ok">${D.estados}</span> estados &nbsp; <a>https://propiedash.com</a></div></div>

  <div class="blk"><span class="p">rodrigo@caracas<b>:~$</b></span> <span class="cmd">cat ventures/opennodo/ABOUT</span>
    <div>An open place standard for Venezuela.</div>
    <div class="dim">Stable identifiers and canonical names for every place in the country.</div>
    <div><span class="ok">${D.onPlaces}</span> places &nbsp; <span class="ok">${D.entities}</span> entities &nbsp; CC BY 4.0 &nbsp; <a>https://opennodo.org</a></div></div>

  <div class="blk"><span class="p">rodrigo@caracas<b>:~$</b></span> <span class="cmd">./contributions --year</span>
    ${heat({ cell: 9, gap: 3, ramp: ['#0f1a12', '#1d3d1c', '#357a1e', '#7cc020', '#C7FF02'] })}
    <div class="dim">JUL ${' '.repeat(6)}OCT ${' '.repeat(8)}JAN ${' '.repeat(8)}APR ${' '.repeat(8)}JUL</div>
    <div><span class="ok">${D.total}</span> contributions · <span class="ok">${D.active}</span> active days · peak <span class="ok">${D.peak}</span> · streak <span class="ok">${D.streak}</span></div></div>

  <div class="blk"><span class="p">rodrigo@caracas<b>:~$</b></span> <span class="cmd">git log --oneline --graph -6</span>
    <div><span class="warn">*</span> <span class="dim">a7f3c1d</span> feat: propiedash live across venezuela</div>
    <div><span class="warn">|\\</span></div>
    <div><span class="warn">| *</span> <span class="dim">3b21e90</span> feat(opennodo): 2,870 places, open data</div>
    <div><span class="warn">* |</span> <span class="dim">9c02f4a</span> feat: the map underneath all of it</div>
    <div><span class="warn">|/</span></div>
    <div><span class="warn">*</span> <span class="dim">1e77b02</span> init: ground broken apr 2026</div></div>

  <div class="blk"><span class="p">rodrigo@caracas<b>:~$</b></span> <span class="cmd">contact</span>
    <div>casanovaaleman.com &nbsp;·&nbsp; rscav06@gmail.com</div></div>

  <div><span class="p">rodrigo@caracas<b>:~$</b></span> <span class="cur"></span></div>`
},
{
  id: 'paper', name: 'The Broadsheet', dark: false,
  tagline: 'A newspaper front page. Your year is the headline, your products are the photos.',
  note: 'Nobody on GitHub looks like this.',
  css: `
  #paper{background:#f4f1e8;color:#15150f;font-family:Georgia,'Times New Roman',serif;padding:30px 34px}
  #paper .mast{text-align:center;border-bottom:3px double #15150f;padding-bottom:8px}
  #paper .mast b{font:800 46px/1 Georgia;letter-spacing:1px;display:block}
  #paper .mast i{font:italic 12px Georgia;color:#5b5748}
  #paper .dl{display:flex;justify-content:space-between;font:11px Georgia;border-bottom:1px solid #15150f;padding:5px 0;margin-bottom:16px;letter-spacing:.5px}
  #paper h1{font:800 40px/1.06 Georgia;margin-bottom:6px;letter-spacing:-.5px}
  #paper .sub{font:italic 15px Georgia;color:#463f30;border-bottom:1px solid #cdc7b4;padding-bottom:12px;margin-bottom:14px}
  #paper .lead3{column-count:3;column-gap:20px;column-rule:1px solid #cdc7b4;font:13px/1.62 Georgia;text-align:justify}
  #paper .lead3 p{margin-bottom:9px}
  #paper .lead3 p:first-child::first-letter{font:800 44px Georgia;float:left;line-height:.82;padding:3px 6px 0 0}
  #paper figure{margin:18px 0;border-top:1px solid #15150f;border-bottom:1px solid #15150f;padding:12px 0}
  #paper figure img{width:100%;display:block;filter:grayscale(1) contrast(1.22)}
  #paper figcaption{font:italic 11px Georgia;color:#5b5748;margin-top:6px}
  #paper .two{display:grid;grid-template-columns:1.45fr 1fr;gap:22px;margin-top:18px}
  #paper h3{font:800 20px Georgia;border-bottom:2px solid #15150f;padding-bottom:4px;margin-bottom:8px}
  #paper .box{border:1px solid #15150f;padding:12px 14px}
  #paper .box table{width:100%;border-collapse:collapse;font:12px Georgia}
  #paper .box td{padding:4px 0;border-bottom:1px dotted #b9b3a0}
  #paper .box td:last-child{text-align:right;font-weight:700}
  #paper .bars{display:flex;align-items:flex-end;gap:5px;height:76px;margin:10px 0 4px}
  #paper .bcol{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}
  #paper .bcol i{width:100%;background:#15150f!important;display:block}
  #paper .bcol u{font:9px Georgia;color:#5b5748;margin-top:4px;text-decoration:none}
  #paper .cls{border-top:3px double #15150f;margin-top:20px;padding-top:12px;font:12px/1.6 Georgia;column-count:3;column-gap:20px}
  #paper .cls b{display:block}`,
  body: `
  <div class="mast"><b>THE CASANOVA-ALEMAN</b><i>Caracas · Madrid · Miami · Gainesville — “Always forward”</i></div>
  <div class="dl"><span>VOL. XXVI · No. 1</span><span>FOUNDER AND BUILDER</span><span>PRICE: FREE</span></div>
  <h1>Builder Ships 5,154 Contributions In A Single Year</h1>
  <div class="sub">A marketplace goes live across Venezuela; an open place standard ships beside it. Ninety days of work, one of them worth five hundred and eighteen.</div>
  <div class="lead3">
    <p>From nothing in August to more than two thousand in a single month, the year turned on a spring in which ground was finally broken. Propiedash now carries ${D.listings} active listings across ${D.zones} zones and ${D.estados} estados.</p>
    <p>Alongside it, OpenNodo published ${D.onPlaces} place records covering all ${D.entities} federal entities, released openly under CC BY 4.0, with an honest distinction between where the state says places are and where people actually live.</p>
    <p>Observers noted the fourteen day streak and the studio, casanovaaleman, which remains open for commissions. “I build things,” the founder said. “All of them.”</p>
  </div>
  <figure><img src="${SHOTS.pd}"><figcaption>Fig. 1 — Propiedash, live at propiedash.com. The search that opens on Caracas.</figcaption></figure>
  <div class="two">
    <div><h3>The Year, Charted</h3>${bars({ maxH: 76 })}
      <div style="font:italic 11px Georgia;color:#5b5748">Contributions by month. Three in August; ${D.months[12].toLocaleString()} this month.</div></div>
    <div class="box"><h3 style="font-size:15px">By The Numbers</h3>
      <table>
        <tr><td>Contributions</td><td>${D.total}</td></tr>
        <tr><td>Days built on</td><td>${D.active}</td></tr>
        <tr><td>Peak single day</td><td>${D.peak}</td></tr>
        <tr><td>Longest streak</td><td>${D.streak}</td></tr>
        <tr><td>Places mapped</td><td>${D.onPlaces}</td></tr>
      </table></div>
  </div>
  <div class="cls">
    <b>CLASSIFIED — SITUATIONS</b>
    ${VENTURES.map(([n, t, s]) => `<p><b>${n.toUpperCase()} (${s})</b>${t}.</p>`).join('')}
    <p><b>ENQUIRIES</b>casanovaaleman.com · rscav06@gmail.com</p>
  </div>`
},
{
  id: 'editorial', name: 'The Editorial', dark: false,
  tagline: 'Swiss grid, enormous type, thin rules, and a great deal of white space.',
  note: 'Reads expensive. The restraint is the flex.',
  css: `
  #editorial{background:#fff;color:#0a0a0a;font-family:Inter;padding:0}
  #editorial .sec{padding:34px 32px;border-bottom:1px solid #e6e6e0}
  #editorial .kicker{font:700 10px Inter;letter-spacing:3.4px;color:#0a0a0a}
  #editorial .kicker span{background:#C7FF02;padding:3px 7px}
  #editorial h1{font:800 52px/.92 Inter;letter-spacing:-2.6px;margin:20px 0 0}
  #editorial h1 em{font-style:normal;font-weight:200}
  #editorial .meta{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:30px;border-top:1px solid #0a0a0a;padding-top:14px}
  #editorial .meta u{display:block;font:700 8px Inter;letter-spacing:2px;color:#9aa0aa;text-decoration:none;margin-bottom:5px}
  #editorial .meta b{font:600 11.5px Inter;word-break:break-word}
  #editorial .grid2{display:grid;grid-template-columns:1fr 1fr;gap:26px;align-items:start}
  #editorial h2{font:200 38px/1 Inter;letter-spacing:-1.6px}
  #editorial h2 b{font-weight:800}
  #editorial p{font:400 15px/1.62 Inter;color:#54585f;margin-top:16px;max-width:44ch}
  #editorial .num{display:flex;gap:24px;margin-top:22px;flex-wrap:wrap}
  #editorial .num b{display:block;font:800 28px Inter;letter-spacing:-1.2px;line-height:1}
  #editorial .num u{font:700 8px Inter;letter-spacing:1.8px;color:#9aa0aa;text-decoration:none}
  #editorial img{width:100%;display:block;border:1px solid #e6e6e0}
  #editorial .idx{display:grid;grid-template-columns:30px 1fr 1fr 74px;gap:0 12px;font:400 12.5px Inter}
  #editorial .idx>div{padding:14px 0;border-bottom:1px solid #e6e6e0}
  #editorial .idx .n{color:#c4c4be;font-weight:700;font-size:11px}
  #editorial .idx .t{font-weight:600}
  #editorial .idx .d{color:#8b909b}
  #editorial .idx .s{text-align:right;font:700 9px Inter;letter-spacing:1.4px;color:#0a0a0a}
  #editorial .heat{display:grid;grid-template-columns:repeat(53,var(--c));gap:var(--g)}
  #editorial .heat i{width:var(--c);height:var(--c);border-radius:2px}
  #editorial .heat{overflow:hidden}
  #editorial .big{font:200 58px/1.02 Inter;letter-spacing:-2.6px}
  #editorial .big b{font-weight:800}`,
  body: `
  <div class="sec">
    <div class="kicker"><span>FOUNDER &amp; BUILDER</span></div>
    <h1>Rodrigo<br><em>Casanova-Aleman</em></h1>
    <div class="meta">
      <div><u>BASED</u><b>Caracas → Gainesville</b></div>
      <div><u>BUILDING</u><b>Propiedash</b></div>
      <div><u>AUTHOR OF</u><b>OpenNodo</b></div>
      <div><u>STUDIO</u><b>casanovaaleman.com</b></div>
    </div>
  </div>
  <div class="sec grid2">
    <div><div class="kicker">01 / THE MAIN THING</div><h2><b>Propiedash</b></h2>
      <p>The real-estate marketplace for Venezuela. Listings, agents, demand, and the map underneath all of it, built for a country whose addresses were never standardised.</p>
      <div class="num"><div><b>${D.listings}</b><u>LISTINGS</u></div><div><b>${D.zones}</b><u>ZONES</u></div><div><b>${D.estados}</b><u>ESTADOS</u></div></div>
    </div>
    <img src="${SHOTS.pd}">
  </div>
  <div class="sec grid2">
    <img src="${SHOTS.on}">
    <div><div class="kicker">02 / OPEN SOURCE</div><h2><b>OpenNodo</b></h2>
      <p>An open place standard for Venezuela. Stable identifiers and canonical names for every administrative and settlement place in the country.</p>
      <div class="num"><div><b>${D.onPlaces}</b><u>PLACES</u></div><div><b>${D.entities}</b><u>ENTITIES</u></div></div>
    </div>
  </div>
  <div class="sec">
    <div class="kicker">03 / INDEX</div>
    <div class="idx" style="margin-top:22px">
      ${VENTURES.map(([n, t, s], i) => `<div class="n">${String(i + 1).padStart(2, '0')}</div><div class="t">${n}</div><div class="d">${t}</div><div class="s">${s}</div>`).join('')}
    </div>
  </div>
  <div class="sec">
    <div class="kicker">04 / THE YEAR</div>
    <div class="big" style="margin:18px 0 26px"><b>${D.total}</b> contributions</div>
    ${heat({ cell: 8, gap: 2.4, ramp: ['#f0f0ea', '#dbe9b4', '#c3e06a', '#d2f13c', '#C7FF02'] })}
    <div class="num" style="margin-top:26px"><div><b>${D.active}</b><u>DAYS BUILT ON</u></div><div><b>${D.streak}</b><u>DAY STREAK</u></div><div><b>${D.peak}</b><u>PEAK DAY</u></div></div>
  </div>
  <div class="sec" style="border:0">
    <h2 style="font-size:30px">If you are building something ambitious,<br><b>I am easy to find.</b></h2>
    <div class="meta" style="margin-top:30px">
      <div><u>STUDIO</u><b>casanovaaleman.com</b></div><div><u>EMAIL</u><b>rscav06@gmail.com</b></div>
      <div><u>PROPIEDASH</u><b>propiedash.com</b></div><div><u>OPENNODO</u><b>opennodo.org</b></div>
    </div>
  </div>`
},
{
  id: 'desktop', name: 'The Desktop', dark: true,
  tagline: 'Your profile as an operating system. Each venture is a window on the desk.',
  note: 'Playful without being a toy.',
  css: `
  #desktop{background:#101a2e;background-image:radial-gradient(#1b2b4a 1px,transparent 0);background-size:22px 22px;
    padding:0;position:relative;min-height:640px;font-family:Inter;color:#fff}
  #desktop .menubar{background:rgba(12,18,32,.86);backdrop-filter:blur(10px);display:flex;align-items:center;gap:18px;
    padding:6px 14px;font:600 11.5px Inter;border-bottom:1px solid #223251}
  #desktop .menubar .app{font-weight:800}
  #desktop .menubar .right{margin-left:auto;color:#94a6c4;font-weight:500}
  #desktop .desk{position:relative;padding:18px;min-height:548px;overflow:hidden}
  #desktop .w{position:absolute;background:#0e1626;border:1px solid #2b3d61;border-radius:9px;overflow:hidden;
    box-shadow:0 18px 40px rgba(0,0,0,.5)}
  #desktop .tb{height:26px;background:#18243c;display:flex;align-items:center;gap:5px;padding:0 9px;border-bottom:1px solid #2b3d61}
  #desktop .tb i{width:8px;height:8px;border-radius:50%}
  #desktop .tb i:nth-child(1){background:#ff5f57}#desktop .tb i:nth-child(2){background:#febc2e}#desktop .tb i:nth-child(3){background:#28c840}
  #desktop .tb span{margin-left:8px;font:600 10.5px Inter;color:#94a6c4}
  #desktop .w .c{padding:12px 14px;font:12.5px/1.6 Inter;color:#c3d0e6}
  #desktop .w img{display:block;width:100%}
  #desktop .fr{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #1d2b46;font-size:12px}
  #desktop .fr b{font-weight:600;color:#fff}#desktop .fr u{color:#7f93b4;text-decoration:none;font-size:10.5px}
  #desktop .dock{position:absolute;left:50%;transform:translateX(-50%);bottom:16px;display:flex;gap:10px;
    background:rgba(14,22,38,.82);backdrop-filter:blur(12px);border:1px solid #2b3d61;border-radius:15px;padding:8px 12px}
  #desktop .dock b{width:38px;height:38px;border-radius:9px;display:grid;place-items:center;font:800 14px Inter;color:#0a0a0a;
    background:#C7FF02;animation:dbounce 4s ease-in-out infinite}
  #desktop .dock b:nth-child(2){background:#5ad1ff;animation-delay:.3s}
  #desktop .dock b:nth-child(3){background:#ff9ad1;animation-delay:.6s}
  #desktop .dock b:nth-child(4){background:#ffd166;animation-delay:.9s}
  #desktop .dock b:nth-child(5){background:#a0f0c0;animation-delay:1.2s}
  #desktop .heat{display:grid;grid-template-columns:repeat(53,var(--c));gap:var(--g)}
  #desktop .heat i{width:var(--c);height:var(--c);border-radius:1px}
  @keyframes dbounce{0%,88%,100%{transform:translateY(0)}94%{transform:translateY(-7px)}}`,
  body: `
  <div class="menubar"><span class="app">RSCAV OS</span><span>File</span><span>Ventures</span><span>Window</span><span>Help</span>
    <span class="right">${D.total} contributions · ${D.active} active days · Caracas 24°</span></div>
  <div class="desk">
    <div class="w" style="left:14px;top:14px;width:262px">
      <div class="tb"><i></i><i></i><i></i><span>About Me.txt</span></div>
      <div class="c"><b style="font:800 17px Inter;color:#fff">${D.name}</b><br>
        <span style="color:#C7FF02;font-weight:600">Founder and builder</span><br><br>
        I build things. All of them.<br><span style="color:#7f93b4">${D.places}</span></div>
    </div>
    <div class="w" style="left:292px;top:24px;width:368px">
      <div class="tb"><i></i><i></i><i></i><span>propiedash.com — Safari</span></div>
      <img src="${SHOTS.pd}">
    </div>
    <div class="w" style="left:14px;top:196px;width:262px">
      <div class="tb"><i></i><i></i><i></i><span>Ventures — Finder</span></div>
      <div class="c" style="padding:8px 12px">
        ${VENTURES.map(([n, , s]) => `<div class="fr"><b>${n}</b><u>${s}</u></div>`).join('')}
      </div>
    </div>
    <div class="w" style="left:292px;top:252px;width:368px">
      <div class="tb"><i></i><i></i><i></i><span>opennodo.org/map — Safari</span></div>
      <img src="${SHOTS.on}">
    </div>
    <div class="w" style="left:14px;top:392px;width:262px">
      <div class="tb"><i></i><i></i><i></i><span>Activity Monitor</span></div>
      <div class="c" style="padding:10px 12px">
        ${heat({ cell: 3.4, gap: 1.4, ramp: ['#17233a', '#22452a', '#3d7a22', '#8fc41e', '#C7FF02'] })}
        <div style="font-size:11px;color:#7f93b4;margin-top:7px">peak ${D.peak} · streak ${D.streak}</div>
      </div>
    </div>
    <div class="dock"><b>P</b><b>O</b><b>C</b><b>G</b><b>♥</b></div>
  </div>`
},
]
