import countries from '../Util/countriesInfo.json'
import GeneralInfo from './GeneralInfo.jsx'
import WeatherInfo from './WeatherInfo.jsx'
import FinanceInfo from './FinanceInfo.jsx'
import { useState, useEffect} from 'react'
import './Legend.css'

export default function Legend(props) {
  const [flag, setFlag] = useState()
  const [member, setMember] = useState()
  const [additionalInfo, setAdditionalInfo] = useState()
  const [title, setTitle] = useState(props.title)
  const [option, setOption] = useState(props.option)
  const [curryInfo, setcInfo] = useState(props.curryInfo)
  const [driveInfo, setdInfo] = useState(props.driveInfo)
  const [mphChecked, setMph] = useState(props.mphChecked)
  const [fahrChecked, setdFahr] = useState(props.fahrChecked)


  useEffect(() => {
    setTitle(props.title)
    setOption(props.option)
    setcInfo(props.curryInfo)
    setdInfo(props.driveInfo)
    setMph(props.mphChecked)
    setdFahr(props.fahrChecked)
    if(title) {
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
  }, [props, title])

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
  

  return(
    <div className='legend'>
      <div id='flag'>
        {flag? <img src={flag} alt='Flag of the country'></img> : null}
      </div>
      <h1>{props.title}</h1>
      {additionalInfo ? displayFunc(): <p>Loading</p>}
    </div>
  )
}