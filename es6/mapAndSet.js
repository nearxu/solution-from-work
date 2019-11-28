
const m1 = new Map([['a',111],['b',222]])

// has get map.keys / map.values / forEach
for(let [key,val] of m1){
  console.log(key+':'+val)
}

const mArr = [...m1] // map => arr

// map => obj
const obj = {}
for(let [key,val] of m1){
  obj[key] = val
}
console.log(obj)

// has add forEach entries
const mySet = new Set([1,2,3,4])