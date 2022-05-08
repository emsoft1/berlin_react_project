import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import helvetica from "three/examples/fonts/helvetiker_regular.typeface.json";

import countries from '../Util/countriesInfo.js'

setTimeout(() => extend({ TextGeometry }), 0)

export default function Text( { title } ) {
    const font = new FontLoader().parse( helvetica );
    
    if( ! title ) {
        return null;
    }

    const country = countries.filter( obj => {
        return obj.name === title;
    });

    return (
        <mesh
        position={[-3, 1, 5]}
        >
            <textGeometry 
                args={[ title, 
                    { font, size: 0.8, height: country[0].depths / 10 }
                ]}/>
            <meshLambertMaterial
                attach="material"
                color={country[0].color}
            />
        </mesh>
    )
}