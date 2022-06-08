import countries from '../Util/countriesInfo.json'
import Shapes from './Shapes.jsx'
import {useStore} from '../Util/useStore'

export default function ShapesParrent() {
  const newTitle = useStore((state)=>state.setTitle)
  let countriesOnMap = []
  const showName=(data)=> {
    newTitle(data.name)
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