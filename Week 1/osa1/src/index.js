import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}





const App = () => {
    const nimi = 'Mä'
    const ika = 12
    return (
    <div>
        <h1>Greetings</h1>
        <Hello name="Kekbin" age={10 + 2}/>
        <Hello name={nimi} age={ika}/>

    </div>

    )
}

ReactDOM.render(<App />, document.getElementById('root'));

