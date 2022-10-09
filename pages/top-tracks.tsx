import { motion } from 'framer-motion-3d';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { SessionContextValue, useSession } from 'next-auth/react';
import { LayoutName, Track } from '../types';
import { TrackballControls } from '@react-three/drei';
import { getVariants } from '../lib/layouts';
import TrackBanner from '../components/TrackBanner';
import styles from '../styles/Top-Tracks.module.css';

const LAYOUT_NAMES: LayoutName[] = ['helix', 'grid', 'sphere'];

const Test = () => {
  const session: SessionContextValue = useSession();
  const [layout, setLayout] = useState<LayoutName>('helix');
  const user = session.data?.user;
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
      });
  }, [user]);

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
    >
      <div className={styles.buttonsContainer}>{renderButtons()}</div>
      <Canvas style={{ width: '100vw', height: '100vh', top: 0 }}>
        <perspectiveCamera position={[0, 0, 10]} />
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
              <TrackBanner track={track} />
            </motion.group>
          );
        })}
      </Canvas>
    </div>
  );
};

export default Test;
