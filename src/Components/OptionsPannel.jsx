import { useEffect, useState } from "react"
import "./OptionsPannel.css"

export default function OptionsPannel(props) {
  const [option, setOption] = useState('General')
  const [curryInfo, setcInfo] = useState(true)
  const [driveInfo, setdInfo] = useState(true)
  const [mphChecked, setMph] = useState(false)
  const [fahrChecked, setdFahr] = useState(false)
  let additionalOptions

  useEffect(()=>{
    props.onOptionsChange(option, curryInfo, driveInfo, mphChecked, fahrChecked)
  },[option, curryInfo, driveInfo, mphChecked, fahrChecked, props])
  
  const mainOptions = <div 
    onChange={(v)=>{setOption(v.target.value)}}>
    <label>Options: </label>
    <select id="options">
      <option value="General" defaultValue >General</option>
      <option value="Weather" >Weather</option>
      <option value="Finance" >Finance</option>
    </select>
  </div>
  switch (option) {
    case 'General':
      additionalOptions = <div>
        <p>
          Currency info: <input 
          type="checkbox" checked={curryInfo} 
          onChange={
            (v)=>{setcInfo(v.target.checked)}
          }/>
        </p>
        <p>
          Drive info: <input 
          type="checkbox" checked={driveInfo} 
          onChange={
            (v)=>{setdInfo(v.target.checked)}
          }/>
        </p>
      </div>
      break
    case 'Weather':
      additionalOptions = <div>
        <p>
          Wind speed: <label>
            <input 
            type="checkbox" checked={mphChecked} 
            onChange={
              (v)=>{setMph(v.target.checked)}
            }/> mph
          </label>
        </p>
        <p>
          Temperature: <label>
            <input 
            type="checkbox" checked={fahrChecked} 
            onChange={
              (v)=>{setdFahr(v.target.checked)}
            }/> Fahrenheit
          </label>
        </p>
      </div>
      break
    default:
      additionalOptions = <p>W.i.p.</p>
      break
  }

  return ( 
    <div className="pannel" >
      {mainOptions}
      {additionalOptions}
    </div>
   );
}