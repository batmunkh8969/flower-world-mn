/* On-demand scientific-name lookup; one compact WCVP letter shard is fetched per search. */
(()=>{'use strict';
  const input=document.getElementById('plant-index-search'),results=document.getElementById('plant-index-results'),status=document.getElementById('plant-index-status');
  if(!input||!results||!status)return;
  const cache=new Map();let sequence=0;

  function load(letter){
    if(!cache.has(letter)){
      const request=fetch(`./plant-index/${letter}.json.gz.b64`)
        .then(response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.text()})
        .then(encoded=>{
          if(typeof DecompressionStream==='undefined')throw new Error('This browser cannot decode the compressed name index');
          const binary=atob(encoded.trim()),bytes=new Uint8Array(binary.length);
          for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
          const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
          return new Response(stream).json();
        })
        .then(rows=>{if(!Array.isArray(rows))throw new Error('Invalid index shard');return rows})
        .catch(error=>{cache.delete(letter);throw error});
      cache.set(letter,request);
    }
    return cache.get(letter);
  }

  function appendResult(record){
    const item=document.createElement('article');item.className='plant-result';
    const name=document.createElement('i');name.className='plant-result-name';name.textContent=record.n;
    const detail=document.createElement('span');detail.className='plant-result-detail';
    const family=document.createElement('span');family.textContent=record.f?`Овог · ${record.f}`:'Овог тодорхойгүй';
    const author=document.createElement('span');author.textContent=record.a||'Нэрийн зохиогч тэмдэглэгдээгүй';detail.append(family,author);
    const source=document.createElement('a');source.href=`https://powo.science.kew.org/results?q=${encodeURIComponent(record.n)}`;source.target='_blank';source.rel='noopener noreferrer';source.textContent='POWO ↗';source.setAttribute('aria-label',`${record.n} нэрийг Кьюгийн Plants of the World Online дээр нээх`);
    item.append(name,detail,source);results.append(item);
  }

  async function render(){
    const current=++sequence,query=input.value.trim().toLocaleLowerCase();results.replaceChildren();
    if(query.length<2){status.textContent='Хайж эхлэхийн тулд латин шинжлэх ухааны нэрийн эхний хоёр үсгийг бичээрэй.';return}
    const letter=query.match(/[a-z]/i)?.[0]?.toLowerCase();
    if(!letter){status.textContent='Энэ сан шинжлэх ухааны латин нэрээр хайна. Монгол нэрсийг цэцгийн дэвтрийн дээрх хайлтаар олоорой.';return}
    status.textContent='Кьюгийн нэрийн хэсгийг ачаалж байна…';
    try{
      const records=await load(letter);if(current!==sequence)return;
      const matches=records.filter(record=>record.n.toLocaleLowerCase().includes(query)).sort((a,b)=>a.n.localeCompare(b.n));
      if(!matches.length){status.textContent='Энэ хэсгээс тохирох нэр олдсонгүй. Бүтэн латин төрөл эсвэл зүйлийн нэрээр хайгаарай.';return}
      const shown=matches.slice(0,40);shown.forEach(appendResult);
      status.textContent=`${matches.length.toLocaleString('en-US')} үр дүн олдлоо. Эхний ${shown.length}-ыг харуулж байна · ${(records.length).toLocaleString('en-US')} нэртэй үсгийн хэсэг ачаалсан.`;
    }catch(error){
      if(current!==sequence)return;
      status.textContent='Нэрийн санг татаж чадсангүй. Интернэтээ шалгаад дахин оролдоорой.';
      console.error('WCVP name index request failed:',error);
    }
  }

  input.addEventListener('input',render);
})();

