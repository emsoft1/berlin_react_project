
import GeneralInfo from './GeneralInfo.jsx'
import WeatherInfo from './WeatherInfo.jsx'
import FinanceInfo from './FinanceInfo.jsx'
import {useStore} from '../Util/useStore'


export default function DisplayFunction(props){
  const currentCountry = props.country
  const option = useStore((state)=>state.option)
  const mphChecked = useStore((state)=>state.mphChecked)
  const fahrChecked = useStore((state)=>state.fahrChecked)

  let additionalDisplay
  switch (option) {
    case 'General':
      additionalDisplay = <GeneralInfo country={currentCountry}/>
      break;
    case 'Weather':
      additionalDisplay = <WeatherInfo country={currentCountry}
      mph={mphChecked} fahr={fahrChecked}/>
      break;
    case 'Finance':
      additionalDisplay = <FinanceInfo/>
      break
    default:
      additionalDisplay = <p>Ups, something went wrong</p>
      break;
  }
  return additionalDisplay
}