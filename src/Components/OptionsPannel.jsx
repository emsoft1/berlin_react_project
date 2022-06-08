import {useStore} from '../Util/useStore'
import "./OptionsPannel.css"

export default function OptionsPannel() {
  const option = useStore((state)=>state.option)
  const setOption = useStore((state)=>state.setOption)
  const curryInfo = useStore((state)=>state.curryChecked)
  const setcInfo = useStore((state)=>state.setCurrency)
  const driveInfo = useStore((state)=>state.driveChecked)
  const setdInfo = useStore((state)=>state.setDriveInfo)
  const mphChecked = useStore((state)=>state.mphChecked)
  const setMph = useStore((state)=>state.setMphChecked)
  const fahrChecked = useStore((state)=>state.fahrChecked)
  const setdFahr = useStore((state)=>state.setFahrChecked)
  let additionalOptions

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