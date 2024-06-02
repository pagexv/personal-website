import React, { forwardRef } from 'react';
import Lottie from 'lottie-react';
import './AnimationContainer.css';

const AnimationContainer = forwardRef(({ animationData, className }, ref) => (
  <div className={`animation-container ${className}`} ref={ref}>
    <Lottie animationData={animationData} loop={true} />
  </div>
));

export default AnimationContainer;
