const floatArr = (list:T[]):T[] => {
  return list.reduce((pre,cur) => pre.concat(Array.isArray(cur) ? floatArr(cur):cur),[])
}

console.log(floatArr([1,[2,3,[4]]]))

const isNullOrUndefined = value => {
  return value === null || value === undefined
}

const isObject = value => {
  return !isNullOrUndefined(value) && !Array.isArray(value) && typeof value === 'object'
}

const isObjectEmpty = value => {
  return typeof value === 'object' && Object.keys(value).length
}