import React, { useRef, useMemo } from 'react';
import { useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

function Shapes(props) {
    const ref = useRef()
    const country = props.country
    const data = useLoader( SVGLoader, country )
    const paths = data.paths
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
        console.log(object.parent.name)
            
      oldColor = object.material.color.getHex()
      const parentArr = object.parent.children
      parentArr.forEach(child => {
        child.material.color.setHex(0xff5595)
      });
    }

    const revertColor = (object)=>{
      const parentArr = object.parent.children
      parentArr.forEach(child => {
        child.material.color.setHex(oldColor)
      });
    }

    const oneClick = (event)=>{
      const siblings = event.parent.children
      siblings.forEach(child => {
        if(child.name && child.name!==event.name && child.clicked){
          child.scale.set(1,1,1)
          child.clicked = false
        }
      })

      if(event.clicked) event.scale.set(1,1,1)
      else event.scale.set(1.3,1.3,1.3)
      event.clicked = !event.clicked
    }


    return (
        <group
          name={props.name}
          clicked={false}
          ref={ref}
          children={shapes.map((props, key) => (
            <SvgShape key={key} {...props} />
            ))
          }

          onClick={(event) => oneClick(event.eventObject)}
          onPointerOver={(event) => colorChange(event.object)}
          onPointerOut={(event) => revertColor(event.object)}
        />
      )
}

export default Shapes;