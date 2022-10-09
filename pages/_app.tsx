import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AudioProvider } from '../components/AudioPlayer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AudioProvider>
        <Component {...pageProps} />
      </AudioProvider>
    </SessionProvider>
  );
}

export default MyApp;
