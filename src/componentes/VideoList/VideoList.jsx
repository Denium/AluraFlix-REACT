import React, { useState, useContext } from 'react';
import './VideoList.css';
import VideoCard from '../VideoCard/VideoCard';
import Modal from '../Modal/Modal';
import VideoModal from '../VideoModal/VideoModal';
import { getVideos, addVideo, updateVideo, deleteVideo } from '../../utils/api';
import VideoContext from '../../context/VideoContext';

function VideoList({ strokeColor, category }) {
  const { videos, setVideos } = useContext(VideoContext);
  const filteredVideos = videos.filter(video => video.category.toLowerCase() === category.toLowerCase());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    image: '',
    video: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async (id) => {
    try {
      await deleteVideo(id);
      const updatedVideos = videos.filter(video => video.id !== id);
      setVideos(updatedVideos);
    } catch (error) {
      console.error('Erro ao deletar o vídeo:', error);
    }
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setFormValues(video);
    setIsModalOpen(true);
  };

  const handleView = (video) => {
    console.log('Visualizando vídeo:', video);
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    setErrors({});
    setFormValues({
      title: '',
      category: '',
      image: '',
      video: '',
      description: ''
    });
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const newErrors = validateFields(formValues);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateVideo(selectedVideo.id, formValues);
      const updatedVideos = videos.map(video => video.id === selectedVideo.id ? { ...formValues, id: selectedVideo.id } : video);
      setVideos(updatedVideos);
      setSuccessMessage("Vídeo editado com sucesso!");
      setTimeout(() => {
        handleCloseModal();
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      console.error('Erro ao atualizar o vídeo:', error);
      setErrors({ submit: 'Falha ao atualizar o vídeo' });
    }
  };

  const handleReset = () => {
    setFormValues({
      title: '',
      category: '',
      image: '',
      video: '',
      description: ''
    });
    setErrors({});
  };

  const validateFields = ({ title, category, image, video, description }) => {
    const errors = {};
    if (!title) errors.title = 'Título é obrigatório';
    if (!category) errors.category = 'Categoria é obrigatória';
    if (!image.match(/\.(jpg|png)$/)) errors.image = 'URL da imagem deve terminar com .jpg ou .png';
    if (!video) errors.video = 'URL do vídeo é obrigatória';
    if (!description) errors.description = 'Descrição é obrigatória';
    return errors;
  };

  return (
    <div className="video-list">
      <div className="video-list-container">
        {filteredVideos.map(video => (
          <VideoCard
            key={video.id}
            id={video.id}
            image={video.image}
            strokeColor={strokeColor}
            onDelete={() => handleDelete(video.id)}
            onEdit={() => handleEdit(video)}
            onView={() => handleView(video)}
          />
        ))}
      </div>
      {isModalOpen && selectedVideo && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <form onSubmit={handleSave}>
            <label>
              Título:
              <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                placeholder="Digite o título"
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </label>
            <label className="select-container">
              Categoria:
              <select
                name="category"
                value={formValues.category}
                onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                className="custom-placeholder"
              >
                <option value="" disabled>Selecione a categoria</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="gestao">Gestão</option>
                <option value="inovacao">Inovação</option>
              </select>
              {errors.category && <span className="error">{errors.category}</span>}
            </label>
            <label>
              Imagem:
              <input
                type="text"
                name="image"
                value={formValues.image}
                onChange={(e) => setFormValues({ ...formValues, image: e.target.value })}
                placeholder="URL da imagem"
              />
              {errors.image && <span className="error">{errors.image}</span>}
            </label>
            <label>
              Vídeo:
              <input
                type="text"
                name="video"
                value={formValues.video}
                onChange={(e) => setFormValues({ ...formValues, video: e.target.value })}
                placeholder="URL do vídeo"
              />
              {errors.video && <span className="error">{errors.video}</span>}
            </label>
            <label>
              Descrição:
              <textarea
                name="description"
                value={formValues.description}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                placeholder="Descrição"
              ></textarea>
              {errors.description && <span className="error">{errors.description}</span>}
            </label>
            <div className="modal-buttons">
              <button type="submit" className="button-modal">Guardar</button>
              <button type="button" onClick={handleReset} className="button-modal">Limpar</button>
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
          </form>
        </Modal>
      )}
      {isVideoModalOpen && selectedVideo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={handleCloseVideoModal}
          videoUrl={selectedVideo.video}
          title={selectedVideo.title}
          description={selectedVideo.description}
        />
      )}
    </div>
  );
}

export default VideoList;
