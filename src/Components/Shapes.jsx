import React, { useRef, useMemo, useState } from 'react';
import { useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

function Shapes(props) {
    const ref = useRef()
    const country = props.country
    const data = useLoader( SVGLoader, country )
    const paths = data.paths;
    // const color = props.color
    const depth = props.depth
    let oldColor

    const SvgShape = ({ shape, color, index }) => {
        return (
        <mesh
          position={[-2.5, 2.5, 5]}
          scale={[0.2, -0.2, 0.15]}
        >
          <meshLambertMaterial
            attach="material"
            color={color}
          />
          <extrudeBufferGeometry attach="geometry" args={[shape, { bevelEnabled: false, depth: depth }]}/>
        </mesh>
    )}

    const shapes = useMemo(
        () =>
          paths.flatMap((path, index) =>
            path.toShapes(true).map(shape => ({ index, shape, color: path.color }))
          ),
        [paths]
      )
      
    const colorChange = (object)=>{
      oldColor = object.material.color.getHex()
      const parentArr = object.parent.children
      parentArr.forEach(child => {
        child.material.color.setHex(0xff0000)
      });
    }
    const revertColor = (object)=>{
      const parentArr = object.parent.children
      parentArr.forEach(child => {
        child.material.color.setHex(oldColor)
      });
    }

      const [clicked, click] = useState(false);
    return (
        <group
          ref={ref}
          children={shapes.map((props, key) => (
            <SvgShape key={key} {...props} />
            ))
          }
          scale={clicked ? 1.3 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => {colorChange(event.object)}}
          onPointerOut={(event) => {revertColor(event.object)}}
        />
      )
}

export default Shapes;