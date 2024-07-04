// src/api.js
import axios from 'axios';

const baseURL = 'http://localhost:3001';
const api = axios.create({ baseURL });


export const getVideos = async () => {
  const response = await api.get('/videos');
  return response.data;
};

export const addVideo = async (newVideo) => {
  await api.post('/videos', newVideo);
};

export const updateVideo = async (id, updatedVideo) => {
  await api.put(`/videos/${id}`, updatedVideo);
};

export const deleteVideo = async (id) => {
  await api.delete(`/videos/${id}`);
};
