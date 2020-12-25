let input
    =require('fs')
    .readFileSync('input/aoc02.txt','utf8')
    .split('\r\n')
,   part1=0
,   part2=0


for(let i of input){
  let [a,b,c,p]=i.match(/([a-z\d])+/g)
  let f=0; for(let e of p) f+=(e==c)
  part1+=(f>=+a)&&(f<=+b)
  part2+=(p[a-1]==c)^(p[b-1]==c)
}


console.log(part1)
console.log(part2)