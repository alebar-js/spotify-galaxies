import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import {
  useSession,
  SessionContextValue,
  signIn,
  signOut,
} from 'next-auth/react';

//1, 5, 10, 12, 14 = top 50 artist

const Home: NextPage = () => {
  const session: SessionContextValue = useSession();
  const user = session.data?.user;
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    fetch('/api/spotify/user/top?type=artists&limit=50&timeRange=short_term')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let artists = [];
        data.items.forEach((item) => {
          artists = [...artists, item.name];
        });
        console.log(artists);
        setTopArtists(artists);
      });
  }, []);

  if (!session || session.status === 'unauthenticated') {
    return (
      <div>
        <p>Please sign in</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
  return (
    <div>
      <p>Hello, {user?.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default Home;
