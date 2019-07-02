import React from 'react';

export default () => {
  return (
    <i
      className='fas fa-hand-point-up slide-notification for-mobile'
      style={{
        animation: 'slide-notification-fade-in 1s ease-in-out forwards',
        animationIterationCount: 3
      }}
    />
  );
};
