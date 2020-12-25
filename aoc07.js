let bags
  =require('fs')
  .readFileSync('input/aoc07.txt','utf8')
  .split('\r\n')
  .map(e=>e.split(' bags contain '))
  .map(([a,b])=>
    [a,b.split`, `
        .map(e=>e.replace(/ (bag)s?\.?$/, ''))
        .map(e=>e.split` `)
        .map(([a,...b])=>[+a,b.join` `])
        .filter(e=>e[0]>0)])
  .reduce((a,[k,v])=>(a[k]=v,a),{})


let part1 = c => {
  let ans=0, seen=[], nodes=[c]
  for(let n of nodes) for(let b in bags)
    if(!seen[b] && bags[b].some(e=>e[1]==n)){
      nodes.push(b); seen[b]=1; ans++}
  return ans
}


let part2 = (c,n) => {
  let ans=n
  for(let [n2,c2] of bags[c])
    ans+=n*part2(c2,n2)
  return ans
}


console.log(part1('shiny gold'))
console.log(part2('shiny gold',1)-1)