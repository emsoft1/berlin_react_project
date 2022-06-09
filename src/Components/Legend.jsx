import countries from '../Util/countriesInfo.json'
import {useTitle} from '../Util/useStore'
import { useState, useMemo} from 'react'
import './Legend.css'
import DisplayFunction from './DisplayFunc'
import WelkomeMessage from './WelkomeMessage'

export default function Legend() {
  const [currentCountry, setCurrentCountry] = useState()
  const title = useTitle((state)=>state.title)

  useMemo(async ()=>{
    title && setCurrentCountry(await countries.find(country=>country.name === title))
  },[title])

  return(
    <div className='legend'>
      <div id='flag'>
        {currentCountry? <img src={currentCountry.flag} alt='Flag of the country'></img> : null}
      </div>
      {title? <h1>{title}</h1>: null}
      {currentCountry ? <DisplayFunction country={currentCountry}/>: <WelkomeMessage />}
    </div>
  )
}