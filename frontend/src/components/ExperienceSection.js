import React, { forwardRef } from 'react';
import './ExperienceSection.css';

const ExperienceSection = forwardRef(({ isVisible }, ref) => (
  <div ref={ref} className={`experience-section ${isVisible ? 'visible' : 'hidden'}`}>
    <h2>Experience</h2>
    <div>
      <h3>Software Developer, Identos Inc</h3>
      <ul>
        <li>Developed a key component for delegating to a SmileCDR instance, collaborating effectively with a cross-functional team.</li>
        <li>Led the development of an IAM solution integrated with a FHIR instance, streamlining the development cycle.</li>
        <li>Delivered a pioneering minimum viable product for the UK pension dashboard program, consolidating various resource servers.</li>
        <li>Successfully led the upgrade of a Spring Boot 2 application to Spring Boot 3.</li>
        <li>Pioneered the seamless integration of User-Managed Access (UMA) & OAuth principles.</li>
        <li>Built a comprehensive admin portal using React, Elide, and PHP.</li>
        <li>Engineered advanced automation tools by integrating Python Behave, Selenium, and qTest.</li>
      </ul>
      <h3>Software Developer, Big Data Research Lab</h3>
      <ul>
        <li>Enhanced backend efficiency and ensured robust system stability through targeted optimizations.</li>
        <li>Specialized in designing robust APIs for backend systems and integrating third-party APIs.</li>
        <li>Successfully migrated the solution from a local environment to a cloud service using Docker.</li>
      </ul>
    </div>
  </div>
));

export default ExperienceSection;
