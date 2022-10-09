import * as THREE from 'three';
import React, { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import Planet from './Planet';
import { Artist } from '../types';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

type OrbitProps = {
  radius: number;
  position?: THREE.Vector3;
  artists: Artist[];
  cameraPosition?: THREE.Vector3;
};

const ROTATION_SPEED = 0.005;

interface OrbitContextType {
  clicked: Boolean;
  hovered: Boolean;
  orbitalSpeed: number;
  cameraPosition?: THREE.Vector3;
}

export const OrbitContext = React.createContext<OrbitContextType>({
  clicked: false,
  hovered: false,
  orbitalSpeed: ROTATION_SPEED,
});

const Orbit = ({ radius, position, artists, cameraPosition }: OrbitProps) => {
  const [hovered, hover] = useState<boolean>(false);
  const [clicked, click] = useState<boolean>(false);
  const [clickedArtists, setClickedArtists] = useState<Set<string>>(new Set());
  const ref = useRef<THREE.Group>();

  useFrame((state, delta) => {
    if (!hovered && ref.current) {
      // ref.current.rotation.y += ROTATION_SPEED;
    }
  });

  const handleClick = (artistName: string) => {
    let artists = clickedArtists;
    if (clickedArtists.has(artistName)) artists.delete(artistName);
    else artists.add(artistName);

    setClickedArtists(artists);
    click(artists.size > 0);
  };

  const getPlanetsWithPosition = () => {
    const deg = (2 * Math.PI) / artists.length;
    return artists.map((artist: Artist, index: number) => {
      let x = Math.cos(deg * index) * radius;
      let z = Math.sin(deg * index) * radius;
      return (
        <Planet
          position={new THREE.Vector3(x, 0, z)}
          artist={artist}
          onMouseEnter={() => hover(true)}
          onMouseLeave={() => hover(false)}
          onClick={handleClick}
          key={index}
        />
      );
    });
  };

  return (
    <>
      <OrbitContext.Provider
        value={{
          clicked: clicked,
          hovered: hovered,
          orbitalSpeed: ROTATION_SPEED,
          cameraPosition: cameraPosition,
        }}
      >
        <group ref={ref as React.Ref<THREE.Group>} position={position}>
          {getPlanetsWithPosition()}
        </group>
      </OrbitContext.Provider>
    </>
  );
};

export default Orbit;
