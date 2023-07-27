import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';

const CountrySearch = (props) => {
  return (
    <form>
      <label>Search countries:</label>
      <input value={props.value} onChange={props.onChange}></input>
    </form>
  )
}

const Countries = ({ listOfCountries, showCountryData}) => {
  if (listOfCountries.length > 10) {
    return (
      <div>
        Too many matches, enter a more specific search term.
      </div>
    )
  }
  return (
    <ul>
      {listOfCountries.map(country =>
        <li key={country.name.common}>
          {country.name.common}
          <button
            value={country.name.common}
            onClick={() => showCountryData(country.name.common)}
          >
            Show
          </button>
        </li>
      )}
    </ul>
  )
}

const SingleCountry = (props) => {
  const languages = Object.keys(props.languages)
  return (
    <div>
      <h1>{props.name}</h1>
      <p>
        Capital: {props.capital} <br/>
        Area: {props.area}
      </p>
      <div>
        <b>Languages:</b>
        <ul>
          {languages.map(language =>
            <li key={props.languages[language]}>{props.languages[language]}</li>
          )}
        </ul>
      </div>
      <img src={props.flag} alt={`Flag of ${props.name}`} />
    </div>
  )
}

const App = () => {
  const [inputField, setInputField] = useState('')
  const [foundCountries, setFoundCountries] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        const regExp = new RegExp(inputField, 'i')
        let searchMatch = response.data.filter(country => regExp.test(country.name.common))
        setFoundCountries(searchMatch)
      })
  }, [inputField])

  const handleInputChange = (event) => {
    setInputField(event.target.value)
  }

  if (foundCountries === null) return null

  return (
    <div>
      <CountrySearch value={inputField} onChange={handleInputChange} />
      {foundCountries.length === 1 ? (
        <SingleCountry
          name={foundCountries[0].name.common}
          capital={foundCountries[0].capital}
          area={foundCountries[0].area}
          languages={foundCountries[0].languages}
          flag={foundCountries[0].flags.png}
        />
      ) : (
        <Countries listOfCountries={foundCountries} showCountryData={setInputField} />
      )}
    </div>
  );
}

export default App;