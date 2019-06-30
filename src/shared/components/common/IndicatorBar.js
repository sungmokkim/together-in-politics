import React from 'react';

export default props => {
  return (
    <svg
      className='meter-bar-container'
      style={{ width: '50%', height: '1rem' }}
    >
      <rect
        className='original-bar'
        x='0'
        y='0'
        rx='0.5rem'
        ry='0.5rem'
        width='100%'
        height='100%'
      />
      <rect
        className='value-bar'
        x='0'
        y='0'
        rx='0.5rem'
        ry='0.5rem'
        width={`${props.value}%`}
        height='100%'
      />
    </svg>
  );
};
