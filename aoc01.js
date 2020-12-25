let N
  =require('fs')
  .readFileSync('input/aoc01.txt','utf8')
  .split('\r\n')

let find = (s,n,a=[],i=0,p=1) => {
  if(s<0 || n<0) return
  if(!(s+n)) console.log(a,p)
  for(let j=i,k=N[j];j<N.length;k=N[++j])
    find(s-k,n-1,[...a,+k],j+1,p*k)
}

find(2020,2)
find(2020,3)