// src/componentes/Header/Header.jsx
import React from 'react';
import './header.css';
import logo from '../../images/logo.png';
import HomeButton from '../Buttons/HomeButton';
import AddVideoButton from '../Buttons/AddVideoButton';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Aluraflix Logo" draggable="false" />
      <nav>
        <ul>
          <li><HomeButton /></li>
          <li><AddVideoButton /></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
