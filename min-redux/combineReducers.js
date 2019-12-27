const combineReducers = reducers => {
  return (state = {}, action) => {
    let combineState = {}
    Object.keys(reducers).forEach(name => {
      combineState[name] = reducers[name](state[name], action)
    })
    return combineState
  }
}

module.exports = combineReducers
