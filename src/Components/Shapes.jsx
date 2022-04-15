import React, { useRef, useMemo, useState } from 'react';
import { useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

function Shapes(props) {
    const ref = useRef()
    const country = props.country
    const data = useLoader( SVGLoader, country )
    const paths = data.paths;
    const color = props.color
    const depth = props.depth

    const SvgShape = ({ shape, color, index }) => {
        return (
        <mesh
            scale={[0.1, -0.1, 0.1]}
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

      const [clicked, click] = useState(false);
      const [hovered, hover] = useState(false);
    return (
        <group
          ref={ref}
          children={shapes.map((props, key) => (
            <SvgShape key={key} {...props} />
            ))
          }
          scale={clicked ? 1.1 : 1}
          color={hovered ? 'hotpink' : color }
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        />
      )
}

export default Shapes;