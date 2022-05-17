import React from 'react'
import Shapes from './Shapes.jsx'
import countries from '../Util/countriesInfo.js'

export default function ShapesParrent(props) {
  let countriesOnMap = []
  const showName=(data)=> {
    props.onNewName(data)
  }
  const max = countries.length
  for (let i = 0; i < max; i++) {
      countriesOnMap.push(
        <Shapes 
        key={i} 
        color={countries[i].color}
        depth={countries[i].population/8_000_000}
        country={countries[i].svg}
        name={countries[i].name}
        isMember={countries[i].euMember}
        onNameChange={showName}
      />)
  }
  return (
    countriesOnMap
  )
}