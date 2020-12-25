let card={n:7, m:20201227, pub_key:1327981}
let door={n:7, m:20201227, pub_key:2822615}


for(let e of [card,door]){
  for(var x=1,i=0;x!=e.pub_key;i++)
    x=(x*e.n)%e.m
  e.loop=i
}

for(var ek=1,i=0;i<card.loop;i++)
  ek=(ek*door.pub_key)%card.m


console.log('card',card)
console.log('door',door)
console.log('encr_key',ek)