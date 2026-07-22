// Concepts 35-50: games, playable, generative, editorial, product.

export const C = [
{
  id:'c35', name:'Playable Chess', cat:'game', feas:'yes',
  blurb:'Visitors move by opening a prefilled issue. An Action replies with the board.',
  tags:['issue-driven','genuinely playable'],
  css:`
  #c35 .cv{background:#161512;display:grid;place-items:center;padding:12px}
  #c35 .bd{display:grid;grid-template-columns:repeat(8,1fr);width:min(100%,180px);aspect-ratio:1;border:3px solid #3b3730}
  #c35 .sq{display:grid;place-items:center;font-size:13px;line-height:1}
  #c35 .lt{background:#e9e2cf}#c35 .dk{background:#7d8a5c}
  #c35 .hl{background:#C7FF02;animation:c35h 2s ease-in-out infinite}
  @keyframes c35h{0%,100%{opacity:1}50%{opacity:.45}}`,
  html:`<div class="cv"><div class="bd">
    ${Array.from({length:64},(_,i)=>{
      const r=Math.floor(i/8),c=i%8,dk=(r+c)%2
      const back=['♜','♞','♝','♛','♚','♝','♞','♜'], pawn='♟'
      let p=''
      if(r===0)p=back[c]; if(r===1)p=pawn; if(r===6)p='♙'; if(r===7)p=['♖','♘','♗','♕','♔','♗','♘','♖'][c]
      const hl=(i===52||i===36)
      return `<div class="sq ${hl?'hl':dk?'dk':'lt'}">${p}</div>`}).join('')}
  </div></div>`
},
{
  id:'c36', name:'Snake', cat:'game', feas:'yes',
  blurb:'A snake that eats your contribution squares and grows all year.',
  tags:['classic','looping'],
  css:`
  #c36 .cv{background:#0d1117;display:grid;place-items:center;padding:14px}
  #c36 .g{display:grid;grid-template-columns:repeat(26,1fr);gap:3px;width:100%}
  #c36 i{aspect-ratio:1;background:#161b22;border-radius:2px}
  #c36 i.f{background:#2c4a12}
  #c36 i.s{background:#C7FF02;animation:c36e 4s linear infinite}
  @keyframes c36e{0%,100%{opacity:1}50%{opacity:.35}}`,
  html:`<div class="cv"><div class="g">
    ${(()=>{
      const COLS=26, ROWS=7
      const body=new Set()
      // an explicit S: across row 2, down, back across row 4
      for(let c=6;c<=18;c++) body.add(2*COLS+c)
      for(let r=2;r<=4;r++)  body.add(r*COLS+18)
      for(let c=11;c<=18;c++) body.add(4*COLS+c)
      return Array.from({length:COLS*ROWS},(_,i)=>{
        const col=i%COLS
        const isBody=body.has(i), isFood=!isBody&&((i*29)%17)===0
        return `<i class="${isBody?'s':isFood?'f':''}" style="animation-delay:${(col*.05).toFixed(2)}s"></i>`
      }).join('')})()}
  </div></div>`
},
{
  id:'c37', name:'RPG Overworld', cat:'game', feas:'hard',
  blurb:'A Pokémon-style map where each building is a venture you can enter.',
  tags:['pixel','tilemap'],
  css:`
  #c37 .cv{background:#5aa93f;position:relative;image-rendering:pixelated}
  #c37 .t{position:absolute;width:12.5%;height:16.6%}
  #c37 .h{background:#c8553d;border:2px solid #7a2f22}
  #c37 .h::after{content:'';position:absolute;left:30%;top:52%;width:40%;height:48%;background:#3a1d16}
  #c37 .tr{background:#2f7d32;border-radius:50%}
  #c37 .pl{background:#ffe08a;border:2px solid #b07d1a;border-radius:3px;animation:c37w 3s steps(4) infinite}
  #c37 .lb{position:absolute;font:700 7px Inter;color:#fff;text-shadow:1px 1px 0 #000}
  @keyframes c37w{0%{transform:translate(0,0)}25%{transform:translate(26px,0)}50%{transform:translate(26px,22px)}75%{transform:translate(0,22px)}}`,
  html:`<div class="cv">
    ${[[6,10],[70,10],[38,52],[6,66],[74,60]].map(([l,t])=>`<div class="t h" style="left:${l}%;top:${t}%"></div>`).join('')}
    ${[[26,32],[54,26],[22,84],[62,84],[88,40]].map(([l,t])=>`<div class="t tr" style="left:${l}%;top:${t}%;width:7%;height:10%"></div>`).join('')}
    <div class="t pl" style="left:42%;top:30%;width:6%;height:9%"></div>
    <div class="lb" style="left:6%;top:4%">PROPIEDASH</div><div class="lb" style="left:70%;top:4%">OPENNODO</div>
    <div class="lb" style="left:34%;top:46%">STUDIO</div>
  </div>`
},
{
  id:'c38', name:'Arcade High Scores', cat:'game', feas:'yes',
  blurb:'A cabinet leaderboard where the scores are your real stats.',
  tags:['blink','CRT'],
  css:`
  #c38 .cv{background:#0a0018;padding:14px;font:11px/1.9 ui-monospace;color:#ff2fd0;text-align:center}
  #c38 h4{color:#ffe600;font:700 13px ui-monospace;letter-spacing:3px;animation:blink 1.4s steps(2) infinite;margin-bottom:8px}
  #c38 .r{display:grid;grid-template-columns:26px 1fr 74px;gap:8px;text-align:left;color:#4dffd5}
  #c38 .r span:last-child{text-align:right;color:#fff}
  #c38 .ins{color:#ffe600;margin-top:8px;font-size:9px;animation:blink 1.1s steps(2) infinite}`,
  html:`<div class="cv"><h4>HIGH SCORES</h4>
    ${[['1ST','CONTRIBUTIONS','5154'],['2ND','ACTIVE DAYS','0090'],['3RD','PEAK DAY','0518'],['4TH','STREAK','0014']]
      .map(([a,b,c])=>`<div class="r"><span>${a}</span><span>${b}</span><span>${c}</span></div>`).join('')}
    <div class="ins">PUSH START</div>
  </div>`
},
{
  id:'c39', name:'Tamagotchi', cat:'game', feas:'hard',
  blurb:'A pet that is fed by your commits and sulks when you stop shipping.',
  tags:['pixel pet','state'],
  css:`
  #c39 .cv{background:#c3d94e;display:grid;place-items:center}
  #c39 .dev{background:#6b8f22;border-radius:44% 44% 46% 46%;padding:22px 26px;box-shadow:inset 0 0 0 3px #4e6b16}
  #c39 .scr{background:#a9c14a;width:98px;height:70px;border:3px solid #3f5411;display:grid;place-items:center;position:relative}
  #c39 .pet{width:26px;height:26px;background:#22300a;animation:c39h 1.4s steps(2) infinite;
    clip-path:polygon(25% 0,75% 0,100% 25%,100% 75%,75% 100%,25% 100%,0 75%,0 25%)}
  #c39 .hp{position:absolute;top:5px;left:6px;font:700 7px ui-monospace;color:#22300a}
  @keyframes c39h{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`,
  html:`<div class="cv"><div class="dev"><div class="scr">
    <div class="hp">♥♥♥♥ 5154</div><div class="pet"></div>
  </div></div></div>`
},
{
  id:'c40', name:'Trading Cards', cat:'game', feas:'yes',
  blurb:'Each venture as a collectible card with stats and a rarity foil.',
  tags:['cards','hover-ish'],
  css:`
  #c40 .cv{background:#0f1420;display:flex;gap:9px;align-items:center;justify-content:center;padding:14px}
  #c40 .cd{width:29%;aspect-ratio:2/3;border-radius:7px;padding:8px;background:#182036;border:1.4px solid #2c3a5c;
    display:flex;flex-direction:column;justify-content:space-between;animation:c40f 4s ease-in-out infinite}
  #c40 .cd:nth-child(2){animation-delay:.4s}#c40 .cd:nth-child(3){animation-delay:.8s}
  #c40 .cd.r{border-color:#C7FF02;background:#1d2a1a}
  #c40 .nm{font:800 9px Inter;color:#fff;letter-spacing:.3px}
  #c40 .ty{font:600 6px Inter;color:#7f8fb0;letter-spacing:1.2px}
  #c40 .st{font:700 15px Inter;color:#C7FF02}
  #c40 .sl{font:600 6px Inter;color:#7f8fb0;letter-spacing:1px}
  @keyframes c40f{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-6px) rotate(-1.2deg)}}`,
  html:`<div class="cv">
    ${[['PROPIEDASH','MARKETPLACE','2122','LISTINGS',true],['OPENNODO','STANDARD','2870','PLACES',false],['STUDIO','SERVICE','7','SHIPPED',false]]
      .map(([n,t,s,l,r])=>`<div class="cd ${r?'r':''}"><div><div class="ty">${t}</div><div class="nm">${n}</div></div>
        <div><div class="st">${s}</div><div class="sl">${l}</div></div></div>`).join('')}
  </div>`
},
{
  id:'c41', name:'Newspaper', cat:'editorial', feas:'yes',
  blurb:'A broadsheet front page. Your year as the headline story.',
  tags:['print','columns'],
  css:`
  #c41 .cv{background:#f4f1e8;padding:12px 14px;color:#15150f;font-family:Georgia,serif}
  #c41 .mh{text-align:center;border-bottom:2.5px solid #15150f;padding-bottom:4px;margin-bottom:6px}
  #c41 .mh b{font:800 19px Georgia;letter-spacing:2px}
  #c41 .dl{font:9px Georgia;display:flex;justify-content:space-between;border-bottom:1px solid #15150f;padding-bottom:3px;margin-bottom:7px}
  #c41 h3{font:800 16px/1.1 Georgia;margin-bottom:5px}
  #c41 .cols{column-count:3;column-gap:9px;column-rule:1px solid #cdc7b4;font:8px/1.5 Georgia;text-align:justify}
  #c41 .cols::first-letter{font-size:20px;float:left;line-height:.9;padding-right:3px;font-weight:800}`,
  html:`<div class="cv">
    <div class="mh"><b>THE CASANOVA-ALEMAN</b></div>
    <div class="dl"><span>CARACAS · GAINESVILLE</span><span>VOL. XXVI</span><span>2026</span></div>
    <h3>Builder Ships 5,154 Contributions In A Single Year</h3>
    <div class="cols">From nothing in August to more than two thousand in a single month, a marketplace went live across Venezuela and an open place standard shipped alongside it. Observers noted the ninety active days, the fourteen day streak, and one afternoon in June that alone accounted for five hundred and eighteen. The studio remains open for commissions.</div>
  </div>`
},
{
  id:'c42', name:'Swiss Poster', cat:'editorial', feas:'yes',
  blurb:'International Typographic Style. Grid, Helvetica logic, one bold diagonal.',
  tags:['typography','restraint'],
  css:`
  #c42 .cv{background:#f2f2ef;position:relative;overflow:hidden;padding:16px}
  #c42 .di{position:absolute;right:-14%;top:-24%;width:66%;aspect-ratio:1;background:#C7FF02;transform:rotate(24deg);
    animation:c42r 8s ease-in-out infinite}
  #c42 .n{position:relative;font:800 34px/.9 Inter;letter-spacing:-2.2px;color:#111}
  #c42 .s{position:relative;font:600 9px Inter;letter-spacing:3.4px;color:#111;margin-top:10px}
  #c42 .ft{position:absolute;left:16px;bottom:14px;font:600 8px Inter;letter-spacing:2px;color:#111}
  #c42 .rule{position:absolute;left:16px;right:16px;top:52%;height:2px;background:#111}
  @keyframes c42r{0%,100%{transform:rotate(24deg) scale(1)}50%{transform:rotate(30deg) scale(1.06)}}`,
  html:`<div class="cv"><div class="di"></div>
    <div class="n">RODRIGO<br>CASANOVA<br>ALEMAN</div>
    <div class="s">FOUNDER · BUILDER</div><div class="rule"></div>
    <div class="ft">PROPIEDASH / OPENNODO / STUDIO</div>
  </div>`
},
{
  id:'c43', name:'Museum Placard', cat:'editorial', feas:'yes',
  blurb:'Gallery wall label treatment. Quiet, confident, expensive-looking.',
  tags:['minimal','restraint'],
  css:`
  #c43 .cv{background:#e8e6df;display:grid;place-items:center;padding:20px}
  #c43 .pl{background:#faf9f6;padding:18px 22px;border-left:3px solid #C7FF02;width:100%}
  #c43 .a{font:700 13px Inter;color:#15150f;letter-spacing:-.3px}
  #c43 .d{font:9px Inter;color:#6a685e;margin:2px 0 9px}
  #c43 .t{font:italic 600 14px Georgia;color:#15150f}
  #c43 .m{font:9px/1.6 Inter;color:#6a685e;margin-top:8px}
  #c43 .pl{animation:c43f 5s ease-in-out infinite}
  @keyframes c43f{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`,
  html:`<div class="cv"><div class="pl">
    <div class="a">Rodrigo Casanova-Aleman</div>
    <div class="d">Venezuelan, b. Caracas. Active 2026–</div>
    <div class="t">Propiedash, OpenNodo, and Other Works</div>
    <div class="m">TypeScript, Postgres, ordered dither on navy.<br>5,154 contributions. Collection of the artist.</div>
  </div></div>`
},
{
  id:'c44', name:'Receipt', cat:'editorial', feas:'yes',
  blurb:'A thermal-printer receipt itemising everything you shipped.',
  tags:['object','monospace'],
  css:`
  #c44 .cv{background:#1a1a1a;display:grid;place-items:center;padding:10px}
  #c44 .rc{background:#fffdf7;width:66%;padding:12px 14px;font:9px/1.6 ui-monospace;color:#1a1a1a;
    clip-path:polygon(0 0,100% 0,100% 97%,94% 100%,88% 97%,82% 100%,76% 97%,70% 100%,64% 97%,58% 100%,52% 97%,46% 100%,40% 97%,34% 100%,28% 97%,22% 100%,16% 97%,10% 100%,4% 97%,0 100%);
    animation:c44p 6s ease-in-out infinite}
  #c44 .c{text-align:center}#c44 .rw{display:flex;justify-content:space-between}
  #c44 hr{border:0;border-top:1px dashed #999;margin:5px 0}
  #c44 .tot{font-weight:700}
  @keyframes c44p{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`,
  html:`<div class="cv"><div class="rc">
    <div class="c"><b>RSCAV</b><br>CARACAS · GNV</div><hr>
    ${[['PROPIEDASH','2122'],['OPENNODO','2870'],['STUDIO','7'],['GRADVISR','1'],['PINKS','1']]
      .map(([a,b])=>`<div class="rw"><span>${a}</span><span>${b}</span></div>`).join('')}
    <hr><div class="rw tot"><span>CONTRIBUTIONS</span><span>5154</span></div>
    <div class="c" style="margin-top:6px">*** ALWAYS FORWARD ***</div>
  </div></div>`
},
{
  id:'c45', name:'Product Showcase', cat:'product', feas:'yes',
  blurb:'Live screenshots in browser chrome. What is on your profile right now.',
  tags:['real UI','shipped'],
  css:`
  #c45 .cv{background:#121827;padding:14px;display:grid;grid-template-columns:1fr 1.25fr;gap:12px;align-items:center}
  #c45 .t{font:800 20px Inter;color:#fff;letter-spacing:-.8px}
  #c45 .eb{display:inline-block;background:#C7FF02;color:#0a0a0a;font:800 7px Inter;letter-spacing:2px;padding:3px 6px;margin-bottom:7px}
  #c45 .tg{font:9px Inter;color:#aeb2c0;margin-top:4px}
  #c45 .lk{font:700 8px Inter;color:#C7FF02;margin-top:8px}
  #c45 .win{border:1px solid #2a3350;border-radius:7px;overflow:hidden;background:#0a0f19;animation:c45f 5s ease-in-out infinite}
  #c45 .bar{height:15px;background:#1b2338;display:flex;align-items:center;gap:3px;padding:0 6px}
  #c45 .bar i{width:4px;height:4px;border-radius:50%;background:#3a4358}
  #c45 .sc{height:74px;background:linear-gradient(#C7FF02 0 12%,#2b3a55 12% 100%)}
  @keyframes c45f{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`,
  html:`<div class="cv">
    <div><span class="eb">THE MAIN THING</span><div class="t">Propiedash</div>
      <div class="tg">The real-estate marketplace for Venezuela.</div><div class="lk">propiedash.com →</div></div>
    <div class="win"><div class="bar"><i></i><i></i><i></i></div><div class="sc"></div></div>
  </div>`
},
{
  id:'c46', name:'Constellation', cat:'generative', feas:'yes',
  blurb:'Particles that drift and briefly connect into your initials.',
  tags:['particles','network'],
  css:`
  #c46 .cv{background:#05070f;position:relative;overflow:hidden}
  #c46 svg{width:100%;height:100%}
  #c46 line{stroke:#C7FF02;stroke-width:.5;opacity:.3;animation:c46l 5s ease-in-out infinite}
  #c46 circle{fill:#C7FF02;animation:c46p 5s ease-in-out infinite}
  @keyframes c46p{0%,100%{opacity:.35;r:1.4}50%{opacity:1;r:2.2}}
  @keyframes c46l{0%,100%{opacity:.08}50%{opacity:.4}}`,
  html:`<div class="cv"><svg viewBox="0 0 400 230">
    ${(()=>{const pts=Array.from({length:26},(_,i)=>[40+((i*61)%330),30+((i*97)%170)])
      let out=''
      pts.forEach((p,i)=>{const q=pts[(i+5)%26];out+=`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" style="animation-delay:${(i%7)*.4}s"/>`})
      pts.forEach((p,i)=>{out+=`<circle cx="${p[0]}" cy="${p[1]}" r="1.8" style="animation-delay:${(i%9)*.32}s"/>`})
      return out})()}
  </svg></div>`
},
{
  id:'c47', name:'Dither Portrait', cat:'generative', feas:'yes',
  blurb:'A halftone portrait of Caracas that resolves out of pure dot noise.',
  tags:['Bayer','photographic'],
  css:`
  #c47 .cv{background:#0b0f18;display:grid;place-items:center;overflow:hidden}
  #c47 .g{display:grid;grid-template-columns:repeat(52,1fr);width:100%;height:100%}
  #c47 i{background:#C7FF02;animation:c47r 5s ease-in-out infinite}
  @keyframes c47r{0%,100%{opacity:var(--o0)}50%{opacity:var(--o1)}}`,
  html:`<div class="cv"><div class="g">
    ${Array.from({length:52*26},(_,i)=>{
      const x=i%52,y=Math.floor(i/52)
      const m=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]][y%4][x%4]/16
      const roof=[20,20,17,17,14,14,18,18,11,11,15,15,8,8,13,13,6,6,12,12,9,9,4,4,10,10,7,7,12,12,15,15,11,11,16,16,13,13,18,18,14,14,19,19,16,16,20,20,17,17,21,21][x]
      const shape=y>=roof?1:Math.max(0,1-(roof-y)/3)
      const v=shape>m?1:0
      return `<i style="--o0:${((i*13)%5)/9};--o1:${v};animation-delay:${(x*.03).toFixed(2)}s"></i>`}).join('')}
  </div></div>`
},
{
  id:'c48', name:'Weather Station', cat:'data', feas:'yes',
  blurb:'Live Caracas conditions, rebuilt hourly. The profile knows what day it is.',
  tags:['live data','cron'],
  css:`
  #c48 .cv{background:#101a2b;padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:center}
  #c48 .tm{font:800 40px Inter;color:#fff;letter-spacing:-2px;line-height:1}
  #c48 .pl{font:600 9px Inter;color:#7f95bd;letter-spacing:2px;margin-top:4px}
  #c48 .cd{font:11px Inter;color:#C7FF02;margin-top:8px}
  #c48 .sun{width:52px;height:52px;border-radius:50%;background:#C7FF02;position:relative;margin:0 auto;animation:c48p 4s ease-in-out infinite}
  #c48 .cl{position:absolute;width:64px;height:22px;background:#33456b;border-radius:14px;top:36px;left:-14px;animation:c48d 7s ease-in-out infinite}
  @keyframes c48p{0%,100%{transform:scale(1)}50%{transform:scale(1.09)}}
  @keyframes c48d{0%,100%{transform:translateX(0)}50%{transform:translateX(14px)}}`,
  html:`<div class="cv">
    <div><div class="tm">24°</div><div class="pl">CARACAS · 1,000 M</div><div class="cd">Shipping weather</div></div>
    <div style="position:relative"><div class="sun"></div><div class="cl"></div></div>
  </div>`
},
{
  id:'c49', name:'Now Playing', cat:'generative', feas:'yes',
  blurb:'A Spotify-style bar with an equaliser that actually moves.',
  tags:['live-ish','equaliser'],
  css:`
  #c49 .cv{background:#0b0b0b;display:grid;place-items:center;padding:16px}
  #c49 .bar{background:#151515;border-radius:9px;padding:10px 12px;display:flex;gap:11px;align-items:center;width:100%}
  #c49 .art{width:40px;height:40px;border-radius:5px;background:#C7FF02;display:grid;place-items:center;font:800 15px Inter;color:#0a0a0a}
  #c49 .tt{font:700 11px Inter;color:#fff}
  #c49 .sb{font:9px Inter;color:#8a8a8a}
  #c49 .eq{display:flex;gap:2.5px;align-items:flex-end;height:22px;margin-left:auto}
  #c49 .eq i{width:3px;background:#C7FF02;animation:c49e .9s ease-in-out infinite alternate}
  @keyframes c49e{from{height:12%}to{height:100%}}`,
  html:`<div class="cv"><div class="bar">
    <div class="art">P</div>
    <div><div class="tt">Building Propiedash</div><div class="sb">Rodrigo Casanova-Aleman · on repeat</div></div>
    <div class="eq">${Array.from({length:9},(_,i)=>`<i style="animation-delay:${(i*.11).toFixed(2)}s"></i>`).join('')}</div>
  </div></div>`
},
{
  id:'c50', name:'The Interactive Skyline', cat:'product', feas:'yes',
  blurb:'Seven towers flush against each other, each its own link. Real interactivity.',
  tags:['clickable','seamless'],
  css:`
  #c50 .cv{background:#121827;display:flex;align-items:flex-end;padding-bottom:24px;position:relative}
  #c50 a{flex:1;display:block;position:relative;transition:none}
  #c50 .tw{background:#0a0f19;border-top:2px solid #C7FF02;position:relative;
    background-image:radial-gradient(#C7FF02 22%,transparent 23%);background-size:9px 11px;background-position:4px 6px}
  #c50 .lb{position:absolute;left:0;right:0;bottom:-19px;text-align:center;font:700 6px Inter;color:#aeb2c0;letter-spacing:.8px}
  #c50 a:hover .tw{background-color:#16203a}
  #c50 a:hover .lb{color:#C7FF02}`,
  html:`<div class="cv">
    ${[['PROPIEDASH',96],['OPENNODO',62],['STUDIO',58],['GRADVISR',41],['PINKS',37],['HIM',29],['YNTEGRA',25]]
      .map(([n,h])=>`<a href="#"><div class="tw" style="height:${h}px"></div><div class="lb">${n}</div></a>`).join('')}
  </div>`
},
]
