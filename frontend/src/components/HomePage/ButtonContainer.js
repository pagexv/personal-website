import React, { forwardRef } from 'react';
import './ButtonContainer.css';

const ButtonContainer = forwardRef(({ navigate, toggleDarkMode, darkMode }, ref) => (
  <div className="button-container" ref={ref}>
    <button onClick={() => navigate('/about')}>Learn More About Me</button>
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  </div>
));

export default ButtonContainer;
