import { motion } from 'framer-motion-3d';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { SessionContextValue, signIn, useSession } from 'next-auth/react';
import { LayoutName, Track } from '../types';
import { PerspectiveCamera, TrackballControls } from '@react-three/drei';
import { getVariants } from '../lib/layouts';
import Banner from '../components/Banner';
import styles from '../styles/Top-Tracks.module.css';
import Router from 'next/router';

const LAYOUT_NAMES: LayoutName[] = ['helix', 'grid', 'sphere'];

const TopTracksPage = () => {
  const [layout, setLayout] = useState<LayoutName>('helix');
  const [tracks, setTracks] = useState<Track[]>([]);

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
      })
      .catch((err) => console.log(err));
  }, []);

  const renderButtons = () =>
    LAYOUT_NAMES.map((layout, i) => (
      <button key={i} onClick={() => setLayout(layout)}>
        {layout.toUpperCase()}
      </button>
    ));
  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #11e8bb 0%, #8200c9 100%)',
      }}
      className='w-full h-[calc(100vh-65px)]'
    >
      <div className={styles.buttonsContainer}>{renderButtons()}</div>
      <Canvas
        camera={{ position: [0, 10, 20] }}
        style={{ width: '100%', height: '100%', top: 0 }}
      >
        <TrackballControls rotateSpeed={12} />
        {tracks.map((track, i) => {
          return (
            <motion.group
              animate={layout}
              transition={{
                ease: 'easeInOut',
                duration: Math.random() * 0.5 + 0.5,
              }}
              variants={getVariants(i)}
              key={i}
              onClick={(e) => e.stopPropagation()}
            >
              <Banner
                topText={track.name}
                bottomText={track.artists[0].name}
                audioSource={track.preview_url}
                imageURL={track.album.images[0].url}
                textOn='hover'
              />
            </motion.group>
          );
        })}
      </Canvas>
    </div>
  );
};

TopTracksPage.title = 'Top Tracks';
TopTracksPage.auth = true;

export default TopTracksPage;
