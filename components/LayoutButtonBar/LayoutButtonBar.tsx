import React from "react";
import { LayoutName } from "../../types";
import styles from "./LayoutButtonBar.module.css";

const LAYOUT_NAMES: LayoutName[] = ["helix", "grid", "sphere"];

interface ILayoutButtonBarProps {
  onLayoutChange: (layout: string) => void;
}
const LayoutButtonBar = ({ onLayoutChange }: ILayoutButtonBarProps) => {
  return (
    <div className={styles.container}>
      {LAYOUT_NAMES.map((layout, i) => (
        <button key={i} onClick={() => onLayoutChange(layout)}>
          {layout.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LayoutButtonBar;
