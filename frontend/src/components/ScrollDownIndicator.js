import React from 'react';
import './ScrollDownIndicator.css';

const ScrollDownIndicator = ({ isVisible }) => (
  isVisible && (
    <div className="scroll-down">
      <span className="arrow">↓</span>
      <span className="text">Scroll down</span>
    </div>
  )
);

export default ScrollDownIndicator;
