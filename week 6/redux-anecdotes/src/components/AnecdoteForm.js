import React from "react"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { connect } from "react-redux"

const AnecdoteForm = props => {
  const create = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value

    props.addAnecdote(content)
    event.target.anecdote.value = ""
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addAnecdote
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
