import React from 'react';
import './ListItems.css';

const ListItems = ({ visibleItems }) => {
  const items = [
    {
      title: 'Adventurer',
      description: 'Eager to explore fields that I do not familar with',
      icon: '🤠',
    },
    {
      title: 'Frontend',
      description: 'Intermediate experience using React and PHP to build website',
      icon: '👨‍💻',
    },
    {
      title: 'Backend',
      description: 'Well experience in building Java application using Spring, MySQL and Kubernetes. Also deeply involved with automating test flows',
      icon: '🗄️',
    },
   
   
  ];

  return (
    <div className="list-items">
      {items.map((item, index) => (
        <div key={index} className={`list-item ${visibleItems[index] ? 'visible' : 'hidden'}`}>
          <span className="icon">{item.icon}</span>
          <div className="content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
