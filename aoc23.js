let input='716892543'

let solve=(max,rep)=>{
  
  let N={}, s=[...input].map(e=>+e)
  for(let i=s.length;i<max;) s[i]=++i
  for(let val of s) N[val]={val}
  for(let i=0;i<max;) N[s[i]].next=N[s[++i==max?0:i]]
  
  for(let a,b,c,dst,cur=N[s[0]];rep--;){
    a=cur.next; b=a.next; c=b.next
    dst=cur.val-1; if(!dst) dst=max
    while(dst==a.val || dst==b.val || dst==c.val)
      if(!--dst) dst=max
    let t=N[dst].next
    cur.next=c.next
    N[dst].next=a
    cur=cur.next
    c.next=t
  }
  return N
}

let part1=()=>{
  let a='', N=solve(9,100); n=N[1]
  while((n=n.next)!=N[1]) a+=n.val
  return +a
}

let part2=()=>{
  let n=solve(1000000,10000000)[1].next
  return n.val*n.next.val
}

console.log(part1())
console.log(part2())