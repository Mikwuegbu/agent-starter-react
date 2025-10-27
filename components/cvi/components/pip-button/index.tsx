import React from 'react';
import styles from './pip-button.module.css';

interface PipButtonProps {
  isPipSupported: boolean;
  isPipActive: boolean;
  togglePip: () => void;
}

export const PipButton: React.FC<PipButtonProps> = ({ isPipSupported, isPipActive, togglePip }) => {
  if (!isPipSupported) {
    return null;
  }


  return (
    <button
      type="button"
      className={`${styles.pipButton} ${isPipActive ? styles.pipActive : ''}`}
      onClick={togglePip}
      aria-label={isPipActive ? 'Exit Picture-in-Picture' : 'Enter Picture-in-Picture'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M19 12V7h-5"/>
        <path d="M14 12l7-7"/>
        <rect x="14" y="14" width="6" height="5" rx="1"/>
      </svg>
    </button>
  );
};
