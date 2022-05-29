import { useState, useEffect} from 'react'
import countries from '../Util/countriesInfo.json'
import GeneralInfo from './GeneralInfo.jsx'
import WeatherInfo from './WeatherInfo.jsx'
import FinanceInfo from './FinanceInfo.jsx'
import './Legend.css'

export default function Legend(props) {
  const [flag, setFlag] = useState('')
  const [member, setMember] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const option = props.option//General, Weather, Finance

  useEffect(() => {
    if(props.title) {
      let currentCountryArr = countries.filter(country=>country.name === props.title)
      let currentCountry = currentCountryArr[0]
      currentCountry.flag? setFlag(currentCountry.flag): setFlag(null)
      currentCountry.euMember? setMember(true): setMember(false)

      if(currentCountry.code){
        fetch(`https://restcountries.com/v3.1/alpha/${currentCountry.code}`)
        .then(res=>res.json())
        .then(json=>{
          setAdditionalInfo(json[0])
        })
      } else  setAdditionalInfo('')
    }
  }, [props])
  
  return(
    <div className='legend'>
      <div id='flag'>
        {flag? <img src={flag} alt='Flag of the country'></img> : null}
      </div>
      <h1>{props.title}</h1>
      {additionalInfo?
        option === 'Finance' ?
          <FinanceInfo info={additionalInfo} member={member}/> : 
        option === 'Weather' ?
          <WeatherInfo info={additionalInfo} member={member}/> :
          <GeneralInfo info={additionalInfo} member={member}/> :
      null}
    </div>
  )
}