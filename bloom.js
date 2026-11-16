/* Pixel garden editor: short-stemmed plants, flexible scenes and a small, clear seed tray. */
(()=>{'use strict';
  const host=document.getElementById('bloom-exhibit'),flowers=window.flowerData,art=window.FlowerArt;
  if(!host||!Array.isArray(flowers)||!art)return;

  const colorways=[
    {name:'Байгалийн',swatch:'conic-gradient(#f5c943 0 25%,#ee78b8 25% 50%,#6588ff 50% 75%,#d8435d 75%)',variant:0},
    {name:'Ягаан',swatch:'#ee78b8',variant:1},
    {name:'Цэнхэр',swatch:'#6588ff',variant:2},
    {name:'Нарлаг',swatch:'#f6a554',variant:3},
    {name:'Нил',swatch:'#bd8af1',variant:4},
    {name:'Улаан',swatch:'#d8435d',variant:5},
    {name:'Цайвар',swatch:'#f1e9d3',variant:6},
    {name:'Оюу',swatch:'#55b7a5',variant:7},
    {name:'Шүрэн',swatch:'#ed9278',variant:8},
    {name:'Шаргал',swatch:'#efc943',variant:9}
  ];
  const scenes={
    bed:{name:'Хөрст мандал',kind:'bed',sky:'#cfe0dd',sun:'#f6cc71',ground:`
      <path d="M0 334h360v146H0z" fill="#557448"/>
      <path d="M0 346h360v134H0z" fill="#73543d"/>
      <path d="M0 360h360v8H0z" fill="#846344"/>
      <path d="M0 407h360v7H0zM0 454h360v7H0z" fill="#674a35"/>
      <path d="M12 345h336v8H12zM12 469h336v7H12zM0 354h12v116H0zM348 354h12v116h-12z" fill="#af8960"/>
      <path d="M12 353h336v4H12zM12 464h336v4H12z" fill="#d5ad78"/>
      <path d="M24 376h28v3H24zM93 431h20v3H93zM216 382h25v3h-25zM289 440h32v3h-32z" fill="#8e684a" opacity=".9"/>`},
    meadow:{name:'Зөөлөн нуга',kind:'meadow',sky:'#c0dce4',sun:'#ffcf74',ground:`
      <path d="M0 333q65-14 128 1t125-1 107-1v148H0z" fill="#64885c"/>
      <path d="M0 359q62-17 129 0t125 0 106-2v123H0z" fill="#71503a"/>
      <path d="M0 359q60-15 129 0t125 0 106-2v9q-52 8-106 3t-125 0-129 1z" fill="#8ca66e"/>
      <g fill="#a5bd7f"><rect x="22" y="347" width="4" height="12"/><rect x="64" y="351" width="4" height="10"/><rect x="310" y="350" width="4" height="12"/><rect x="280" y="353" width="3" height="8"/></g>
      <g fill="#f0c66b"><rect x="42" y="348" width="5" height="5"/><rect x="297" y="345" width="5" height="5"/><rect x="327" y="354" width="4" height="4"/></g>`},
    patio:{name:'Шавар ваартай',kind:'patio',sky:'#dfd6c5',sun:'#e9b65e',ground:`
      <path d="M0 337h360v143H0z" fill="#bda68a"/>
      <path d="M0 347h360v7H0z" fill="#d1bea2"/>
      <path d="M18 374h324v5H18zM18 423h324v5H18zM18 471h324v5H18z" fill="#aa9277" opacity=".6"/>
      <path d="M55 356v124M150 356v124M250 356v124" stroke="#b09a7f" stroke-width="3" opacity=".55"/>`},
    dusk:{name:'Үдшийн цэцэрлэг',kind:'dusk',sky:'#718697',sun:'#ffd58e',ground:`
      <path d="M0 334h360v146H0z" fill="#445d49"/>
      <path d="M0 347h360v133H0z" fill="#514438"/>
      <path d="M0 352h360v7H0z" fill="#71865a"/>
      <path d="M0 405h360v6H0zM0 454h360v6H0z" fill="#403a34"/>
      <path d="M12 345h336v8H12zM12 470h336v7H12zM0 353h12v117H0zM348 353h12v117h-12z" fill="#8d785e"/>`
    },
    woodland:{name:'Ойн зах',kind:'woodland',sky:'#bdd2c1',sun:'#eee0a4',ground:`
      <path d="M0 332h360v148H0z" fill="#617b59"/>
      <path d="M0 350q62-10 125 1t122-1 113 0v130H0z" fill="#5b4637"/>
      <path d="M0 350q62-10 125 1t122-1 113 0v12q-58 5-113 1t-122 0-125 2z" fill="#83996b"/>
      <g fill="#71865e"><ellipse cx="52" cy="373" rx="23" ry="6"/><ellipse cx="298" cy="387" rx="28" ry="7"/><ellipse cx="116" cy="453" rx="21" ry="5"/></g>
      <g fill="#c49a69"><rect x="49" y="370" width="9" height="3"/><rect x="290" y="384" width="12" height="3"/><rect x="108" y="451" width="8" height="3"/></g>`},
    rockery:{name:'Чулуурхаг хөрс',kind:'rockery',sky:'#d8d4c0',sun:'#f0c875',ground:`
      <path d="M0 333h360v147H0z" fill="#827e63"/>
      <path d="M0 349h360v131H0z" fill="#80604a"/>
      <path d="M0 349h360v8H0z" fill="#b1a47f"/>
      <g fill="#a9a48b"><path d="M18 356h37v14H18zM274 357h49v15h-49zM83 373h29v12H83zM205 365h36v13h-36z"/></g>
      <g fill="#d1c9aa"><rect x="24" y="358" width="15" height="3"/><rect x="283" y="359" width="21" height="3"/><rect x="89" y="375" width="12" height="3"/></g>
      <path d="M0 408h360v4H0zM0 454h360v4H0z" fill="#694e3d"/>`},
    pond:{name:'Нуурын эрэг',kind:'pond',sky:'#c8e0df',sun:'#f5d080',ground:`
      <path d="M0 333h360v147H0z" fill="#688864"/>
      <path d="M0 363q73-15 144 2t216-4v119H0z" fill="#6a8790"/>
      <path d="M0 363q73-15 144 2t216-4v10q-93 10-216-1T0 375z" fill="#91a78a"/>
      <g fill="#d2c28b"><ellipse cx="46" cy="376" rx="18" ry="5"/><ellipse cx="153" cy="390" rx="24" ry="5"/><ellipse cx="314" cy="376" rx="21" ry="6"/></g>
      <g stroke="#bad5d3" stroke-width="2" opacity=".75"><path d="M72 407h40M188 430h55M258 395h30"/></g>`}
  };
  const vases={
    berry:{name:'Тоосгон',fill:'#b65c62',light:'#e28b77',dark:'#783d43',rim:'#f0a18e',inside:'#573b3d'},
    cream:{name:'Шохойн',fill:'#d9caa7',light:'#f5e8c8',dark:'#a79777',rim:'#fff0d1',inside:'#4b3e34'},
    blue:{name:'Цэнхэр',fill:'#577f9c',light:'#94b6c9',dark:'#355970',rim:'#b5d5dc',inside:'#293f50'},
    sage:{name:'Ногоон',fill:'#6c987b',light:'#a5c79a',dark:'#456f5c',rim:'#c1d6a2',inside:'#2e4c42'}
  };
  const vaseShapes={
    round:{name:'Бөөрөнхий',widths:[42,39,43,53,63,70,72,72,68,62,57,51,47,44]},
    tapered:{name:'Нарийхан',widths:[42,40,40,44,51,58,60,59,57,54,50,48,45,42]}
  };
  const formNames={all:'Бүх хэлбэр',solitary:'Ганц том цэцэг',cluster:'Бөөгнөрөл',spike:'Түрүү хэлбэр',branching:'Мөчирлөсөн',rosette:'Навчны сарнай',cup:'Аяга хэлбэр'};
  const formOverrides={sunflower:'solitary',daisy:'solitary',tulip:'solitary',poppy:'solitary',dandelion:'solitary',rose:'solitary',lavender:'spike',lily:'solitary',iris:'solitary',lotus:'solitary',orchid:'cluster',bellflower:'cluster',hydrangea:'cluster',cosmos:'solitary',hibiscus:'solitary',peony:'solitary',carnation:'solitary',marigold:'solitary',sakura:'branching',snowdrop:'solitary',foxglove:'spike',pansy:'solitary',anemone:'solitary',magnolia:'solitary',passionflower:'branching',protea:'solitary',aquilegia:'solitary',poinsettia:'branching',lantana:'cluster',amaryllis:'cluster',morningglory:'solitary',nasturtium:'solitary',calendula:'solitary',forgetmenot:'cluster',bougainvillea:'cluster',helleborus:'solitary',sweetpea:'branching',fuchsia:'cluster'};
  const formOf=f=>f.form||formOverrides[f.id]||'solitary';
  const MAX_FLOWERS=12;
  let activeColorway=0,activeForm='all',vaseColor='berry',vaseShape='round',sceneId='bed',layoutMode='balanced',flowerScale=1,detailId=null,windEnabled=true,gardenSeed=1;
  let bouquet=[
    {id:'narcissus',variant:0},{id:'clematis',variant:2},{id:'allium',variant:4},
    {id:'echinacea',variant:1},{id:'plumeria',variant:6},{id:'calla',variant:0},
    {id:'strelitzia',variant:3},{id:'wisteria',variant:1}
  ];

  host.innerHTML=`
    <section class="garden-stage" data-scene="${sceneId}" aria-label="Цэцэг тарих интерактив талбай">
      <div class="garden-stage-meta"><span class="garden-label">✿ ТАНЫ ПИКСЕЛЭН ЦЭЦЭРЛЭГ</span><span class="garden-weather" id="garden-weather">Өглөөний зөөлөн гэрэл</span></div>
      <svg class="garden-scene" id="garden-scene" viewBox="0 0 360 480" role="group" aria-label="Хөрст мандал дээр ургасан пикселэн цэцгүүд">
        <title>Өөрийн цэцэрлэг</title>
        <rect id="scene-sky" width="360" height="480" fill="#cfe0dd"/>
        <circle id="scene-sun" cx="295" cy="74" r="24" fill="#f6cc71"/>
        <g fill="#f7f5e8" opacity=".8" aria-hidden="true"><rect x="46" y="91" width="38" height="7"/><rect x="56" y="84" width="23" height="7"/><rect x="193" y="137" width="31" height="6"/><rect x="200" y="131" width="18" height="6"/></g>
        <g id="scene-ground" aria-hidden="true"></g>
        <g id="bouquet-stems" aria-hidden="true"></g>
        <g id="scene-surface" aria-hidden="true"></g>
        <g id="bouquet-flowers"></g>
        <g id="bouquet-vase" aria-hidden="true"></g>
      </svg>
      <span class="garden-stage-note" id="bouquet-hint" role="status" aria-live="polite"></span>
    </section>
    <section class="garden-editor" aria-labelledby="bouquet-title">
      <div class="garden-editor-heading"><div><div class="garden-eyebrow">УРГА · НЭМ · ЗОХИО</div><h2 id="bouquet-title">Цэцэрлэгээ урлая.</h2></div><div class="garden-stats"><strong id="flower-total">${flowers.length}</strong><span>зурагдсан<br>цэцэг</span></div></div>
      <p class="garden-intro">Дэлхийн олон ургамлаас сэдэвлэсэн ${flowers.length} пикселэн цэцгээ хөрсөнд суулга. Талбайн төрх, цэцгийн өнгөө өөрчилж, хүссэнээ сугалан авч болно.</p>
      <div class="garden-scenes" role="group" aria-label="Цэцэрлэгийн орчин сонгох" id="garden-scenes"></div>
      <div class="garden-selection-head"><span id="bouquet-size" aria-live="polite"></span><div class="garden-selection-actions"><button class="garden-random" id="random-bouquet" type="button">✦ Санамсаргүй ургуулах</button><button class="garden-clear" id="clear-bouquet" type="button">Талбайг цэвэрлэх</button></div></div>
      <div class="garden-selected" id="bouquet-current" aria-label="Сонгосон цэцэгс"></div>
      <div class="garden-plant-controls">
        <div class="garden-color-block"><span class="garden-label-small">ШИНЭ ЦЭЦГИЙН ӨНГӨ</span><div class="garden-colors" id="colorways" role="group" aria-label="Цэцгийн өнгө сонгох"></div><button class="garden-secondary-action" id="recolor-bouquet" type="button">Байгаа цэцгийг энэ өнгөөр будах</button></div>
        <label class="garden-filter"><span class="garden-label-small">ХЭЛБЭРЭЭР ШҮҮХ</span><select id="flower-filter" aria-label="Цэцгийн хэлбэрээр шүүх"></select></label>
      </div>
      <div class="garden-customize">
        <label><span class="garden-label-small">ТАРИЛТЫН ХЭЛБЭР</span><select id="garden-layout"><option value="balanced">Тэнцвэртэй мөр</option><option value="wide">Өргөн дэлгэмэл</option><option value="compact">Нягт багц</option><option value="wild">Зэрлэг ургалт</option></select></label>
        <label><span class="garden-label-small">ТЭНГЭРЭЭ ӨНГӨЛӨХ</span><select id="garden-atmosphere"><option value="natural">Байгалийн өнгө</option><option value="sunset">Нар жаргах үе</option><option value="bluehour">Хөх туяа</option><option value="mint">Зөөлөн гаа</option></select></label>
        <label class="garden-scale"><span class="garden-label-small">ЦЭЦГИЙН ТОМ ЖИЖИГ · <output id="flower-scale-value">100%</output></span><input id="flower-scale" type="range" min="72" max="118" value="100" step="2"></label>
        <button class="garden-wind" id="garden-wind" type="button" aria-pressed="true">Салхи: асаалттай</button>
      </div>
      <label class="garden-search"><span class="garden-label-small">ЦЭЦГЭЭ ХАЙХ</span><input id="bouquet-search" type="search" autocomplete="off" placeholder="Жишээ: сарнай, Narcissus…"></label>
      <div class="garden-picker" id="bouquet-picker" role="group" aria-label="Талбайдаа тарих пикселэн цэцгүүд"></div>
      <p class="garden-count" id="bouquet-count" aria-live="polite"></p>
      <article class="garden-detail" id="flower-detail" hidden aria-live="polite"></article>
      <details class="garden-pot"><summary>Шавар ваарыг засах</summary><div class="garden-pot-options"><label><span class="garden-label-small">ХЭЛБЭР</span><select id="vase-shape"></select></label><div><span class="garden-label-small">ӨНГӨ</span><div class="garden-pot-colors" id="vase-colors" role="group" aria-label="Ваарны өнгө сонгох"></div></div></div></details>
      <p class="garden-footnote">Эндхийн зураг бүрийг бодит зүйлийн онцлогоос сэдэвлэсэн, пикселийн урлаг болгон зурсан.</p>
      <span class="garden-status" id="bloom-status" role="status" aria-live="polite"></span>
    </section>`;

  const $=id=>document.getElementById(id);
  function pixelVase(){
    const shape=vaseShapes[vaseShape],color=vases[vaseColor];
    const rows=shape.widths.map((half,index)=>{const y=294+index*11,left=180-half,width=half*2;return `<rect x="${left}" y="${y}" width="${width}" height="11" fill="${color.fill}"/><rect x="${left}" y="${y}" width="8" height="11" fill="${color.light}"/><rect x="${left+width-13}" y="${y}" width="13" height="11" fill="${color.dark}"/>`}).join('');
    const neck=shape.widths[2]*2-14;
    return `<ellipse cx="180" cy="461" rx="77" ry="5" fill="#3c3b33" opacity=".38"/>${rows}<rect x="${180-neck/2}" y="314" width="${neck}" height="100" fill="${color.light}" opacity=".13"/><rect x="${180-shape.widths[0]-5}" y="286" width="${shape.widths[0]*2+10}" height="14" fill="${color.rim}"/><rect x="${180-shape.widths[0]+4}" y="288" width="${(shape.widths[0]-4)*2}" height="6" fill="${color.inside}"/><rect x="${180-shape.widths[0]-5}" y="297" width="${shape.widths[0]*2+10}" height="3" fill="${color.dark}"/>`;
  }
  function flowerLayout(count){
    if(!count)return[];
    const rows=layoutMode==='compact'?Math.min(3,Math.ceil(count/4)):count>4?2:1;
    const perRow=Math.ceil(count/rows);
    const slots=[];
    for(let row=0;row<rows;row++){
      const rowItems=layoutMode==='compact'?Math.min(4,count-row*4):Math.min(perRow,count-row*perRow);
      for(let column=0;column<rowItems;column++){
        const index=layoutMode==='compact'?row*4+column:row*perRow+column;
        if(index>=count)continue;
        const spread=layoutMode==='compact'?190:layoutMode==='wide'?292:276;
        const x=rowItems===1?180:180-spread/2+spread*column/(rowItems-1);
        const jitter=layoutMode==='wild'?Math.sin((index+1)*(gardenSeed+2)*12.9898)*13:Math.sin((index+1)*2.1)*5;
        const rowY=rows===1?205:rows===3?[177,213,245][row]:row===0?184:228;
        const y=rowY+jitter+(layoutMode==='wide'&&row===0?-3:0);
        const size=rows===1?(count<=2?76:count<=4?68:60):rowItems>=6?42:rowItems===5?48:layoutMode==='compact'?49:56;
        slots[index]={x:x+(layoutMode==='wild'?Math.sin(index*8.3+gardenSeed)*9:0),y,size,offset:x-180};
      }
    }
    return slots;
  }
  function pixelLeaf(x,y,direction){
    const rows=[2,4,6,4,2],parts=[];
    rows.forEach((width,row)=>{const px=direction>0?x+row*2:x-row*2-width*2,py=y+row*2;parts.push(`<rect x="${px}" y="${py}" width="${width*2}" height="3" fill="${row===1?'#659a62':'#3e754d'}"/>`);if(row===2)parts.push(`<rect x="${direction>0?px+2:px+width*2-4}" y="${py+1}" width="3" height="2" fill="#b5cb79"/>`)});
    return parts.join('');
  }
  function pixelStem(slot,index,flower,bottomY,sceneKind){
    const form=formOf(flower),topY=slot.y+slot.size*.34,stemX=sceneKind==='patio'?180+Math.max(-30,Math.min(30,(slot.x-180)*.28)):slot.x+Math.sin((index+1)*2.4)*6;
    const steps=Math.max(1,Math.ceil((bottomY-topY)/5)),curve=(index%2===0?1:-1)*(sceneKind==='patio'?3:6),parts=[];
    for(let step=0;step<=steps;step++){
      const t=step/steps,y=topY+(bottomY-topY)*t,x=slot.x+(stemX-slot.x)*t+Math.sin(t*Math.PI)*curve;
      parts.push(`<rect x="${Math.round(x)-2}" y="${Math.round(y)}" width="4" height="5" fill="${step%3===0?'#4e8551':'#397149'}"/>`);
      if(step===Math.round(steps*.2))parts.push(pixelLeaf(Math.round(x),Math.round(y),index%2===0?-1:1));
      if(step===Math.round(steps*.42))parts.push(pixelLeaf(Math.round(x),Math.round(y),index%2===0?1:-1));
      if(step===Math.round(steps*.68))parts.push(pixelLeaf(Math.round(x),Math.round(y),index%2===0?-1:1));
      if(step===Math.round(steps*.86)&&form!=='spike')parts.push(pixelLeaf(Math.round(x),Math.round(y),index%2===0?1:-1));
      if(form==='branching'&&step===Math.round(steps*.32)){
        const branch=index%2===0?1:-1;parts.push(`<path d="M${Math.round(x)} ${Math.round(y)}l${branch*8} -9l${branch*5} -2" fill="none" stroke="#4e8551" stroke-width="3"/>`);
        parts.push(`<rect x="${Math.round(x+branch*12)-1}" y="${Math.round(y)-13}" width="4" height="4" fill="#e6a9c0"/><rect x="${Math.round(x+branch*16)-1}" y="${Math.round(y)-11}" width="4" height="4" fill="#f0c96b"/>`);
      }
      if(form==='spike'&&step>steps*.34&&step<steps*.76&&step%Math.max(2,Math.floor(steps/5))===0)parts.push(`<rect x="${Math.round(x)+(index%2===0?3:-5)}" y="${Math.round(y)-2}" width="5" height="3" fill="#6f9c61"/>`);
    }
    if(form==='rosette'||flower.growth==='bulb')parts.push(pixelLeaf(stemX,bottomY-7,-1),pixelLeaf(stemX,bottomY-7,1));
    return `<g class="garden-stem">${parts.join('')}</g>`;
  }
  function drawScene(){
    const scene=scenes[sceneId],baseY={bed:356,meadow:360,patio:286,dusk:356,woodland:357,rockery:357,pond:366}[sceneId];
    host.querySelector('.garden-stage').dataset.scene=sceneId;
    host.querySelector('.garden-stage').dataset.wind=String(windEnabled);
    const atmosphere={natural:[scene.sky,scene.sun],sunset:['#e7b4a0','#f1bd67'],bluehour:['#8797b4','#f1d49b'],mint:['#b9d9cb','#efd786']}[$('garden-atmosphere').value]||[scene.sky,scene.sun];
    $('scene-sky').setAttribute('fill',atmosphere[0]);$('scene-sun').setAttribute('fill',atmosphere[1]);
    $('scene-ground').innerHTML=scene.ground;
    $('garden-weather').textContent=scene.kind==='dusk'?'Одод асаж байна':scene.kind==='meadow'?'Зөөлөн салхитай өдөр':scene.kind==='patio'?'Дулаан үдээс хойш':scene.kind==='pond'?'Нуурын эргийн өглөө':'Өглөөний зөөлөн гэрэл';
    const slots=flowerLayout(bouquet.length),layers=bouquet.map((item,index)=>{const slot={...slots[index],size:slots[index].size*flowerScale};return{item,index,slot}}).sort((a,b)=>a.slot.y-b.slot.y);
    const stems=layers.map(({item,index,slot})=>pixelStem(slot,index,flowers.find(f=>f.id===item.id)||{},baseY,scene.kind)).join('');
    $('bouquet-stems').innerHTML=stems;
    const surface=scene.kind==='patio'?'<path d="M0 337h360v6H0z" fill="#c1aa8d"/>':scene.kind==='meadow'?'<g fill="#92ad70"><path d="M25 360h4v-13h3v13m61 0h3v-9h3v9m191 0h3v-12h3v12m36 0h3v-8h3v8"/></g>':scene.kind==='pond'?'<path d="M0 363q73-15 144 2t216-4v6q-93 10-216-1T0 375z" fill="#91a78a"/>':'<path d="M12 351h336v3H12z" fill="#8ea16b" opacity=".9"/>';
    $('scene-surface').innerHTML=surface;
    $('garden-weather').title=scene.name;
    const heads=layers.map(({item,index,slot})=>{
      const width=slot.size*art.width/27,x=slot.x-width/2,y=slot.y-slot.size/2;
      const svg=art.renderSvg(item.id,item.variant).replace('<svg viewBox=',`<svg class="garden-flower" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${width.toFixed(1)}" height="${slot.size}" viewBox="0 0 ${art.width} 27"`);
      const flower=flowers.find(entry=>entry.id===item.id);
      return `<g class="garden-sway" role="button" tabindex="0" data-flower="${item.id}" aria-label="${flower.name} · ${flower.signature} · дэлгэрэнгүй харах" style="--sway-origin:${slot.x}px ${Math.round(slot.y+slot.size*.34)}px;--sway-delay:${(index%5)*-.7}s">${svg}</g>`;
    }).join('');
    $('bouquet-flowers').innerHTML=heads;
    $('bouquet-flowers').querySelectorAll('.garden-sway').forEach(node=>{
      const open=()=>selectFlowerDetail(node.dataset.flower);
      node.addEventListener('click',open);node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open()}});
    });
    $('bouquet-vase').innerHTML=scene.kind==='patio'?pixelVase():'';
    host.querySelector('.garden-pot').hidden=scene.kind!=='patio';
    const names=bouquet.map(item=>flowers.find(f=>f.id===item.id)?.name).filter(Boolean);
    $('garden-scene').setAttribute('aria-label',bouquet.length?`${scenes[sceneId].name}: ${bouquet.length} цэцэг ургаж байна. ${names.join(', ')}.`:'Хоосон цэцэрлэг. Үр сонгоод тарьж эхлээрэй.');
    $('bouquet-hint').textContent=bouquet.length?`${bouquet.length} / ${MAX_FLOWERS} · Цэцгээ сонгоод талбайд нэмээрэй.`:'Цэцгийн үр сонгоод эхний цэцгээ тарь.';
    $('bouquet-size').textContent=`ТАЛБАЙД ${bouquet.length} / ${MAX_FLOWERS}`;
    const current=$('bouquet-current');current.replaceChildren();
    bouquet.forEach((item,index)=>{
      const flower=flowers.find(entry=>entry.id===item.id);if(!flower)return;
      const chip=document.createElement('button');chip.type='button';chip.className='garden-chip';chip.setAttribute('aria-label',`${flower.name}. Талбайгаас сугалах`);
      const dot=document.createElement('span');dot.className='garden-chip-dot';dot.style.setProperty('--chip-color',colorways[item.variant]?.swatch||'#d6d69b');dot.setAttribute('aria-hidden','true');
      const name=document.createElement('span');name.textContent=flower.name;
      const remove=document.createElement('b');remove.textContent='×';remove.setAttribute('aria-hidden','true');chip.append(dot,name,remove);
      chip.addEventListener('click',()=>{bouquet.splice(index,1);drawScene();renderPicker()});current.append(chip);
    });
    $('clear-bouquet').disabled=bouquet.length===0;
    $('recolor-bouquet').disabled=bouquet.length===0;
  }
  function renderScenes(){
    const host=$('garden-scenes');host.replaceChildren();
    Object.entries(scenes).forEach(([id,scene])=>{const button=document.createElement('button');button.type='button';button.className='garden-scene-choice';button.dataset.scene=id;button.setAttribute('aria-pressed',String(id===sceneId));button.textContent=scene.name;button.addEventListener('click',()=>{sceneId=id;host.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.scene===id)));drawScene()});host.append(button)});
  }
  function renderColorways(){
    const host=$('colorways');host.replaceChildren();
    colorways.forEach((color,index)=>{const button=document.createElement('button');button.type='button';button.className='garden-color';button.setAttribute('aria-pressed',String(index===activeColorway));button.setAttribute('aria-label',`${color.name} өнгө`);button.title=color.name;button.style.setProperty('--swatch',color.swatch);button.innerHTML='<span aria-hidden="true"></span>';button.addEventListener('click',()=>{activeColorway=index;renderColorways();renderPicker()});host.append(button)});
  }
  function renderFilter(){
    const select=$('flower-filter');select.replaceChildren();
    Object.entries(formNames).forEach(([id,name])=>{const option=document.createElement('option');option.value=id;option.textContent=`${name}${id==='all'?'':` · ${flowers.filter(f=>formOf(f)===id).length}`}`;select.append(option)});
    select.addEventListener('change',()=>{activeForm=select.value;renderPicker()});
  }
  function renderFlowerDetail(){
    const panel=$('flower-detail'),flower=flowers.find(entry=>entry.id===detailId);
    if(!flower){panel.hidden=true;panel.replaceChildren();return}
    panel.hidden=false;panel.replaceChildren();
    const artBox=document.createElement('div');artBox.className='garden-detail-art';artBox.innerHTML=art.renderSvg(flower.id,activeColorway);
    const body=document.createElement('div');body.className='garden-detail-copy';
    const title=document.createElement('h3');title.textContent=flower.name;
    const latin=document.createElement('em');latin.textContent=flower.latin;
    const signature=document.createElement('p');signature.className='garden-detail-signature';signature.textContent=flower.signature;
    const appearance=document.createElement('p');appearance.textContent=flower.appearance;
    const facts=document.createElement('dl');facts.className='garden-detail-facts';
    [['Навч ба иш',flower.leaves],['Таних онцлог',flower.detail]].forEach(([label,value])=>{const row=document.createElement('div'),term=document.createElement('dt'),description=document.createElement('dd');term.textContent=label;description.textContent=value;row.append(term,description);facts.append(row)});
    const source=document.createElement('a');source.href=flower.source;source.target='_blank';source.rel='noopener noreferrer';source.textContent='Эх сурвалжийг нээх ↗';
    body.append(title,latin,signature,appearance,facts,source);panel.append(artBox,body);
  }
  function selectFlowerDetail(id){
    detailId=id;renderFlowerDetail();
    host.querySelectorAll('.garden-seed-info').forEach(item=>item.setAttribute('aria-expanded',String(item.dataset.flower===id)));
    $('flower-detail').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function renderPicker(){
    const query=$('bouquet-search').value.trim().toLocaleLowerCase(),matches=flowers.filter(f=>(activeForm==='all'||formOf(f)===activeForm)&&(f.name+' '+f.latin+' '+f.signature+' '+f.appearance).toLocaleLowerCase().includes(query));
    const picker=$('bouquet-picker');picker.replaceChildren();
    matches.forEach(f=>{
      const card=document.createElement('div');card.className='garden-seed-card';
      const button=document.createElement('button');button.type='button';button.className='garden-seed';button.disabled=bouquet.length>=MAX_FLOWERS;
      button.setAttribute('aria-label',`${f.name}, ${f.latin}. Талбайд тарих`);
      button.innerHTML=art.renderSvg(f.id,activeColorway)+'<span class="garden-seed-copy"><strong></strong><small></small><span></span></span><span class="garden-seed-add" aria-hidden="true">+</span>';
      button.querySelector('strong').textContent=f.name;button.querySelector('small').textContent=f.latin;button.querySelector('.garden-seed-copy span').textContent=f.signature;
      button.addEventListener('click',()=>{if(bouquet.length>=MAX_FLOWERS)return;bouquet.push({id:f.id,variant:colorways[activeColorway].variant});drawScene();renderPicker();$('bloom-status').textContent=`${f.name} цэцгийг талбайд тарилаа.`});
      const info=document.createElement('button');info.type='button';info.className='garden-seed-info';info.dataset.flower=f.id;info.textContent='i';info.setAttribute('aria-label',`${f.name} цэцгийн таних шинж, дүрслэлийг харах`);info.setAttribute('aria-expanded',String(detailId===f.id));
      info.addEventListener('click',()=>selectFlowerDetail(f.id));
      card.append(button,info);picker.append(card);
    });
    $('bouquet-count').textContent=`${matches.length} / ${flowers.length} зурагдсан зүйл · ${formNames[activeForm]}`;
    if(!matches.length){const empty=document.createElement('p');empty.className='garden-empty';empty.textContent='Тохирох зурсан цэцэг олдсонгүй. Латин нэр эсвэл монгол нэрээр хайгаарай.';picker.append(empty)}
    if(detailId&&!flowers.some(f=>f.id===detailId))detailId=null;
    if(detailId)picker.querySelectorAll('.garden-seed-info').forEach(item=>item.setAttribute('aria-expanded',String(item.dataset.flower===detailId)));
    renderFlowerDetail();
  }
  function renderPot(){
    const shapeSelect=$('vase-shape');shapeSelect.replaceChildren();
    Object.entries(vaseShapes).forEach(([id,shape])=>{const option=document.createElement('option');option.value=id;option.textContent=shape.name;shapeSelect.append(option)});
    shapeSelect.value=vaseShape;shapeSelect.addEventListener('change',()=>{vaseShape=shapeSelect.value;drawScene()});
    const colors=$('vase-colors');colors.replaceChildren();
    Object.entries(vases).forEach(([id,color])=>{const button=document.createElement('button');button.type='button';button.className='garden-pot-color';button.setAttribute('aria-label',`${color.name} өнгө`);button.setAttribute('aria-pressed',String(id===vaseColor));button.style.setProperty('--pot-swatch',color.fill);button.addEventListener('click',()=>{vaseColor=id;colors.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item.getAttribute('aria-label')===`${color.name} өнгө`)));drawScene()});colors.append(button)});
  }
  $('clear-bouquet').addEventListener('click',()=>{bouquet=[];drawScene();renderPicker();$('bloom-status').textContent='Цэцэрлэг цэвэрлэгдлээ. Шинэ үр сонгоорой.'});
  $('random-bouquet').addEventListener('click',()=>{
    const shuffled=[...flowers];for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]}
    bouquet=shuffled.slice(0,8).map(f=>({id:f.id,variant:Math.floor(Math.random()*colorways.length)}));gardenSeed++;layoutMode='wild';$('garden-layout').value='wild';sceneId='meadow';renderScenes();drawScene();renderPicker();$('bloom-status').textContent='Шинэ зэрлэг цэцгийн мандал ургалаа.';
  });
  $('recolor-bouquet').addEventListener('click',()=>{bouquet=bouquet.map(item=>({...item,variant:colorways[activeColorway].variant}));drawScene();renderPicker();$('bloom-status').textContent=`${colorways[activeColorway].name} өнгийг тарьсан бүх цэцэгт хэрэглэв.`});
  $('garden-layout').addEventListener('change',event=>{layoutMode=event.target.value;gardenSeed++;drawScene()});
  $('garden-atmosphere').addEventListener('change',drawScene);
  $('flower-scale').addEventListener('input',event=>{flowerScale=Number(event.target.value)/100;$('flower-scale-value').textContent=`${event.target.value}%`;drawScene()});
  $('garden-wind').addEventListener('click',event=>{windEnabled=!windEnabled;event.currentTarget.setAttribute('aria-pressed',String(windEnabled));event.currentTarget.textContent=`Салхи: ${windEnabled?'асаалттай':'унтраалттай'}`;drawScene()});
  $('bouquet-search').addEventListener('input',renderPicker);
  $('flower-total').textContent=flowers.length;
  renderScenes();renderColorways();renderFilter();renderPot();drawScene();renderPicker();
})();


