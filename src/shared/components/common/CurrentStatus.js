import React from 'react';

export default props => {
  const mapLists = () => {
    return props.list.map(obj => {
      return (
        <div className='status-container' key={obj.status}>
          <span className='status-icon'>
            <i className={obj.icon} />
          </span>
          <span className='current-status'>{obj.status}</span>
        </div>
      );
    });
  };
  return (
    <div
      className='section-global'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem 3rem 0rem 3rem'
      }}
    >
      <div className='status-card'>{mapLists()}</div>
    </div>
  );
};
