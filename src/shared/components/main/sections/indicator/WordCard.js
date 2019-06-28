import React, { Component } from 'react';

import { fixWords } from '../../../../functions/mapLinkToWords';
import ContentLoading from '../../../common/ContentLoading';

class WordCard extends Component {
  render() {
    const { metric, title, index } = this.props;

    const emoji = 'fas fa-font';
    const wordArray = this.props.wordArray;

    const renderContent = () => {
      return wordArray ? (
        [...Array(3).keys()].map(index => {
          return (
            <div key={index} className='keyword-container'>
              <span
                className={`value ${wordArray[index] ? null : 'status-number'}`}
              >
                {wordArray[index]
                  ? fixWords(wordArray[index]['word'])
                  : '조건 불충족'}
              </span>
              <span className='metric'>{metric || ''}</span>
              <div
                className={`status status-number`}
                style={{
                  transition: 'color 0.5s linear',
                  fontWeight: 'bolder'
                }}
              >
                {`${wordArray[index] ? index + 1 + '위' : '조건 불충족'}`}
              </div>
            </div>
          );
        })
      ) : (
        <ContentLoading />
      );
    };

    return (
      <div
        className='word-card'
        onClick={() => {
          this.props.handleClick ? this.props.handleClick(index) : null;
        }}
      >
        <div className='indicator-title-container'>
          <i className={`${emoji} emotion status-number`} />
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

export default WordCard;
