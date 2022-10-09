import { useState, useContext } from 'react';
import { useLoader } from 'react-three-fiber';
import { Track } from '../types';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';
import { ThreeEvent } from '@react-three/fiber';
import { useAudio } from './AudioPlayer';

type TrackBannerProps = {
  track: Track;
};

const TrackBanner = ({ track }: TrackBannerProps) => {
  const { setSong, pauseSong } = useAudio();

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
    setSong(track.preview_url);
  };
  return (
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
  );
};

export default TrackBanner;
