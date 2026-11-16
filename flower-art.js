/* Shared high-resolution pixel plants for the garden, quiz and field notebook. */
(()=>{'use strict';
  const WIDTH=35,HEIGHT=46,TAU=Math.PI*2;
  const green={stem:'#356c49',leaf:'#4c8453',leafDark:'#28563d',leafLight:'#91bd69'};
  const palettes={
    sunflower:{...green,petal:'#f5c943',petalLight:'#ffe782',petalShade:'#d9972e',center:'#72422c',centerDark:'#4b2e29',seed:'#c88b43'},
    daisy:{...green,petal:'#f6f0da',petalLight:'#fff9e9',petalShade:'#d8d0b8',center:'#e9b84b',centerDark:'#aa7137',seed:'#f4d46e'},
    tulip:{...green,petal:'#d96f8b',petalLight:'#f4a0ab',petalShade:'#a94367',center:'#743d56',centerDark:'#462c40',seed:'#f3c276'},
    poppy:{...green,petal:'#df4b4e',petalLight:'#ff7771',petalShade:'#a93643',center:'#563342',centerDark:'#332738',seed:'#e4b970'},
    dandelion:{...green,petal:'#f2ca36',petalLight:'#ffe67a',petalShade:'#d39325',center:'#b87b28',centerDark:'#80502b',seed:'#e9b848'},
    rose:{...green,petal:'#da6689',petalLight:'#ffb2c8',petalShade:'#a84065',center:'#a34363',centerDark:'#743147',seed:'#ffe1ad'},
    lavender:{...green,petal:'#9d78c9',petalLight:'#d1b6ef',petalShade:'#71559f',center:'#654a8d',centerDark:'#48345f',seed:'#e9d6fc'},
    lily:{...green,petal:'#fff1dd',petalLight:'#fffaf2',petalShade:'#e3a6a8',center:'#d89650',centerDark:'#8c5c46',seed:'#f4ca66'},
    iris:{...green,petal:'#6967bd',petalLight:'#aaa9ed',petalShade:'#474688',center:'#f2cb5b',centerDark:'#9a7141',seed:'#fff0bd'},
    lotus:{...green,petal:'#ef9db0',petalLight:'#ffe0dc',petalShade:'#d36a8b',center:'#c48b45',centerDark:'#865c39',seed:'#edd078'},
    orchid:{...green,petal:'#d48ab2',petalLight:'#f7c4da',petalShade:'#a55287',center:'#f1cd69',centerDark:'#8b4c76',seed:'#fff0c4'},
    bellflower:{...green,petal:'#7895d8',petalLight:'#b9d1fb',petalShade:'#5269a9',center:'#efe09d',centerDark:'#a88b53',seed:'#fff6ce'},
    hydrangea:{...green,petal:'#7b91d7',petalLight:'#c0c7fb',petalShade:'#6374ba',center:'#f5dc96',centerDark:'#988260',seed:'#fff2c4'},
    cosmos:{...green,petal:'#ed8ba6',petalLight:'#ffd0dc',petalShade:'#c66183',center:'#e6b549',centerDark:'#9b683a',seed:'#fff0bd'},
    hibiscus:{...green,petal:'#e65265',petalLight:'#ff9b91',petalShade:'#ae304d',center:'#7c394d',centerDark:'#512e40',seed:'#ffd279'},
    peony:{...green,petal:'#ed90ae',petalLight:'#ffd2dd',petalShade:'#ca557e',center:'#d2789a',centerDark:'#89455f',seed:'#ffe7b4'},
    carnation:{...green,petal:'#e87da7',petalLight:'#ffd0e1',petalShade:'#b74476',center:'#a84669',centerDark:'#78344d',seed:'#ffe1b1'},
    marigold:{...green,petal:'#f5a832',petalLight:'#ffda69',petalShade:'#d77822',center:'#a95c26',centerDark:'#744126',seed:'#ffe390'},
    sakura:{...green,stem:'#745039',leaf:'#557e4f',leafDark:'#355b41',leafLight:'#a3bc74',petal:'#f3a4bd',petalLight:'#ffe2e9',petalShade:'#d5789a',center:'#e7b454',centerDark:'#a76853',seed:'#fff0c6'},
    snowdrop:{...green,petal:'#f4f3df',petalLight:'#fffdf1',petalShade:'#cad9b2',center:'#628653',centerDark:'#426744',seed:'#f4d875'},
    foxglove:{...green,petal:'#aa7ac2',petalLight:'#e0bbe8',petalShade:'#815696',center:'#6b466f',centerDark:'#4d3659',seed:'#fff0c6'},
    pansy:{...green,petal:'#8e69bd',petalLight:'#f2d36c',petalShade:'#553d90',center:'#f1c346',centerDark:'#382b65',seed:'#fff4ca'},
    anemone:{...green,petal:'#6597d9',petalLight:'#afd6f3',petalShade:'#426bb5',center:'#403545',centerDark:'#292831',seed:'#e3bd63'},
    magnolia:{...green,stem:'#684c39',leaf:'#35705a',leafDark:'#204a3a',leafLight:'#6d9c70',petal:'#f1e8d7',petalLight:'#fff8e8',petalShade:'#c98690',center:'#b5783c',centerDark:'#754c34',seed:'#e8bc69'}
  };
  const variants=[null,
    {petal:'#ee78b8',petalLight:'#ffd1ed',petalShade:'#b34587',center:'#d785bd',centerDark:'#713d73',seed:'#fff0b6'},
    {petal:'#6588ff',petalLight:'#a8d4ff',petalShade:'#4b54c7',center:'#ba7ef5',centerDark:'#654cb6',seed:'#fff0b6'},
    {petal:'#f6a554',petalLight:'#ffe18a',petalShade:'#d97060',center:'#e58c56',centerDark:'#8f4946',seed:'#fff0b6'},
    {petal:'#bd8af1',petalLight:'#f0c8ff',petalShade:'#8059d2',center:'#e98ace',centerDark:'#64488f',seed:'#fff0b6'},
    {petal:'#d8435d',petalLight:'#ff9a91',petalShade:'#962d48',center:'#f4c75e',centerDark:'#693443',seed:'#fff0b6'},
    {petal:'#f1e9d3',petalLight:'#fffdf1',petalShade:'#cbbf9d',center:'#dcae56',centerDark:'#79513c',seed:'#fff0b6'},
    {petal:'#55b7a5',petalLight:'#a7e4ca',petalShade:'#347e83',center:'#efc96b',centerDark:'#42635d',seed:'#fff0b6'},
    {petal:'#ed9278',petalLight:'#ffd0a6',petalShade:'#c75b67',center:'#f1ca68',centerDark:'#7d4550',seed:'#fff0b6'},
    {petal:'#efc943',petalLight:'#fff39a',petalShade:'#c78e30',center:'#a95d39',centerDark:'#65402f',seed:'#fff0b6'}
  ];
  const cache=new Map(),mod=(n,m)=>((n%m)+m)%m;
  function pixelsFor(id,variant=0){
    const key=id+':'+variant;if(cache.has(key))return cache.get(key);
    const colors={...palettes[id],...(variants[variant]||{})};
    const grid=Array.from({length:HEIGHT},()=>Array(WIDTH).fill(null));
    const put=(x,y,c)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&x<WIDTH&&y>=0&&y<HEIGHT)grid[y][x]=c};
    function line(x0,y0,x1,y1,c){
      x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);
      let dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,err=dx+dy;
      while(true){put(x0,y0,c);if(x0===x1&&y0===y1)break;const e=2*err;if(e>=dy){err+=dy;x0+=sx}if(e<=dx){err+=dx;y0+=sy}}
    }
    function ellipse(cx,cy,rx,ry,angle,color,highlight){
      const pad=Math.ceil(Math.max(rx,ry)+1),x0=Math.max(0,Math.floor(cx-pad)),x1=Math.min(WIDTH-1,Math.ceil(cx+pad)),y0=Math.max(0,Math.floor(cy-pad)),y1=Math.min(HEIGHT-1,Math.ceil(cy+pad));
      const ca=Math.cos(angle),sa=Math.sin(angle);
      for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const dx=x-cx,dy=y-cy,u=dx*ca+dy*sa,v=-dx*sa+dy*ca,q=(u*u)/(rx*rx)+(v*v)/(ry*ry);if(q<=1)put(x,y,highlight&&q>.67?highlight:color)}
    }
    function leaf(bx,by,tx,ty,width=3,toothed=true){
      const vx=tx-bx,vy=ty-by,len2=vx*vx+vy*vy,len=Math.sqrt(len2);if(!len)return;
      const pad=Math.ceil(width+1),x0=Math.max(0,Math.floor(Math.min(bx,tx)-pad)),x1=Math.min(WIDTH-1,Math.ceil(Math.max(bx,tx)+pad)),y0=Math.max(0,Math.floor(Math.min(by,ty)-pad)),y1=Math.min(HEIGHT-1,Math.ceil(Math.max(by,ty)+pad));
      for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const dx=x-bx,dy=y-by,t=(dx*vx+dy*vy)/len2;if(t<.03||t>.98)continue;const across=Math.abs(dx*(-vy)+dy*vx)/len;let edge=width*Math.pow(Math.sin(Math.PI*t),.7);if(toothed)edge*=.83+.17*Math.cos(t*Math.PI*12);if(across<=edge)put(x,y,across>edge*.79?colors.leafDark:(across<.45||((x+y)%7===0)?colors.leafLight:colors.leaf))}
      line(bx,by,tx,ty,colors.leafDark);put(Math.round((bx+tx)/2),Math.round((by+ty)/2),colors.leafLight);
    }
    function radial(cx,cy,o){
      for(let y=0;y<27;y++)for(let x=0;x<WIDTH;x++){
        const dx=x-cx,dy=y-cy,r=Math.sqrt(dx*dx+dy*dy),a=Math.atan2(dy,dx),phase=o.phase||0,period=TAU/o.count,rel=mod(a-phase+period/2,period)-period/2;
        const edge=o.outer+(o.scallop||0)*Math.cos(o.count*(a-phase));
        if(r>edge||r<o.core||Math.abs(rel)>(o.half||.2)+(o.taper||0)*Math.max(0,r-o.core))continue;
        let c=r>edge-(o.edge||1)?colors.petalShade:colors.petal;
        if(((x*3+y*2)%11===4)||Math.abs(rel)<.045)c=colors.petalLight;
        put(x,y,c);
      }
      if(o.disk!==false)for(let y=0;y<27;y++)for(let x=0;x<WIDTH;x++){const dx=x-cx,dy=y-cy,r=Math.sqrt(dx*dx+dy*dy);if(r<=o.core){const z=(x*17+y*29+x*y*3)%13;put(x,y,o.seeded?(z<3?colors.seed:z<7?colors.centerDark:colors.center):r>o.core*.68?colors.centerDark:((x+y)%5===0?colors.seed:colors.center))}}
    }
    function blossom(cx,cy,r=3){radial(cx,cy,{count:5,core:.8,outer:r,half:.47,scallop:.18,phase:-Math.PI/2,edge:.65})}
    function bell(cx,cy,scale=1,spot=false){
      const rows=[[0,0],[1,1],[2,2],[3,3],[4,3]];
      rows.forEach(([dy,half])=>{for(let dx=-half;dx<=half;dx++){let c=Math.abs(dx)===half?colors.petalShade:colors.petal;if(dx===-1&&dy>0)c=colors.petalLight;put(cx+dx*scale,cy+dy*scale,c)}});
      put(cx,cy+4*scale,colors.petalLight);if(spot){put(cx,cy+2*scale,colors.centerDark);put(cx-1*scale,cy+3*scale,colors.centerDark)}
    }
    function tinyFloret(cx,cy,r=2){for(let i=0;i<4;i++){const a=i*Math.PI/2;put(cx+Math.round(Math.cos(a)*r),cy+Math.round(Math.sin(a)*r),colors.petal);put(cx+Math.round(Math.cos(a)*(r-1)),cy+Math.round(Math.sin(a)*(r-1)),colors.petalLight)}put(cx,cy,colors.center)}
    function stem(y0=22,y1=45,curve=0){let px=17,py=y0;for(let y=y0;y<=y1;y++){const x=17+Math.round(curve*Math.sin((y-y0)/Math.max(1,y1-y0)*Math.PI));put(x,y,colors.stem);if(x<WIDTH-1&&y%4===0)put(x+1,y,colors.leafLight);if(y>y0)line(px,py,x,y,colors.stem);px=x;py=y}}
    function body(){
      if(id==='sakura'){
        line(17,45,17,26,colors.stem);line(17,31,7,17,colors.stem);line(16,34,27,14,colors.stem);line(9,20,5,13,colors.stem);line(24,20,30,10,colors.stem);return;
      }
      if(id==='magnolia'){
        line(17,45,17,23,colors.stem);line(17,34,6,31,colors.stem);line(17,37,29,32,colors.stem);leaf(17,37,6,31,4.4);leaf(17,38,29,32,4.4);return;
      }
      if(id==='hydrangea'){
        line(17,45,17,23,colors.stem);line(17,37,7,29,colors.stem);line(17,36,28,27,colors.stem);leaf(17,40,4,34,4.2);leaf(17,40,31,34,4.2);leaf(17,35,10,30,3);leaf(17,35,25,29,3);return;
      }
      if(id==='foxglove'){
        line(17,45,18,8,colors.stem);leaf(18,42,5,36,3.8);leaf(18,39,29,34,3.8);leaf(18,34,7,29,3.1);return;
      }
      if(id==='lavender'){
        line(17,45,17,8,colors.stem);for(let y=28;y<43;y+=4){leaf(17,y,9,y-3,1.25,false);leaf(17,y+1,25,y-3,1.25,false)}return;
      }
      if(id==='bellflower'){
        line(18,45,18,20,colors.stem);line(18,29,9,16,colors.stem);line(18,32,28,19,colors.stem);leaf(18,40,7,34,2.5);leaf(18,35,27,30,2.2);return;
      }
      if(id==='lotus'){
        line(17,45,17,22,colors.stem);line(17,42,29,32,colors.stem);ellipse(29,30,5,2.8,-.2,colors.leaf,colors.leafLight);line(29,30,17,43,colors.leafDark);return;
      }
      if(id==='snowdrop'){
        line(17,43,17,16,colors.stem);line(17,16,19,9,colors.stem);line(19,9,21,12,colors.stem);leaf(17,43,9,27,2.1,false);leaf(18,43,25,29,1.8,false);return;
      }
      if(id==='bellflower'){
        line(17,45,17,17,colors.stem);line(17,29,9,20,colors.stem);line(17,32,26,22,colors.stem);leaf(17,40,7,35,2);leaf(17,34,26,30,2);return;
      }
      if(id==='orchid'){
        line(17,40,17,13,colors.stem);line(17,16,22,9,colors.stem);line(22,9,27,9,colors.stem);leaf(17,41,5,38,5,false);leaf(17,41,29,38,5,false);return;
      }
      if(id==='iris'){
        line(17,45,17,20,colors.stem);leaf(17,44,6,25,2,false);leaf(17,44,10,23,1.8,false);leaf(17,44,27,25,2,false);return;
      }
      if(id==='dandelion'){
        line(17,19,17,35,colors.stem);leaf(17,45,1,39,4.1);leaf(17,45,33,39,4.1);leaf(17,45,5,34,3.1);leaf(17,45,29,34,3.1);leaf(17,45,12,35,2.5);leaf(17,45,22,35,2.5);return;
      }
      if(id==='tulip'||id==='lily'||id==='snowdrop'){
        line(17,45,17,21,colors.stem);leaf(17,44,7,24,3,false);leaf(17,44,27,27,2.8,false);return;
      }
      if(id==='cosmos'){
        line(17,45,17,22,colors.stem);for(let y=27;y<43;y+=3){leaf(17,y,9,y-4,1.45,false);leaf(17,y+1,25,y-4,1.45,false)}return;
      }
      stem();
      if(id==='sunflower'){leaf(18,36,2,32,4.3);leaf(18,35,32,29,4);leaf(17,31,6,27,3);leaf(17,31,29,25,3)}
      else if(id==='daisy'){for(let i=0;i<4;i++){const y=29+i*3;leaf(17,y,9,y-2,1.6,false);leaf(18,y+1,26,y-2,1.5,false)}}
      else if(id==='poppy'||id==='anemone'){leaf(18,39,2,35,3.8);leaf(18,38,32,33,3.6);leaf(17,31,8,28,2.7)}
      else if(id==='rose'||id==='hibiscus'||id==='peony'||id==='carnation'||id==='marigold'){leaf(18,38,3,33,3.8);leaf(18,37,31,32,3.7);leaf(17,31,8,28,2.6);leaf(17,31,26,27,2.5)}
      else if(id==='pansy'){leaf(18,39,4,34,3);leaf(18,38,30,34,3)}
      else if(id==='lily'){leaf(17,37,7,25,2.1,false);leaf(17,40,27,28,2,false)}
    }
    function paintHead(){
      const cx=17,cy=11.5;
      if(id==='sunflower')radial(cx,cy,{count:18,core:4.1,outer:11.3,half:.205,taper:.012,scallop:1,seeded:true,phase:-Math.PI/2});
      else if(id==='daisy')radial(cx,cy,{count:17,core:3,outer:11,half:.13,taper:.005,scallop:.28,phase:-Math.PI/2});
      else if(id==='dandelion')radial(cx,cy,{count:25,core:1.5,outer:10.7,half:.075,taper:.003,scallop:.9,phase:-Math.PI/2});
      else if(id==='poppy')radial(cx,cy,{count:4,core:2.7,outer:10.2,half:.66,taper:.014,scallop:.65,phase:-Math.PI/2});
      else if(id==='cosmos')radial(cx,cy,{count:8,core:2.5,outer:12,half:.3,taper:.006,scallop:.5,phase:-Math.PI/2});
      else if(id==='hibiscus'){radial(cx,cy,{count:5,core:2.4,outer:12,half:.67,taper:.01,scallop:.4,phase:-Math.PI/2});line(cx,cy-1,cx,cy-8,colors.center);for(let y=cy-8;y<cy-4;y+=2){put(cx-1,y,colors.seed);put(cx+1,y,colors.seed)}}
      else if(id==='anemone')radial(cx,cy,{count:8,core:3.4,outer:10.2,half:.37,taper:.008,scallop:.3,phase:-Math.PI/2});
      else if(id==='marigold')radial(cx,cy,{count:29,core:1.4,outer:10.4,half:.13,taper:.006,scallop:1.25,phase:-Math.PI/2});
      else if(id==='carnation')radial(cx,cy,{count:16,core:3.5,outer:10.8,half:.28,taper:.008,scallop:1.35,phase:-Math.PI/2});
      else if(id==='rose'||id==='peony'){
        const layers=id==='rose'?[{r:11,n:7,half:.36,shade:0},{r:8,n:9,half:.31,shade:1},{r:5,n:6,half:.43,shade:2}]:[{r:11,n:13,half:.19,shade:0},{r:8.5,n:11,half:.24,shade:1},{r:6,n:8,half:.32,shade:2},{r:3.5,n:6,half:.4,shade:3}];
        layers.forEach((l,i)=>radial(cx,cy,{count:l.n,core:0,outer:l.r,half:l.half,taper:.006,scallop:id==='rose'?.9:1.1,phase:-Math.PI/2+i*.24, disk:false}));
        for(let y=0;y<27;y++)for(let x=0;x<WIDTH;x++){const r=Math.hypot(x-cx,y-cy);if(r<=(id==='rose'?2.2:1.6))put(x,y,r<1?colors.seed:colors.centerDark)}
        line(cx-2,cy,cx+2,cy-1,colors.petalLight);
      }else if(id==='lotus'){
        radial(cx,cy,{count:13,core:0,outer:12,half:.205,taper:.004,scallop:.75,phase:-Math.PI/2,disk:false});
        radial(cx,cy+1,{count:9,core:0,outer:8,half:.24,taper:.004,scallop:.4,phase:-Math.PI/2+.2,disk:false});
        for(let y=0;y<27;y++)for(let x=0;x<WIDTH;x++)if(Math.hypot(x-cx,y-cy)<2.2)put(x,y,(x+y)%3?colors.center:colors.seed);
      }else if(id==='lily'){
        radial(cx,cy,{count:6,core:1.6,outer:12,half:.37,taper:-.006,scallop:.9,phase:-Math.PI/2});
        for(let i=0;i<5;i++){line(cx,cy,cx-2+i,cy-5,colors.centerDark);put(cx-2+i,cy-5,colors.seed)}
      }else if(id==='tulip'){
        const rows={3:[[14,16]],4:[[12,14],[17,19]],5:[[10,13],[18,22]],6:[[8,13],[19,25]],7:[[7,15],[18,27]],8:[[6,28]],9:[[5,29]],10:[[4,30]],11:[[4,30]],12:[[4,30]],13:[[5,29]],14:[[7,27]],15:[[10,24]],16:[[13,21]],17:[[15,19]],18:[[16,18]]};
        Object.entries(rows).forEach(([yy,ranges])=>ranges.forEach(([a,b])=>{for(let x=a;x<=b;x++){const y=Number(yy);let c=x<14||x>20?colors.petalShade:colors.petal;if((x+y)%7===0)c=colors.petalLight;put(x,y,c)}}));
        line(17,5,17,16,colors.petalLight);line(13,8,13,14,colors.petalShade);line(21,8,21,14,colors.petalShade);
      }else if(id==='iris'){
        ellipse(14,7,2.8,6.2,-.1,colors.petal,colors.petalLight);ellipse(20,7,2.8,6.2,.1,colors.petal,colors.petalLight);ellipse(17,5,2.5,6.5,0,colors.petalLight,colors.petal);
        ellipse(9,14,6.3,3.2,-.35,colors.petalShade,colors.petalLight);ellipse(25,14,6.3,3.2,.35,colors.petalShade,colors.petalLight);ellipse(17,16,4.2,3.5,0,colors.petal,colors.petalLight);
        for(let x=13;x<=21;x+=2)put(x,15,colors.center);
      }else if(id==='orchid'){
        ellipse(17,5,3.1,5.5,0,colors.petalLight,colors.petal);ellipse(10,10,5.2,3.8,-.35,colors.petal,colors.petalLight);ellipse(24,10,5.2,3.8,.35,colors.petalShade,colors.petalLight);
        ellipse(12,5,3.2,4.4,-.7,colors.petalShade,colors.petalLight);ellipse(22,5,3.2,4.4,.7,colors.petal,colors.petalLight);
        ellipse(17,14,4,4.8,0,colors.center,colors.seed);ellipse(17,13,2,3,0,colors.centerDark,colors.seed);
        for(let y=11;y<17;y+=2){put(15,y,colors.centerDark);put(19,y,colors.centerDark)}
      }else if(id==='bellflower'){
        line(17,12,17,14,colors.stem);bell(10,14,1);bell(17,15,1);bell(25,14,1);bell(14,20,1);bell(22,20,1);
      }else if(id==='hydrangea'){
        const florets=[[17,5],[11,8],[23,8],[7,13],[17,12],[27,13],[11,18],[23,18],[17,21]];florets.forEach(([x,y])=>tinyFloret(x,y,2));
      }else if(id==='lavender'){
        for(let y=8;y<23;y+=3){put(17,y,colors.petalShade);put(16,y-1,colors.petal);put(18,y-1,colors.petal);put(15,y+1,colors.petalLight);put(19,y+1,colors.petalLight)}
        for(let y=11;y<22;y+=5){put(14,y,colors.petal);put(20,y,colors.petalShade)}
      }else if(id==='sakura'){
        [[7,13],[12,19],[29,10],[24,16],[18,21],[5,18]].forEach(([x,y],i)=>blossom(x,y,i%2?3:2.7));
      }else if(id==='snowdrop'){
        line(20,9,20,12,colors.stem);[[0,colors.petalShade],[-1,colors.petal],[1,colors.petal],[0,colors.petalLight]].forEach(([dx,c],i)=>{for(let x=-2+i%2;x<=2-i%2;x++)put(20+x,12+i,c)});
        put(20,15,colors.leaf);put(18,13,colors.leafLight);put(22,13,colors.leafLight);
      }else if(id==='foxglove'){
        line(18,9,18,24,colors.stem);[[22,10],[22,15],[22,20],[14,12],[14,18]].forEach(([x,y],i)=>{line(18,y,x,y+1,colors.stem);bell(x,y+1,1,i%2===0);put(x,y+3,colors.centerDark);put(x+1,y+4,colors.centerDark)});
      }else if(id==='pansy'){
        ellipse(17,6,4.1,5.2,0,colors.petal,colors.petalLight);ellipse(11,10,5.3,4.2,-.45,colors.petalShade,colors.petalLight);ellipse(23,10,5.3,4.2,.45,colors.petal,colors.petalLight);ellipse(13,16,4.4,4.7,.35,colors.petalLight,colors.petal);ellipse(21,16,4.4,4.7,-.35,colors.petalShade,colors.petalLight);
        for(let y=9;y<16;y+=2){put(15,y,colors.centerDark);put(17,y,colors.centerDark);put(19,y,colors.centerDark)}put(17,12,colors.seed);
      }else if(id==='magnolia'){
        for(let i=0;i<6;i++){const a=-Math.PI/2+i*TAU/6,px=cx+Math.cos(a)*4.4,py=cy+Math.sin(a)*4.4;ellipse(px,py,3.1,7.5,a,colors.petal,colors.petalLight)}
        ellipse(cx,cy,2.3,2.3,0,colors.center,colors.seed);
      }
    }
    body();paintHead();
    const out=[];for(let y=0;y<HEIGHT;y++)for(let x=0;x<WIDTH;x++)if(grid[y][x])out.push({x,y,color:grid[y][x]});cache.set(key,out);return out;
  }
  function renderSvg(id,variant=0){const rects=pixelsFor(id,variant).map(p=>'<rect x="'+p.x+'" y="'+p.y+'" width="1" height="1" fill="'+p.color+'"/>').join('');return '<svg viewBox="0 0 '+WIDTH+' '+HEIGHT+'" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false" shape-rendering="crispEdges">'+rects+'</svg>'}
  function drawCanvas(ctx,id,x,y,cell,progress=1,variant=0){ctx.imageSmoothingEnabled=false;const floor=HEIGHT*(1-Math.max(0,Math.min(1,progress)));pixelsFor(id,variant).forEach(p=>{if(p.y<floor)return;ctx.fillStyle=p.color;ctx.fillRect(Math.round(x+p.x*cell),Math.round(y+p.y*cell),Math.ceil(cell),Math.ceil(cell))})}
  window.FlowerArt={width:WIDTH,height:HEIGHT,renderSvg,drawCanvas};
})();

