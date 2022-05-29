import countries from '../Util/countriesInfo.json'
import Shapes from './Shapes.jsx'

export default function ShapesParrent(props) {
  let countriesOnMap = []
  const showName=(data)=> {
    props.onNewName(data)
  }
  countries.forEach((country)=> {
      countriesOnMap.push(
        <Shapes 
        key={country.code}
        color={country.color}
        depth={2}
        shape={country.svg}
        name={country.name}
        isMember={country.euMember}
        onNameChange={showName}
      />)
  })
  return (
    countriesOnMap
  )
}