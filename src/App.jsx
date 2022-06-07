import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ShapesParrent from './Components/ShapesParent';
import Legend from './Components/Legend';
import './App.css'

export default function App(){
  const [title, setTitle] = useState('')
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
      {title?<Legend title={title}/>:null}
    </div>
  </React.StrictMode>
  )
}