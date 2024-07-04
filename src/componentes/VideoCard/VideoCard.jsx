import React from 'react';
import './VideoCard.css';
import deleteIcon from '../../images/trash.png';
import editIcon from '../../images/edit.png';

function VideoCard({ id, image, strokeColor, onDelete, onEdit, onView }) {
  const handleDeleteClick = () => {
    if (window.confirm('Você tem certeza que deseja remover este item?')) {
      onDelete();
    }
  };

  const handleImageClick = () => {
    console.log('Imagem clicada, ID:', id);
    onView();
  };

  return (
    <div className="video-card" style={{ borderColor: strokeColor }}>
      <img src={image} alt="Video" className="video-image" onClick={handleImageClick} />
      <div className="video-controls">
        <button className="video-control" onClick={handleDeleteClick}>
          <img src={deleteIcon} alt="Delete" />
          DELETAR
        </button>
        <button className="video-control" onClick={onEdit}>
          <img src={editIcon} alt="Edit" />
          EDITAR
        </button>
      </div>
    </div>
  );
}

export default VideoCard;
