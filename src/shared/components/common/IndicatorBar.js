import React from 'react';

export default props => {
  let status;
  let statusMark;

  const { statusValues, statusMarks, totalWidth, totalHeight } = props;
  const valid = props.valid ? true : false;

  const numberValue = props.value;
  if (numberValue >= statusValues[0]) {
    statusMark = statusMarks[0];
  } else if (numberValue >= statusValues[1]) {
    statusMark = statusMarks[1];
  } else if (numberValue >= statusValues[2]) {
    statusMark = statusMarks[2];
  } else if (numberValue >= statusValues[3]) {
    statusMark = statusMarks[3];
  } else if (numberValue < statusValues[3]) {
    statusMark = statusMarks[4];
  } else {
    statusMark = statusMarks[4];
  }

  return (
    <svg
      className='meter-bar-container'
      style={{ width: totalWidth, height: totalHeight }}
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
        className={`value-bar ${valid ? statusMark : 'disabled'}`}
        x='0'
        y='0'
        rx='0.5rem'
        ry='0.5rem'
        width={`${numberValue}%`}
        height='100%'
      />
    </svg>
  );
};
