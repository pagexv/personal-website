import React, { useState } from 'react';
import Lottie from 'lottie-react';
import './ProjectPage.css';

const projects = [
  {
    title: "Unity Project",
    iframe: "<iframe src='unity_project_url' />",
    description: "A Unity project demonstrating X, Y, Z...",
  },
  {
    title: "UI Animation",
    animation: require('../animations/uiAnimation.json'), // Ensure you have a JSON file for your UI animation
    description: "A UI animation demonstrating A, B, C...",
  },
  {
    title: "Backend Visualization",
    visualization: "backend_visualization_data",
    description: "A backend visualization demonstrating D, E, F...",
  },
];

const ProjectPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextProject = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      setIsFlipping(false);
    }, 600); // Match the transition duration in CSS
  };

  const prevProject = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
      setIsFlipping(false);
    }, 600); // Match the transition duration in CSS
  };

  return (
    <div className="project-page">
      <div className={`project-display ${isFlipping ? 'flip' : ''}`}>
        <div className={`content ${isFlipping ? 'flip' : ''}`}>
          {projects[currentIndex].iframe && (
            <iframe
              src="https://www.youtube.com/embed/lEz9AIMhs2E?si=HDR6Ys5GGMB0vlM6"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {projects[currentIndex].animation && (
            <div className="lottie-animation">
              <Lottie animationData={projects[currentIndex].animation} loop={true} />
            </div>
          )}
          {projects[currentIndex].visualization && (
            <div className="visualization">{projects[currentIndex].visualization}</div>
          )}
        </div>
      </div>
      <div className="project-description">
        <h2>{projects[currentIndex].title}</h2>
        <p>{projects[currentIndex].description}</p>
      </div>
      <div className="navigation">
        <button onClick={prevProject}>Previous</button>
        <div className="progress-bar">
          {projects.map((_, index) => (
            <span key={index} className={`progress-dot ${index === currentIndex ? 'active' : ''}`} />
          ))}
        </div>
        <button onClick={nextProject}>Next</button>
      </div>
    </div>
  );
};

export default ProjectPage;
