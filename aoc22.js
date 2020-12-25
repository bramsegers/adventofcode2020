let [a,b]
  =require('fs')
  .readFileSync('input/aoc22.txt','utf8')
  .split('\r\n\r\n')
  .map(e=>e.split(`\r\n`).map(e=>+e))
  .map(e=>e.slice(1))


let play=(a,b,part)=>{
  let seen=new Set()
  while(a.length && b.length){
    let key=[a,' ',b].join``
    if(seen.has(key)) return {winner:1, cards:a}
    seen.add(key)
    let [p,q]=[a.shift(),b.shift()]
    let winner=(part==2 && a.length>=p && b.length>=q)
      ? play(a.slice(0,p),b.slice(0,q),part).winner
      : p>q ? 1 : 2
    if(winner==1) {a.push(p);a.push(q)}
    if(winner==2) {b.push(q);b.push(p)}
  }
  return a.length ? {winner:1, cards:a} : {winner:2, cards:b}
}


let score=a=>a.cards.reduce((b,c,i)=>b+c*(a.cards.length-i),0)
let part=n=>score(play([...a],[...b],n))


console.log(part(1))
console.log(part(2))