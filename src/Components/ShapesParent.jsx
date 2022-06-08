import countries from '../Util/countriesInfo.json'
import Shapes from './Shapes.jsx'
import { useContext } from 'react'
import { TitleContext } from '../Util/OptionsContextProvider'

export default function ShapesParrent(props) {
  const {setTitle} = useContext(TitleContext)
  let countriesOnMap = []
  const showName = data => {
    setTitle(data.name)
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