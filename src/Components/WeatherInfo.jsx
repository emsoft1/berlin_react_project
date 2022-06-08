import { celsiusToFahrenheit, kilometersTomiles } from '../Util/convertUnits'
import { useState, useEffect, useMemo } from "react"
import weatherCode from '../Util/weatherCodes'
import fetchFunction from '../Util/fetchFunc'

export default function WeatherInfo(props) {
  const [additionalInfo, setAdditionalInfo] = useState()
  const [fahr, setFahr] = useState(props.fahr)
  const [mph, setMph] = useState(props.mph)
  const capital = props.capital
  const capitalLat = props.latlng[0]
  const capitalLng = props.latlng[1]
  const fetchLink = `https://api.open-meteo.com/v1/forecast?latitude=${capitalLat}&longitude=${capitalLng}&timezone=Europe%2FLondon&current_weather=true`
 
  useMemo(async ()=>{
    setAdditionalInfo(await fetchFunction(fetchLink))
  }, [fetchLink])

  useEffect(() => {
    setFahr(props.fahr)
    setMph(props.mph)
  }, [props.fahr, props.mph])

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