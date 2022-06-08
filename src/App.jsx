import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ShapesParrent from './Components/ShapesParent';
import Legend from './Components/Legend';
import OptionsPannel from './Components/OptionsPannel';
import './App.css'

export default function App(){

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
            <ShapesParrent />
          </Suspense>
      </Canvas>
      <OptionsPannel />
      <Legend />
    </div>
  </React.StrictMode>
  )
}