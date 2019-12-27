const compose = require('./compose')
const createStore = require('./createStore')

const applyMiddleware = (...middlewares) => {
  return createStore => {
    return (reducer, preState, enhancer) => {
      const store = createStore(reducer, preState, enhancer)
      let dispatch = store.dispatch
      let chain = []

      let middlewareApi = {
        getState: store.getState,
        dispatch: action => dispatch(action)
      }

      chain = middlewares.map(middleware => middleware(middlewareApi))
      dispatch = compose(...chain)(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
  }
}

function middleware1(store) {
  return function(next) {
    return function(action) {
      console.log('A middleware1 开始')
      next(action)
      console.log('B middleware1 结束')
    }
  }
}

function middleware2(store) {
  return function(next) {
    return function(action) {
      console.log('C middleware2 开始')
      next(action)
      console.log('D middleware2 结束')
    }
  }
}

function middleware3(store) {
  return function(next) {
    return function(action) {
      console.log('E middleware3 开始')
      next(action)
      console.log('F middleware3 结束')
    }
  }
}

function reducer(state, action) {
  if (action.type === 'MIDDLEWARE_TEST') {
    console.log('======= G =======')
  }
  return {}
}

var store = createStore(
  reducer,
  applyMiddleware(middleware1, middleware2, middleware3)
)

console.log(store, 'store')

store.dispatch({ type: 'MIDDLEWARE_TEST' })

module.exports = applyMiddleware
