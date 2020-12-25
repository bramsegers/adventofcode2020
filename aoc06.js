let input=require('fs').readFileSync('input/aoc06.txt','utf8').split('\r\n\r\n').map(e=>e.split('\r\n'))

let abc=[...'abcdefghijklmnopqrstuvwxyz']
let part1=input.map(e=>e.join('')).reduce((a,b)=>a+new Set(b).size,0)
let part2=input.map(e=>e.reduce((a,b)=>a.filter(c=>b.includes(c)),abc).length).reduce((a,b)=>a+b,0)

console.log(part1)
console.log(part2)