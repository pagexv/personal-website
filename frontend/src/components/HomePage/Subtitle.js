import React, { forwardRef } from 'react';
import './Subtitle.css';

const Subtitle = forwardRef((props, ref) => (
  <h1 ref={ref} className="subtitle"></h1>
));

export default Subtitle;
