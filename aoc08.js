let program
  =require('fs')
  .readFileSync('input/aoc08.txt','utf8')
  .split('\r\n')
  .map(e=>({
    opr:e.slice(0,3),
    arg:+e.slice(4)
  }))

let run = prog => {
  let len=prog.length
  let seen=Array(len).fill(0)
  for (let value=0,ip=0;;){
    let {opr,arg} = prog[ip]||{}
    if(ip==len)      return { value, status:'finished'  }
    if(!prog[ip])    return { value, status:'invalid ip'}
    if(++seen[ip]>1) return { value, status:'loop'      }
    if(opr=='acc')   {ip++;value+=arg}
    if(opr=='jmp')   ip+=arg
    if(opr=='nop')   ip++
  }
}

let part1 = run

let part2 = prog => {
  for(let instr of prog) {
    if(instr.opr=='acc') continue
    instr.opr=(instr.opr=='nop')?'jmp':'nop'
    if((r=run(prog)).status=='finished') return r
    instr.opr=(instr.opr=='nop')?'jmp':'nop'
  }
}

console.log(part1(program))
console.log(part2(program))