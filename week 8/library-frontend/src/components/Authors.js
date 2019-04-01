import React, { useState } from "react"
import Select from "react-select"
//import { UserInputError } from "apollo-server"

const Authors = props => {
  const [born, setBorn] = useState("")
  const [selectedOption, setSelectedOption] = useState("")

  const handleChange = option => {
    setSelectedOption(option)
  }

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }
  const authors = props.result.data.allAuthors
  if (authors === undefined || authors === null) {
    return <div>lolxd</div>
  }

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const submit = async e => {
    e.preventDefault()
    console.log("Selected: ", selectedOption)
    console.log("Born: ", born)

    if (selectedOption !== "") {
      const name = selectedOption.value

      await props.editAuthor({
        variables: { name, setBornTo: parseInt(born, 10) }
      })
    }

    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
      <form onSubmit={submit}>
        <div>
          born:
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
