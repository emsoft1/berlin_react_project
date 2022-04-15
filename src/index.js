import { createRoot } from 'react-dom/client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ShapesParrent from './Components/ShapesParent';

import './index.css';


createRoot(document.getElementById('root')).render(
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Suspense fallback={null}>
    <ShapesParrent />
    </Suspense>
  </Canvas>,
)