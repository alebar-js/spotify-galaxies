//@ts-ignore
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import ArtistBanner from './ArtistBanner';
import { Artist } from '../types';

type PlanetProps = {
  position: THREE.Vector3;
  artist: Artist;
};

const Planet = ({ position, artist }: PlanetProps) => {
  const ref = useRef<THREE.Mesh>();
  const [hovered, hover] = useState<Boolean>(false);
  const [clicked, click] = useState<Boolean>(false);

  const artistPosition: THREE.Vector3 = new THREE.Vector3(
    position.x,
    position.y + 2,
    position.z
  );

  const artistImg = artist!.images![0];

  useFrame((state, delta) => {
    if (!hovered && ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      {clicked && (
        <ArtistBanner
          name={artist.name}
          image={artistImg}
          position={artistPosition}
        />
      )}
      <mesh
        position={position}
        ref={ref as React.Ref<THREE.Mesh>}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={() => click(!clicked)}
      >
        <icosahedronGeometry args={[1]} />
        <meshPhongMaterial color={0xee6123} flatShading />
      </mesh>
    </>
  );
};

export default Planet;
