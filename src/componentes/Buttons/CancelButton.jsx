import React from 'react';
import './buttons.css';

function CancelButton({ onClick }) {
  return (
    <button onClick={onClick} className="button">
      LIMPAR
    </button>
  );
}

export default CancelButton;
