import React, { useState } from "react"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Martti Tienari", number: "040-123456" },
    { name: "Arto Järvinen", number: "040-123456" },
    { name: "Lea Kutvonen", number: "040-123456" }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newShow, setNewShow] = useState("")

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newShow)
  )

  const handleNameChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleShowChange = event => {
    console.log(event.target.value)
    setNewShow(event.target.value)
  }

  const containsPerson = () => {
    let contains = false

    persons.forEach(function(item, index, array) {
      console.log(newName, "verrattava1")
      console.log(item.name, "verrattava2")
      if (item.name === newName) {
        contains = true
      }
    })
    return contains
  }

  const addPerson = event => {
    event.preventDefault()

    const uusi = {
      name: newName,
      number: newNumber
    }
    console.log(uusi)
    console.log(persons)
    console.log(persons.indexOf(uusi))

    if (containsPerson() === true) {
      window.alert(`${uusi.name}  on jo luettelossa`)
    } else {
      setPersons(persons.concat(uusi))
      setNewName("")
      setNewNumber("")
    }

    console.log(persons)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter handleShowChange={handleShowChange} />

      <h3>Lisää uusi</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <ul>
        <Persons personsToShow={personsToShow} />
      </ul>
    </div>
  )
}

export default App
