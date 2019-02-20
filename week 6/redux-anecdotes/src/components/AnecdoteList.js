import React from "react"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { connect } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteList = props => {
  const anecdotes = props.anecdotes
  anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = anecdote => {
    const name = props.anecdotes.find(a => a.id === anecdote.id).content
    props.voteAnecdote(anecdote)
    props.showNotification(`you voted ${name}`, 3)
    /*props.voteNotification(`you voted ${name}`)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)*/
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === "ALL") {
    return anecdotes
  } else {
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  showNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
