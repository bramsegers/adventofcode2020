let input
=   require('fs')
.   readFileSync('input/aoc18.txt','utf8')
.   split('\r\n').map(e=>e.replace(/ /g,''))

,   part1=s=>s
,   part2=s=>(m=>m?part2(s.replace(m[0],eval(m[0]))):s)(s.match(/\d+\+\d+/))

,   solve=p=>f=s=>(m=>m?f(s.replace(m[0],f(m[1]))):p(s).match(/\d+|\+|\*/g)
.   reduce((a,b,i,m)=>i&1?a:(!i||m[i-1]=='+')?+b+a:+b*a,0))(s.match(/\(([^\(\)]+)\)/))  

console.log(input.reduce((a,b)=>solve(part1)(b)+a,0))
console.log(input.reduce((a,b)=>solve(part2)(b)+a,0))