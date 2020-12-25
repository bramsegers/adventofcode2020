let nums
  =require('fs')
  .readFileSync('input/aoc09.txt','utf8')
  .split('\r\n')
  .map(e=>+e)

let part1 = (pre=25) => {
  let valid = n => {
    for(let i=n-pre;i<n;i++)
      for(let j=i+1;j<n;j++)
        if(nums[i]+nums[j]==nums[n])
          return 1
  }
  for(let i=pre;;i++)
    if(!valid(i)) return nums[i]
}

let part2 = (num=part1()) => {
  let sums=nums.reduce((a,b,i)=>(a[i]=~~a[i-1]+b,a),[])
  for(let i=0;i<sums.length;i++)
    for(let j=i+1;j<sums.length;j++)
      if(sums[j]-sums[i]==num)
        return Math.min(...nums.slice(i+1,j+1)) +
               Math.max(...nums.slice(i+1,j+1))
}

console.log(part1())
console.log(part2())