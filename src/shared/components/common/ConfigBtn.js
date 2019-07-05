import React from 'react';

export default props => {
  return (
    <div
      className='config-button'
      style={{ animation: 'opacity-fade-in 0.3s ease-in forwards' }}
      onClick={props.handleClick}
    >
      <i className='fas fa-cog config-icon' />
    </div>
  );
};
