import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { PlaylistItem, Track } from '../types';
import { TrackballControls } from '@react-three/drei';
import Banner from '../components/Banner';
import AudioControls from '../components/AudioControls';
import { useSession } from 'next-auth/react';
import { satelliteTrack } from '../util/constants';

const Home = () => {
  const [track, setTrack] = useState<Track>();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') {
      fetch('/api/spotify/playlist/1MvhpBIgJUi0KMElQCVDnj')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let tracks = data.items.tracks.items.map(
            (item: PlaylistItem) => item.track
          );
          setTrack(tracks[Math.floor(Math.random() * tracks.length)]);
        })
        .catch((err) => console.log(err));
    } else {
      setTrack(satelliteTrack);
    }
  }, [session.status]);

  return (
    <div className='min-h-[calc(100vh-65px)] h-1 overflow-auto bg-[#2941AB]'>
      <div className='h-full py-10 flex child:h-full'>
        <div className='w-[50%] flex items-center justify-center text-[#1ed760] select-none'>
          <div className='m-10'>
            <h1 className='font-extrabold lg:text-6xl self-center'>
              Explore your Spotify listening history in a different way.
              <br />
              Welcome to Wrapp3D
            </h1>
            <p className='m-3'>
              Take a look through your favorite artists and songs in the past
              months or year, using 3D rendering software. Listen to previews of
              your favorite tracks, or artists &apos; top tracks!
            </p>
          </div>
        </div>
        <div className='w-[50%] relative'>
          <Canvas camera={{ position: [0, 0, 2] }}>
            <TrackballControls rotateSpeed={1} />
            <motion.group>
              {track && (
                <Banner
                  topText={track.name}
                  bottomText={track.artists[0].name}
                  audioSource={track.preview_url}
                  imageURL={track.album.images[0].url}
                  textOn='hover'
                />
              )}
            </motion.group>
          </Canvas>
          <AudioControls />
        </div>
      </div>
    </div>
  );
};

Home.auth = false;

export default Home;
