import countries from '../Util/countriesInfo.json'
import GeneralInfo from './GeneralInfo.jsx'
import WeatherInfo from './WeatherInfo.jsx'
import FinanceInfo from './FinanceInfo.jsx'
import { useState, useMemo} from 'react'
import './Legend.css'
import {useStore} from '../Util/useStore'

export default function Legend() {
  const [flag, setFlag] = useState()
  const [member, setMember] = useState()
  const [additionalInfo, setAdditionalInfo] = useState()
  const title = useStore((state)=>state.title)
  const option = useStore((state)=>state.option)
  const curryInfo = useStore((state)=>state.curryChecked)
  const driveInfo = useStore((state)=>state.driveChecked)
  const mphChecked = useStore((state)=>state.mphChecked)
  const fahrChecked = useStore((state)=>state.fahrChecked)

  useMemo(()=>{
    if (title==='Hello World!') return
    let currentCountry = countries.find(country=>country.name === title)
    currentCountry.flag? setFlag(currentCountry.flag): setFlag(null)
    currentCountry.euMember? setMember(true): setMember(false)
    fetch(`https://restcountries.com/v3.1/alpha/${currentCountry.code}`)
    .then(res=>res.json())
    .then(json=>{
      setAdditionalInfo(json[0])
    })
  },[title])

  const displayFunc=()=>{
    let additionalDisplay
    switch (option) {
      case 'Weather':
        additionalDisplay = <WeatherInfo capital={additionalInfo.capital[0]} 
        latlng={additionalInfo.capitalInfo.latlng}
        mph={mphChecked} fahr={fahrChecked}/>
        break;
      case 'Finance':
        additionalDisplay = <FinanceInfo/>
        break
      default:
        additionalDisplay = <GeneralInfo info={additionalInfo} 
        member={member} curr={curryInfo} drive={driveInfo}/>
        break;
    }
    return additionalDisplay
  }
  const notSelected=()=>{
    return(
    <>
      <h3>Select a country to see the Information</h3>
      <p>You can change the options on the left side of the screen</p>
    </>)
  }
  
  return(
    <div className='legend'>
      <div id='flag'>
        {flag? <img src={flag} alt='Flag of the country'></img> : null}
      </div>
      <h1>{title}</h1>
      {additionalInfo ? displayFunc(): notSelected()}
    </div>
  )
}