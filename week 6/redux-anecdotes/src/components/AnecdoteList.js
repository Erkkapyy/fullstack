import React from "react"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import {
  voteNotification,
  hideNotification
} from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecdoteList = props => {
  const anecdotes = props.anecdotes
  anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = id => {
    const name = props.anecdotes.find(anecdote => anecdote.id === id).content
    props.voteAnecdote(id)
    props.voteNotification(`you voted ${name}`)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
    console.log("vote", id)
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
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
  voteNotification,
  hideNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
