import React, { createContext, useState, useEffect } from 'react';
import { getVideos as getVideosFromFirebase } from '../utils/api';
import axios from 'axios';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let videosData;
        if (process.env.NODE_ENV === 'development') {
          const response = await axios.get('http://localhost:3001/videos');
          videosData = response.data;
        } else {
          videosData = await getVideosFromFirebase();
        }
        setVideos(videosData);
      } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
        setVideos([]);
      }
    };

    fetchVideos();
  }, []);

  return (
    <VideoContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
