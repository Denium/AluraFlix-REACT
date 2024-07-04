import React, { useEffect, useState } from 'react';
import { getVideos } from '../utils/api';
import Banner from '../componentes/Banner/Banner';
import MainCard from '../componentes/Main/MainCard';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoData = await getVideos();
      setVideos(videoData);
    };

    fetchVideos();
  }, []);

  return (
    <div className="home">
      <Banner />
      <MainCard videos={videos} />
    </div>
  );
}

export default Home;
