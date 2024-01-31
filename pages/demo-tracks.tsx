import { motion } from "framer-motion-3d";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { LayoutName, Track } from "../types";
import { TrackballControls } from "@react-three/drei";
import { getVariants } from "../lib/layouts";
import Banner from "../components/Banner/Banner";
import styles from "../styles/Top-Tracks.module.css";

const LAYOUT_NAMES: LayoutName[] = ["helix", "grid", "sphere"];

const TopTracksPage = () => {
  const [layout, setLayout] = useState<LayoutName>("helix");
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetch("/api/spotify/user/top?type=tracks&limit=50&timeRange=long_term")
      .then((res) => res.json())
      .then((data) => {
        let tracks: Array<Track> = [];
        data.forEach((item: Track) => {
          tracks = [
            ...tracks,
            {
              album: {
                images: item.album.images,
                name: item.album.name,
                id: item.album.id,
                album_type: item.album.album_type,
                artists: item.album.artists,
                release_date: item.album.release_date,
              },
              artists: item.artists,
              name: item.name,
              preview_url: item.preview_url,
              id: item.id,
            },
          ];
        });
        console.log(tracks);
        setTracks(tracks);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderButtons = () =>
    LAYOUT_NAMES.map((layout, i) => (
      <button key={i} onClick={() => setLayout(layout)}>
        {layout.toUpperCase()}
      </button>
    ));
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #11e8bb 0%, #8200c9 100%)",
      }}
      className="w-full h-[calc(100vh-65px)]"
    >
      <div className={styles.buttonsContainer}>{renderButtons()}</div>
      <Canvas
        camera={{ position: [0, 10, 20] }}
        style={{ width: "100%", height: "100%", top: 0 }}
      >
        <TrackballControls rotateSpeed={4} />
        {tracks.map((track, i) => {
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
        })}
      </Canvas>
    </div>
  );
};

TopTracksPage.title = "Top Tracks";
TopTracksPage.auth = true;

export default TopTracksPage;
