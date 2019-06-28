import React from 'react';

const Loading = () => {
  return (
    <div
      style={{
        fontSize: '3rem',
        fontFamily: "'Black Han Sans', sans-serif",
        animation: 'animation: opacity-fade-in 0.3s ease-in infinite'
      }}
    >
      NO DATA
    </div>
  );
};

export default Loading;
