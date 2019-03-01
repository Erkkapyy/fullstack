export const showNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION"
      })
    }, time * 1000)
  }
}

const reducer = (state = null, action) => {
  console.log("noteification reducer action: ", action)
  console.log("notification reducer state: ", state)
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.data
    case "HIDE_NOTIFICATION":
      return null
    default:
      return state
  }
}

export default reducer
