// src/api.js
import axios from 'axios';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
const api = axios.create({ baseURL });

const videosCollectionRef = collection(db, "videos");

export const getVideos = async () => {
  if (process.env.NODE_ENV === 'development') {
    const response = await api.get('/videos');
    return response.data;
  } else {
    const data = await getDocs(videosCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }
};

export const addVideo = async (newVideo) => {
  if (process.env.NODE_ENV === 'development') {
    await api.post('/videos', newVideo);
  } else {
    await addDoc(videosCollectionRef, newVideo);
  }
};

export const updateVideo = async (id, updatedVideo) => {
  if (process.env.NODE_ENV === 'development') {
    await api.put(`/videos/${id}`, updatedVideo);
  } else {
    const videoDoc = doc(db, "videos", id);
    await updateDoc(videoDoc, updatedVideo);
  }
};

export const deleteVideo = async (id) => {
  if (process.env.NODE_ENV === 'development') {
    await api.delete(`/videos/${id}`);
  } else {
    const videoDoc = doc(db, "videos", id);
    await deleteDoc(videoDoc);
  }
};
