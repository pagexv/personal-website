import React, { forwardRef } from 'react';
import './ThirdBackground.css';

const ThirdBackground = forwardRef(({ isVisible, children }, ref) => (
  <div ref={ref} className={`third-background ${isVisible ? 'visible' : 'hidden'}`}>
      
        <div className="contact-links">
          <h2>Contact</h2>
          <p><a href="https://github.com/your-github">GitHub</a></p>
          <p><a href="https://www.linkedin.com/in/your-linkedin">LinkedIn</a></p>
        </div>
  </div>
));

export default ThirdBackground;
