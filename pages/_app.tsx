import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import {
  getSession,
  SessionContextValue,
  SessionProvider,
  signIn,
  useSession,
} from 'next-auth/react';
import { AudioProvider } from '../components/AudioPlayer';
import Header from '../components/navigation/Header';
import React from 'react';
import { NextComponentType } from 'next';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AudioProvider>
        <Header />
        <Component {...pageProps} />
      </AudioProvider>
    </SessionProvider>
  );
}

type AccessManagerType = {
  children: JSX.Element;
  auth?: boolean;
};

export default MyApp;
