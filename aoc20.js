let input
  =require('fs').readFileSync('input/aoc20.txt','utf8')
  .split('\r\n\r\n').map(e=>e.split('\r\n'))
  .map(e=>({id:+e.shift().match(/\d+/)[0],ar:e.map(e=>[...e])}))


let part1, part2
let N=input[0].ar.length
let S=Math.sqrt(input.length)


let flpY=a=>a.map(e=>[...e].reverse())
let rotR=a=>{for(var r=[],j,i=0;i<N;i++)for(r[i]=[],j=0;j<N;j++)r[i][j]=a[N-j-1][i];return r}
let transform=(a,t)=>{for(let i=0;i<(t>>1);i++)a=rotR(a);return t&1?flpY(a):a}
let matchUD=(a,b)=>a[N-1].join``==b[0].join``
let matchLR=(a,b)=>a.map(e=>e[e.length-1]).join``==b.map(e=>e[0]).join``


let monster=
    [ '                  # '
    , '#    ##    ##    ###'
    , ' #  #  #  #  #  #   ' ]
  .map((e,j)=>[...e].reduce((a,b,i)=>b=='#'?[...a,[j,i]]:a,[])).flat()
let is_monster=(a,j,i)=>monster.every(([y,x])=>(a[j+y]||[])[i+x]=='#')


let solve=(k,i,a)=>{
  if(k==S*S) {s=a;part1=i[0]*i[S-1]*i[S*(S-1)]*i[S*S-1]}
  let [y,x]=[~~(k/S),k%S]
  for(let {id,ar} of input)
    if(!i.includes(id))
      for(let t=0;t<(k==0?1:8);t++){
        let T=transform(ar,t)
        if((!y || matchUD(a[k-S],T))
         &&(!x || matchLR(a[k-1],T)))
          solve(k+1,[...i,id],[...a,T])
      }
}


let s=[]
solve(0,[],[])
console.log({part1})


let a=[]
for(let m,k,j,i=0;i<S;i++) for(j=0;j<N-2;j++)
  for(a[(N-2)*i+j]=[],k=0;k<S;k++) for(m=0;m<N-2;m++)
    a[(N-2)*i+j].push(s[S*i+k][j+1][m+1])
N=(N-2)*S


for(let t=0;t<8;t++){
  let loc=[], T=transform(a,t)
  for(let j=0;j<N;j++) for(let i=0;i<N;i++)
    if(is_monster(T,j,i)) loc.push([j,i])
  if(loc.length){
    for(let [j,i] of loc) for(let [y,x] of monster) T[j+y][i+x]='O'
    part2=T.flat().reduce((a,b)=>a+(b=='#'),0)
    console.log({part2})
  }
}