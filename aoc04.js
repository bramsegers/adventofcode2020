let passports
  =require('fs')
  .readFileSync('input/aoc04.txt','utf8')
  .split('\r\n\r\n')
  .map(e=>e.replace(/\r\n/g,' '))
  .map(e=>e.split(' ').map(e=>e.split`:`))
  .map(e=>e.reduce((p,[k,v])=>(p[k]=v,p),{}))

let part1 = p => 'byr,iyr,eyr,hgt,hcl,ecl,pid'.split`,`.every(e=>p[e])

let part2 = p => {
  if(!part1(p)) return
  if(+p.byr<1920 || +p.byr>2002) return                     // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  if(+p.iyr<2010 || +p.iyr>2020) return                     // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  if(+p.eyr<2020 || +p.eyr>2030) return                     // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  if(!p.hgt.match(/^\d+(cm|in)$/)) return                   // hgt (Height) - a number followed by either cm or in.
  let h=+p.hgt.match(/\d+/)                                 //  If height: 
  if(p.hgt.match(/cm/) && (h<150 || h>193)) return          //  - in cm, the number must be at least 150 and at most 193.
  if(p.hgt.match(/in/) && (h< 59 || h> 76)) return          //  - in in, the number must be at least 59 and at most 76.
  if(!p.hcl.match(/^#[a-f\d]{6}$/)) return                  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  if(!p.ecl.match(/^amb|blu|brn|gry|grn|hzl|oth$/)) return  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  if(!p.pid.match(/^[\d]{9}$/)) return                      // pid (Passport ID) - a nine-digit number, including leading zeroes.
  return 'valid :)'                                         // cid (Country ID) - ignored, missing or not.
}

let count=f=>passports.reduce((a,p)=>a+!!f(p),0)

console.log(count(part1))
console.log(count(part2))