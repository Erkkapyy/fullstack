import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [counter, setCounter] = useState(0);
  const setToValue = value => () => setCounter(value);

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={setToValue(counter + 1)} text="plus" />
      <Button handleClick={setToValue(0)} text="zero" />
    </div>
  );
};

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

// const Hello = ({name, age}) => {

//     const bornYear = () => {
//         const yearNow = new Date().getFullYear()
//         return yearNow - age
//     }

//     return (
//         <div>
//             <p>Hello {name}, you are {age} years old</p>
//             <p>So you were probably born {bornYear()}</p>
//         </div>
//     )
// }

// const App = () => {
//     const nimi = 'Mä'
//     const age = 12
//     return (
//     <div>
//         <h1>Greetings</h1>
//         <Hello name="Kekbin" age={10 + 2}/>
//         <Hello name={nimi} age={age}/>

//     </div>

//     )
// }

ReactDOM.render(<App />, document.getElementById("root"));
