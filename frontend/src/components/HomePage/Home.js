// Home.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import engineerAnimation from '../../animations/engineerAnimation.json';
import goAnimation from '../../animations/go.json'; // Import the go animation

import './Home.css';
import { typeWriter } from '../../utils/typeWriter';
import { textTransition } from '../../utils/textTransition';
import Heading from '../Heading';
import Subtitle from './Subtitle';
import Description from './Description';
import ButtonContainer from './ButtonContainer';
import AnimationContainer from '../AnimationContainer';
import TechStackIcons from './TechStackIcons';

const Home = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const animationRef = useRef(null);
  const goRef = useRef(null); // Define goRef

  const [darkMode, setDarkMode] = useState(false);
  const [showEngineerAnimation, setShowEngineerAnimation] = useState(false);

  useEffect(() => {
    if (showEngineerAnimation) {
      const heading = headingRef.current;
      const subtitle = subtitleRef.current;
      const description = descriptionRef.current;
      const button = buttonRef.current;
      const animation = animationRef.current;

      setTimeout(() => {
        if (heading) heading.classList.add('revealed');
      }, 400);

      setTimeout(() => {
        if (animation) {
          animation.style.opacity = 1;
          animation.style.transform = 'translateY(0)';
        }
      }, 500);

      setTimeout(() => {
        if (subtitle) {
          typeWriter(subtitle, 'I AM A FULL-STACK ENGINEER');
          subtitle.style.opacity = 1;
        }
      }, 600);

      setTimeout(() => {
        if (description) {
          textTransition(description, 'Specializing in building everything from small business sites to rich interactive web applications.');
          description.style.opacity = 1;
          description.style.transform = 'translateY(0)';
          description.classList.add('show-frame');
        }
      }, 700);

      setTimeout(() => {
        if (button) {
          button.style.opacity = 1;
          button.style.transform = 'translateY(0)';
        }
      }, 6000);
    }
  }, [showEngineerAnimation]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const handleGoClick = () => {
    setShowEngineerAnimation(true);
  };

  return (
    <div className="home">
      {showEngineerAnimation ? (
        <>
          <video className="header-video" autoPlay loop muted>
            <source src="https://backend-resources-hq.s3.us-east-2.amazonaws.com/header.mp4" type="video/mp4" />
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
        </>
      ) : (
        <div className="go-container" onClick={handleGoClick} ref={goRef}>
          <Lottie animationData={goAnimation} loop={true} />
        </div>
      )}
    </div>
  );
};

export default Home;
