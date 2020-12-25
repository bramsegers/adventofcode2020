let foods
  =require('fs').readFileSync('input/aoc21.txt','utf8')
  .split('\r\n').map(e=>e.split(' (contains '))
  .map(([a,b])=>({
    ingr:a.split(' '),
    allg:b.slice(0,-1).split(', ')}))

let findAI = A => {
  for(let a of A){ let s
    for(let {ingr} of foods.filter(e=>e.allg.includes(a)))
      if(s) s=new Set(ingr.filter(e=>s.has(e)))
      else s=new Set(ingr)
    if(s.size>1) continue
    let i=[...s][0]; A.delete(a)
    foods=foods.map(({ingr,allg})=>({
      ingr:ingr.filter(e=>e!=i),
      allg:allg.filter(e=>e!=a)}))
    return [a,i]
  }
}

let F=[], A=new Set(foods.map(e=>e.allg).flat())
while(A.size) F.push(findAI(A))

let part1=foods.map(e=>e.ingr).flat().reduce((a,b)=>a+!F.map(e=>e[1]).includes(b),0)
let part2=F.sort((a,b)=>a[0].localeCompare(b[0])).map(e=>e[1]).join`,`
console.log({part1,part2})