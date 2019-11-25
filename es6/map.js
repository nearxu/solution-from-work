var myMap = new Map()

var keyObj  = {},keyFn = function () {},keyString = '1234';

myMap.set(keyString,'string')
myMap.set(keyObj,'obj')
myMap.set(keyFn,'fn')


console.log(myMap.size)

console.log(myMap.get(keyString))

console.log(myMap.get({}))


for(let [key,val] of myMap){
  console.log('key:'+key+' val:'+val)
}