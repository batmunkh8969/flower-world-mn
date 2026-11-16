/* Pixel bouquet studio: a growing botanical library, ten colorways and three vase shapes. */
(()=>{'use strict';
  const host=document.getElementById('bloom-exhibit'),flowers=window.flowerData,art=window.FlowerArt;
  if(!host||!Array.isArray(flowers)||!art)return;

  const colorways=[
    {name:'Төрөлх өнгө',swatch:'conic-gradient(#f5c943 0 14%,#ee78b8 14% 28%,#6588ff 28% 42%,#d8435d 42% 56%,#f1e9d3 56% 70%,#55b7a5 70% 84%,#bd8af1 84%)'},
    {name:'Ягаан',swatch:'#ee78b8'},
    {name:'Цэнхэр',swatch:'#6588ff'},
    {name:'Нарлаг',swatch:'#f6a554'},
    {name:'Нил ягаан',swatch:'#bd8af1'},
    {name:'Улаан',swatch:'#d8435d'},
    {name:'Цөцгий',swatch:'#f1e9d3'},
    {name:'Гааны ногоон',swatch:'#55b7a5'},
    {name:'Тоорын',swatch:'#ed9278'},
    {name:'Шар',swatch:'#efc943'}
  ];
  const vases={
    berry:{name:'Жимсгэнэ',fill:'#b64e69',light:'#e98ca0',dark:'#74394e',rim:'#e58ca1',inside:'#402b35'},
    cream:{name:'Сүүн цагаан',fill:'#d8c9a6',light:'#f6e8c7',dark:'#a69678',rim:'#fff0d1',inside:'#4b3e34'},
    blue:{name:'Хөх шаазан',fill:'#527baf',light:'#91b9db',dark:'#34577f',rim:'#afcbed',inside:'#273c53'},
    sage:{name:'Уулын ногоон',fill:'#6c987b',light:'#a5c79a',dark:'#456f5c',rim:'#c1d6a2',inside:'#2e4c42'},
    amber:{name:'Зөгийн бал',fill:'#c58c42',light:'#edc36b',dark:'#88572f',rim:'#f2d48a',inside:'#47372e'},
    ink:{name:'Шөнийн хөх',fill:'#526477',light:'#8496a2',dark:'#334551',rim:'#aabac0',inside:'#202b32'}
  };
  const vaseShapes={
    classic:{name:'Сонгодог',widths:[48,43,40,46,56,64,68,68,66,62,58,54,50,47]},
    tall:{name:'Өндөр',widths:[39,37,35,39,45,51,55,57,57,56,54,52,50,48]},
    round:{name:'Бөөрөнхий',widths:[47,42,52,62,70,75,78,78,75,69,62,56,51,48]}
  };
  const flowerForms={
    sunflower:'solitary',daisy:'solitary',tulip:'solitary',poppy:'solitary',dandelion:'solitary',rose:'solitary',
    lavender:'spike',lily:'solitary',iris:'solitary',lotus:'solitary',orchid:'cluster',bellflower:'cluster',
    hydrangea:'cluster',cosmos:'solitary',hibiscus:'solitary',peony:'solitary',carnation:'solitary',marigold:'solitary',
    sakura:'branching',snowdrop:'solitary',foxglove:'spike',pansy:'solitary',anemone:'solitary',magnolia:'solitary'
  };
  const formFilters=[
    {id:'all',name:'Бүгд'},{id:'solitary',name:'Том цэцэг'},{id:'cluster',name:'Бөөгнөрөл'},
    {id:'spike',name:'Түрүү'},{id:'branching',name:'Мөчир'},{id:'rosette',name:'Навчин сарнай'},{id:'cup',name:'Аяга'}
  ];
  const formOf=flower=>flower.form||flowerForms[flower.id]||'solitary';
  const MAX_FLOWERS=12;
  let activeColorway=0,activeForm='all',vaseColor='berry',vaseShape='classic';
  let bouquet=[
    {id:'narcissus',variant:0},{id:'clematis',variant:4},{id:'allium',variant:0},
    {id:'calla',variant:6},{id:'strelitzia',variant:3},{id:'wisteria',variant:4}
  ];

  host.innerHTML=`
    <section class="bloom-stage" aria-label="Өөрийн цэцгийн баглааг зохиох талбай">
      <svg class="bouquet-scene" id="bouquet-scene" viewBox="0 0 360 480" role="img" aria-label="Ваартай цэцгийн баглаа">
        <title>Өөрийн цэцгийн баглаа</title>
        <rect width="360" height="480" fill="#0b1014"/>
        <g class="pixel-stars" fill="#b9d9cb" aria-hidden="true">
          <rect x="31" y="81" width="4" height="4"/><rect x="87" y="151" width="3" height="3"/><rect x="314" y="93" width="5" height="5"/>
          <rect x="282" y="187" width="3" height="3"/><rect x="58" y="242" width="4" height="4"/><rect x="305" y="270" width="3" height="3"/>
          <rect x="91" y="61" width="3" height="3"/><rect x="264" y="67" width="4" height="4"/><rect x="42" y="191" width="3" height="3"/>
        </g>
        <rect x="0" y="464" width="360" height="16" fill="#121b1a"/>
        <rect x="0" y="464" width="360" height="2" fill="#30483c"/>
        <ellipse cx="180" cy="465" rx="97" ry="8" fill="#273630"/>
        <g id="bouquet-flowers" aria-hidden="true"></g>
        <g id="bouquet-vase" aria-hidden="true"></g>
      </svg>
      <span class="bloom-stage-label">✦ ТАНЫ БАГЛААНЫ УРЛАН</span>
      <span class="bloom-stage-hint" id="bouquet-hint" role="status" aria-live="polite"></span>
    </section>
    <section class="bloom-copy" aria-labelledby="bouquet-title">
      <div class="bouquet-heading"><div><div class="eyebrow">✿ ӨӨРИЙНХӨӨРӨӨ УРЛА</div><h2 id="bouquet-title">Баглаа урлая.</h2></div><span class="choice-count"><b id="flower-total">${flowers.length}</b><small>ЦЭЦГИЙН ТӨРӨЛ</small><span id="choice-total">${flowers.length*colorways.length} өнгө, дүрсний хослол</span></span></div>
      <p class="bouquet-intro">${flowers.length} өөр цэцгийн хэлбэрийг 10 өнгөөр хослуулаарай. Нэг нэгээр нь нэмээд, ваараа өөрийнхөөрөө чимээрэй.</p>
      <div class="bouquet-actions"><span class="bouquet-size" id="bouquet-size" aria-live="polite"></span><button class="clear-bouquet" id="clear-bouquet" type="button">Цэвэрлэх ↺</button></div>
      <div class="bouquet-current" id="bouquet-current" aria-label="Баглаанд сонгосон цэцгүүд"></div>
      <fieldset class="bloom-fieldset"><legend>01 · ЦЭЦГИЙН ӨНГӨ</legend><div class="colorways" id="colorways" role="group" aria-label="Цэцгийн өнгө сонгох"></div></fieldset>
      <label class="bloom-search"><span>02 · ЦЭЦГЭЭ СОНГОХ</span><input id="bouquet-search" type="search" autocomplete="off" placeholder="Монгол эсвэл латин нэрээр хайх"></label>
      <div class="flower-filters" id="flower-filters" role="group" aria-label="Цэцгийн ургалтын хэлбэрээр шүүх"></div>
      <div class="bouquet-picker" id="bouquet-picker" role="group" aria-label="Баглаанд нэмэх цэцгүүд"></div>
      <p class="bouquet-count" id="bouquet-count" aria-live="polite"></p>
      <div class="vase-controls">
        <fieldset class="bloom-fieldset"><legend>03 · ВАЗНЫ ХЭЛБЭР</legend><div class="vase-shapes" id="vase-shapes" role="group" aria-label="Вазны хэлбэр сонгох"></div></fieldset>
        <fieldset class="bloom-fieldset"><legend>04 · ВАЗНЫ ӨНГӨ</legend><div class="vase-colors" id="vase-colors" role="group" aria-label="Вазны өнгө сонгох"></div></fieldset>
      </div>
      <p class="bloom-note">Баглаа урлаад дууссаны дараа доош гүйлгэн цэцгүүдийн таних тэмдгийг тоглоомоор нээгээрэй.</p>
      <span class="bloom-status" id="bloom-status" role="status" aria-live="polite"></span>
    </section>`;

  const $=id=>document.getElementById(id);
  function pixelVase(){
    const shape=vaseShapes[vaseShape],color=vases[vaseColor];
    const rects=shape.widths.map((half,index)=>{
      const y=294+index*11,left=180-half,width=half*2;
      return `<rect x="${left}" y="${y}" width="${width}" height="11" fill="${color.fill}"/><rect x="${left}" y="${y}" width="8" height="11" fill="${color.light}"/><rect x="${left+width-13}" y="${y}" width="13" height="11" fill="${color.dark}"/>`;
    }).join('');
    const neckWidth=shape.widths[2]*2-14;
    const tile=`<g fill="${color.light}" opacity=".38"><rect x="176" y="354" width="8" height="8"/><rect x="168" y="362" width="8" height="8"/><rect x="184" y="362" width="8" height="8"/><rect x="176" y="370" width="8" height="8"/><rect x="176" y="365" width="8" height="2" fill="${color.rim}"/></g>`;
    return `<ellipse cx="180" cy="461" rx="${shape.widths[shape.widths.length-1]+8}" ry="5" fill="#070b0d" opacity=".58"/>${rects}<rect x="${180-neckWidth/2}" y="314" width="${neckWidth}" height="116" fill="${color.light}" opacity=".14"/>${tile}<rect x="${180-shape.widths[0]-5}" y="286" width="${shape.widths[0]*2+10}" height="14" fill="${color.rim}"/><rect x="${180-shape.widths[0]+4}" y="288" width="${(shape.widths[0]-4)*2}" height="6" fill="${color.inside}"/><rect x="${180-shape.widths[0]-5}" y="297" width="${shape.widths[0]*2+10}" height="3" fill="${color.dark}"/>`;
  }
  function flowerLayout(count){
    const positions={
      0:[],1:[[0,126]],2:[[-48,141],[48,141]],3:[[-76,151],[0,118],[76,151]],
      4:[[-99,145],[-34,162],[34,162],[99,145]],5:[[-119,156],[-60,133],[0,116],[60,133],[119,156]],
      6:[[-126,156],[-76,131],[-26,163],[26,163],[76,131],[126,156]],
      7:[[-128,161],[-84,137],[-42,162],[0,116],[42,162],[84,137],[128,161]],
      8:[[-130,160],[-92,132],[-54,162],[-18,139],[18,139],[54,162],[92,132],[130,160]],
      9:[[-118,150],[-59,120],[0,112],[59,120],[118,150],[-94,169],[-31,151],[31,151],[94,169]],
      10:[[-122,150],[-73,122],[-24,155],[24,155],[73,122],[122,150],[-95,174],[-32,161],[32,161],[95,174]],
      11:[[-124,151],[-74,123],[-25,155],[25,155],[74,123],[124,151],[-108,174],[-54,160],[0,169],[54,160],[108,174]],
      12:[[-104,124],[-52,110],[0,106],[52,110],[104,124],[-132,161],[-88,143],[-44,169],[0,145],[44,169],[88,143],[132,161]]
    };
    const size=count<=1?94:count<=3?84:count<=5?76:count<=8?68:62;
    return (positions[count]||positions[12]).map(([offset,y])=>({x:180+offset,offset,y:y+42,size,stemX:180+Math.max(-45,Math.min(45,offset*.36))}));
  }
  function pixelLeaf(x,y,direction){
    const rows=[2,4,6,4,2],parts=[];
    rows.forEach((width,row)=>{
      const px=direction>0?x+row*2:x-row*2-width*2;
      const py=y+row*2;
      parts.push(`<rect x="${px}" y="${py}" width="${width*2}" height="3" fill="${row===1?'#5a9560':'#39734b'}"/>`);
      if(row===2)parts.push(`<rect x="${direction>0?px+2:px+width*2-4}" y="${py+1}" width="3" height="2" fill="#9ac47a"/>`);
    });
    return parts.join('');
  }
  function pixelStem(slot,index,flower){
    const form=formOf(flower),topY=slot.y+slot.size*.34,bottomY=288,steps=Math.max(1,Math.ceil((bottomY-topY)/4));
    const curve=(index%2===0?1:-1)*4,parts=[];
    for(let step=0;step<=steps;step++){
      const t=step/steps,y=topY+(bottomY-topY)*t;
      const x=slot.x+(slot.stemX-slot.x)*t+Math.sin(t*Math.PI)*curve;
      parts.push(`<rect x="${Math.round(x)-2}" y="${Math.round(y)}" width="4" height="4" fill="${step%4===0?'#4d8756':'#356c49'}"/>`);
      if(step===Math.round(steps*.4))parts.push(pixelLeaf(Math.round(x),Math.round(y),index%2===0?1:-1));
      if(step===Math.round(steps*.66))parts.push(pixelLeaf(Math.round(x),Math.round(y),index%2===0?-1:1));
      if(form==='branching'&&step===Math.round(steps*.34)){
        const branch=index%2===0?1:-1;parts.push(`<path d="M${Math.round(x)} ${Math.round(y)} l${branch*10} -13 l${branch*5} -2" fill="none" stroke="#4d8756" stroke-width="2"/>`);
        parts.push(`<rect x="${Math.round(x+branch*12)-1}" y="${Math.round(y)-17}" width="3" height="3" fill="#e6a9c0"/><rect x="${Math.round(x+branch*15)-1}" y="${Math.round(y)-15}" width="3" height="3" fill="#f0c96b"/>`);
      }
      if(form==='spike'&&step>steps*.35&&step<steps*.8&&step%Math.max(2,Math.floor(steps/5))===0)parts.push(`<rect x="${Math.round(x)+(index%2===0?3:-5)}" y="${Math.round(y)-2}" width="3" height="2" fill="#67925c"/>`);
    }
    if(form==='rosette'){parts.push(pixelLeaf(slot.stemX,bottomY-5,-1),pixelLeaf(slot.stemX,bottomY-5,1))}
    return `<g class="bouquet-stem">${parts.join('')}</g>`;
  }
  function drawScene(){
    const plants=$('bouquet-flowers'),scene=$('bouquet-scene');
    const slots=flowerLayout(bouquet.length);
    const layers=bouquet.map((item,index)=>({item,index,slot:slots[index]})).sort((a,b)=>a.slot.y-b.slot.y);
    const stems=layers.map(({item,index,slot})=>pixelStem(slot,index,item)).join('');
    const heads=layers.map(({item,index,slot})=>{
      const width=slot.size*art.width/27,x=slot.x-width/2,y=slot.y-slot.size/2;
      const svg=art.renderSvg(item.id,item.variant).replace('<svg viewBox=',`<svg class="bouquet-flower" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${width.toFixed(1)}" height="${slot.size}" viewBox="0 0 ${art.width} 27"`);
      return `<g class="bouquet-sway" style="--sway-origin:${slot.x}px ${Math.round(slot.y+slot.size*.34)}px;--sway-delay:${(index%5)*-.7}s">${svg}</g>`;
    }).join('');
    plants.innerHTML=stems+heads;
    $('bouquet-vase').innerHTML=pixelVase();
    const names=bouquet.map(item=>flowers.find(f=>f.id===item.id)?.name).filter(Boolean);
    scene.setAttribute('aria-label',bouquet.length?`Ваарт ${bouquet.length} цэцэг байна: ${names.join(', ')}.`:'Чимэглэж болох хоосон ваар.');
    $('bouquet-hint').textContent=bouquet.length?`${bouquet.length} / ${MAX_FLOWERS} цэцэг · Дуртай цэцгээ нэмээд, өнгө болон вазнаа өөрчлөөрэй.`:'Ваар хоосон байна. Өнгө сонгоод цэцгээ нэмээрэй.';
    $('bouquet-size').textContent=`${bouquet.length} / ${MAX_FLOWERS} ЦЭЦЭГ`;
    const current=$('bouquet-current');current.replaceChildren();
    bouquet.forEach((item,index)=>{
      const flower=flowers.find(entry=>entry.id===item.id);if(!flower)return;
      const chip=document.createElement('button');chip.type='button';chip.className='bouquet-chip';chip.setAttribute('aria-label',`${flower.name}, ${colorways[item.variant].name}. Баглаанаас авах`);
      const dot=document.createElement('span');dot.className='chip-dot';dot.style.setProperty('--chip-color',colorways[item.variant].swatch);dot.setAttribute('aria-hidden','true');
      const name=document.createElement('span');name.textContent=flower.name;
      const remove=document.createElement('b');remove.textContent='×';remove.setAttribute('aria-hidden','true');
      chip.append(dot,name,remove);chip.addEventListener('click',()=>{bouquet.splice(index,1);drawScene();renderPicker()});current.append(chip);
    });
    $('clear-bouquet').disabled=bouquet.length===0;
  }
  function renderColorways(){
    const host=$('colorways');host.replaceChildren();
    colorways.forEach((color,index)=>{
      const button=document.createElement('button');button.type='button';button.className='colorway';button.setAttribute('aria-pressed',String(index===activeColorway));button.setAttribute('aria-label',`${color.name} өнгө сонгох`);button.title=color.name;
      button.style.setProperty('--swatch',color.swatch);button.innerHTML='<span aria-hidden="true"></span><small></small>';button.querySelector('small').textContent=color.name;
      button.addEventListener('click',()=>{activeColorway=index;renderColorways();renderPicker()});host.append(button);
    });
  }
  function renderFilters(){
    const host=$('flower-filters');host.replaceChildren();
    formFilters.forEach(filter=>{
      const total=filter.id==='all'?flowers.length:flowers.filter(f=>formOf(f)===filter.id).length;
      const button=document.createElement('button');button.type='button';button.className='flower-filter';button.dataset.form=filter.id;
      button.setAttribute('aria-pressed',String(filter.id===activeForm));button.textContent=`${filter.name} · ${total}`;
      button.addEventListener('click',()=>{
        activeForm=filter.id;
        host.querySelectorAll('.flower-filter').forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.form===activeForm)));
        renderPicker();
      });
      host.append(button);
    });
  }
  function renderPicker(){
    const query=$('bouquet-search').value.trim().toLocaleLowerCase();
    const matches=flowers.filter(f=>(activeForm==='all'||formOf(f)===activeForm)&&(f.name+' '+f.latin+' '+f.signature).toLocaleLowerCase().includes(query));
    const picker=$('bouquet-picker');picker.replaceChildren();
    matches.forEach(f=>{
      const button=document.createElement('button');button.type='button';button.className='bouquet-choice';button.disabled=bouquet.length>=MAX_FLOWERS;
      button.setAttribute('aria-label',`${f.name}, ${f.latin}. ${colorways[activeColorway].name} өнгөөр баглаанд нэмэх`);
      button.innerHTML=art.renderSvg(f.id,activeColorway)+'<span class="choice-copy"><strong></strong><small></small></span><span class="choice-add" aria-hidden="true">+</span>';
      button.querySelector('strong').textContent=f.name;button.querySelector('small').textContent=f.latin;
      button.addEventListener('click',()=>{
        if(bouquet.length>=MAX_FLOWERS)return;
        bouquet.push({id:f.id,variant:activeColorway});drawScene();renderPicker();$('bloom-status').textContent=`${f.name} цэцгийг ${colorways[activeColorway].name.toLocaleLowerCase()} өнгөөр баглаанд нэмлээ.`;
      });
      picker.append(button);
    });
    const filterName=formFilters.find(filter=>filter.id===activeForm)?.name||'Бүгд';
    $('bouquet-count').textContent=`${matches.length} / ${flowers.length} цэцэг · ${filterName} · ${matches.length*colorways.length} өнгө, дүрсний хослол`;
    if(!matches.length){const empty=document.createElement('p');empty.className='bouquet-empty';empty.textContent='Ийм нэртэй цэцэг алга. Монгол эсвэл латин нэрээр дахин хайгаарай.';picker.append(empty)}
  }
  function renderVaseControls(){
    const shapes=$('vase-shapes');shapes.replaceChildren();
    Object.entries(vaseShapes).forEach(([id,shape])=>{const button=document.createElement('button');button.type='button';button.className='shape-choice';button.textContent=shape.name;button.setAttribute('aria-pressed',String(id===vaseShape));button.addEventListener('click',()=>{vaseShape=id;renderVaseControls();drawScene()});shapes.append(button)});
    const colors=$('vase-colors');colors.replaceChildren();
    Object.entries(vases).forEach(([id,color])=>{const button=document.createElement('button');button.type='button';button.className='vase-color';button.setAttribute('aria-label',`${color.name} өнгийн ваар`);button.setAttribute('aria-pressed',String(id===vaseColor));button.title=color.name;button.style.setProperty('--vase-swatch',color.fill);button.addEventListener('click',()=>{vaseColor=id;renderVaseControls();drawScene()});colors.append(button)});
  }
  $('clear-bouquet').addEventListener('click',()=>{bouquet=[];drawScene();renderPicker();$('bloom-status').textContent='Баглаа цэвэрлэгдлээ. Шинэ цэцэг сонгоорой.'});
  $('bouquet-search').addEventListener('input',renderPicker);
  renderColorways();renderFilters();renderVaseControls();drawScene();renderPicker();
})();

