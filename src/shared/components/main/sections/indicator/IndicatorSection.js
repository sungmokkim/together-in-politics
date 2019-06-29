import React, { Component } from 'react';
import Indicator from './Indicator';
import WordCard from './WordCard';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeActive, fetchDashboardData } from '../../../../actions/actions';

class IndicatorSection extends Component {
  handleChange = index => {
    this.props.changeActive('indicator', index);
    this.props.changeActive('chart', {
      korean: '기간별 지표 변화',
      koreanShort: '지표',
      index: 'line'
    });
  };

  getValue = key => {
    const { today } = this.props;
    return today.indicators.length ? today.indicators[0][key] : null;
  };

  renderIndicators = () => {
    const {
      active,
      communities,
      todayIndicators
    } = this.props.dashboardManager;

    const { today } = this.props;

    return (
      <div className='indicator-container'>
        <Link to='/dashboard'>
          <Indicator
            title={todayIndicators.popularity['korean']}
            index='popularity'
            value={this.getValue('popularity')}
            isNumber={true}
            statusValues={todayIndicators.popularity.statusValues}
            statusNames={todayIndicators.popularity.statusNames['korean']}
            statusMarks={todayIndicators.popularity.statusMarks}
            isFaceEmoji={false}
            metric='%'
            activeCommunity={active.community['korean']}
            handleClick={this.handleChange}
            emojiMargin='1rem'
          />
        </Link>

        <Link to='/dashboard'>
          <Indicator
            title={todayIndicators.anti_ratio['korean']}
            index='anti_ratio'
            value={this.getValue('anti_ratio')}
            isNumber={true}
            statusValues={todayIndicators.anti_ratio.statusValues}
            statusNames={todayIndicators.anti_ratio.statusNames['korean']}
            statusMarks={todayIndicators.anti_ratio.statusMarks}
            isFaceEmoji={true}
            facialExpressions={todayIndicators.anti_ratio.facialExpressions}
            metric='%'
            activeCommunity={active.community['korean']}
            handleClick={this.handleChange}
            emojiMargin='2rem'
          />
        </Link>

        {/* <Link to='/dashboard'>
          <Indicator
            title={todayIndicators.anti_popularity['korean']}
            index='anti_popularity'
            value={this.getValue('anti_popularity')}
            isNumber={true}
            statusValues={todayIndicators.anti_popularity.statusValues}
            statusNames={todayIndicators.anti_popularity.statusNames['korean']}
            statusMarks={todayIndicators.anti_popularity.statusMarks}
            isFaceEmoji={false}
            metric='%'
            activeCommunity={active.community['korean']}
            handleClick={this.handleChange}
            emojiMargin='2rem'
          />
        </Link> */}

        <Link to='/dashboard'>
          <Indicator
            title={todayIndicators.femi_ratio['korean']}
            index='femi_ratio'
            value={this.getValue('femi_ratio')}
            isNumber={true}
            statusValues={todayIndicators.femi_ratio.statusValues}
            statusNames={todayIndicators.femi_ratio.statusNames['korean']}
            statusMarks={todayIndicators.femi_ratio.statusMarks}
            isFaceEmoji={false}
            metric='%'
            activeCommunity={active.community['korean']}
            handleClick={this.handleChange}
            emojiMargin='1rem'
          />
        </Link>

        <Link to='/keywords'>
          <WordCard
            title='키워드'
            index='word1'
            wordArray={this.getValue('words')}
            isNumber={false}
            word_value={this.getValue('words')}
            isFaceEmoji={false}
            min={0}
            max={1}
            activeCommunity={active.community['korean']}
          />
        </Link>
      </div>
    );
  };
  render() {
    return (
      <section className='section-global'>{this.renderIndicators()}</section>
    );
  }
}

function mapStateToProps(state) {
  return {
    today: state.today,
    dashboardManager: state.dashboardManager
  };
}

export default connect(
  mapStateToProps,
  { changeActive, fetchDashboardData }
)(IndicatorSection);
