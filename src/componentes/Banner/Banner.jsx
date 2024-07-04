import React, { useState, useEffect, useContext } from 'react';
import './banner.css';
import VideoContext from '../../context/VideoContext';

function Banner() {
  const { videos } = useContext(VideoContext);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (videos.length > 0) {
      selectRandomVideo();
      const interval = setInterval(selectRandomVideo, 5000);
      return () => clearInterval(interval);
    }
  }, [videos]);

  const selectRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    const selectedVideo = videos[randomIndex];
    setCurrentVideo(selectedVideo);
    setBackgroundImage(selectedVideo.image || '');
  };

  const getCategoryStyles = (category) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return { backgroundColor: '#6BD1FF', color: '#F5F5F5', borderColor: '#6BD1FF', boxShadow: '0px 0px 17px 8px #6BD1FF inset' };
      case 'backend':
        return { backgroundColor: '#00C86F', color: '#F5F5F5', borderColor: '#00C86F', boxShadow: '0px 0px 17px 8px #00C86F inset' };
      case 'gestao':
        return { backgroundColor: '#FFBA05', color: '#F5F5F5', borderColor: '#FFBA05', boxShadow: '0px 0px 17px 8px #FFBA05 inset' };
      case 'inovacao':
        return { backgroundColor: '#e47900', color: '#F5F5F5', borderColor: '#e47900', boxShadow: '0px 0px 17px 8px #e47900 inset' };
      default:
        return { backgroundColor: '#6BD1FF', color: '#F5F5F5', borderColor: '#6BD1FF', boxShadow: '0px 0px 17px 8px #6BD1FF inset' };
    }
  };

  if (!currentVideo) {
    return <div>Carregando...</div>;
  }

  const styles = getCategoryStyles(currentVideo.category);

  return (
    <div className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="banner-wrapper">
        <div className="card">
          <div className="left-section">
            <div className="title-category" style={{ backgroundColor: styles.backgroundColor }}>{currentVideo.category.toUpperCase()}</div>
            <div className="sub-title-category">{currentVideo.title}</div>
            <div className="text-left-section">{currentVideo.description}</div>
          </div>
          <div className="right-section">
            <div className="player" style={{ borderColor: styles.borderColor, boxShadow: styles.boxShadow }}>
              <img src={currentVideo.image} alt="Video Player" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
