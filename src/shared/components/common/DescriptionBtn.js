import React from 'react';

export default props => {
  return (
    <div
      className='button-container'
      style={{ display: props.hide ? 'none' : 'block' }}
    >
      <div
        className='desc-button'
        style={{
          animation: 'opacity-fade-in 0.3s ease-in forwards'
        }}
        onClick={() => {
          props.handleClick(props.toggleType);
        }}
      >
        <i
          className={`${
            props.btnClicked ? 'fas fa-times' : 'fas fa-question'
          } desc-icon`}
        />
      </div>
    </div>
  );
};
