import { useState, useContext, createContext } from 'react';

type AudioContext = {
  setSong: (song: string) => void;
  pauseSong: () => void;
};

//We first create a store
export const AudioContext: React.Context<AudioContext> = createContext({
  setSong: (s: string) => {},
  pauseSong: () => {},
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

  const setSong = (url: string) => {
    song?.pause();
    const newSong: HTMLAudioElement = new Audio(url);
    newSong.play();
    _setSong(newSong);
  };
  const pauseSong = () => song?.pause();

  return (
    <AudioContext.Provider value={{ setSong, pauseSong }}>
      {children}
    </AudioContext.Provider>
  );
};
