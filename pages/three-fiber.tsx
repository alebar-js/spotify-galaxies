import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Canvas, extend, ReactThreeFiber } from '@react-three/fiber';
import styles from '../styles/Three-Fiber.module.css';
import Orbit from '../components/Orbit';
import {
  SessionContextValue,
  useSession,
  signIn,
  signOut,
} from 'next-auth/react';
import { Artist } from '../types';
import { TrackballControls } from '@react-three/drei';
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

interface Canvas {
  camera: {
    ref: React.Ref<THREE.Camera>;
  };
}

extend({ OrbitControls });

const getOrbits = (artists: Artist[]) => {
  let seg = 1;
  let prev = 0;
  let n = 0;
  let orbits = [];
  while (n < artists.length) {
    let orbit = [];
    for (let i = n; i < n + seg; i++) {
      if (!artists[i]) break;
      orbit.push(artists[i]);
    }
    n += seg;
    prev = seg;
    seg === 1 ? (seg = 3) : (seg = seg + prev);
    orbits.push(orbit);
  }
  return orbits;
};

const ThreeFiberPage = () => {
  const session: SessionContextValue = useSession();
  const user = session.data?.user;
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const cameraRef = useRef();

  useEffect(() => {
    fetch('/api/spotify/user/top?type=artists&limit=50&timeRange=medium_term')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let artists: Array<Artist> = [];
        data.items.forEach((item: Artist) => {
          artists = [...artists, item];
        });
        setTopArtists(artists);
      });
  }, [user]);

  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  }

  return (
    <div
      className={styles.pageContainer}
      style={{ height: '100vh', width: '100vw' }}
    >
      <Canvas>
        <perspectiveCamera />
        {/* @ts-ignore */}
        <TrackballControls rotateSpeed={5} ref={cameraRef} />
        <ambientLight color={0x999999} />
        <pointLight position={[10, 10, 10]} />

        {topArtists &&
          getOrbits(topArtists.slice(0, 20)).map((orbit, i) => {
            return (
              <Orbit
                artists={orbit}
                radius={i * 4}
                position={new THREE.Vector3(0, 0, 0)}
                key={i}
                //@ts-ignore
                cameraPosition={cameraRef.current.object.position}
              />
            );
          })}
      </Canvas>
    </div>
  );
};

export default ThreeFiberPage;
