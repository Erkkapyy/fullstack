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
    <>
      <h1>statistiikka</h1>
      <table>
        <tbody>
          <tr>
            <Display grade="Hyvä: " counter={good} />
          </tr>

          <tr>
            <Display grade="Neutraali: " counter={neutral} />
          </tr>

          <tr>
            <Display grade="Huono: " counter={bad} />
          </tr>

          <tr>
            <Total good={good} neutral={neutral} bad={bad} />
          </tr>

          <tr>
            <Average good={good} neutral={neutral} bad={bad} />
          </tr>

          <tr>
            <Positive good={good} neutral={neutral} bad={bad} />
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Positive = ({ good, neutral, bad }) => (
  <td>positiivisia: {(good / (good + neutral + bad)) * 100}%</td>
)

const Average = ({ good, neutral, bad }) => (
  <td>keskiarvo: {(good + bad * -1) / (good + bad + neutral)}</td>
)

const Total = ({ good, neutral, bad }) => (
  <td>yhteensä: {good + neutral + bad}</td>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ grade, counter }) => (
  <td>
    {grade}
    {counter}
  </td>
)

ReactDOM.render(<App />, document.getElementById("root"))
