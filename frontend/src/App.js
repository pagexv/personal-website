import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/HomePage/Home';
import NodeMap from './components/AboutMe/NodeMap';

import Contact from './components/Contact';
import ProjectPage from './components/ProjectPage';
import Navbar from './components/Navbar'; // Import Navbar
import './App.css';
import HealthCheck from './components/HealthCheck';  // Import HealthCheck component

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const bodyClassList = document.body.classList;
    bodyClassList.remove('light-mode', 'dark-mode');
    
    if (location.pathname === '/') {
      bodyClassList.add('light-mode');
    } else if (location.pathname === '/about') {
      bodyClassList.add('dark-mode');
    } else if (location.pathname === '/projects') {
      bodyClassList.add('light-mode');
    } else if (location.pathname === '/contact') {
      bodyClassList.add('dark-mode');
    }
  }, [location.pathname]);

  return (
    <div>
      <Navbar /> {/* Add the Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<NodeMap />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/health" element={<HealthCheck />} />  {/* Add HealthCheck route */}
   
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
