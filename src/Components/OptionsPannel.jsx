import { OptionsContext } from "../Util/OptionsContextProvider"
import { useContext } from "react"
import "./OptionsPannel.css"

export default function OptionsPannel(props) {
  const {option, newOption} = useContext(OptionsContext)
  const {setdFahr} = useContext(OptionsContext)
  const { setcInfo } = useContext(OptionsContext)
  const { setdInfo } = useContext(OptionsContext)
  const { setMph } = useContext(OptionsContext)
  let additionalOptions

  const mainOptions = <div 
    onChange={(v)=>{
      newOption(v.target.value)
      }}>
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
          type="checkbox" 
          onChange={
            (v)=>{setcInfo(v.target.checked)}
          }/>
        </p>
        <p>
          Drive info: <input 
          type="checkbox"
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
            type="checkbox"
            onChange={
              (v)=>{setMph(v.target.checked)}
            }/> mph
          </label>
        </p>
        <p>
          Temperature: <label>
            <input 
            type="checkbox"
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