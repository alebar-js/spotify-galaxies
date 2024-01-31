import { useState, useContext, useRef, useEffect } from 'react';
import { useLoader } from 'react-three-fiber';
import { FontData, Track } from '../../types';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';
import { Text3D, Center, Text } from '@react-three/drei';
import { ThreeEvent, extend } from '@react-three/fiber';
import { useAudio } from '../../lib/hooks/AudioPlayer';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import gotham from '../../public/fonts/helvetiker_regular.typeface.json';

type TrackBannerProps = {
  topText: string;
  bottomText: string;
  imageURL: string;
  audioSource?: string;
  textOn: 'always' | 'hover' | 'click';
  getAudioCallback?: () => Promise<Track>;
};

extend({ TextGeometry });

const TrackBanner = ({
  topText,
  bottomText,
  imageURL,
  audioSource,
  textOn,
  getAudioCallback,
}: TrackBannerProps) => {
  const { setSong, pauseSong, currentSong, status, resumeSong } = useAudio();
  const artistNameRef = useRef<TextGeometry>();
  const titleRef = useRef<TextGeometry>();
  const font = new FontLoader().parse(gotham);
  const [clicked, click] = useState(false);

  const [hovered, hover] = useState(false);
  const texture = useLoader(THREE.TextureLoader, imageURL);
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

  const handleClick = async (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    let src = undefined;
    // Retrieve audio from Spotify API on click only with getAudioCallback
    if (audioSource === '' && getAudioCallback) {
      src = await getAudioCallback();
      if (currentSong === src.name) {
        status === 'playing' ? pauseSong() : resumeSong();
      } else {
        setSong(src.preview_url, src.name);
      }
    }
    // Audio URL is received as props
    else {
      if (currentSong === audioSource) {
        status === 'playing' ? pauseSong() : resumeSong();
      } else audioSource && setSong(audioSource, topText);
    }
  };
  // Center the texts, need to figure out how to keep this between renders
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
      <motion.mesh position={[0, 1.1, 0]}>
        <meshBasicMaterial color={0xffffff} />
        {displayText && (
          <Center top right>
            <Text
              fontSize={0.3}
              font='http://fonts.cdnfonts.com/css/helvetica-neue-9'
            >
              {topText}
            </Text>
          </Center>
        )}
      </motion.mesh>

      <motion.mesh
        animate={hovered ? 'hover' : 'rest'}
        variants={variants}
        material={materials}
        onPointerEnter={() => hover(true)}
        onPointerLeave={() => hover(false)}
        // onClick={(e) => handleClick(e)}
        onPointerDown={(e) => handleClick(e)}
      >
        <boxGeometry args={[1.5, 1.5, 0.2]} />
      </motion.mesh>

      <motion.mesh position={[0, -0.1, 0]}>
        {displayText && (
          <Center bottom right>
            <Text
              fontSize={0.3}
              font='http://fonts.cdnfonts.com/css/helvetica-neue-9'
            >
              {bottomText}
            </Text>
          </Center>
        )}
        <meshBasicMaterial color={0xffffff} />
      </motion.mesh>
    </motion.group>
  );
};

export default TrackBanner;
