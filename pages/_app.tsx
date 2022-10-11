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
import { GetServerSideProps } from 'next';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AccessManager>
        <AudioProvider>
          <Header />
          <Component {...pageProps} />
        </AudioProvider>
      </AccessManager>
    </SessionProvider>
  );
}

type AccessManagerType = {
  children: JSX.Element;
};
const AccessManager: React.FC<AccessManagerType> = ({
  children,
}: AccessManagerType) => {
  const session = useSession();
  if (!session) signIn(); // OR return a login page component

  return children;
};

export default MyApp;
