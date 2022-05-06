import React, { useRef, useMemo } from 'react';
import { useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import {colorChange, revertColor} from '../Util/HoverFunction'
import oneClick from '../Util/OnCountryClick'

function Shapes(props) {
    const ref = useRef()
    const country = props.country
    const data = useLoader( SVGLoader, country )
    const paths = data.paths
    const depth = props.depth
    const SvgShape = ({ shape, color, index }) => {
        return (
        <mesh
          position={[-3.5, 3, 5]}
          scale={[0.22, -0.22, 0.15]}
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
          onPointerOver={(event) => colorChange(event.object, props)}
          onPointerOut={(event) => revertColor(event.object)}
        />
      )
}

export default Shapes;