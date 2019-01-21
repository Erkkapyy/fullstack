import React from "react"

const Persons = ({ personsToShow }) =>
  personsToShow.map(person => (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  ))

export default Persons
