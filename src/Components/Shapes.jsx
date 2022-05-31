import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import {colorChange, revertColor} from '../Util/HoverFunction'
import { useLoader } from '@react-three/fiber'
import React, { useRef, useMemo } from 'react'
import oneClick from '../Util/OnCountryClick'
import { Color } from 'three'

function Shapes(props) {
    const ref = useRef()
    const data = useLoader( SVGLoader, props.shape )
    const paths = data.paths
    const color = new Color(parseInt( props.color, 16 ))
    const depth = props.depth
    const SvgShape = ({ shape, index }) => {
        return (
        <mesh
          position={[-3.5, 3.5, 5]}
          scale={[0.22, -0.22, 0.15]}
        >
          <extrudeBufferGeometry attach="geometry" args={[shape, { bevelEnabled: false, depth: depth }]}/>
          <meshStandardMaterial  attach="material" color={color}/>
        </mesh>
    )}
    const shapes = useMemo(
        () =>
          paths.flatMap((path, index) =>
            path.toShapes(true).map(shape => ({ index, shape, color: path.color }))
          ),
        [paths]
      )

    return (
        <group
          name={props.name}
          clicked={false}
          ref={ref}
          children={shapes.map((props, key) => (
            <SvgShape key={key} {...props} />
            ))
          }

          onClick={(event) => oneClick(event.eventObject, props)}
          onPointerOver={(event) => colorChange(event.object, props.isMember)}
          onPointerOut={(event) => revertColor(event.object, props.color)}
        />
      )
}

export default Shapes;