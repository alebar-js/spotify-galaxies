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
      <AccessManager auth={Component.auth}>
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
  auth?: boolean;
};

App.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  //@ts-ignore
  const session = await getSession(context);

  return {
    ...appProps,
    session,
  };
};
const AccessManager: React.FC<AccessManagerType> = ({
  children,
  auth,
}: AccessManagerType) => {
  const session = useSession();

  if (auth) {
    session.status !== 'authenticated' && signIn();
  }
  return children;
};

export default MyApp;
