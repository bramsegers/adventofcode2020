let solve=([nums,N])=>{
  for(let num,m=new Map(),i=0;;){
    num = i<nums.length ? nums[i] : m.get(num)[1]-m.get(num)[0]
    m.set(num,m.has(num) ? [m.get(num)[1],i] : [i,i])
    if(++i==N) return console.log(num)
  }
}

let part1=[[2,0,1,9,5,19], 2020]
let part2=[[2,0,1,9,5,19], 30000000]

solve(part1)
solve(part2)