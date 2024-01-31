import React from 'react';
import styles from './LayoutButton.module.css';

interface LayoutButtonProps {
    label: string;
    onClick: () => void;
}

const LayoutButton: React.FC<LayoutButtonProps> = ({ label, onClick }) => {
    return <button className={styles.button} onClick={onClick}>{label}</button>;
};

export default LayoutButton;
