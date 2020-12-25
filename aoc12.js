let input
  =require('fs')
  .readFileSync('input/aoc12.txt','utf8')
  .split('\r\n')
  .map(e=>[e[0],+e.slice(1)])

let part1 = _ => {
  let [x,y,i]=[0,0,0]
  for (let [a, b] of input){
    if(a=='R') i=(i+1*b/90)&3
    if(a=='L') i=(i+3*b/90)&3
    if(a=='F') [x,y]=[x+b*[1,0,-1,0][i],y+b*[0,-1,0,1][i]]
    if(a=='E') x+=b
    if(a=='W') x-=b
    if(a=='N') y+=b
    if(a=='S') y-=b
  }
  return (x<0?-x:x)+(y<0?-y:y)
}

let part2 = _ => {
  let [x,y,p,q]=[0,0,10,1]
  for (let [a, b] of input){
    if(a=='R') [p,q]=[[p,q],[q,-p],[-p,-q],[-q,p]][(1*b/90)&3]
    if(a=='L') [p,q]=[[p,q],[q,-p],[-p,-q],[-q,p]][(3*b/90)&3]
    if(a=='F') [x,y]=[x+b*p,y+b*q]
    if(a=='E') p+=b
    if(a=='W') p-=b
    if(a=='N') q+=b
    if(a=='S') q-=b
  }
  return (x<0?-x:x)+(y<0?-y:y)
}

console.log(part1())
console.log(part2())