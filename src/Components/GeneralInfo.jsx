import fetchFunction from '../Util/fetchFunction'
import { useMemo, useState } from "react"
import { useStore } from '../Util/useStore'

export default function GeneralInfo(props) {
  const [info, setInfo] = useState()
  const country = props.country
  const currencyInfo = useStore((state)=>state.curryChecked)
  const driveInfo = useStore((state)=>state.driveChecked)
  const code = country.code
  const euMember = './flags/Flag_of_Europe.svg'
  const member = country.euMember
  const fetchLink = `https://restcountries.com/v3.1/alpha/${country.code}`
  let cars, capital, region, population, currency
  
  useMemo(async ()=>{
    setInfo(await fetchFunction(fetchLink))
  },[fetchLink])
  
  const showDriveInfo=()=>(<>
    <p>Drive side: <span>{cars.side}</span></p>
    <p>Drive signs: <span>{cars.signs}</span></p>
  </>)
  const showCurrencyInfo=()=>(<>
    <p>Currency name: <span>{currency.name}</span></p>
    <p>Currency symbol: <span>{currency.symbol}</span></p>
  </>)
  const displayFunc=()=>{
    cars=info.car 
    capital=info.capital 
    region=info.subregion 
    population=info.population 
    currency=Object.values(info.currencies)[0]
    return(
      <>
        {member? <img src={euMember} 
        alt='Flag of the European Union' id='euMemberFlag'></img>: null}
        {capital?<p>Capital: <span>{capital}</span></p>: null}
        {population?<p>Population: <span>{population.toLocaleString("en-US")}</span></p>: null}
        {region?<p>Region: <span>{region}</span></p>: null}
        {driveInfo? showDriveInfo(): null}
        {currencyInfo? showCurrencyInfo() : null}
        <p><abbr title="International Olympic Committee">IOC</abbr> Code: <span>{code}</span></p>
      </>
    )
  }
  return (<>
      {info? displayFunc(): <p>Loading</p>}
    </>)
}