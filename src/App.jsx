import OptionsPannel from './Components/OptionsPannel'
import ShapesParrent from './Components/ShapesParent'
import { Canvas } from '@react-three/fiber'
import Legend from './Components/Legend'
import React, { Suspense, useState } from 'react'
import './App.css'
import OptionContextProvider, {TitleContext}  from './Util/OptionsContextProvider'

export default function App(){
  const [title, setTitle] = useState('Hello world')

  return(
    <div className='container'>
        <Canvas camera={
          {
            position: [5, -10, 65],
            fov: 7
            }
          }>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <TitleContext.Provider value={{setTitle}}>
              <ShapesParrent/>
            </TitleContext.Provider>
          </Suspense>
        </Canvas>
        <OptionContextProvider>
          <TitleContext.Provider value={{title}}>
            <Legend />
          </TitleContext.Provider>
            <OptionsPannel />
        </OptionContextProvider>
    </div>
  )
}