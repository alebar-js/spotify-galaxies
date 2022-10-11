import styles from '../styles/volume-slider.module.css';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAudio } from './AudioPlayer';
import playIcon from '../public/play-icon.svg';
import pauseIcon from '../public/pause-icon.svg';

const AudioControls = () => {
  const { volume, changeVolume } = useAudio();
  return (
    <div className='text-center w-full absolute bottom-0 mx-auto flex justify-center'>
      <div className='w-[100px]'>
        <input
          type='range'
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={(e) => changeVolume(e.target.valueAsNumber)}
        />
      </div>
      <Image
        src={playIcon}
        width={20}
        height={20}
        style={{ fill: '#ffffff', stroke: '#ffffff' }}
      />
      <Image
        src={pauseIcon}
        width={27}
        height={27}
        style={{ marginTop: '3px' }}
      />
    </div>
  );
};

export default AudioControls;
