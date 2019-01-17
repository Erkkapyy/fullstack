import React, { useState } from "react"
import ReactDOM from "react-dom"

const App = props => {
  const initialVotes = Array.apply(null, new Array(anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  )
  const [votes, setVotes] = useState(initialVotes)
  const [selected, setSelected] = useState(0)
  const [best, setBest] = useState(1)
  const [biggest, setBiggest] = useState(0)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button
        text="Next anecdote"
        handleClick={() => setSelected(() => random({ anecdotes }))}
      />

      <Button
        text="Vote"
        handleClick={() =>
          setVotes(() =>
            vote({ selected, votes, biggest, setBest, setBiggest })
          )
        }
      />
      <h1>Anecdote with most votes</h1>
      <Display best={best} anecdotes={anecdotes} />
    </div>
  )
}

const Display = ({ best, anecdotes }) => <p>{anecdotes[best]}</p>

const vote = ({ selected, votes, biggest, setBest, setBiggest }) => {
  const kopio = [...votes]
  kopio[selected] += 1
  if (kopio[selected] > biggest) {
    {
      setBiggest(biggest + 1)
    }
    {
      setBest(selected)
    }
  }
  return kopio
}

const random = ({ anecdotes }) => {
  return Math.floor(Math.random() * anecdotes.length)
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))
