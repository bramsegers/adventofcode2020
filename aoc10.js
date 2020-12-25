let adapters
  =require('fs')
  .readFileSync('input/aoc10.txt','utf8')
  .split('\r\n')
  .map(e=>+e)
  .sort((a,b)=>a-b)

let part1 = _ => {
  let f={1:0,3:1}, b=0
  for(let a of adapters)
    [f[a-b],b]= [f[a-b]+1,a]
  return f[1]*f[3]
}

let part2 = (i=0,mem=[]) => {
  if(i==adapters.length) return 1
  if(mem[i]>=0) return mem[i]
  let ans=0, max=~~adapters[i-1]+3
  for(let j=i;adapters[j]<=max;j++)
    ans+=part2(j+1,mem)
  return mem[i]=ans
}

console.log(part1())
console.log(part2())