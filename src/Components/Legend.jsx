import { useState, useEffect} from 'react'
import countries from '../Util/countriesInfo.js'
import './Legend.css'


export default function Legend(props) {
  const [population, setPopulation] = useState('')
  const [capital, setCapital] = useState('')
  const [flag, setFlag] = useState('')

  useEffect(() => {
    if(props.title) {
      let currentCountryArr = countries.filter(country=>country.name === props.title)
      let currentCountry = currentCountryArr[0]
      currentCountry.population? setPopulation(currentCountry.population.toLocaleString("en-US")): setPopulation('Could not find')
      currentCountry.capital? setCapital(currentCountry.capital): setCapital('Could not find')
      currentCountry.flag? setFlag(currentCountry.flag): setFlag(null)
    }
  }, [props]);
  
  return(
    <div className='legend'>
      {flag? <img src={flag} alt='Flag of the country'></img> : null}
      <h1>{props.title}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
    </div>
  )
}