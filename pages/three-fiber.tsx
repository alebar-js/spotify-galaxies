import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useRef, useState } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader,
  ReactThreeFiber,
} from '@react-three/fiber';
import Planet from '../components/Planet';
import styles from '../styles/Three-Fiber.module.css';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef<OrbitControls>();

  useFrame((state) => controls.current!.update());

  return (
    <orbitControls
      ref={controls as React.Ref<OrbitControls>}
      args={[camera, domElement]}
    />
  );
};

const ThreeFiberPage = () => {
  return (
    <div
      className={styles.pageContainer}
      style={{ height: '100vh', width: '100vw' }}
    >
      <h1>THREE-FIBER Experiments</h1>
      <Canvas>
        <CameraControls />
        <ambientLight color={0x999999} />
        <pointLight position={[10, 10, 10]} />
        <Planet
          position={new THREE.Vector3(0, 0, 0)}
          artist={{
            name: 'pol granch',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab6761610000e5eb5d65423c510723395105202b',
                width: 640,
              },
            ],
          }}
        />
      </Canvas>
    </div>
  );
};

export default ThreeFiberPage;
