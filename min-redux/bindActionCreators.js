const bindActionCreators = (actionCreators, dispatch) => {
  let boundActions = {}
  Object.keys(actionCreators).forEach(key => {
    boundActions[key] = function(...args) {
      dispatch(actionCreators[key](...args))
    }
  })
  return boundActions
}

module.exports = bindActionCreators
