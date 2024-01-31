import { motion } from 'framer-motion-3d';
import { Canvas,  } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { LayoutName, Artist, Track } from '../types';
import { TrackballControls } from '@react-three/drei';
import { getVariants } from '../lib/layouts';
import styles from '../styles/Top-Tracks.module.css';
import Banner from '../components/Banner/Banner';

const LAYOUT_NAMES: LayoutName[] = ['helix', 'grid', 'sphere'];

const TopArtistsPage = () => {
  const [layout, setLayout] = useState<LayoutName>('helix');
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    fetch('/api/spotify/user/top?type=artists&limit=50&timeRange=long_term')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let artists: Array<Artist> = [];
        data.forEach((item: Artist) => {
          artists = [...artists, item];
        });
        console.log(artists);
        setArtists(artists);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderButtons = () =>
    LAYOUT_NAMES.map((layout, i) => (
      <button key={i} onClick={() => setLayout(layout)}>
        {layout.toUpperCase()}
      </button>
    ));

  const getTopTrack = async (artistId?: string) => {
    let track: Track;
    track = await fetch(`/api/spotify/artist/${artistId}/random-top-track`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return track;
  };

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
        <TrackballControls rotateSpeed={4} />
        {artists.length > 0 &&
          artists.map((artist, i) => {
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
                  topText=''
                  bottomText={artist.name}
                  audioSource={''}
                  textOn='hover'
                  imageURL={artist.images[0].url}
                  getAudioCallback={() => getTopTrack(artist.id)}
                />
              </motion.group>
            );
          })}
      </Canvas>
    </div>
  );
};

TopArtistsPage.title = 'Top Artists';
TopArtistsPage.auth = true;

export default TopArtistsPage;
