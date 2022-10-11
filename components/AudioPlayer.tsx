import { useState, useContext, createContext } from 'react';

type AudioContext = {
  currentSong: string;
  setSong: (song: string, songTitle: string) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  changeVolume: (vol: number) => void;
  volume: number;
  status: string;
};

//We first create a store
export const AudioContext: React.Context<AudioContext> = createContext({
  currentSong: '',
  setSong: (s: string, st: string) => {},
  pauseSong: () => {},
  resumeSong: () => {},
  volume: 0.5,
  changeVolume: (n: number) => {},
  status: 'idle',
});

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context && typeof window !== 'undefined') {
    throw new Error(`useAudio must be used within a AudioContext `);
  }
  return context;
};

type AudioProvider = {
  children: React.ReactNode;
};

//Then we create the provider
export const AudioProvider: React.FC<AudioProvider> = ({ children }) => {
  const [song, _setSong] = useState<HTMLAudioElement>();
  const [currentSong, setCurrentSong] = useState('');
  const [volume, _changeVolume] = useState(0.5);
  const [status, setStatus] = useState('idle');

  const setSong = (url: string, songTitle: string) => {
    song?.pause();
    const newSong: HTMLAudioElement = new Audio(url);
    newSong.volume = volume;
    newSong.play();
    newSong.onended = () => setStatus('idle');
    setStatus('playing');
    setCurrentSong(url);
    _setSong(newSong);
  };
  const pauseSong = () => {
    setStatus('paused');
    song?.pause();
  };

  const resumeSong = () => {
    song?.play();
    setStatus('playing');
  };

  const changeVolume = (vol: number) => {
    _changeVolume(vol);
    if (song) {
      song.volume = vol;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        setSong,
        pauseSong,
        volume,
        changeVolume,
        status,
        resumeSong,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
