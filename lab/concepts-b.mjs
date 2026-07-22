// Concepts 18-34: cities, maps, data, instruments.

export const B = [
{
  id:'c18', name:'The Contribution City', cat:'iso', feas:'yes',
  blurb:'One building per day, height is that day. The city builds itself west to east.',
  tags:['isometric','built'],
  css:`
  #c18 .cv{background:#121827;padding:12px;display:grid;place-items:end center}
  #c18 svg{width:100%;height:100%}
  #c18 .b{animation:c18g 5s cubic-bezier(.22,1,.36,1) infinite backwards;transform-box:fill-box;transform-origin:bottom}
  #c18 .t{fill:#333E60}#c18 .r{fill:#212A44}#c18 .f{fill:#161D30}
  @keyframes c18g{0%{transform:scaleY(0)}22%{transform:scaleY(1)}88%{transform:scaleY(1)}100%{transform:scaleY(0)}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 200">
    ${Array.from({length:34},(_,i)=>{
      const h=[4,4,4,4,6,4,4,10,4,4,4,4,4,4,4,4,4,4,22,40,30,58,44,72,52,88,64,104,76,120,92,70,110,84][i]
      const x=i*11, y=150-h, cw=9, sx=5, sy=7
      return `<g class="b" style="animation-delay:${i*.05}s">
        <polygon class="f" points="${x+sx},${150+sy} ${x+sx+cw},${150+sy} ${x+sx+cw},${y+sy} ${x+sx},${y+sy}"/>
        <polygon class="r" points="${x+cw},150 ${x+sx+cw},${150+sy} ${x+sx+cw},${y+sy} ${x+cw},${y}"/>
        <polygon class="t" points="${x},${y} ${x+cw},${y} ${x+sx+cw},${y+sy} ${x+sx},${y+sy}"/>
        ${h>60?`<polyline points="${x+sx},${y+sy} ${x+sx+cw},${y+sy} ${x+cw},${y}" fill="none" stroke="#C7FF02" stroke-width="1.4"/>`:''}
      </g>`}).join('')}
  </svg></div>`
},
{
  id:'c19', name:'Voxel Island', cat:'iso', feas:'hard',
  blurb:'A floating island where each venture is a building you could walk to.',
  tags:['isometric','scene'],
  css:`
  #c19 .cv{background:#0e1524;display:grid;place-items:center}
  #c19 svg{width:100%;height:100%}
  #c19 .fl{animation:c19f 6s ease-in-out infinite}
  #c19 .p{animation:c19f 6s ease-in-out infinite;animation-delay:-.8s}
  @keyframes c19f{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 240">
    <g class="fl">
      <polygon points="200,60 330,130 200,200 70,130" fill="#1d2a44"/>
      <polygon points="70,130 200,200 200,224 70,154" fill="#141d31"/>
      <polygon points="330,130 200,200 200,224 330,154" fill="#0f1727"/>
      ${[[200,96,34,'#C7FF02'],[152,120,22,'#3a4a72'],[248,120,26,'#2b3a5e'],[176,146,16,'#3a4a72']]
        .map(([x,y,h,c])=>`<g class="p"><polygon points="${x},${y-h} ${x+22},${y-h+12} ${x+22},${y+12} ${x},${y}" fill="${c}"/>
          <polygon points="${x},${y-h} ${x-22},${y-h+12} ${x-22},${y+12} ${x},${y}" fill="${c}" opacity=".72"/>
          <polygon points="${x},${y-h-12} ${x+22},${y-h} ${x},${y-h+12} ${x-22},${y-h}" fill="${c}" opacity="1.0"/></g>`).join('')}
    </g>
  </svg></div>`
},
{
  id:'c20', name:'Metro Map', cat:'map', feas:'yes',
  blurb:'A transit diagram where each line is a venture and stations are milestones.',
  tags:['diagram','draw-on'],
  css:`
  #c20 .cv{background:#f6f5f0;padding:12px}
  #c20 svg{width:100%;height:100%}
  #c20 path{fill:none;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;
    stroke-dasharray:600;stroke-dashoffset:600;animation:c20d 4s ease forwards infinite}
  #c20 circle{fill:#fff;stroke:#111;stroke-width:2.4}
  #c20 text{font:700 8px Inter;fill:#111}
  @keyframes c20d{0%{stroke-dashoffset:600}55%,100%{stroke-dashoffset:0}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 230">
    <path d="M40 60 L150 60 L200 110 L340 110" stroke="#111"/>
    <path d="M40 150 L120 150 L170 100 L250 100 L300 150 L350 150" stroke="#C7D400" style="animation-delay:.3s"/>
    <path d="M60 200 L180 200 L230 150 L340 150" stroke="#5aa9ff" style="animation-delay:.6s"/>
    ${[[40,60],[150,60],[200,110],[340,110],[40,150],[170,100],[300,150],[60,200],[230,150]]
      .map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.6"/>`).join('')}
    <text x="34" y="50">PROPIEDASH</text><text x="34" y="140">OPENNODO</text><text x="52" y="192">STUDIO</text>
  </svg></div>`
},
{
  id:'c21', name:'Venezuela Live', cat:'map', feas:'yes',
  blurb:'2,870 real OpenNodo places igniting across the country, west to east.',
  tags:['real data','ignite'],
  css:`
  #c21 .cv{background:#0c1220;display:grid;place-items:center;position:relative}
  #c21 svg{width:100%;height:100%}
  #c21 .co{fill:#18213a;stroke:#2a3350;stroke-width:.8}
  #c21 .d{fill:#C7FF02;animation:c21i 4s ease-in-out infinite backwards}
  @keyframes c21i{0%{opacity:0}12%{opacity:1}82%{opacity:1}100%{opacity:0}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 230">
    <path class="co" d="M52 96 L96 66 L150 60 L198 74 L250 62 L306 78 L344 100 L336 132 L296 150 L268 186 L232 206 L196 190 L168 150 L120 140 L76 130 Z"/>
    ${(()=>{
      // population really does hug the north and west, so bias the scatter
      // that way instead of spreading it evenly over the polygon
      let o=''
      for(let i=0;i<260;i++){
        const t=(i*2654435761)%1000/1000, u=(i*40503)%1000/1000
        const x=70+Math.pow(t,0.75)*260
        const spread=x<200?52:78
        const y=70+Math.pow(u,1.6)*spread+(x-70)*0.30
        if(y>200||x>340) continue
        const big=i%11===0
        o+=`<rect class="d" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${big?2.8:1.8}" height="${big?2.8:1.8}" style="animation-delay:${((x-70)/270*2.6).toFixed(2)}s" opacity="${big?1:.62}"/>`
      }
      return o})()}
    <circle cx="228" cy="92" r="6" fill="none" stroke="#fff" stroke-width="1.2"/>
    <text x="240" y="95" font="700 8px Inter" fill="#fff" style="font:700 8px Inter">CARACAS</text>
  </svg></div>`
},
{
  id:'c22', name:'Flight Path', cat:'map', feas:'yes',
  blurb:'Caracas to Madrid to Miami to Gainesville, drawn as great-circle arcs.',
  tags:['arcs','travel'],
  css:`
  #c22 .cv{background:#070d1a;position:relative}
  #c22 svg{width:100%;height:100%}
  #c22 .arc{fill:none;stroke:#C7FF02;stroke-width:1.6;stroke-dasharray:300;stroke-dashoffset:300;animation:c22d 4s ease-in-out infinite}
  #c22 .pl{fill:#C7FF02;offset-path:path('M70 170 Q160 60 260 120');animation:c22m 4s ease-in-out infinite}
  #c22 .city{fill:#fff}#c22 text{font:700 8px Inter;fill:#8fa3c8}
  @keyframes c22d{0%{stroke-dashoffset:300}60%,100%{stroke-dashoffset:0}}
  @keyframes c22m{from{offset-distance:0%}to{offset-distance:100%}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 230">
    ${Array.from({length:60},(_,i)=>`<circle cx="${(i*67)%400}" cy="${(i*113)%230}" r=".8" fill="#1e2a44"/>`).join('')}
    <path class="arc" d="M70 170 Q160 60 260 120"/>
    <path class="arc" style="animation-delay:.5s" d="M260 120 Q300 80 330 105"/>
    <path class="arc" style="animation-delay:1s" d="M330 105 Q345 140 320 165"/>
    ${[[70,170,'CARACAS'],[260,120,'MADRID'],[330,105,'MIAMI'],[320,165,'GAINESVILLE']]
      .map(([x,y,n])=>`<circle class="city" cx="${x}" cy="${y}" r="3.4"/><text x="${x+7}" y="${y+3}">${n}</text>`).join('')}
  </svg></div>`
},
{
  id:'c23', name:'Bloomberg Terminal', cat:'data', feas:'yes',
  blurb:'Amber-on-black market terminal. Your repos as tickers with deltas.',
  tags:['ticker','dense data'],
  css:`
  #c23 .cv{background:#000;padding:12px;font:10px/1.75 ui-monospace;color:#ffb000}
  #c23 .hd{background:#ffb000;color:#000;font-weight:700;padding:2px 6px;margin-bottom:8px;display:flex;justify-content:space-between}
  #c23 .r{display:grid;grid-template-columns:1fr 56px 54px;gap:6px}
  #c23 .up{color:#3dff7a}#c23 .dn{color:#ff4d4d}
  #c23 .mq{margin-top:9px;border-top:1px solid #4a3300;padding-top:6px;white-space:nowrap;overflow:hidden}
  #c23 .mq span{display:inline-block;animation:c23m 12s linear infinite}
  @keyframes c23m{from{transform:translateX(0)}to{transform:translateX(-50%)}}`,
  html:`<div class="cv">
    <div class="hd"><span>RSCAV &lt;GO&gt;</span><span>PORTFOLIO</span></div>
    ${[['PROPIEDASH','2122','+18.4%','up'],['OPENNODO','2870','+9.1%','up'],
       ['STUDIO','7','+2.0%','up'],['GRADVISR','221','-1.2%','dn']]
      .map(([t,v,d,c])=>`<div class="r"><span>${t}</span><span>${v}</span><span class="${c}">${d}</span></div>`).join('')}
    <div class="mq"><span>5,154 CONTRIBUTIONS · 90 ACTIVE DAYS · PEAK 518 · &nbsp; 5,154 CONTRIBUTIONS · 90 ACTIVE DAYS · PEAK 518 · &nbsp;</span></div>
  </div>`
},
{
  id:'c24', name:'Mission Control', cat:'data', feas:'yes',
  blurb:'Telemetry console: gauges, a countdown, and a go/no-go board.',
  tags:['gauges','instrument'],
  css:`
  #c24 .cv{background:#080c14;padding:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;align-content:center}
  #c24 .g{background:#0e1524;border:1px solid #1e2b45;padding:8px;text-align:center}
  #c24 .dial{width:100%;aspect-ratio:1;max-width:52px;margin:0 auto 5px;position:relative}
  #c24 svg{width:100%;height:100%;transform:rotate(-90deg)}
  #c24 .tr{fill:none;stroke:#1e2b45;stroke-width:7}
  #c24 .vl{fill:none;stroke:#C7FF02;stroke-width:7;stroke-linecap:round;stroke-dasharray:126;animation:c24s 3.5s ease-in-out infinite alternate}
  #c24 b{color:#fff;font:700 13px Inter;display:block}
  #c24 i{color:#5f6f8c;font:600 7px Inter;letter-spacing:1.4px;font-style:normal}
  @keyframes c24s{from{stroke-dashoffset:126}to{stroke-dashoffset:var(--o)}}`,
  html:`<div class="cv">
    ${[['5,154','CONTRIB','30'],['90','ACTIVE','62'],['518','PEAK','12'],
       ['14','STREAK','78'],['7','VENTURES','44'],['100%','UPTIME','2']]
      .map(([v,l,o])=>`<div class="g"><div class="dial"><svg viewBox="0 0 48 48"><circle class="tr" cx="24" cy="24" r="20"/><circle class="vl" cx="24" cy="24" r="20" style="--o:${o}"/></svg></div><b>${v}</b><i>${l}</i></div>`).join('')}
  </div>`
},
{
  id:'c25', name:'Dither Charts', cat:'data', feas:'yes',
  blurb:'Bayer-dithered bars. Full tonal range with zero gradients.',
  tags:['ordered dither','brand-true'],
  css:`
  #c25 .cv{background:#121827;padding:16px;display:flex;align-items:flex-end;gap:9px}
  #c25 .b{flex:1;position:relative;animation:c25r 3s cubic-bezier(.22,1,.36,1) infinite backwards}
  #c25 .b i{display:block;background-image:radial-gradient(#C7FF02 42%,transparent 43%);background-size:4px 4px}
  #c25 .cap{position:absolute;top:-3px;left:0;right:0;height:2px;background:#C7FF02}
  @keyframes c25r{0%{transform:scaleY(0);transform-origin:bottom}30%,90%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}`,
  html:`<div class="cv">
    ${[6,10,7,4,3,3,4,18,52,74,96,120].map((h,i)=>`
      <div class="b" style="height:${h+6}px;animation-delay:${i*.07}s">
        <div class="cap"></div>
        ${Array.from({length:5},(_,k)=>`<i style="height:${(h+6)/5}px;opacity:${.25+k*.19}"></i>`).join('')}
      </div>`).join('')}
  </div>`
},
{
  id:'c26', name:'Sankey of Time', cat:'data', feas:'hard',
  blurb:'Where the hours actually go, flowing from you into each venture.',
  tags:['flow','ribbon'],
  css:`
  #c26 .cv{background:#0f1420;padding:12px}
  #c26 svg{width:100%;height:100%}
  #c26 path{opacity:0;animation:c26f .8s ease forwards}
  #c26 text{font:700 8px Inter;fill:#93a3c0}
  @keyframes c26f{to{opacity:.85}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 230">
    <rect x="28" y="60" width="14" height="110" fill="#C7FF02"/>
    ${[[70,'#C7FF02',56,'PROPIEDASH'],[118,'#7fd4ff',34,'OPENNODO'],[164,'#ff9ad1',26,'STUDIO'],[202,'#ffd166',18,'REST']]
      .map(([y,c,h,l],i)=>`
      <path d="M42 ${68+i*26} C160 ${68+i*26} 200 ${y} 330 ${y}" stroke="${c}" stroke-width="${h*.55}" fill="none" style="animation-delay:${i*.18}s"/>
      <rect x="330" y="${y-h/2}" width="12" height="${h}" fill="${c}"/>
      <text x="348" y="${y+3}">${l}</text>`).join('')}
    <text x="16" y="52">TIME</text>
  </svg></div>`
},
{
  id:'c27', name:'Radar Sweep', cat:'data', feas:'yes',
  blurb:'A rotating sweep that paints blips for every repo it finds.',
  tags:['rotation','sonar'],
  css:`
  #c27 .cv{background:#04120c;display:grid;place-items:center}
  #c27 .rd{width:82%;aspect-ratio:1;border-radius:50%;border:1px solid #0d3a25;position:relative;
    background:repeating-radial-gradient(circle,transparent 0 17px,#0d3a25 17px 18px)}
  #c27 .sw{position:absolute;inset:0;border-radius:50%;
    background:conic-gradient(from 0deg,rgba(61,255,158,.42),transparent 62deg);animation:spin 3.4s linear infinite}
  #c27 .bl{position:absolute;width:5px;height:5px;border-radius:50%;background:#3dff9e;animation:c27b 3.4s ease-out infinite}
  @keyframes c27b{0%,55%{opacity:0}60%{opacity:1}100%{opacity:0}}`,
  html:`<div class="cv"><div class="rd"><div class="sw"></div>
    ${[[32,28,0],[62,44,.5],[46,70,1.1],[72,66,1.7],[24,58,2.3]]
      .map(([x,y,d])=>`<i class="bl" style="left:${x}%;top:${y}%;animation-delay:${d}s"></i>`).join('')}
  </div></div>`
},
{
  id:'c28', name:'Car Dashboard', cat:'data', feas:'hard',
  blurb:'A tachometer that redlines at your peak commit day.',
  tags:['needle','instrument'],
  css:`
  #c28 .cv{background:#0a0a0c;display:grid;place-items:center;position:relative}
  #c28 svg{width:74%;height:74%}
  #c28 .arc{fill:none;stroke:#22262e;stroke-width:9}
  #c28 .red{stroke:#ff3b30}
  #c28 .ndl{stroke:#C7FF02;stroke-width:2.6;stroke-linecap:round;transform-origin:100px 100px;
    animation:c28n 3.6s cubic-bezier(.5,0,.4,1) infinite alternate}
  #c28 text{font:700 13px Inter;fill:#fff;text-anchor:middle}
  #c28 .sm{font:600 7px Inter;fill:#6b7280;letter-spacing:1.5px}
  @keyframes c28n{from{transform:rotate(-16deg)}to{transform:rotate(112deg)}}`,
  html:`<div class="cv"><svg viewBox="0 0 200 150">
    <path class="arc" d="M28 118 A72 72 0 1 1 172 118"/>
    <path class="arc red" d="M150 42 A72 72 0 0 1 172 118"/>
    <line class="ndl" x1="100" y1="100" x2="100" y2="42"/>
    <circle cx="100" cy="100" r="5" fill="#C7FF02"/>
    <text x="100" y="132">518</text><text class="sm" x="100" y="145">PEAK DAY</text>
  </svg></div>`
},
{
  id:'c29', name:'Heat Grid', cat:'data', feas:'yes',
  blurb:'The classic calendar, reimagined as a pulsing lime heat lattice.',
  tags:['grid','wave'],
  css:`
  #c29 .cv{background:#0d1117;display:grid;place-items:center;padding:14px}
  #c29 .g{display:grid;grid-template-columns:repeat(30,1fr);grid-auto-rows:1fr;gap:3px;width:100%}
  #c29 i{aspect-ratio:1;background:#161b22;border-radius:2px;animation:c29p 3.4s ease-in-out infinite}
  @keyframes c29p{0%,100%{background:#161b22}50%{background:var(--c)}}`,
  html:`<div class="cv"><div class="g">
    ${Array.from({length:210},(_,i)=>{
      const col=i%30, v=col<16?0:Math.min(1,(col-15)/14+((i*37)%9)/22)
      const c=v<.12?'#161b22':v<.35?'#2c4a12':v<.6?'#5c8f16':v<.82?'#98d41c':'#C7FF02'
      return `<i style="--c:${c};animation-delay:${(col*.06).toFixed(2)}s"></i>`}).join('')}
  </div></div>`
},
{
  id:'c30', name:'Subway Sign', cat:'editorial', feas:'yes',
  blurb:'LED dot-matrix transit sign scrolling your status.',
  tags:['dot matrix','marquee'],
  css:`
  #c30 .cv{background:#0a0a0a;display:grid;place-items:center;padding:16px}
  #c30 .sign{background:#111;border:3px solid #262626;border-radius:6px;padding:12px 0;width:100%;overflow:hidden;
    background-image:radial-gradient(#1b1b1b 40%,transparent 41%);background-size:4px 4px}
  #c30 .tx{white-space:nowrap;font:700 20px ui-monospace;color:#ff9f1c;letter-spacing:2px;
    animation:c30m 11s linear infinite;text-shadow:0 0 9px rgba(255,159,28,.6)}`,
  html:`<div class="cv"><div class="sign"><div class="tx">RODRIGO CASANOVA-ALEMAN &nbsp;·&nbsp; FOUNDER &amp; BUILDER &nbsp;·&nbsp; PROPIEDASH LIVE &nbsp;·&nbsp; OPENNODO ALPHA &nbsp;·&nbsp; </div></div></div>`
},
{
  id:'c31', name:'Nautical Chart', cat:'map', feas:'yes',
  blurb:'Depth soundings and rhumb lines. Your work as a coastline survey.',
  tags:['line art','vintage map'],
  css:`
  #c31 .cv{background:#eee6d0;padding:10px;position:relative}
  #c31 svg{width:100%;height:100%}
  #c31 .rl{stroke:#b9a882;stroke-width:.6}
  #c31 .cl{fill:none;stroke:#2b4f7a;stroke-width:1.4}
  #c31 .sd{font:6.5px ui-monospace;fill:#5a7ba6}
  #c31 .ti{font:700 11px Inter;fill:#2b4f7a;letter-spacing:2px}
  #c31 .cp{transform-origin:340px 52px;animation:spin 16s linear infinite}`,
  html:`<div class="cv"><svg viewBox="0 0 400 230">
    ${Array.from({length:12},(_,i)=>`<line class="rl" x1="200" y1="115" x2="${200+180*Math.cos(i*Math.PI/6)}" y2="${115+180*Math.sin(i*Math.PI/6)}"/>`).join('')}
    <path class="cl" d="M40 170 Q90 140 130 152 T210 128 Q260 112 300 132 T368 118"/>
    <path class="cl" style="opacity:.5" d="M40 192 Q100 166 140 176 T220 152 Q270 138 310 156 T372 142"/>
    ${Array.from({length:16},(_,i)=>`<text class="sd" x="${44+i*22}" y="${200+((i*13)%18)}">${3+((i*7)%40)}</text>`).join('')}
    <g class="cp"><polygon points="340,38 344,52 340,66 336,52" fill="#2b4f7a"/></g>
    <text class="ti" x="34" y="34">RSCAV SURVEY</text>
  </svg></div>`
},
{
  id:'c32', name:'Seismograph', cat:'data', feas:'yes',
  blurb:'A drum recorder scratching out your commit activity in ink.',
  tags:['trace','continuous'],
  css:`
  #c32 .cv{background:#f2efe6;padding:12px}
  #c32 svg{width:100%;height:100%}
  #c32 .tr{fill:none;stroke:#b3261e;stroke-width:1.5;stroke-dasharray:1400;stroke-dashoffset:1400;animation:c32d 6s linear infinite}
  #c32 .gl line{stroke:#ddd6c4;stroke-width:.7}
  #c32 text{font:7px ui-monospace;fill:#8a8270}`,
  html:`<div class="cv"><svg viewBox="0 0 400 230">
    <g class="gl">${Array.from({length:6},(_,i)=>`<line x1="16" y1="${28+i*38}" x2="384" y2="${28+i*38}"/>`).join('')}</g>
    ${Array.from({length:6},(_,r)=>{
      let d=`M16 ${28+r*38}`
      for(let x=16;x<384;x+=3){
        // quiet at the start of the year, violent by the end
        const env=Math.max(.6, Math.pow((x-16)/368, 2)*15)
        const amp=env*(1+Math.sin(x/6+r*1.7))*0.9
        d+=` L${x} ${(28+r*38+Math.sin(x/2.3+r*2)*amp).toFixed(1)}`}
      return `<path class="tr" d="${d}" style="animation-delay:${r*.35}s"/>`}).join('')}
    <text x="16" y="222">2025-07 → 2026-07 · 5,154 EVENTS</text>
  </svg></div>`
},
{
  id:'c33', name:'Boarding Pass', cat:'editorial', feas:'yes',
  blurb:'A ticket stub with your route, seat, and a scannable barcode.',
  tags:['object','print'],
  css:`
  #c33 .cv{background:#151519;display:grid;place-items:center;padding:14px}
  #c33 .bp{background:#faf8f2;width:100%;display:grid;grid-template-columns:1fr 96px;border-radius:5px;overflow:hidden}
  #c33 .l{padding:12px 14px;color:#15151a;font:10px/1.5 Inter}
  #c33 .r{border-left:2px dashed #c9c4b4;padding:12px 8px;display:grid;place-items:center;background:#f2eee2}
  #c33 .big{font:800 22px Inter;letter-spacing:-.8px;margin:2px 0 6px}
  #c33 .k{font:600 7px Inter;letter-spacing:1.6px;color:#8a8270}
  #c33 .bar{display:flex;gap:1.5px;height:44px;align-items:stretch}
  #c33 .bar i{background:#15151a;animation:c33b 2.4s steps(1) infinite}
  @keyframes c33b{0%,100%{opacity:1}50%{opacity:.55}}`,
  html:`<div class="cv"><div class="bp">
    <div class="l"><div class="k">PASSENGER</div><div class="big">CASANOVA-ALEMAN / R</div>
      <div class="k">ROUTE</div><div style="font:700 12px Inter">CCS → MAD → MIA → GNV</div>
      <div class="k" style="margin-top:6px">ROLE &nbsp; FOUNDER · BUILDER &nbsp;&nbsp; SEAT 1A</div></div>
    <div class="r"><div class="bar">${Array.from({length:19},(_,i)=>`<i style="width:${1+(i%3)*1.6}px;animation-delay:${i*.05}s"></i>`).join('')}</div></div>
  </div></div>`
},
{
  id:'c34', name:'Vinyl Sleeve', cat:'editorial', feas:'yes',
  blurb:'An album cover with your ventures as the track listing.',
  tags:['print','spin'],
  css:`
  #c34 .cv{background:#191713;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:10px;padding:14px}
  #c34 .sl{background:#C7FF02;aspect-ratio:1;padding:12px;display:flex;flex-direction:column;justify-content:space-between}
  #c34 .ti{font:800 19px Inter;color:#0a0a0a;line-height:.98;letter-spacing:-.8px}
  #c34 .yr{font:700 8px Inter;color:#0a0a0a;letter-spacing:2px}
  #c34 .tk{font:10px/1.75 ui-monospace;color:#cfc7b4}
  #c34 .tk b{color:#C7FF02}
  #c34 .disc{position:absolute;right:16px;width:38%;aspect-ratio:1;border-radius:50%;
    background:repeating-radial-gradient(circle,#111 0 2px,#1c1c1c 2px 4px);animation:spin 6s linear infinite}`,
  html:`<div class="cv">
    <div class="sl"><div class="yr">RSCAV RECORDS · 2026</div><div class="ti">ALWAYS<br>FORWARD</div></div>
    <div class="tk"><b>A1</b> Propiedash<br><b>A2</b> OpenNodo<br><b>A3</b> casanovaaleman<br><b>B1</b> Gradvisr<br><b>B2</b> Pink's<br><b>B3</b> Hearts in Motion</div>
  </div>`
},
]
