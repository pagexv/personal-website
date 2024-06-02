import React, { forwardRef } from 'react';
import './ContactSection.css';

const ContactSection = forwardRef((props, ref) => (
  <div ref={ref} className="contact-section">
    <h2>Connect with Me</h2>
    <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  </div>
));

export default ContactSection;
