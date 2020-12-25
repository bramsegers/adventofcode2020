let input
  =require('fs')
  .readFileSync('input/aoc16.txt','utf8')
  .split('\r\n\r\n')
  .map(e=>e.split('\r\n'))


let ticket = input[1][1].split`,`.map(e=>+e)
let nearby = input[2].slice(1).map(e=>e.split`,`.map(e=>+e))
let fields = input[0].map(e=>e.split`: `)
              .map(([k,v])=>[k,v.match(/\d+/g).map(e=>+e)])


let part1 = _ => nearby
  .map(e=>e.filter(n=>!fields.some(([_,[a,b,c,d]])=>
    (n>=a&&n<=b)||(n>=c&&n<=d)))).flat().reduce((a,b)=>a+b,0)


let part2 = _=> {
  
  let tickets=[ticket,...nearby.filter(e=>e.every(n=>
    fields.some(([_,[a,b,c,d]])=>(n>=a&&n<=b)||(n>=c&&n<=d))))]

  let poss=fields.map((_,i)=>tickets.map(e=>e[i])).map(e=>
    [e,fields.filter(([_,[a,b,c,d]])=>e.every(n=>(n>=a&&n<=b)||
      (n>=c&&n<=d))).map(e=>e[0])]).map(e=>[e[1],0])
  
  let reduce=(poss)=>{
    let f=poss.find(e=>e[0].length==1 && e[1]==0)
    return f ? reduce(poss.map(e=>e==f?[e[0],1]:[e[0]
      .filter(e=>e!=f[0][0]),e[1]])) : poss
  }
  
  let r=reduce(poss).map((e,i)=>[e[0],ticket[i]]) //;console.log(r)
  return r.filter(e=>/departure/.test(e[0])).reduce((a,b)=>a*b[1],1)
}


console.log(part1())
console.log(part2())