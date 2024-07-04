import React from 'react';
import './App.css';
import AppRoutes from './AppRoutes';
import Header from './componentes/Header';
import Footer from './componentes/Footer/Footer';
import { VideoProvider } from './context/VideoContext';

function App() {
  return (
    <VideoProvider>
    <div className="App">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
    </VideoProvider>
  );
}

export default App;
