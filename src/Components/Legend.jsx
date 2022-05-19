import { useState, useEffect} from 'react'
import countries from '../Util/countriesInfo.js'
import LegendAdditionalInfo from './AdditionalInfo.jsx'
import './Legend.css'

export default function Legend(props) {
  const [flag, setFlag] = useState('')
  const [member, setMember] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const euMember = './flags/Flag_of_Europe.svg'

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
  }, [props]);
  
  return(
    <div className='legend'>
      <div id='flag'>
        {flag? <img src={flag} alt='Flag of the country'></img> : null}
      </div>
      <h1>{props.title}</h1>
      {member? <img src={euMember} alt='Flag of the European Union' id='euMemberFlag'></img> : null}
      {additionalInfo? <LegendAdditionalInfo props={additionalInfo}/> : null}
    </div>
  )
}