let grid
  =require('fs')
  .readFileSync('input/aoc11.txt','utf8')
  .split('\r\n')
  .map(e=>[...e].map(f=>f=='.'?0:1))

let solve = (grid,part) => {
  let seen=new Set()
  for(let a,i,j,n;;seen.add(grid+'')){
    for(a=[],j=0;j<grid.length;j++)
      for(a[j]=[],i=0;i<grid[j].length;i++)
        a[j][i]=(n=part.nb(grid,j,i))==0 && grid[j][i]==1 ? 2 
               :(n>=part.min && grid[j][i]==2) ? 1 
               : grid[j][i]
    if(seen.has((grid=a)+''))
      return grid.flat().reduce((a,b)=>a+(b==2),0)
  }
}

let n = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]
let v = (grid,val,j,i) => val===(grid[j]||0)[i]

let part1={
  min:4, 
  nb:(grid,j,i)=>n.reduce((a,[q,p])=>a+v(grid,2,j+q,i+p),0)
}
let part2={
  min:5,
  nb:(grid,j,i)=>n.reduce((a,[q,p,z=q,y=p])=>{
    while(v(grid,0,j+z,i+y)){z+=q;y+=p} 
    return a+v(grid,2,j+z,i+y) },0) 
}

console.log(solve(grid,part1))
console.log(solve(grid,part2))