//@ts-ignore
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import ArtistBanner from './ArtistBanner';
import { Artist } from '../types';

type PlanetProps = {
  position: THREE.Vector3;
  artist: Artist;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (artistName: string) => void;
};

const X_ROTATION_VELO = 0.01;
const Y_ROTATION_VELO = 0.01;

const Planet = ({
  position,
  artist,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: PlanetProps) => {
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
      // ref.current.rotation.x += X_ROTATION_VELO;
      // ref.current.rotation.y += Y_ROTATION_VELO;
    }
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const clickedPosition = new THREE.Vector3(
    position.x,
    position.y + 5,
    position.z
  );

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
        position={clicked ? clickedPosition : position}
        ref={ref as React.Ref<THREE.Mesh>}
        onPointerOver={() => {
          onMouseEnter && onMouseEnter();
          hover(true);
        }}
        onPointerOut={() => {
          onMouseLeave && onMouseLeave();
          hover(false);
        }}
        onClick={() => {
          onClick && onClick(artist.name);
          click(!clicked);
        }}
        scale={hovered || clicked ? 1.2 : 1}
      >
        <icosahedronGeometry args={[1]} />
        <meshPhongMaterial color={0xee6123} flatShading />
      </mesh>
    </>
  );
};

export default Planet;
