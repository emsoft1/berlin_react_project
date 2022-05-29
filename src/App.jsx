import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ShapesParrent from './Components/ShapesParent';
import Legend from './Components/Legend';
import OptionsPannel from './Components/OptionsPannel';
import './App.css'

export default function App(){
  const [title, setTitle] = useState('')
  const [option, setOption] = useState('General')

  const setLegend=(data)=> {
    setOption(data)
  }
  const setName=(data)=> {
    setTitle(data.name)
  }
  return(
  <React.StrictMode>
    <div className='container'>
      <Canvas camera={{
        position: [5, -10, 65],
        fov: 7
        }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <ShapesParrent onNewName={setName}/>
          </Suspense>
      </Canvas>
      <OptionsPannel onOptionsChange={setLegend}/>
      {title?<Legend title={title} option={option}/>:null}
    </div>
  </React.StrictMode>
  )
}