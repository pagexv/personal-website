import React from 'react';
import './ScrollSectionWrapper.css';

const ScrollSectionWrapper = ({ currentBackground, children }) => (
  <div className={`scroll-section-wrapper ${currentBackground === 2 ? 'visible' : currentBackground === 3 ? 'semi-visible' : 'hidden'}`}>
    {children}
  </div>
);

export default ScrollSectionWrapper;
