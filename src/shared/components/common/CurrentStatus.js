import React from 'react';

export default props => {
  const mapLists = () => {
    return props.list.map(obj => {
      return obj ? (
        <div className='status-container' key={obj.status}>
          <span className='status-icon'>
            <i className={obj.icon} />
          </span>
          <span className='current-status'>{obj.status}</span>
        </div>
      ) : null;
    });
  };
  return (
    <div className='section-global'>
      {/* this div is just to center the component */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/*  this div is the actual content */}
        <div
          className='status-card'
          onClick={() => {
            props.handleClick(props.toggleType);
          }}
        >
          {mapLists()}
        </div>
      </div>
    </div>
  );
};
