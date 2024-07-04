import React from 'react';
import './VideoModal.css';
import closeButton from '../../images/cancel.png';

function VideoModal({ isOpen, onClose, videoUrl, title, description }) {
  if (!isOpen) return null;

  const embedUrl = videoUrl.replace("watch?v=", "embed/");

  return (
    <div className="video-modal-overlay">
      <div className="video-modal">
        <img src={closeButton} alt="Close" className="close-button" onClick={onClose} />
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="video-container">
          <iframe
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
