import React from 'react';

export default props => {
  return (
    <span
      className={`${
        props.isActive ? 'active-btn' : 'not-active'
      } indicator-select-button`}
      onClick={() => {
        props.handleClick(props.type, props.activate);
      }}
    >
      {props.title}
    </span>
  );
};
