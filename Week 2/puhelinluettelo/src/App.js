import React, { useState, useEffect } from "react"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import personService from "./services/Persons"

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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    console.log("effect")
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

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

    if (containsPerson()) {
      if (
        window.confirm(
          `${uusi.name} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        let newPerson = {}
        persons.map(person => {
          if (person.name === uusi.name) {
            newPerson = {
              name: person.name,
              number: newNumber,
              id: person.id
            }
          }
          return newPerson
        })
        console.log("newPerson!!! ", newPerson.id)

        personService
          .update({ id: newPerson.id, newObject: newPerson })
          .then(response => {
            setPersons(
              persons
                .filter(person => person.id !== newPerson.id)
                .concat(response.data)
            )
          })
          .catch(error => {
            if (!error) {
              setSuccessMessage("Numero vaihdettu onnistuneesti")
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            } else {
              setErrorMessage(
                `Henkilö '${newPerson.name}' oli jo poistettu palvelimelta`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }
            setPersons(persons.filter(person => person.id !== newPerson.id))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setSuccessMessage(`${newName} lisätty`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }

    console.log(persons)
  }

  const deletePerson = ({ id, name }) => {
    console.log("nappi bainettu :D")
    console.log("pärkkälä ", { name, id })

    if (window.confirm(`Poistetaanko ${name}?`)) {
      personService.delete(id)
    }
    const copy = persons.filter(person => person.id !== id)
    setPersons(copy)
    setSuccessMessage(`${name} poistettu`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={successMessage} />
      <Error message={errorMessage} />
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
        <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
      </ul>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="success">{message}</div>
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="error">{message}</div>
}

export default App
