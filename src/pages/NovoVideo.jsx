import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addVideo } from '../utils/api';
import './NovoVideo.css';
import VideoContext from '../context/VideoContext';

function NovoVideo() {
  const { videos, setVideos } = useContext(VideoContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    image: '',
    video: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleSave = async (event) => {
    event.preventDefault();
    const { title, category, image, video, description } = formValues;
    const newErrors = {};

    if (!title) newErrors.title = 'Título é obrigatório';
    if (!category) newErrors.category = 'Categoria é obrigatória';
    if (!image.match(/\.(jpg|png)$/)) newErrors.image = 'URL da imagem deve terminar com .jpg ou .png';
    if (!video) newErrors.video = 'URL do vídeo é obrigatória';
    if (!description) newErrors.description = 'Descrição é obrigatória';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        await addVideo(formValues);
        setSuccess('Vídeo adicionado com sucesso!');
        setVideos([...videos, formValues]);
        setTimeout(() => {
          setSuccess('');
          navigate('/');
        }, 4000);
        setFormValues({ title: '', category: '', image: '', video: '', description: '' });
      } catch (error) {
        console.error('Erro ao adicionar vídeo:', error);
        setErrors({ submit: 'Falha ao adicionar vídeo' });
      }
      setErrors({});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="novo-video-page">
      <div className="main">
        <h2>NOVO VÍDEO</h2>
        <p className="form-instruction">Complete o formulário para criar um novo card de vídeo.</p>
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSave}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              placeholder="Digite o título"
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </label>
          <label>
            Categoria:
            <select
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              placeholder="URL do vídeo"
            />
            {errors.video && <span className="error">{errors.video}</span>}
          </label>
          <label>
            Descrição:
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              placeholder="Descrição"
            ></textarea>
            {errors.description && <span className="error">{errors.description}</span>}
          </label>
          <div className="modal-buttons">
            <button type="submit" className="button-new-video">Guardar</button>
            <button type="button" onClick={() => setFormValues({ title: '', category: '', image: '', video: '', description: '' })} className="button-new-video">Limpar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovoVideo;
