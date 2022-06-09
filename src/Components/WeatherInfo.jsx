import { celsiusToFahrenheit, kilometersTomiles } from '../Util/convertUnits'
import { useState, useMemo } from "react"
import weatherCode from '../Util/weatherCodes'
import fetchFunction from '../Util/fetchFunction'

export default function WeatherInfo(props) {
  const [additionalInfo, setAdditionalInfo] = useState()
  const country = props.country
  const fahr = props.fahr
  const mph = props.mph
  const capital = country.capital
  const lat = country.latlng[0]
  const lng = country.latlng[1]
  const fetchLink = 
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=Europe%2FLondon&current_weather=true`

 
  useMemo(async ()=>{
    setAdditionalInfo(await fetchFunction(fetchLink))
  }, [fetchLink])

  const displayFunc=()=>{
    const weatherInfo = <>
      <p>Weather in <b>{capital}</b>: <span>{weatherCode(additionalInfo.current_weather.weathercode)}</span></p>
      <p>Current temperature: {fahr? <span>{celsiusToFahrenheit(additionalInfo.current_weather.temperature)} F</span>: 
      <span>{additionalInfo.current_weather.temperature} C</span>}</p>
      <p>Current wind speed: {mph? <span>{kilometersTomiles(additionalInfo.current_weather.windspeed)} Mph</span>: 
      <span>{additionalInfo.current_weather.windspeed} Km/h</span>}</p>
    </>
    return weatherInfo
  }
  
  return (
    <div>
      {additionalInfo? displayFunc(): <p>Loading</p>}
    </div>
  )
}