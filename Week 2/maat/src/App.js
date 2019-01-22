import React, { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleCountryChange = event => {
    const checker = countries.filter(country =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setCountriesToShow(checker)

    console.log("countriestoshow: ", countriesToShow)
  }

  const findForm = () => {
    return (
      <form>
        find countries: <input onChange={handleCountryChange} />
      </form>
    )
  }

  const showCountry = () => {
    if (countriesToShow.length === 1) {
      return (
        <div key={countriesToShow[0].name}>
          <h1>{countriesToShow[0].name}</h1>
          <p>capital {countriesToShow[0].capital}</p>
          <p>population {countriesToShow[0].population}</p>
          <h3>Languages:</h3>
          <ul>
            {countriesToShow[0].languages.map(language => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <p>
            <img
              src={countriesToShow[0].flag}
              alt="Flag"
              height="100"
              width="150"
            />
          </p>
        </div>
      )
    } else if (countriesToShow.length < 10) {
      return (
        <>
          {countriesToShow.map(country => (
            <p key={country.name}>{country.name}</p>
          ))}
        </>
      )
    } else {
      return <p>Too many matches, specify another filter</p>
    }
  }

  return (
    <div>
      {findForm()}
      {showCountry()}
    </div>
  )
}

export default App
