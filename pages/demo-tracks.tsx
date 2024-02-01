import { motion } from "framer-motion-3d";
import { useEffect, useState } from "react";
import { LayoutName, Track } from "../types";
import { getVariants } from "../lib/layouts";
import Banner from "../components/Banner/Banner";
import { demoTracks } from "../data/demoValues";
import useLoading from "../lib/hooks/useLoading";
import { BannerCanvas } from "../components/BannerCanvas";

const LAYOUT_NAMES: LayoutName[] = ["helix", "grid", "sphere"];

const fetchTracks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demoTracks);
    }, 500);
  });
};

const TopTracksPage = () => {
  const [layout, setLayout] = useState<LayoutName>("helix");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [getTracks, loading] = useLoading(fetchTracks);

  useEffect(() => {
    getTracks().then((data) => setTracks(data));
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #11e8bb 0%, #8200c9 100%)",
      }}
      className="w-full h-[calc(100vh-65px)]"
    >
      <BannerCanvas
        layouts={LAYOUT_NAMES}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
        selectedLayout={layout}
      >
        {loading ? (
          <>Loading</>
        ) : (
          tracks.map((track, i) => {
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
                  topText={track.name}
                  bottomText={track.artists[0].name}
                  audioSource={track.preview_url}
                  imageURL={track.album.images[0].url}
                  textOn="hover"
                />
              </motion.group>
            );
          })
        )}
      </BannerCanvas>
    </div>
  );
};

TopTracksPage.title = "Top Tracks";
TopTracksPage.auth = false;

export default TopTracksPage;
