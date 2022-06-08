
import GeneralInfo from './GeneralInfo.jsx'
import WeatherInfo from './WeatherInfo.jsx'
import FinanceInfo from './FinanceInfo.jsx'

export default function DisplayFunc(additionalInfo, option, curryInfo, driveInfo, mphChecked, fahrChecked, member) {
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