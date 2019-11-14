##### api from : https://redux-saga-in-chinese.js.org/docs/introduction/BeginnerTutorial.html

import {delay} from 'redux-saga'
import {put,takeEvery,all,call} from 'redux-saga/effects'

export function* increseAsync() {
  yield delay(1000)
  yield put({type:'INCREMENT'})
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC',increseAsync)
}

export function* helloSaga() {
  console.log('hello saga!')
}

const sleep = (delay) => new Promise((resolve,reject) => setTimeout(() => {
  resolve
}, delay))


function* cancelIncrement() {
  // yield delay(1000) why not ???
  yield call(delay,1000)
  yield put({type:'INCREMENT'})
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}

const sagaMiddleware = createSgaMiddleware()
const createStoreFn = () => {
  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}

const Store = createStoreFn()

console.log(Store,'store')

const action = type => Store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={Store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={()=> action('INCREMENT_ASYNC')}
      onCancelIncrementAsync={()=> action('CANCEL_INCREMENT_ASYNC')}
    />,
    document.getElementById('root')
  )
}