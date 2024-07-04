import React from 'react';
import './buttons.css';

function SaveButton({ onClick }) {
  return (
    <button onClick={onClick} className="button">
      GUARDAR
    </button>
  );
}

export default SaveButton;
