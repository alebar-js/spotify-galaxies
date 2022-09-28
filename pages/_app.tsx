import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, signIn } from 'next-auth/react';
import { SpotifyProfile } from 'next-auth/providers/spotify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
