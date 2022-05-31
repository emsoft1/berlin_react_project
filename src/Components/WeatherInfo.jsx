import { celsiusToFahrenheit, kilometersTomiles } from '../Util/convertUnits'
import weatherCode from '../Util/weatherCodes'
import { useState, useEffect } from "react"

export default function WeatherInfo(props) {
  const capital = props.capital
  const [additionalInfo, setAdditionalInfo] = useState()
  const [fahr, setFahr] = useState(props.fahr)
  const [mph, setMph] = useState(props.mph)
  const capitalLat = props.latlng[0]
  const capitalLng = props.latlng[1]
  const fetchLink = `https://api.open-meteo.com/v1/forecast?latitude=${capitalLat}&longitude=${capitalLng}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FLondon&current_weather=true`
  useEffect(() => {
    setFahr(props.fahr)
    setMph(props.mph)
    if(capital) {
      fetch(fetchLink)
            .then(res=>res.json())
            .then(json=>{
              setAdditionalInfo(json)
            })
    }
  }, [props, capital, fetchLink])

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