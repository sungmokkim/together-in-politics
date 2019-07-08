import React, { Component } from 'react';
import ContentLoading from '../../../common/ContentLoading';
import IndicatorBar from '../../../common/IndicatorBar';

class Indicator extends Component {
  render() {
    let status;
    let statusMark;

    let emoji;
    let facialExpression;

    const {
      statusValues,
      statusNames,
      statusMarks,
      value,
      metric,
      weight,
      title,
      index,
      facialExpressions,
      maxValues,
      isFaceEmoji,
      indicatorOption,
      activeCommunity
    } = this.props;

    const maxValue = maxValues[activeCommunity.index][index];

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
      case 'anti_popularity':
        emoji = 'fas fa-fist-raised';
        break;
      case 'problem_ratio':
        emoji = 'fas fa-exclamation';
        break;
      default:
        emoji = 'far fa-angry';
    }
    let numberValue;
    if (indicatorOption.index === 'relative') {
      // if number display is in relative mode,
      // divide the current value by max value

      numberValue = ((value / maxValue) * 100).toFixed(2);
    } else {
      // if it's not in relative mode,
      // divide the current value by the corresponding weight
      numberValue = ((value / weight) * 100).toFixed(2);
    }

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
        className={`indicator-card`}
        onClick={() => {
          this.props.handleClick ? this.props.handleClick(index) : null;
        }}
      >
        <div className='indicator-content-container'>
          <div className='indicator-title-container'>
            <i
              className={`${
                isFaceEmoji ? facialExpression : emoji
              } emotion ${statusMark}`}
              style={{
                marginRight: this.props.emojiMarginRight,
                marginLeft: this.props.emojiMarginLeft
              }}
            />
            <div>
              <div className='indicator-title'>{title}</div>
              <span className='active-community'>
                {this.props.activeCommunity['korean']}
              </span>
            </div>
          </div>

          <div className='indicator-content'>{renderContent()}</div>
        </div>

        {/*this div is  just to separate indicator bar from other contents */}
        <div style={{ marginTop: '2.2rem' }}>
          <IndicatorBar
            totalWidth='100%'
            totalHeight='2rem'
            value={numberValue}
            statusValues={this.props.statusValues}
            statusMarks={this.props.statusMarks}
          />
        </div>
      </div>
    );
  }
}

export default Indicator;
