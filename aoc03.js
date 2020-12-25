let input
  =require('fs')
  .readFileSync('input/aoc03.txt','utf8')
  .split('\r\n')

let trees = (x,y) => {
  for(var t=0,i=0,j=0;j<input.length;j+=y,i+=x)
    t+=input[j][i%input[j].length]=='#'
  return t
}

let part1=trees(3,1)
let part2=[[1,1],[3,1],[5,1],[7,1],[1,2]].reduce((a,[x,y])=>a*trees(x,y),1)

console.log(part1)
console.log(part2)