import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Image } from '../types';
import { useLoader, extend, ReactThreeFiber } from '@react-three/fiber';
import helvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import gotham from '../public/fonts/helvetiker_regular.typeface.json';

interface ArtistBannerProps {
  name: string;
  image: Image;
  position: THREE.Vector3;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: ReactThreeFiber.Object3DNode<
        TextGeometry,
        typeof TextGeometry
      >;
    }
  }
}

extend({ TextGeometry });

const ArtistBanner = ({ name, image, position }: ArtistBannerProps) => {
  const ref = useRef<THREE.Mesh>();
  const texture = useLoader(THREE.TextureLoader, image.url);

  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ map: texture }),
    new THREE.MeshBasicMaterial({ map: texture }),
  ];

  const font = new FontLoader().parse(gotham);
  const fontPosition: THREE.Vector3 = new THREE.Vector3(
    position.x - (name.length / 2) * 0.22,
    position.y + 1,
    position.z
  );
  return (
    <>
      <mesh position={fontPosition}>
        <textGeometry
          args={[name, { font, size: 0.3, height: 0.01, bevelThickness: 0.1 }]}
        />
        <meshBasicMaterial color={0xffffff} />
      </mesh>
      <mesh
        ref={ref as React.Ref<THREE.Mesh>}
        position={position}
        material={materials}
      >
        <boxGeometry args={[1.5, 1.5, 0.2]} />
      </mesh>
    </>
  );
};

export default ArtistBanner;
