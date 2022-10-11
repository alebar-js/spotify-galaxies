import { useState, useContext, useRef, useEffect } from 'react';
import { useLoader } from 'react-three-fiber';
import { Track } from '../types';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';
import { ThreeEvent, extend } from '@react-three/fiber';
import { useAudio } from './AudioPlayer';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import gotham from '../public/fonts/helvetiker_regular.typeface.json';

type TrackBannerProps = {
  track: Track;
  textOn: 'always' | 'hover' | 'click';
};

extend({ TextGeometry });

const TrackBanner = ({ track, textOn }: TrackBannerProps) => {
  const { setSong, pauseSong } = useAudio();
  const artistNameRef = useRef<TextGeometry>();
  const titleRef = useRef<TextGeometry>();
  const font = new FontLoader().parse(gotham);
  const [clicked, click] = useState(false);

  const [hovered, hover] = useState(false);
  let img = track.album.images[0];
  const texture = useLoader(THREE.TextureLoader, img.url);
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
    new THREE.MeshBasicMaterial({ map: texture }),
    new THREE.MeshBasicMaterial({ map: texture }),
  ];
  const variants = {
    hover: { scale: 1.2 },
    rest: { scale: 1 },
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setSong(track.preview_url, track.name);
  };

  useEffect(() => {
    titleRef.current && titleRef.current.center();
    artistNameRef.current && artistNameRef.current.center();
  });

  const displayText =
    textOn === 'always' ||
    (textOn === 'hover' && hovered) ||
    (textOn === 'click' && clicked);

  return (
    <motion.group>
      <motion.mesh position={[0, 1.08, 0]}>
        {displayText && (
          <textGeometry
            ref={titleRef as React.Ref<TextGeometry>}
            args={[
              track.name,
              { font, size: 0.3, height: 0.01, bevelThickness: 0.1 },
            ]}
          />
        )}
        <meshBasicMaterial color={0xffffff} />
      </motion.mesh>

      <motion.mesh
        animate={hovered ? 'hover' : 'rest'}
        variants={variants}
        material={materials}
        onPointerEnter={() => hover(true)}
        onPointerLeave={() => hover(false)}
        onClick={(e) => handleClick(e)}
      >
        <boxGeometry args={[1.5, 1.5, 0.2]} />
      </motion.mesh>

      <motion.mesh position={[0, -1.08, 0]}>
        {displayText && (
          <textGeometry
            ref={artistNameRef as React.Ref<TextGeometry>}
            args={[
              track.artists[0].name,
              { font, size: 0.3, height: 0.01, bevelThickness: 0.1 },
            ]}
          />
        )}
        <meshBasicMaterial color={0xffffff} />
      </motion.mesh>
    </motion.group>
  );
};

export default TrackBanner;
