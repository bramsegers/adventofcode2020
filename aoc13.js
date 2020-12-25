let input=require('fs').readFileSync('input/aoc13.txt','utf8').split('\r\n')
let buses=input[1].split`,`.map((e,i)=>[+e,i]).filter(e=>!isNaN(e[0]))
let arrival=+input[0]


/**
* Finds a number x such that:
* x = c1 mod m1, x = c2 mod m2, x = c3 mod m3, ...
* Values in mods must be mutually prime
* @param {[BigInt]} con constraints
* @param {[BigInt]} mod modulo's
* @returns {BigInt} x
*/
let CRT=(con,mod)=>{

  let euclid=(a,b)=>{
    if(b>a){let e=euclid(b,a); return [e[1],e[0]]}
    let q=a/b,r=q*b;if(a==r) return [0n,1n]
    let e=euclid(b,a-r); return [e[1],e[0]-q*e[1]]
  }
  let leastPosEquiv=(a,m)=>
    (m<0) ? leastPosEquiv(a,-m) :
    (a<0) ? -leastPosEquiv(-a,m)+m : a%m

  let x=0n,m=1n
  for(let i=0;i<mod.length;i++) m*=mod[i]
  for(let i=0;i<mod.length;i++) x+=(m/mod[i])*con[i]*euclid(m/mod[i],mod[i])[0]
  return leastPosEquiv(x,m)
}


let part1
  =buses
  .map(([id])=>[id,(id-(arrival%id))%id])
  .reduce(([ans,min],[id,wait])=>wait<min?[id*wait,wait]:[ans,min],[,Infinity])[0]


let part2
  =CRT(
    buses.map(([id,index])=>BigInt(id-index)),
    buses.map(([id])=>BigInt(id)) )


console.log(part1)
console.log(part2)