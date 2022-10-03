import * as THREE from 'three';
import { useRef, useState } from 'react';

//@ts-ignore
const PolyPlanet = (position) => {
  const ref = useRef<THREE.Mesh>();
  const [hovered, hover] = useState<Boolean>(false);

  return (
    //@ts-ignore
    <mesh position={position} ref={ref}>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhongMaterial color={0xffffff} flatShading />
    </mesh>
  );
};

export default PolyPlanet;
