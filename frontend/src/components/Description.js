import React, { forwardRef } from 'react';
import './Description.css';

const Description = forwardRef((props, ref) => (
  <p ref={ref} className="description">
    Specializing in building everything from small business sites to rich interactive web applications.
  </p>
));

export default Description;
