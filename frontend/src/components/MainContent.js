import React, { useState, useEffect } from 'react';
import './MainContent.css';
import AnimationContainer from './AnimationContainer';  // Ensure this import path is correct
import left from '../animations/contact.json';
import ReCAPTCHA from 'react-google-recaptcha';

const MainContent = ({ leftAnimationRef }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
   //   alert('reCAPTCHA verification failed');
      return;
    }

    try {
      const response = await fetch('https://hanfei.pro/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, recaptchaToken })
      });
      if (response.ok) {
        alert('Email sent successfully');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      } else {
        alert('Error sending email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending email');
    }
  };

  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=6Le6Z_QpAAAAAAaR60nnsmP3HL3Seu3-CewEdgXq';  // Replace with your site key
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
    //    console.log('reCAPTCHA script loaded');
        window.grecaptcha.ready(() => {
        //  console.log('reCAPTCHA ready');
          window.grecaptcha.execute('6Le6Z_QpAAAAAAaR60nnsmP3HL3Seu3-CewEdgXq', { action: 'submit' })  // Replace with your site key
            .then((token) => {
              setRecaptchaToken(token);
          //    console.log('reCAPTCHA token:', token);  // Debugging: Log the reCAPTCHA token
            })
            .catch((error) => {
            //  console.error('Error executing reCAPTCHA:', error);
            });
        });
      };
    };
    loadRecaptcha();
  }, []);

  return (
    <div className="main-content">
      <div className="contact-info">
        <h2>Contact us</h2>
        <p>Need to get in touch with me? Either fill out the form with your inquiry or find the department email you'd like to contact below.</p>
        <div className="social-icons">
          <AnimationContainer animationData={left} ref={leftAnimationRef} className="left-animation" />
          <a href="https://github.com/pagexv" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/hanfei-qu-18281ab0/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/hanfei.qu.7/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <label htmlFor="firstName">First name*</label>
          </div>
          <div className="form-group">
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <label htmlFor="lastName">Last name</label>
          </div>
          <div className="form-group">
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <label htmlFor="email">Email*</label>
          </div>
          <div className="form-group">
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
            <label htmlFor="message">What can I help you with?</label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MainContent;
