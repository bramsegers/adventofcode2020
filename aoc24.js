let input
  =require('fs')
  .readFileSync('input/aoc24.txt','utf8')
  .split('\r\n')

let d={'se':[0,1],'sw':[-1,1],'nw':[0,-1],'ne':[1,-1],'e':[1,0],'w':[-1,0]}
let f={}

let part1=()=>{
  for(let i of input){
    let [x,y]=[0,0]
    for(let e of i.match(/se|sw|nw|ne|e|w/g))
      [x,y]=[x+d[e][0],y+d[e][1]]
    if(f[[x,y]]) delete f[[x,y]]
    else f[[x,y]]=[x,y]
  }
  return Object.keys(f).length
}

let part2=()=>{
  for(let i=0;i<100;i++){
    let g={},h={}
    for(let k in f){
      let [x,y]=f[k],n=0
      for(let [p,q] of Object.values(d))
        if(f[[x+p,y+q]]) n++
        else h[[x+p,y+q]]=[x+p,y+q]
      if(n==1 || n==2) g[k]=f[k]
    }
    for(let k in h){
      let [x,y]=h[k],n=0
      for(let [p,q] of Object.values(d))
        if(f[[x+p,y+q]]) n++
      if(n==2) g[k]=h[k]
    }
    f=g
  }
  return Object.keys(f).length
}

console.log(part1())
console.log(part2())