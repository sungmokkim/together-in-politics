import React, { Component } from 'react';
import TodayIndicatorTitle from '../../../common/TodayIndicatorTitle';

import Loading from '../../../common/Loading';

class Indicator extends Component {
  render() {
    let status;
    let statusMark;
    let numberValue;

    const {
      isNumber,
      statusValue,
      statusName,
      value,
      metric,
      word_value,
      title
    } = this.props;

    if (isNumber) {
      numberValue = (value * 100).toFixed(2);
      if (value >= statusValue[0]) {
        status = statusName[0];
        statusMark = 'status-very-good';
      } else if (value >= statusValue[1]) {
        status = statusName[1];
        statusMark = 'status-good';
      } else if (value >= statusValue[2]) {
        status = statusName[2];
        statusMark = 'status-okay';
      } else if (value >= statusValue[3]) {
        status = statusName[3];
        statusMark = 'status-bad';
      } else {
        status = statusName[4];
        statusMark = 'status-very-bad';
      }
    }

    const renderContent = () => {
      return value ? (
        <React.Fragment>
          <span
            className='value'
            style={{ fontFamily: "'Black Han Sans', sans-serif" }}
          >
            {isNumber ? numberValue : value}
          </span>
          <span
            className='metric'
            style={{ fontFamily: "'Black Han Sans', sans-serif" }}
          >
            {metric || ''}
          </span>
          <div
            className={`status ${statusMark ? statusMark : 'status-number'}`}
            style={{
              transition: 'color 0.5s linear',
              fontWeight: 'bolder'
            }}
          >
            {status ? status : `${word_value.toLocaleString()}회`}
          </div>
        </React.Fragment>
      ) : (
        <Loading />
      );
    };

    return (
      <div className='indicator-card'>
        <TodayIndicatorTitle title={title} />

        <div className='indicator-content'>{renderContent()}</div>
      </div>
    );
  }
}

export default Indicator;
