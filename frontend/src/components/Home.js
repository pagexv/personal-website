// Home.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import engineerAnimation from '../animations/engineerAnimation.json';
import headerVideo from '../animations/header.mp4';
import './Home.css';
import { typeWriter } from '../utils/typeWriter';
import { textTransition } from '../utils/textTransition';
import Heading from './Heading';
import Subtitle from './Subtitle';
import Description from './Description';
import ButtonContainer from './ButtonContainer';
import AnimationContainer from './AnimationContainer';
import TechStackIcons from './TechStackIcons';

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
    }, 400);

    setTimeout(() => {
      animation.style.opacity = 1;
      animation.style.transform = 'translateY(0)';
    }, 500);

    setTimeout(() => {
      typeWriter(subtitle, 'I AM A FULL-STACK ENGINEER');
      subtitle.style.opacity = 1;
    }, 600);

    setTimeout(() => {
      textTransition(description, 'Specializing in building everything from small business sites to rich interactive web applications.');
      description.style.opacity = 1;
      description.style.transform = 'translateY(0)';
      description.classList.add('show-frame');
    }, 700);

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
      <video className="header-video" autoPlay loop muted>
        <source src={headerVideo} type="video/mp4" />
        
        Your browser does not support the video tag.
      </video>
      <div className="home-content">
        <Heading ref={headingRef} />
        <div className="home-main">
          <TechStackIcons />
          <AnimationContainer ref={animationRef} animationData={engineerAnimation} />
        </div>
        <Subtitle ref={subtitleRef} />
        <Description ref={descriptionRef} />
        <ButtonContainer ref={buttonRef} navigate={navigate} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Home;
