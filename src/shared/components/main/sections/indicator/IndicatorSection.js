import React, { Component } from 'react';
import Indicator from './Indicator';
import WordCard from './WordCard';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  changeActive,
  fetchDashboardData,
  toggleIndicator
} from '../../../../actions/actions';

class IndicatorSection extends Component {
  handleChange = index => {
    // when an indicator card is clicked,
    // it will redirect users to the dashboard page

    // change default chart to a line chart
    this.props.changeActive('chart', {
      korean: '기간별 지표 변화',
      koreanShort: '지표',
      index: 'line'
    });

    // get line chart options
    const { lineChartIndicatorOptions } = this.props.dashboardManager;

    // the clicked indicator must be shown in the line chart
    // to do that, set checked attribute to true all the time
    const newValue = {
      ...lineChartIndicatorOptions[index],
      checked: true
    };

    this.props.toggleIndicator(newValue);
  };

  getValue = key => {
    const { today } = this.props;

    return today.indicators?.length ? today.indicators[0][key] : null;
  };

  renderIndicators = () => {
    const {
      active,
      communities,
      todayIndicators,
      maxValues
    } = this.props.dashboardManager;

    const { today } = this.props;

    return (
      <div className='indicator-container'>
        <Link to='/dashboard'>
          <Indicator
            currentMCount={this.getValue('m_count')}
            todayIndicator={todayIndicators}
            index='popularity'
            value={this.getValue('popularity')}
            isNumber={true}
            isFaceEmoji={false}
            metric='%'
            active={active}
            handleClick={this.handleChange}
            emojiMarginRight='1rem'
            emojiMarginLeft='0rem'
            weight={active.community.popularityWeight}
            maxValues={maxValues}
          />
        </Link>

        <Link to='/dashboard'>
          <Indicator
            currentMCount={this.getValue('m_count')}
            todayIndicator={todayIndicators}
            index='anti_ratio'
            value={this.getValue('anti_ratio')}
            isNumber={true}
            isFaceEmoji={true}
            metric='%'
            active={active}
            handleClick={this.handleChange}
            emojiMarginRight='2rem'
            emojiMarginLeft='0rem'
            weight={1}
            maxValues={maxValues}
          />
        </Link>

        <Link to='/dashboard'>
          <Indicator
            currentMCount={this.getValue('m_count')}
            todayIndicator={todayIndicators}
            index='femi_ratio'
            value={this.getValue('femi_ratio')}
            isNumber={true}
            isFaceEmoji={false}
            metric='%'
            active={active}
            handleClick={this.handleChange}
            emojiMarginRight='1rem'
            emojiMarginLeft='0rem'
            weight={active.community.femiWeight}
            maxValues={maxValues}
          />
        </Link>

        <Link to='/dashboard'>
          <Indicator
            currentMCount={this.getValue('m_count')}
            todayIndicator={todayIndicators}
            index='problem_ratio'
            value={this.getValue('problem_ratio')}
            isNumber={true}
            isFaceEmoji={false}
            metric='%'
            active={active}
            handleClick={this.handleChange}
            emojiMarginRight='3rem'
            emojiMarginLeft='1.5rem'
            weight={active.community.problemWeight}
            maxValues={maxValues}
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
  { changeActive, fetchDashboardData, toggleIndicator }
)(IndicatorSection);
