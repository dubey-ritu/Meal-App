import React, { memo } from 'react';
import './style.css';

const Pill = ({ label, onClick, selected = false }) => {
  return (
    <button
      className={`pill ${selected ? 'pill-selected' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default memo(Pill);
