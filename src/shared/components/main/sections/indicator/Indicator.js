import React, { Component } from 'react';
import ContentLoading from '../../../common/ContentLoading';
import IndicatorBar from '../../../common/IndicatorBar';

class Indicator extends Component {
  render() {
    let status;
    let statusMark;
    let emoji;
    let facialExpression;

    // deconstruct props
    const {
      value,
      metric,
      weight,
      index,
      maxValues,
      isFaceEmoji,
      active,
      todayIndicator,
      emojiMarginRight,
      emojiMarginLeft,
      handleClick,
      currentMCount
    } = this.props;

    // destructuring received object
    const {
      statusValues,
      statusNames,
      statusMarks,
      facialExpressions,
      indicatorOption
    } = todayIndicator[index];

    // get max value
    const maxValue = maxValues[active.community.index][index];

    // get minimum m_count
    const minimumMCount = active.community[active.mentionPortion.index];

    // display different icons
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
    if (active.indicatorOption.index === 'relative') {
      // if number display is in relative mode,
      // divide the current value by max value
      numberValue = ((value / maxValue) * 100).toFixed(2);
    } else {
      // if it's not in relative mode,
      // divide the current value by the corresponding weight
      numberValue = ((value / weight) * 100).toFixed(2);
    }

    // get current status names, colors, and emojis based on given value
    if (numberValue >= statusValues[0]) {
      status = statusNames['korean'][0];
      statusMark = statusMarks[0];
      facialExpression = isFaceEmoji ? facialExpressions[0] : null;
    } else if (numberValue >= statusValues[1]) {
      status = statusNames['korean'][1];
      statusMark = statusMarks[1];
      facialExpression = isFaceEmoji ? facialExpressions[1] : null;
    } else if (numberValue >= statusValues[2]) {
      status = statusNames['korean'][2];
      statusMark = statusMarks[2];
      facialExpression = isFaceEmoji ? facialExpressions[2] : null;
    } else if (numberValue >= statusValues[3]) {
      status = statusNames['korean'][3];
      statusMark = statusMarks[3];
      facialExpression = isFaceEmoji ? facialExpressions[3] : null;
    } else if (numberValue < statusValues[3]) {
      status = statusNames['korean'][4];
      statusMark = statusMarks[4];
      facialExpression = isFaceEmoji ? facialExpressions[4] : null;
    } else {
      status = 'Status Unknown';
      statusMark = statusMarks[4];
      facialExpression = isFaceEmoji ? facialExpressions[4] : null;
    }

    // this function is to display actual content or loading component
    const renderContent = () => {
      return value || value === 0 ? (
        <React.Fragment>
          <span
            className={`value ${
              // if the current m_count is lower than the minimum m_count,
              // apply disabled className
              // only do that when the current indicator option is on 'relative'
              currentMCount >= minimumMCount
                ? null
                : active.indicatorOption.index === 'relative'
                ? 'disabled'
                : null
            }`}
          >
            {numberValue}
          </span>
          <span
            className={`metric ${
              // if the current m_count is lower than the minimum m_count,
              // apply disabled className
              // only do that when the current indicator option is on 'relative'
              currentMCount >= minimumMCount
                ? null
                : active.indicatorOption.index === 'relative'
                ? 'disabled'
                : null
            }`}
          >
            {metric || ''}
          </span>
          <div
            className={`status ${
              // if the current m_count is lower than the minimum m_count,
              // apply disabled className
              // only do that when the current indicator option is on 'relative'
              currentMCount >= minimumMCount
                ? statusMark
                : active.indicatorOption.index === 'relative'
                ? 'disabled'
                : statusMark
            }`}
            style={{
              transition: 'color 0.5s linear',
              fontWeight: 'bolder'
            }}
          >
            {indicatorOption[active.indicatorOption.index]['korean']}
          </div>
        </React.Fragment>
      ) : (
        <ContentLoading />
      );
    };

    // this is actual rendering
    return (
      <div
        className={`indicator-card`}
        onClick={() => {
          handleClick(index);
        }}
      >
        <div className='indicator-content-container'>
          <div className='indicator-title-container'>
            <i
              className={`${
                isFaceEmoji ? facialExpression : emoji
              } emotion ${statusMark}`}
              // since sizes of icons are different,there should be different margin
              style={{
                marginRight: emojiMarginRight,
                marginLeft: emojiMarginLeft
              }}
            />

            <div>
              {/* title of the indicator */}
              <div className='indicator-title'>
                {todayIndicator[index]['korean']}
              </div>
              {/* name of the current community */}
              <span className='active-community'>
                {active.community['korean']}
              </span>
            </div>
          </div>

          {/* render actual content(value, status, etc) or loading component */}
          <div className='indicator-content'>{renderContent()}</div>
        </div>

        {/*this div is  just to separate indicator bar from other contents */}
        <div style={{ marginTop: '2.2rem' }}>
          <IndicatorBar
            totalWidth='100%'
            totalHeight='2rem'
            value={numberValue}
            statusValues={statusValues}
            statusMarks={statusMarks}
            valid={
              currentMCount >= minimumMCount
                ? true
                : active.indicatorOption.index === 'relative'
                ? false
                : true
            }
          />
        </div>
      </div>
    );
  }
}

export default Indicator;
