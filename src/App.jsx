import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ShapesParrent from './Components/ShapesParent';
import Legend from './Components/Legend';
import Text from './Components/Text';
import './App.css'

export default function App(){
  const [data, setData] = useState({});

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
            <Text title={data.name} />
            <ShapesParrent onNewName={setData}/>
          </Suspense>          
      </Canvas>
      <Legend title={data.name}/>
    </div>
  </React.StrictMode>
  )
}