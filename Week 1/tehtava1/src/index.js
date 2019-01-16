import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return(
    <div>
        <h1>{props.name}</h1>
    </div>
    )
}

const Content = (props) => {
    return(
        <div>
            <Part name={props.name1} exercises={props.exercises1}/>
            <Part name={props.name2} exercises={props.exercises2}/>
            <Part name={props.name3} exercises={props.exercises3}/>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name} {props.exercises}</p>
        </div>
    )
}

const Total = (props) => {
    return(
        <div>
            <p>Yhteensä {props.amount} tehtävää</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack - sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14

    return (
        <div>
            <Header name={course}/>
            <Content name1={part1} exercises1={exercises1} name2={part2} exercises2={exercises2} name3={part3} exercises3={exercises3}/>
            <Total amount={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));
