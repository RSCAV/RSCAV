// Concepts 1-17: terminal, code, systems, retro computing.
// Each concept renders inside a .cv canvas (16:10). CSS is scoped by #id.

export const A = [
{
  id:'c01', name:'Boot Sequence', cat:'terminal', feas:'yes',
  blurb:'A cold boot that types itself, POSTs your ventures, then drops to a prompt.',
  tags:['SVG typing','looping','monospace'],
  css:`
  #c01 .cv{background:#05070c;padding:16px 18px;font:11px/1.75 ui-monospace,monospace;color:#7de08a}
  #c01 .l{white-space:nowrap;overflow:hidden;animation:c01t .5s steps(40) backwards}
  #c01 .l:nth-child(1){animation-delay:.1s}#c01 .l:nth-child(2){animation-delay:.6s}
  #c01 .l:nth-child(3){animation-delay:1.1s}#c01 .l:nth-child(4){animation-delay:1.6s}
  #c01 .l:nth-child(5){animation-delay:2.1s}#c01 .l:nth-child(6){animation-delay:2.6s}
  #c01 .ok{color:#C7FF02}#c01 .dim{color:#3d5c46}
  #c01 .cur{display:inline-block;width:7px;height:12px;background:#C7FF02;animation:blink 1s steps(2) infinite;vertical-align:-2px}
  @keyframes c01t{from{width:0}to{width:100%}}`,
  html:`<div class="cv">
    <div class="l dim">RSCAV BIOS v4.8 · 5,154 contributions detected</div>
    <div class="l">booting <span class="ok">propiedash</span> ......... [ <span class="ok">LIVE</span> ]</div>
    <div class="l">booting <span class="ok">opennodo</span> .......... [ <span class="ok">ALPHA</span> ]</div>
    <div class="l">booting <span class="ok">casanovaaleman</span> .... [ <span class="ok">OPEN</span> ]</div>
    <div class="l dim">4 services online · 0 errors</div>
    <div class="l">rodrigo@caracas:~$ <span class="cur"></span></div>
  </div>`
},
{
  id:'c02', name:'htop', cat:'terminal', feas:'yes',
  blurb:'Your ventures as running processes, with live-ish CPU meters.',
  tags:['bar meters','looping','data'],
  css:`
  #c02 .cv{background:#0b0f16;padding:14px;font:10px/1.6 ui-monospace,monospace;color:#9fb0c9}
  #c02 .m{display:flex;align-items:center;gap:7px;margin-bottom:5px}
  #c02 .nm{width:82px;color:#e6edf7}
  #c02 .bar{flex:1;height:9px;background:#131a26;position:relative;overflow:hidden}
  #c02 .fill{position:absolute;inset:0 auto 0 0;background:#C7FF02;animation:c02b 4s ease-in-out infinite alternate}
  #c02 .f2 .fill{background:#5ad1ff}#c02 .f3 .fill{background:#ff9f5a}
  #c02 .pct{width:34px;text-align:right;color:#C7FF02}
  #c02 h4{color:#C7FF02;font:700 10px ui-monospace;margin-bottom:9px;letter-spacing:1px}
  @keyframes c02b{from{width:var(--a)}to{width:var(--b)}}`,
  html:`<div class="cv"><h4>PROCESSES · rodrigo@build</h4>
    ${[['propiedash','78%','--a:62%;--b:94%',''],['opennodo','41%','--a:28%;--b:55%','f2'],
       ['studio','33%','--a:22%;--b:44%','f3'],['gradvisr','19%','--a:10%;--b:26%',''],
       ['pinks','12%','--a:6%;--b:18%','f2']]
      .map(([n,p,v,c])=>`<div class="m ${c}"><span class="nm">${n}</span><span class="bar"><i class="fill" style="${v}"></i></span><span class="pct">${p}</span></div>`).join('')}
  </div>`
},
{
  id:'c03', name:'git log --graph', cat:'terminal', feas:'yes',
  blurb:'A living commit graph that draws its branches as you watch.',
  tags:['SVG stroke-dash','branch art'],
  css:`
  #c03 .cv{background:#0d1117;padding:12px}
  #c03 svg{width:100%;height:100%}
  #c03 .e{stroke:#C7FF02;stroke-width:2;fill:none;stroke-dasharray:200;stroke-dashoffset:200;animation:c03d 3s ease forwards infinite}
  #c03 .e2{stroke:#5ad1ff}#c03 .e3{stroke:#ff7ab6}
  #c03 circle{fill:#0d1117;stroke-width:2}
  #c03 text{font:9px ui-monospace;fill:#8b98a9}
  @keyframes c03d{0%{stroke-dashoffset:200}45%,100%{stroke-dashoffset:0}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 250">
    <path class="e" d="M40 210 L40 40"/>
    <path class="e e2" style="animation-delay:.4s" d="M40 170 C90 170 90 130 130 130 L130 60"/>
    <path class="e e3" style="animation-delay:.9s" d="M40 120 C100 120 160 110 220 100 L220 55"/>
    ${[[40,210],[40,170],[40,120],[40,70],[130,130],[130,60],[220,100],[220,55]]
      .map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="5" stroke="${i>5?'#ff7ab6':i>3?'#5ad1ff':'#C7FF02'}"/>`).join('')}
    <text x="56" y="214">init propiedash</text><text x="146" y="134">feat: opennodo ids</text>
    <text x="236" y="104">feat: the map</text><text x="56" y="74">main</text>
  </svg></div>`
},
{
  id:'c04', name:'npm install you', cat:'terminal', feas:'yes',
  blurb:'Install progress bars that resolve your stack as dependencies.',
  tags:['progress','looping'],
  css:`
  #c04 .cv{background:#0a0a0a;padding:16px;font:10.5px/1.9 ui-monospace,monospace;color:#c9d1d9}
  #c04 .row{display:flex;gap:8px;align-items:center}
  #c04 .tr{flex:1;height:6px;background:#1c2128;overflow:hidden}
  #c04 .tr i{display:block;height:100%;background:#C7FF02;width:0;animation:c04f 2.4s ease-out forwards infinite}
  #c04 .k{color:#7ee787;width:104px}
  @keyframes c04f{0%{width:0}70%,100%{width:100%}}`,
  html:`<div class="cv">
    <div style="color:#8b949e">$ npm i rodrigo-casanova-aleman</div>
    ${[['next',0],['typescript',.15],['supabase',.3],['playwright',.45],['taste',.6]]
      .map(([k,d])=>`<div class="row"><span class="k">${k}</span><span class="tr"><i style="animation-delay:${d}s"></i></span></div>`).join('')}
    <div style="color:#C7FF02;margin-top:6px">+ added 5 packages · founder, builder</div>
  </div>`
},
{
  id:'c05', name:'Matrix Rain', cat:'retro', feas:'yes',
  blurb:'Falling glyph columns that briefly resolve into your name.',
  tags:['SVG columns','staggered'],
  css:`
  #c05 .cv{background:#000;overflow:hidden;position:relative}
  #c05 .col{position:absolute;top:-100%;font:11px/1.1 ui-monospace;color:#0f0;opacity:.75;animation:c05f linear infinite;writing-mode:vertical-rl}
  #c05 .nm{position:absolute;inset:0;display:grid;place-items:center;font:800 30px Inter,sans-serif;
    color:#C7FF02;letter-spacing:-1px;animation:c05n 6s ease-in-out infinite;text-shadow:0 0 18px #000}
  @keyframes c05f{to{top:120%}}
  @keyframes c05n{0%,60%{opacity:0}75%,90%{opacity:1}100%{opacity:0}}`,
  html:`<div class="cv">
    ${Array.from({length:22},(_,i)=>`<span class="col" style="left:${i*4.6}%;animation-duration:${2+((i*7)%5)*.7}s;animation-delay:${(i%9)*.35}s">01アイウ10ロ01ハ</span>`).join('')}
    <div class="nm">RODRIGO</div>
  </div>`
},
{
  id:'c06', name:'The Editor', cat:'terminal', feas:'yes',
  blurb:'A code editor whose open file is your bio, syntax highlighted.',
  tags:['UI chrome','caret'],
  css:`
  #c06 .cv{background:#1e1e2e;display:flex;flex-direction:column}
  #c06 .tabs{display:flex;background:#181825;font:10px ui-monospace;color:#6c7086}
  #c06 .tab{padding:7px 12px}#c06 .tab.on{background:#1e1e2e;color:#cdd6f4;border-top:2px solid #C7FF02}
  #c06 .body{flex:1;padding:12px 14px;font:10.5px/1.85 ui-monospace;color:#cdd6f4}
  #c06 .g{color:#6c7086;margin-right:12px}
  #c06 .kw{color:#cba6f7}#c06 .st{color:#a6e3a1}#c06 .fn{color:#89b4fa}
  #c06 .car{display:inline-block;width:1.5px;height:12px;background:#C7FF02;animation:blink 1.05s steps(2) infinite;vertical-align:-2px}`,
  html:`<div class="cv">
    <div class="tabs"><span class="tab on">rodrigo.ts</span><span class="tab">propiedash/</span><span class="tab">opennodo/</span></div>
    <div class="body">
      <div><span class="g">1</span><span class="kw">export const</span> <span class="fn">rodrigo</span> = {</div>
      <div><span class="g">2</span>&nbsp;&nbsp;role: <span class="st">'founder &amp; builder'</span>,</div>
      <div><span class="g">3</span>&nbsp;&nbsp;based: <span class="st">'caracas → gainesville'</span>,</div>
      <div><span class="g">4</span>&nbsp;&nbsp;shipping: <span class="st">'propiedash'</span><span class="car"></span></div>
      <div><span class="g">5</span>}</div>
    </div>
  </div>`
},
{
  id:'c07', name:'Split-Flap Board', cat:'retro', feas:'yes',
  blurb:'An airport departures board that flips through your projects.',
  tags:['flip animation','mechanical'],
  css:`
  #c07 .cv{background:#0b0b0d;padding:14px;font:700 12px ui-monospace;color:#f5f5f0}
  #c07 .r{display:grid;grid-template-columns:1fr 62px 74px;gap:6px;margin-bottom:6px;align-items:center}
  #c07 .cell{background:#17171b;padding:5px 8px;border-bottom:1px solid #000;overflow:hidden;height:24px}
  #c07 .fl{display:block;animation:c07f 5s cubic-bezier(.3,0,.2,1) infinite}
  #c07 .st{color:#C7FF02}
  #c07 h5{color:#6b6b73;font:600 9px ui-monospace;letter-spacing:2px;margin-bottom:9px}
  @keyframes c07f{0%,18%{transform:translateY(0)}25%,43%{transform:translateY(-24px)}50%,68%{transform:translateY(-48px)}75%,100%{transform:translateY(0)}}`,
  html:`<div class="cv"><h5>DEPARTURES · RSCAV</h5>
    ${[['PROPIEDASH','OPENNODO','STUDIO'],['GRADVISR','PINKS','YNTEGRA']].map((set,i)=>`
      <div class="r">
        <span class="cell"><span class="fl" style="animation-delay:${i*.6}s">${set.map(s=>`<span style="display:block;height:24px">${s}</span>`).join('')}</span></span>
        <span class="cell st">LIVE</span><span class="cell">ON TIME</span>
      </div>`).join('')}
  </div>`
},
{
  id:'c08', name:'CI Pipeline', cat:'terminal', feas:'yes',
  blurb:'A build log streaming green checks across your repos.',
  tags:['streaming','status'],
  css:`
  #c08 .cv{background:#0d1117;padding:14px;font:10px/1.9 ui-monospace;color:#8b949e}
  #c08 .s{display:flex;gap:8px;align-items:center;opacity:0;animation:c08in .4s ease forwards}
  #c08 .dot{width:12px;height:12px;border-radius:50%;border:2px solid #C7FF02;position:relative}
  #c08 .dot.done{background:#C7FF02}
  #c08 .dot.run{border-top-color:transparent;animation:spin .8s linear infinite}
  #c08 .t{color:#c9d1d9}#c08 .ms{margin-left:auto;color:#484f58}
  @keyframes c08in{to{opacity:1}}`,
  html:`<div class="cv">
    ${[['checkout','done','1.2s',0],['install','done','8.4s',.4],['lint','done','3.1s',.8],
       ['build world','done','4.0s',1.2],['deploy','run','…',1.6]]
      .map(([t,s,ms,d])=>`<div class="s" style="animation-delay:${d}s"><span class="dot ${s}"></span><span class="t">${t}</span><span class="ms">${ms}</span></div>`).join('')}
  </div>`
},
{
  id:'c09', name:'Man Page', cat:'editorial', feas:'yes',
  blurb:'RODRIGO(1) as a Unix manual entry. Deadpan and very dry.',
  tags:['typographic','static-friendly'],
  css:`
  #c09 .cv{background:#f5f3ec;padding:16px 18px;font:10.5px/1.7 ui-monospace;color:#1a1a17}
  #c09 .hd{display:flex;justify-content:space-between;font-weight:700;border-bottom:1px solid #1a1a17;padding-bottom:4px;margin-bottom:10px}
  #c09 b{display:block;margin-top:8px}
  #c09 .in{padding-left:14px}
  #c09 .k{background:#C7FF02;padding:0 3px}`,
  html:`<div class="cv">
    <div class="hd"><span>RODRIGO(1)</span><span>USER COMMANDS</span><span>RODRIGO(1)</span></div>
    <b>NAME</b><div class="in">rodrigo — <span class="k">founder and builder</span></div>
    <b>SYNOPSIS</b><div class="in">rodrigo [--ship] [--daily] &lt;idea&gt;</div>
    <b>DESCRIPTION</b><div class="in">Builds things. All of them. Currently<br>operating propiedash(8), opennodo(5).</div>
  </div>`
},
{
  id:'c10', name:'Windows 95', cat:'retro', feas:'yes',
  blurb:'A desktop of draggable-looking windows, one per venture.',
  tags:['chrome','nostalgia'],
  css:`
  #c10 .cv{background:#008080;padding:10px;position:relative;font:10px Tahoma,sans-serif}
  #c10 .w{position:absolute;background:#c0c0c0;border:2px outset #fff;width:150px;animation:c10p 5s ease-in-out infinite}
  #c10 .tb{background:#000080;color:#fff;padding:2px 4px;font-weight:700;display:flex;justify-content:space-between}
  #c10 .ct{padding:7px;color:#000;line-height:1.5}
  #c10 .x{background:#c0c0c0;color:#000;width:12px;text-align:center;border:1px outset #fff}
  #c10 .tbar{position:absolute;left:0;right:0;bottom:0;height:22px;background:#c0c0c0;border-top:2px outset #fff;display:flex;align-items:center;padding:0 4px}
  #c10 .start{background:#c0c0c0;border:2px outset #fff;padding:1px 7px;font-weight:700}
  @keyframes c10p{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`,
  html:`<div class="cv">
    <div class="w" style="left:14px;top:12px"><div class="tb"><span>propiedash.exe</span><span class="x">×</span></div><div class="ct">2,122 listings<br>17 estados</div></div>
    <div class="w" style="left:120px;top:74px;animation-delay:.7s"><div class="tb"><span>opennodo.exe</span><span class="x">×</span></div><div class="ct">2,870 places<br>open data</div></div>
    <div class="tbar"><span class="start">Start</span></div>
  </div>`
},
{
  id:'c11', name:'CRT Terminal', cat:'retro', feas:'yes',
  blurb:'Phosphor glow, scanlines, and a slight barrel curve.',
  tags:['scanlines','glow','vintage'],
  css:`
  #c11 .cv{background:#050d05;position:relative;overflow:hidden;padding:20px;font:12px/1.9 ui-monospace;color:#5cff8f}
  #c11 .cv::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.5) 0 1px,transparent 1px 3px);pointer-events:none}
  #c11 .sw{position:absolute;left:0;right:0;height:36px;background:rgba(92,255,143,.06);animation:c11s 4s linear infinite}
  #c11 span{text-shadow:0 0 7px #5cff8f}
  @keyframes c11s{from{top:-40px}to{top:110%}}`,
  html:`<div class="cv"><div class="sw"></div>
    <div><span>&gt; WHO IS THIS</span></div>
    <div><span>RODRIGO CASANOVA-ALEMAN</span></div>
    <div><span>FOUNDER / BUILDER</span></div>
    <div><span>&gt; STATUS ......... SHIPPING</span></div>
  </div>`
},
{
  id:'c12', name:'Teletext', cat:'retro', feas:'yes',
  blurb:'80s broadcast text pages. Chunky, colourful, unmistakable.',
  tags:['blocky','colour-coded'],
  css:`
  #c12 .cv{background:#000;padding:14px;font:700 12px/1.75 ui-monospace}
  #c12 .y{color:#ff0}#c12 .c{color:#0ff}#c12 .g{color:#0f0}#c12 .w{color:#fff}#c12 .m{color:#f0f}
  #c12 .hd{background:#00f;color:#fff;padding:2px 6px;display:flex;justify-content:space-between}
  #c12 .bl{display:inline-block;width:10px;height:12px;background:#C7FF02;animation:blink 1s steps(2) infinite;vertical-align:-2px}`,
  html:`<div class="cv">
    <div class="hd"><span>RSCAV 100</span><span>PAGE 1/4</span></div>
    <div class="y">RODRIGO CASANOVA-ALEMAN</div>
    <div class="c">FOUNDER AND BUILDER</div>
    <div class="g">PROPIEDASH .......... LIVE</div>
    <div class="m">OPENNODO ............ ALPHA</div>
    <div class="w">STUDIO .............. OPEN <span class="bl"></span></div>
  </div>`
},
{
  id:'c13', name:'Oscilloscope', cat:'generative', feas:'yes',
  blurb:'Your commit rhythm as a live waveform on lab glass.',
  tags:['SVG path','signal'],
  css:`
  #c13 .cv{background:#04120c;position:relative;padding:10px}
  #c13 svg{width:100%;height:100%}
  #c13 .grid line{stroke:#0d3a25;stroke-width:.6}
  #c13 .wv{fill:none;stroke:#3dff9e;stroke-width:2;filter:drop-shadow(0 0 4px #3dff9e);
    stroke-dasharray:900;stroke-dashoffset:900;animation:c13d 3.5s linear infinite}
  #c13 .lb{font:9px ui-monospace;fill:#3dff9e;opacity:.75}
  @keyframes c13d{to{stroke-dashoffset:0}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 240">
    <g class="grid">${Array.from({length:9},(_,i)=>`<line x1="${i*50}" y1="0" x2="${i*50}" y2="240"/>`).join('')}
    ${Array.from({length:6},(_,i)=>`<line x1="0" y1="${i*48}" x2="400" y2="${i*48}"/>`).join('')}</g>
    <path class="wv" d="M0 120 Q20 118 30 116 T70 112 Q95 108 110 70 T150 118 Q175 122 190 40 T235 116 Q260 120 275 96 T320 118 Q350 122 400 118"/>
    <text class="lb" x="8" y="18">COMMITS/DAY</text><text class="lb" x="330" y="232">518 PEAK</text>
  </svg></div>`
},
{
  id:'c14', name:'Blueprint', cat:'editorial', feas:'yes',
  blurb:'Architectural drafting: your stack drawn as a technical elevation.',
  tags:['line art','draw-on'],
  css:`
  #c14 .cv{background:#0d2b52;padding:14px;position:relative}
  #c14 svg{width:100%;height:100%}
  #c14 .ln{stroke:#9fc6ff;stroke-width:1.2;fill:none;stroke-dasharray:400;stroke-dashoffset:400;animation:c14d 4s ease forwards infinite}
  #c14 .dim{stroke:#5f9de0;stroke-width:.7;stroke-dasharray:3 3}
  #c14 text{font:8px ui-monospace;fill:#9fc6ff;letter-spacing:1px}
  #c14 .ti{font:700 11px Inter;fill:#fff}
  @keyframes c14d{0%{stroke-dashoffset:400}60%,100%{stroke-dashoffset:0}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 240">
    ${[[40,150,60,'PD'],[115,110,55,'ON'],[185,130,50,'ST'],[248,170,45,'GR'],[305,185,42,'PK']]
      .map(([x,y,w,l],i)=>`<rect class="ln" style="animation-delay:${i*.25}s" x="${x}" y="${y}" width="${w}" height="${215-y}"/>
      <text x="${x+6}" y="${y-6}">${l}</text>`).join('')}
    <line class="dim" x1="30" y1="222" x2="370" y2="222"/>
    <text x="30" y="234">SCALE 1:1 · RSCAV STACK ELEVATION</text>
    <text class="ti" x="30" y="30">CASANOVA-ALEMAN</text>
  </svg></div>`
},
{
  id:'c15', name:'Punch Card', cat:'retro', feas:'yes',
  blurb:'An IBM punch card encoding your name, holes and all.',
  tags:['grid','tactile'],
  css:`
  #c15 .cv{background:#1a1a17;display:grid;place-items:center;padding:14px}
  #c15 .pc{background:#e8dfc0;width:100%;aspect-ratio:16/7;position:relative;padding:9px;
    clip-path:polygon(0 12%,4% 0,100% 0,100% 100%,0 100%)}
  #c15 .g{display:grid;grid-template-columns:repeat(28,1fr);gap:2px;height:100%}
  #c15 i{background:#cfc6a6;border-radius:1px}
  #c15 i.p{background:#1a1a17;animation:c15p .4s ease backwards}
  #c15 .t{position:absolute;top:3px;left:26px;font:700 8px ui-monospace;color:#5a5340;letter-spacing:3px}
  @keyframes c15p{from{transform:scaleY(0)}to{transform:scaleY(1)}}`,
  html:`<div class="cv"><div class="pc"><div class="t">RODRIGO CASANOVA-ALEMAN</div>
    <div class="g">${Array.from({length:28*7},(_,i)=>{const p=(i*13)%11<3;return `<i class="${p?'p':''}" style="animation-delay:${(i%28)*.03}s"></i>`}).join('')}</div>
  </div></div>`
},
{
  id:'c16', name:'ASCII Portrait', cat:'generative', feas:'yes',
  blurb:'Your face (or your city) rendered in density-ramped ASCII.',
  tags:['monospace art','dither'],
  css:`
  #c16 .cv{background:#08090c;padding:10px;font:7px/1 ui-monospace;color:#C7FF02;letter-spacing:.5px;overflow:hidden}
  #c16 pre{margin:0;animation:c16f 5s ease-in-out infinite}
  @keyframes c16f{0%,100%{opacity:.55}50%{opacity:1}}`,
  html:`<div class="cv"><pre>${
    Array.from({length:22},(_,r)=>Array.from({length:78},(_,c)=>{
      const d=Math.sin(c/9+r/4)*Math.cos(r/6)+Math.sin((c+r)/7)
      return ' .:-=+*#%@'[Math.max(0,Math.min(9,Math.floor((d+2)*2.4)))]
    }).join('')).join('\n')}</pre></div>`
},
{
  id:'c17', name:'Diff View', cat:'terminal', feas:'yes',
  blurb:'Your year as a pull request diff. Red what you dropped, green what you shipped.',
  tags:['diff fence','native colour'],
  css:`
  #c17 .cv{background:#0d1117;padding:14px;font:10.5px/1.85 ui-monospace}
  #c17 .a{color:#7ee787;background:rgba(46,160,67,.16);display:block;padding:0 6px}
  #c17 .d{color:#ffa198;background:rgba(248,81,73,.14);display:block;padding:0 6px}
  #c17 .h{color:#a5a5ff;display:block;padding:0 6px}
  #c17 .a,#c17 .d{animation:c17s .35s ease backwards}`,
  html:`<div class="cv">
    <span class="h">@@ 2025 → 2026 @@</span>
    ${[['d','- student who mostly read about it',0],['a','+ founder, shipping daily',.2],
       ['a','+ propiedash live in venezuela',.4],['a','+ opennodo: 2,870 places, open',.6],
       ['d','- 18 contributions all year',.8],['a','+ 5,154 contributions',1]]
      .map(([c,t,d])=>`<span class="${c}" style="animation-delay:${d}s">${t}</span>`).join('')}
  </div>`
},
]
