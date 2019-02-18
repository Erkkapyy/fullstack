export const filterChange = filter => {
  return {
    type: "SET_FILTER",
    data: filter
  }
}

const reducer = (state = "ALL", action) => {
  console.log("filter reducer action: ", action)
  console.log("filter reducer state: ", state)
  switch (action.type) {
    case "ALL":
      return "ALL"
    case "SET_FILTER":
      console.log("hello gais")
      return action.data
    default:
      return state
  }
}

export default reducer
