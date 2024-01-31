import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AudioProvider } from '../lib/hooks/AudioPlayer';
import Header from '../components/navigation/Header';
import React from 'react';
import { NextComponentType } from 'next';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    //@ts-ignore
    <SessionProvider session={pageProps.session}>
      <AudioProvider>
        <Header />
        <Component {...pageProps} />
      </AudioProvider>
    </SessionProvider>
  );
}

export default MyApp;
