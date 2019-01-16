import React, { useState } from "react"
import ReactDOM from "react-dom"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button text="Hyvä" handleClick={() => setGood(good + 1)} />
      <Button text="Neutraali" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Huono" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistiikka</h1>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistiikka</h1>
      <Display grade="Hyvä: " counter={good} />
      <Display grade="Neutraali: " counter={neutral} />
      <Display grade="Huono: " counter={bad} />
      <Total good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Positive = ({ good, neutral, bad }) => (
  <div>positiivisia: {(good / (good + neutral + bad)) * 100}%</div>
)

const Average = ({ good, neutral, bad }) => (
  <div>keskiarvo: {(good + bad * -1) / (good + bad + neutral)}</div>
)

const Total = ({ good, neutral, bad }) => (
  <div>yhteensä: {good + neutral + bad}</div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ grade, counter }) => (
  <div>
    {grade}
    {counter}
  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
