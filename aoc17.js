let grid
  =require('fs')
  .readFileSync('input/aoc17.txt','utf8')
  .split('\r\n')
  .map((e,j)=>e.split``.map((e,i)=>[j,i,0,e=='#'?0:-1])
  .filter(e=>e[3]==0)).flat().reduce((a,b)=>(a[b]=b,a),{})
  

let solve = (cycles,dimensions,grid) => {
  for(let d=dimensions-3;cycles--;){
    let i,j,k,m,s,t,f={}
    for(let e in grid){
      let [x,y,z,w]=grid[e]
      if(!f[grid[e]]) f[grid[e]]=[x,y,z,w,1,0]
      f[grid[e]][5]--
      for(i=x-1;i<=x+1;i++)
        for(j=y-1;j<=y+1;j++)
          for(k=z-1;k<=z+1;k++)
            for(m=(w-1)*d;m<=(w+1)*d;m++){
              s=[i,j,k,m],t=grid[[i,j,k,m]]?1:0
              if(!f[s]) f[s]=[i,j,k,m,t,0]
              f[s][5]++ }
    }
    grid={}
    for(let [x,y,z,w,a,n] of Object.values(f))
      if((a && n==2) || n==3) grid[[x,y,z,w]]=[x,y,z,w]
  }
  return Object.keys(grid).length
}

console.log(solve(6,3,grid))
console.log(solve(6,4,grid))