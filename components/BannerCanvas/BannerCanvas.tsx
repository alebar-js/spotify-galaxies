import React from "react";
import { LayoutButtonBar } from "../LayoutButtonBar";
import { Canvas } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import { LayoutName } from "../../types";

interface BannerCanvasProps {
  children?: React.ReactNode;
  onLayoutChange?: (layout: LayoutName) => void;
  layouts?: LayoutName[];
  selectedLayout: LayoutName;
}
const BannerCanvas = ({
  children,
  onLayoutChange,
  layouts,
  selectedLayout,
}: BannerCanvasProps) => {
  return (
    <div className="w-full h-[calc(100vh-65px)]">
      {onLayoutChange && layouts && (
        <LayoutButtonBar
          selectedLayout={selectedLayout}
          layouts={layouts}
          onLayoutChange={onLayoutChange}
        />
      )}
      <Canvas camera={{ position: [0, 10, 20] }}>
        <TrackballControls rotateSpeed={4} />
        {children}
      </Canvas>
    </div>
  );
};

export default BannerCanvas;
