import React from 'react';

export default props => {
  return (
    <div className='small-title'>
      {props.title}
      <span className='question-icon'>
        {/* <i className='far fa-question-circle' /> */}
      </span>
    </div>
  );
};
