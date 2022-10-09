import * as THREE from 'three';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import styles from '../styles/Three-Fiber.module.css';
import { SessionContextValue, useSession, signIn } from 'next-auth/react';
import { LayoutName, Track } from '../types';
import { TrackballControls } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { getTargets } from '../lib/layouts';

interface Canvas {
  camera: {
    ref: React.Ref<THREE.Camera>;
  };
}

interface TrackballControls {
  ref?: React.Ref<TrackballControls>;
}

const targets = getTargets(50, new THREE.Vector3());

const OMG = () => {
  const session: SessionContextValue = useSession();
  const [layout, setLayout] = useState<LayoutName>('helix');
  const user = session.data?.user;
  const [tracks, setTracks] = useState<Track[]>([]);
  const cameraRef = useRef<TrackballControls>();

  useEffect(() => {
    fetch('/api/spotify/user/top?type=tracks&limit=50&timeRange=long_term')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let tracks: Array<Track> = [];
        data.items.forEach((item: Track) => {
          tracks = [...tracks, item];
        });
        setTracks(tracks);
      });
  }, [user]);

  if (!session) {
    return (
      <>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  }
  const onClick = useCallback(
    (layout: LayoutName) => {
      setLayout(layout);
    },
    [layout]
  );

  return (
    <div
      className={styles.pageContainer}
      style={{ height: '100vh', width: '100vw' }}
    >
      <button onClick={() => onClick('helix')}>helix</button>
      <button onClick={() => onClick('sphere')}>sphere</button>
      <button onClick={() => onClick('table')}>table</button>
      <Canvas>
        <perspectiveCamera />
        <TrackballControls
          rotateSpeed={5}
          //@ts-ignore
          ref={cameraRef as React.Ref<TrackballControls>}
        />
        <ambientLight color={0x999999} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <sphereGeometry args={[1]} />
          <meshBasicMaterial />
        </mesh>
        {tracks.map((item, i) => (
          <motion.group
            position-x={targets[layout][i].position.x}
            position-y={targets[layout][i].position.y}
            position-z={targets[layout][i].position.z}
          >
            <mesh>
              <boxGeometry />
              <meshBasicMaterial />
            </mesh>
          </motion.group>
        ))}
      </Canvas>
    </div>
  );
};

export default OMG;
