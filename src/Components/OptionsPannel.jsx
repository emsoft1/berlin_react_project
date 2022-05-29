import "./OptionsPannel.css"

export default function OptionsPannel(props) {
  const valueChange=(value)=> {
    props.onOptionsChange(value.target.value)
  }

  return ( 
    <div className="pannel" onChange={valueChange}>
      <label>Options: </label>
      <select id="options">
        <option value="General" defaultValue >General</option>
        <option value="Weather" >Weather</option>
        <option value="Finance" >Finance</option>
      </select>
    </div>
   );
}