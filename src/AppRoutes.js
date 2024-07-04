// src/AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NovoVideo from './pages/NovoVideo';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/novo-video" element={<NovoVideo />} />
    </Routes>
  );
}

export default AppRoutes;
