import React from 'react';
import './EducationSection.css';

const EducationSection = ({ isVisible }) => (
  <div className={`education-section ${isVisible ? 'visible' : 'hidden'}`}>
    <h2>Education</h2>
    <div>
      <h3>Master of Science in Computer Science</h3>
      <p>Arizona State University (Remote, US)</p>
      <h3>Bachelor of Science in Computer Science</h3>
      <p>University of Waterloo (Waterloo, ON)</p>
    </div>
  </div>
);

export default EducationSection;
