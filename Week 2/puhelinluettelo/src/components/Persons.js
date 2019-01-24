import React from "react"

const Persons = ({ personsToShow, deletePerson }) =>
  personsToShow.map(person => (
    <li key={person.name}>
      {person.name} {person.number}
      <button
        onClick={() => deletePerson({ id: person.id, name: person.name })}
      >
        poista
      </button>
    </li>
  ))

export default Persons
