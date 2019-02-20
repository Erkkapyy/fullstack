import anecdoteService from "../services/anecdotes"

export const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.replace(id)
    dispatch({
      type: "VOTE",
      data: updatedAnecdote
    })
  }
}

export const addAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log("state now: ", state)
  console.log("action", action)
  switch (action.type) {
    case "VOTE":
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => id === anecdote.id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      console.log(changedAnecdote)
      const newState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )

      return newState

    case "NEW_ANECDOTE":
      return state.concat(action.data)
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export default reducer
