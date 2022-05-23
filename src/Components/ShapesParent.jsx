import React from 'react'
import Shapes from './Shapes.jsx'

export default function ShapesParrent(props) {
  let countriesOnMap = []
  const showName=(data)=> {
    props.onNewName(data)
  }
  let countries = require('../Util/countriesInfo.js').default
  const max = countries.length
  for (let i = 0; i < max; i++) {
      countriesOnMap.push(
        <Shapes 
        key={i} 
        color={countries[i].color}
        depth={2}
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