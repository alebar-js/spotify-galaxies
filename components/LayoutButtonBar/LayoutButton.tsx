import React from "react";
import styles from "./LayoutButtonBar.module.css";

interface LayoutButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}

const LayoutButton: React.FC<LayoutButtonProps> = ({
  children,
  onClick,
  selected,
}) => {
  return (
    <button
      className={`${styles.button} ${selected && styles.buttonSelected}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LayoutButton;
