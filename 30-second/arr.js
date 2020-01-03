const compose = (...fns) => arg => fns.reduce((pre, cur) => pre(cur(arg)))

const fn = x => x + 1
const fn2 = x => x + 2

console.log(compose(fn, fn2)(0))

const pipAsyncFn = (...fns) => arg =>
  fns.reduce((pre, cur) => pre.then(cur), Promise.resolve(arg))

const sum = pipAsyncFn(
  x => x + 1,
  x => x + 2,
  x => new Promise(resolve => setTimeout(() => resolve(x + 3), 1000)),
  async x => (await x) + 4
)

;(async () => {
  console.log(await sum(0))
})()

const remove = (arr, fnc) => (Array.isArray(arr) ? arr.filter(fnc) : [])

console.log(remove([1, 2, 3, 4], n => n % 2 === 0))

const join = arr => arr.join('')

console.log(join([1, 2, 3, 4]))

const diff = (a, b, fn) => {
  const s = new Set(b.map(fn))
  return a.map(fn).filter(m => !s.has(m))
}

console.log(diff([1, 2, 3, 4], [3.3, 4.2], Math.floor))

const findLastIndex = (arr, fn) => {}
