// TechStackIcons.js
import React, { useEffect, useRef } from 'react';
import './TechStackIcons.css';

const icons = [
    { name: 'Spring', src: require('../animations/spring.png') },
    { name: 'MySQL', src: require('../animations/mysql.png') },
    { name: 'Python', src: require('../animations/python.png') },


  { name: 'React', src: require('../animations/react.png') },
  { name: 'Kubernetes', src: require('../animations/kubernetes.png') },
  { name: 'Jenkins', src: require('../animations/Jenkins.png') },
  { name: 'AWS', src: require('../animations/aws.png') },
  { name: 'VS', src: require('../animations/visual-basic.png') },
];

const TechStackIcons = () => {
  const iconRefsLeft = useRef([]);
  const iconRefsRight = useRef([]);
  const leftIcons = icons.slice(0, Math.ceil(icons.length / 2));
  const rightIcons = icons.slice(Math.ceil(icons.length / 2));

  useEffect(() => {
    iconRefsLeft.current.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add('revealed');
      }, index * 500);
    });
    iconRefsRight.current.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add('revealed');
      }, index * 500);
    });
  }, []);

  return (
    <div className="tech-stack-icons">
      <div className="tech-stack-column">
        {leftIcons.map((icon, index) => (
          <img
            key={icon.name}
            ref={el => iconRefsLeft.current[index] = el}
            src={icon.src}
            alt={icon.name}
            className="tech-icon"
          />
        ))}
      </div>
      <div className="tech-stack-column">
        {rightIcons.map((icon, index) => (
          <img
            key={icon.name}
            ref={el => iconRefsRight.current[index] = el}
            src={icon.src}
            alt={icon.name}
            className="tech-icon"
          />
        ))}
      </div>
    </div>
  );
};

export default TechStackIcons;
