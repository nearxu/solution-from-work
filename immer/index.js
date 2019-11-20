import {produce} from 'immer'

let currentState = {
  a:[],
  p:{
    x:1
  }
}

let nextState = produce(currentState,draft => {
  draft.a.push(2)
})

const a = currentState.a === nextState.a;
const p = nextState.p === currentState.p;

console.log(a,p)


