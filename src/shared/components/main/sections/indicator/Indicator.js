import React, { Component } from 'react';
import TodayIndicatorTitle from '../../../common/TodayIndicatorTitle';

import Loading from '../../../common/Loading';

class Indicator extends Component {
  render() {
    let status;
    let statusMark;
    let numberValue;
    let emoji;
    let facialExpression;

    const {
      isNumber,
      statusValue,
      statusName,
      value,
      metric,
      word_value,
      title,
      index
    } = this.props;

    switch (index) {
      case 'popularity':
        emoji = 'fas fa-user';
        break;

      case 'word1':
        emoji = 'fas fa-font';
        break;

      default:
        emoji = 'far fa-angry';
    }

    if (isNumber) {
      numberValue = (value * 100).toFixed(2);
      if (numberValue >= statusValue[0]) {
        status = statusName[0];
        statusMark = 'status-very-good';
        facialExpression = 'far fa-laugh';
      } else if (numberValue >= statusValue[1]) {
        status = statusName[1];
        statusMark = 'status-good';
        facialExpression = 'far fa-smile';
      } else if (numberValue >= statusValue[2]) {
        status = statusName[2];
        statusMark = 'status-okay';
        facialExpression = 'far fa-meh';
      } else if (numberValue >= statusValue[3]) {
        status = statusName[3];
        statusMark = 'status-bad';
        facialExpression = 'far fa-frown';
      } else {
        status = statusName[4];
        statusMark = 'status-very-bad';
        facialExpression = 'far fa-angry';
      }
    }

    const renderContent = () => {
      return value || value === 0 ? (
        <React.Fragment>
          <span className='value'>{isNumber ? numberValue : value}</span>
          <span className='metric'>{metric || ''}</span>
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
        <div className='indicator-title-container'>
          {/* <TodayIndicatorTitle title={title} /> */}
          <i
            className={`${
              index === 'like_ratio' ? facialExpression : emoji
            } emotion ${statusMark ? statusMark : 'status-number'}`}
          />
          <div>
            <div className='indicator-title'>{title}</div>
            <span className='active-community'>
              {this.props.activeCommunity}
            </span>
          </div>
        </div>

        <div className='indicator-content'>{renderContent()}</div>
      </div>
    );
  }
}

export default Indicator;
