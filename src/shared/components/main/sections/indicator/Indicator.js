import React, { Component } from 'react';

import ContentLoading from '../../../common/ContentLoading';

class Indicator extends Component {
  render() {
    let status;
    let statusMark;
    let numberValue;
    let emoji;
    let facialExpression;

    const {
      isNumber,
      statusValues,
      statusNames,
      statusMarks,
      value,
      metric,
      word_value,
      title,
      index,
      facialExpressions,
      isFaceEmoji
    } = this.props;

    switch (index) {
      case 'popularity':
        emoji = 'fas fa-users';
        break;

      case 'word1':
        emoji = 'fas fa-font';
        break;

      case 'femi_ratio':
        emoji = 'fas fa-venus-mars';
        break;
      default:
        emoji = 'far fa-angry';
    }

    if (isNumber) {
      numberValue = (value * 100).toFixed(2);
      if (numberValue >= statusValues[0]) {
        status = statusNames[0];
        statusMark = statusMarks[0];
        facialExpression = isFaceEmoji ? facialExpressions[0] : null;
      } else if (numberValue >= statusValues[1]) {
        status = statusNames[1];
        statusMark = statusMarks[1];
        facialExpression = isFaceEmoji ? facialExpressions[1] : null;
      } else if (numberValue >= statusValues[2]) {
        status = statusNames[2];
        statusMark = statusMarks[2];
        facialExpression = isFaceEmoji ? facialExpressions[2] : null;
      } else if (numberValue >= statusValues[3]) {
        status = statusNames[3];
        statusMark = statusMarks[3];
        facialExpression = isFaceEmoji ? facialExpressions[3] : null;
      } else if (numberValue < statusValues[3]) {
        status = statusNames[4];
        statusMark = statusMarks[4];
        facialExpression = isFaceEmoji ? facialExpressions[4] : null;
      } else {
        status = 'Status Unknown';
        statusMark = statusMarks[4];
        facialExpression = isFaceEmoji ? facialExpressions[4] : null;
      }
    }

    const renderContent = () => {
      return value || value === 0 ? (
        <React.Fragment>
          <span className='value'>{numberValue}</span>
          <span className='metric'>{metric || ''}</span>
          <div
            className={`status ${statusMark}`}
            style={{
              transition: 'color 0.5s linear',
              fontWeight: 'bolder'
            }}
          >
            {status}
          </div>
        </React.Fragment>
      ) : (
        <ContentLoading />
      );
    };

    return (
      <div
        className='indicator-card'
        onClick={() => {
          this.props.handleClick ? this.props.handleClick(index) : null;
        }}
      >
        <div className='indicator-title-container'>
          {/* <TodayIndicatorTitle title={title} /> */}
          <i
            className={`${isFaceEmoji ? facialExpression : emoji} ${
              index !== 'anti_ratio' ? 'emotion-large' : 'emotion'
            } ${statusMark}`}
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
