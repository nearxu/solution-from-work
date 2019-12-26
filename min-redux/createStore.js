// https://blog.seosiwei.com/detail/13

function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore(reducer))
  }

  // some error
  // let currentState = initState;
  let currentState

  // let currentReduce = reducer;
  function getState() {
    return currentState
  }
  function dispatch(action) {
    currentState = reducer(currentState, action)
    // add listeners
    // for (let i = 0; i < listeners.length; i++) {
    //   const listener = listeners[i];
    //   listener();
    // }
    // simple use
    listeners.forEach(listener => listener())
    return action
  }
  // subscribe
  let listeners = []
  function subscribe(listener) {
    listeners.push(listener)
    return function unSubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  // why use init first beacuse ,not ,will fist reducer will state undefined
  // so use dispatch
  dispatch({
    type: '@init/redux'
  })
  return {
    getState,
    subscribe,
    dispatch
  }
}

// some test

// action
const ADD_TODO = 'ADD_TODO'

// reducer
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const store = createStore(todos, ['createState'])

console.log(store.getState())

store.dispatch({ type: 'ADD_TODO', text: 'add text' })

console.log(store.getState())

// v2 subscribe

let currentVal = 'now init preval'

function handleChange() {
  let preVal = currentVal
  currentVal = store.getState()
  if (preVal !== currentVal) {
    console.log('store preval: ' + preVal + 'change to: ' + currentVal)
  }
}

let unSubscribe = store.subscribe(handleChange)

store.dispatch({
  type: 'ADD_TODO',
  text: 'add subscribe for every action dispath'
})

store.dispatch({ type: 'ADD_TODO', text: 'please subscibe' })
console.log(store.getState())

module.exports = createStore
