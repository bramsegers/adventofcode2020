let input
  =require('fs')
  .readFileSync('input/aoc19.txt','utf8')
  .split('\r\n\r\n')

let rules
  =input[0]
  .split('\r\n')
  .map(e=>e.replace(/"/g,''))
  .map(e=>e.split(':'))
  .map(([k,v])=>[k,/\|/.test(v)?` (${v} )`:v])
  .reduce((a,[k,v])=>(a[+k]=v+' ',a),[])

let messages
  =input[1]
  .split('\r\n')

let solve = part => {
  if(part==2){
    rules [8]=' ( 42 )+  '
    rules[11]=' ( 42 ){n} ( 31 ){n} '
  }
  let m,r,ans=0,z=rules[0]
  while(m=z.match(/ \d+ /))
    z=z.replace(m[0],rules[+m[0]])
  for(let n=(part==1?1:10);n;n--){
    r=RegExp(`^${z}$`.replace(/ /g,'').split`n`.join(n))
    ans+=messages.reduce((a,b)=>a+r.test(b),0)
  }
  return ans
}
  
console.log(solve(1))
console.log(solve(2))