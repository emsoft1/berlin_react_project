import weatherCode from '../Util/weatherCodes'
import { useState, useEffect } from "react"

export default function WeatherInfo(props) {
  const info = props.info
  const capital = info.capital
  const [additionalInfo, setAdditionalInfo] = useState()
  const capitalLat = info.capitalInfo.latlng[0]
  const capitalLng = info.capitalInfo.latlng[1]
  const fetchLink = `https://api.open-meteo.com/v1/forecast?latitude=${capitalLat}&longitude=${capitalLng}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FLondon&current_weather=true`
  useEffect(() => {
    if(capital) {
      fetch(fetchLink)
            .then(res=>res.json())
            .then(json=>{
              setAdditionalInfo(json)
            })
    }
  }, [props, capital, fetchLink])

  return ( 
    <>
      {additionalInfo? <p>Weather in <b>{capital}</b>: <span>{weatherCode(additionalInfo.current_weather.weathercode)}</span></p>: null}
      {additionalInfo? <p>Current temperature: <span>{additionalInfo.current_weather.temperature} C</span></p>: null}
      {additionalInfo? <p>Current wind speed: <span>{additionalInfo.current_weather.windspeed} km/h</span></p>: null}
    </>
   );
}