import { useState, useMemo, useContext} from 'react'
import countries from '../Util/countriesInfo.json'
import fetchFunction from '../Util/fetchFunc'
import displayFunc from './DisplayByOptions'
import { OptionsContext, TitleContext } from '../Util/OptionsContextProvider'
import './Legend.css'

export default function Legend(props) {
  const {option, curryInfo, driveInfo, mphChecked, fahrChecked} = useContext(OptionsContext)
  const {title} = useContext(TitleContext)
  
  const [flag, setFlag] = useState()
  const [member, setMember] = useState()
  const [additionalInfo, setAdditionalInfo] = useState()

  useMemo(async()=>{
    let currentCountryArr = countries.filter(country=>country.name === title)
    if (currentCountryArr.length===0) return
    let currentCountry = currentCountryArr[0]
    currentCountry? setFlag(currentCountry.flag): setFlag(null)
    currentCountry.euMember? setMember(true): setMember(false)
    let fetchLink
    currentCountry? fetchLink= `https://restcountries.com/v3.1/alpha/${currentCountry.code}`: fetchLink= null
    if(currentCountry) setAdditionalInfo(await fetchFunction(fetchLink))
  },[title])
  
  return(
    <div className='legend'>
      <div id='flag'>
        {flag? <img src={flag} alt='Flag of the country'></img> : null}
       </div>
      <h1>{title}</h1>
      {additionalInfo ? displayFunc(additionalInfo, option, curryInfo, 
        driveInfo, mphChecked, fahrChecked, member): <p>Loading</p>}
    </div>
  )
}