import React from "react";
import { useAudio } from "../../lib/hooks/AudioPlayer";
import PlaySvg from "../svg/play";
import PauseSvg from "../svg/pause";

const AudioControls = () => {
  const { volume, changeVolume, pauseSong, resumeSong, status } = useAudio();

  return (
    <div className="text-center child:cursor-pointer w-full absolute bottom-0 mx-auto ">
      <div className="w-[100px] mx-auto">
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume * 2}
          onChange={(e) => changeVolume(e.target.valueAsNumber / 2)}
        />
      </div>
      {status === "paused" ? (
        <PlaySvg
          fill="#fff"
          onClick={resumeSong}
          style={{
            width: 20,
            height: 20,
            display: "inline-block",
            margin: "0px auto 20px auto",
          }}
        />
      ) : (
        status === "playing" && <PauseSvg
          fill="#fff"
          onClick={pauseSong}
          style={{
            width: 20,
            height: 20,
            display: "inline-block",
            margin: "0px auto 20px auto",
          }}
        /> 
      )}
    </div>
  );
};

export default AudioControls;
