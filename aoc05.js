let IDs
  =require('fs')
  .readFileSync('input/aoc05.txt','utf8')
  .split('\r\n')
  .map(e=>[...e].reduce((a,b)=>a<<1|(/B|R/.test(b)),0))

let part1 = Math.max(...IDs)
let part2 = IDs.find(e=>!IDs.includes(e+1) && IDs.includes(e+2))+1

console.log(part1)
console.log(part2)