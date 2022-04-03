import React, { useRef, useMemo, useState } from 'react';
import { useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { obj } from '../util/paths'




function Shapes(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    const data = useLoader( SVGLoader, 'shapes.svg' )
    const paths = data.paths;

    const SvgShape = ({ shape, color, index }) => {
        const [clicked, click] = useState(false);
        const [hovered, hover] = useState(false);
        console.log( index );
        return (
        <mesh
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
        >
          <meshLambertMaterial
            attach="material"
            color={hovered ? 'hotpink' : color }
            /*
              HACK: Offset SVG polygons by index
              The paths from SVGLoader Z-fight.
              This fix causes stacking problems with detailed SVGs.
            */
            polygonOffset
            polygonOffsetFactor={index * -0.1}
          />
          <extrudeBufferGeometry attach="geometry" args={[shape, { bevelEnabled: false, depth: obj.depths[index] }]}/>
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
          ref={ref}
          children={shapes.map((props, key) => (
            <SvgShape key={key} {...props} />
          ))}
          scale={[0.01, 0.01, 0.01]}
        />
      )
}

export default Shapes;