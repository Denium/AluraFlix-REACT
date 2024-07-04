import React from 'react';
import { Link } from 'react-router-dom';
import './AddVideoButton.css';

function AddVideoButton() {
  return (
    <Link to="/novo-video" className="add-video-button">NOVO VÍDEO</Link>
  );
}

export default AddVideoButton;
