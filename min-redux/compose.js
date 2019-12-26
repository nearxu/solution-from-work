const curry = a => b => a(b)(...args)

const es5Compose = fns => {
  return fns.reduce((pre, cur) => {
    return (...args) => pre(cur(...args))
  })
}

const compose = (...fns) => {
  if (fns.length === 0) return arg => arg

  if (fns.length === 1) return fns[0](arg)

  return fns.reduce((pre, cur) => (...args) => pre(cur(...args)))
}

function func1(num) {
  console.log('func1 获得参数 ' + num)
  return num + 1
}

function func2(num) {
  console.log('func2 获得参数 ' + num)
  return num + 2
}

function func3(num) {
  console.log('func3 获得参数 ' + num)
  return num + 3
}

compose(func3, func2, func1)(0)

module.exports = compose
