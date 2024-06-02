import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import engineerAnimation from '../animations/engineerAnimation.json';
import './Home.css';
import { typeWriter } from '../utils/typeWriter';
import { textTransition } from '../utils/textTransition';
import Heading from './Heading';
import Subtitle from './Subtitle';
import Description from './Description';
import ButtonContainer from './ButtonContainer';
import AnimationContainer from './AnimationContainer';

const Home = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const animationRef = useRef(null);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;
    const button = buttonRef.current;
    const animation = animationRef.current;

    setTimeout(() => {
      heading.classList.add('revealed');
    }, 1000);

    setTimeout(() => {
      animation.style.opacity = 1;
      animation.style.transform = 'translateY(0)';
    }, 1500);

    setTimeout(() => {
      typeWriter(subtitle, 'I AM A FULL-STACK ENGINEER');
      subtitle.style.opacity = 1;
    }, 2000);

    setTimeout(() => {
      textTransition(description, 'Specializing in building everything from small business sites to rich interactive web applications.');
      description.style.opacity = 1;
      description.style.transform = 'translateY(0)';
      description.classList.add('show-frame');
    }, 4000);

    setTimeout(() => {
      button.style.opacity = 1;
      button.style.transform = 'translateY(0)';
    }, 6000);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className="home">
      <div className="home-content">
        <Heading ref={headingRef} />
        <AnimationContainer ref={animationRef} animationData={engineerAnimation} />
        <Subtitle ref={subtitleRef} />
        <Description ref={descriptionRef} />
        <ButtonContainer ref={buttonRef} navigate={navigate} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Home;
