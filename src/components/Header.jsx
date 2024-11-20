import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../store/themeSlice';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <header className="header">
      <h1 className="title">Where in the world?</h1>
      <button onClick={handleToggle} className="toggle-button">
        <span>Dark Mode</span>
      </button>
    </header>
  );
}

export default Header;
