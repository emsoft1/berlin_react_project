import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ShapesParrent from './Components/ShapesParent';
import Legend from './Components/Legend';
import OptionsPannel from './Components/OptionsPannel';
import './App.css'

export default function App(){
  const [title, setTitle] = useState()
  const [option, setOption] = useState()
  const [curryInfo, setcInfo] = useState()
  const [driveInfo, setdInfo] = useState()
  const [mphChecked, setMph] = useState()
  const [fahrChecked, setdFahr] = useState()

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
            <ShapesParrent onNewName={(data)=>{setTitle(data.name)}}/>
          </Suspense>
      </Canvas>
      <OptionsPannel onOptionsChange={(o, c, d, m, f)=>{
        setOption(o)
        setcInfo(c)
        setdInfo(d)
        setMph(m)
        setdFahr(f)
      }}/>
      {title? <Legend title={title} option={option} curryInfo={curryInfo} driveInfo={driveInfo} 
      mphChecked={mphChecked} fahrChecked={fahrChecked}/>: null}
    </div>
  </React.StrictMode>
  )
}