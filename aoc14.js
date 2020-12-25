let program
  =require('fs')
  .readFileSync('input/aoc14.txt','utf8')
  .split('\r\n')


let LEN=36
let INT=n=>parseInt(n.join``,2)
let SUM=m=>Object.values(m).reduce((a,b)=>a+b,0)
let MSK=(n,m,u)=>[...(+n).toString(2).padStart(LEN,0)].map((e,i)=>m[i]==u?e:m[i])


let part1=_=>{
  let mem={},mask
  for(let p of program)
    if(/mask/.test(p)) mask=p.split` = `[1]
    else {let [a,b]=p.match(/\d+/g); b=MSK(b,mask,'X'); mem[a]=INT(b)}
  return SUM(mem)
}


let part2=_=>{
  let mem={},mask
  let f=(i,a,b)=>{
    if(i==LEN) mem[INT(a)]=+b
    else if(a[i]!='X') f(i+1,a,b)
    else {f(i+1,a.map((e,j)=>i==j?0:e),b); f(i+1,a.map((e,j)=>i==j?1:e),b)}
  }
  for(let p of program)
    if(/mask/.test(p)) mask=p.split` = `[1]
    else {let [a,b]=p.match(/\d+/g); f(0,MSK(a,mask,'0'),b)}
  return SUM(mem)
}

console.log(part1())
console.log(part2())