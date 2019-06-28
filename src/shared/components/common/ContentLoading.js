import React from 'react';

export default props => {
  return (
    <div
      style={{
        fontSize: '3rem',
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'flex',
        // if there's incoming props for alignItems, use it
        alignItems: props.alignItems ? props.alignItems : 'center',
        justifyContent: 'center',
        top: '0',
        left: '0',
        background: 'rgba(0, 0, 0, 0.5)',

        borderRadius: '15px',
        zIndex: 5
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          minWidth: '100%',
          // if there's incoming props for margintop, use it
          marginTop: props.marginTop ? props.marginTop : '0'
        }}
      >
        <i
          className='fas fa-redo-alt'
          style={{
            color: 'white',
            fontSize: '9rem',
            animation: 'refresh-rotation 1s infinite'
          }}
        />
      </div>
    </div>
  );
};
