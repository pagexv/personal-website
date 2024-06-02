import React, { useEffect, useRef } from 'react';
import AnimationContainer from './AnimationContainer';
import MainContent from './MainContent';
import './Contact.css';
import astronautAnimation from '../animations/astronaut.json';
import left from '../animations/contact.json';

const Contact = () => {
  const animationRef = useRef(null);
  
  useEffect(() => {
    const animation = animationRef.current;
    setTimeout(() => {
      animation.style.opacity = 1;
      animation.style.transform = 'translateY(0)';
    }, 1);
  }, []);
  
  return (
    <div className="contact">
      <MainContent leftAnimationRef={animationRef} />
      <AnimationContainer  ref={animationRef} className="right-animation" />
    </div>
  );
};

export default Contact;
