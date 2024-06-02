import React, { forwardRef } from 'react';
import './ListSection.css';
import ListItems from './ListItems';

const ListSection = forwardRef(({ isVisible, visibleItems }, ref) => (
  <div ref={ref} className={`list-section ${isVisible ? 'visible' : 'hidden'}`}>
    <ListItems visibleItems={visibleItems} />
  </div>
));

export default ListSection;
