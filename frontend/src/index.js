import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this is imported to apply global styles
import AppWrapper from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

reportWebVitals();
