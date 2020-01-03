const objToStr = obj => {
  return Object.entries(obj).reduce((pre, [key, val], index) => {
    const symbol = pre.length === 0 ? '?' : '&'
    pre += typeof val === 'number' ? `${symbol}${key}=${val}` : ''
    return pre
  }, '')
}

console.log(objToStr({ a: 1, b: 2 }), 'oooo')

const countobj = arr =>
  arr.reduce((pre, cur) => {
    pre[cur] = (pre[cur] || 0) + 1
    return pre
  }, {})

console.log(countobj([1, 2, 3, 2, 4, 3, 5]))
