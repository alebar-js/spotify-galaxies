import { motion } from "framer-motion-3d";
import { useEffect, useState } from "react";
import { LayoutName, Artist, Track } from "../types";
import { getVariants } from "../lib/layouts";
import Banner from "../components/Banner/Banner";
import useLoading from "../lib/hooks/useLoading";
import { BannerCanvas } from "../components/BannerCanvas";

import { demoArtists } from "../data/demoValues";

const LAYOUT_NAMES: LayoutName[] = ["helix", "grid", "sphere"];

const fetchArtists = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demoArtists);
    }, 500);
  });
};

const DemoArtistsPage = () => {
  const [layout, setLayout] = useState<LayoutName>("helix");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [getArtists, loading] = useLoading(fetchArtists);

  useEffect(() => {
    getArtists().then((data) => setArtists(data));
  }, []);

  const getTopTrack = async (artistId?: string) => {
    let track: Track;
    track = await fetch(`/api/spotify/artist/${artistId}/random-top-track`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return track;
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #11e8bb 0%, #8200c9 100%)",
      }}
      className="w-full h-[calc(100vh-65px)]"
    >
      <BannerCanvas
        selectedLayout={layout}
        layouts={LAYOUT_NAMES}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {loading ? (
          <>Loading</>
        ) : (
          artists.map((artist, i) => {
            return (
              <motion.group
                animate={layout}
                transition={{
                  ease: "easeInOut",
                  duration: Math.random() * 0.5 + 0.5,
                }}
                variants={getVariants(i)}
                key={i}
                onClick={(e) => e.stopPropagation()}
              >
                <Banner
                  topText=""
                  bottomText={artist.name}
                  audioSource={""}
                  textOn="hover"
                  imageURL={artist.images[0].url}
                  getAudioCallback={() => getTopTrack(artist.id)}
                />
              </motion.group>
            );
          })
        )}
      </BannerCanvas>
    </div>
  );
};

DemoArtistsPage.title = "Top Artists";
DemoArtistsPage.auth = false;

export default DemoArtistsPage;
