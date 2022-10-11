import styles from '../styles/volume-slider.module.css';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAudio } from './AudioPlayer';
import playIcon from '../public/play-icon.svg';
import pauseIcon from '../public/pause-icon.svg';

const AudioControls = () => {
  const { volume, changeVolume, pauseSong, resumeSong } = useAudio();
  return (
    <div className='text-center child:cursor-pointer w-full absolute bottom-0 mx-auto '>
      <div className='w-[100px] mx-auto'>
        <input
          type='range'
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={(e) => changeVolume(e.target.valueAsNumber)}
        />
      </div>
      <Image src={playIcon} width={20} height={20} onClick={resumeSong} />
      <Image src={pauseIcon} width={30} height={30} onClick={pauseSong} />
    </div>
  );
};

export default AudioControls;
