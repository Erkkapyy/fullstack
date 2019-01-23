import React, { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data)
      return axios
        .get(
          `https://api.apixu.com/v1/current.json?key=${
            process.env.REACT_APP_API_KEY
          }&q=Paris`
        )
        .then(response => {
          setWeather(response.data)
        })
    })
  }, [])
  console.log("sää", weather)

  const handleCountryChange = event => {
    event.preventDefault()
    const checker = countries.filter(country =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setCountriesToShow(checker)

    console.log("countriestoshow: ", countriesToShow)
  }

  return (
    <div>
      <FindForm handleCountryChange={handleCountryChange} />
      <ShowCountry
        countriesToShow={countriesToShow}
        weather={weather}
        setCountriesToShow={setCountriesToShow}
        setWeather={setWeather}
      />
    </div>
  )
}

const FindForm = props => {
  return (
    <form>
      find countries: <input onChange={props.handleCountryChange} />
    </form>
  )
}

const ShowCountry = ({
  countriesToShow,
  weather,
  setCountriesToShow,
  setWeather
}) => {
  if (countriesToShow.length === 1) {
    const capital = countriesToShow[0].capital
    useEffect(() => {
      axios
        .get(
          `https://api.apixu.com/v1/current.json?key=${
            process.env.REACT_APP_API_KEY
          }&q=${capital}`
        )
        .then(response => {
          setWeather(response.data)
        })
    }, [])

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
        <h3>Weather in {countriesToShow[0].capital}</h3>
        <b>temperature:</b> {weather.current.temp_c} Celsius
        <p>
          <img
            src={weather.current.condition.icon}
            alt="Weather"
            height="70"
            width="70"
          />
        </p>
        <b>wind:</b> {weather.current.wind_kph} kph direction{" "}
        {weather.current.wind_dir}
      </div>
    )
  } else if (countriesToShow.length < 10) {
    return (
      <>
        {countriesToShow.map(country => (
          <p key={country.name}>
            {country.name}{" "}
            <button
              onClick={() => {
                setCountriesToShow([country])
                console.log(
                  "countries to show after button press",
                  countriesToShow
                )
              }}
            >
              show
            </button>
          </p>
        ))}
      </>
    )
  } else {
    return <p>Too many matches, specify another filter</p>
  }
}

export default App
