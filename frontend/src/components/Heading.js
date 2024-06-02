import React, { forwardRef, useEffect } from 'react';
import './Heading.css';

const Heading = forwardRef((props, ref) => {
  useEffect(() => {
    const headingElement = ref.current;
    const text = headingElement.innerText;
    headingElement.innerHTML = '';

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.innerText = text[i] === ' ' ? '\u00A0' : text[i]; // Use non-breaking space for spaces
      span.classList.add('glitch-letter');
      headingElement.appendChild(span);
    }

    const letters = headingElement.querySelectorAll('.glitch-letter');

    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add('active');
        if (index === letters.length - 1) {
          setTimeout(() => {
            letters.forEach(letter => {
              letter.classList.remove('glitch-letter');
              letter.classList.add('shadow-effect');
            });
          }, 1000);
        }
      }, index * 100);
    });
  }, [ref]);

  return <h2 ref={ref} className="heading">Hello visitor</h2>;
});

export default Heading;
