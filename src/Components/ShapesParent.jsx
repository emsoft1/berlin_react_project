import React from 'react';
import Shapes from './Shapes.jsx';
import countries from '../Util/countriesInfo.js';

export default function ShapesParrent() {
  let countriesOnMap = []
  const max = countries.length
  for (let i = 0; i < max; i++) {
      countriesOnMap.push(
        <Shapes 
        key={i} 
        color={countries[i].color} 
        depth={countries[i].depths} 
        country={countries[i].svg}
      />)
  }
  return (
    countriesOnMap
  )
}