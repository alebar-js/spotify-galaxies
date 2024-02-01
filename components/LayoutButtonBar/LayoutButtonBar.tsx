import React from "react";
import { LayoutName } from "../../types";
import styles from "./LayoutButtonBar.module.css";
import LayoutButton from "./LayoutButton";

interface ILayoutButtonBarProps {
  onLayoutChange: (layout: LayoutName) => void;
  layouts: LayoutName[];
  selectedLayout: LayoutName;
}
const LayoutButtonBar = ({
  onLayoutChange,
  layouts,
  selectedLayout,
}: ILayoutButtonBarProps) => {
  return (
    <div className={styles.container}>
      {layouts.map((layout, i) => (
        <LayoutButton
          key={i}
          onClick={() => onLayoutChange(layout)}
          selected={selectedLayout === layout}
        >
          {layout.toUpperCase()}
        </LayoutButton>
      ))}
    </div>
  );
};

export default LayoutButtonBar;
