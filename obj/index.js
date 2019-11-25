const objaa = {"a": "1", "b": { "c": "2" }, "d": "3"}

const flatObj = obj => {
  return Object.keys(obj).reduce((pre,cur) => {
    if(typeof obj[cur] === 'object'){
      flatObj(obj[cur])
    }else {
      pre[cur] = obj[cur]
    }
    return pre
  },{})
}

console.log(flatObj(objaa))

