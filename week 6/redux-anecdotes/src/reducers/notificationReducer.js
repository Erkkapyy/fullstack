const initialState = "Tämä on notifikaatio"

export const voteNotification = content => {
  return {
    type: "VOTE_NOTIFICATION",
    data: content
  }
}

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION"
  }
}

const reducer = (state = initialState, action) => {
  console.log("noteification reducer action: ", action)
  console.log("notification reducer state: ", state)
  switch (action.type) {
    case "VOTE_NOTIFICATION":
      return action.data
    case "HIDE_NOTIFICATION":
      return null
    default:
      return state
  }
}

export default reducer
