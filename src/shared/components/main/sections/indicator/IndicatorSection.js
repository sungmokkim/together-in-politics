import React, { Component } from 'react';
import Indicator from './Indicator';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { changeActive, fetchDashboardData } from '../../../../actions/actions';

class IndicatorSection extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      redirect: false
    });
  }

  renderRedirect = () => {
    // if (this.state.redirect) {
    //   return <Redirect to='/dashboard' />;
    // }
  };

  handleChange = index => {
    this.props.changeActive('indicator', index);
    this.props.changeActive('chart', {
      korean: '기간별 지표 변화',
      koreanShort: '지표',
      index: 'line'
    });
    // this.props.fetchDashboardData({
    //   community: this.props.dashboardManager.active.community,
    //   indicator: index,
    //   range: this.props.dashboardManager.active.range
    // });
  };
  getValue = key => {
    const { today } = this.props;
    return today.indicators.length ? today.indicators[0][key] : null;
  };

  render() {
    const {
      active,
      communities,
      todayIndicators
    } = this.props.dashboardManager;
    const { today } = this.props;
    return (
      <section className='section-global'>
        {this.renderRedirect()}
        {/* <SectionTitle title='KEY INDICATORS' /> */}
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
              activeCommunity={communities[active.community].korean}
              handleClick={this.handleChange}
            />
          </Link>

          <Link to='/dashboard'>
            <Indicator
              title={todayIndicators.anti_ratio['korean']}
              index='anti_ratio'
              value={this.getValue('like_ratio')}
              isNumber={true}
              statusValues={todayIndicators.anti_ratio.statusValues}
              statusNames={todayIndicators.anti_ratio.statusNames['korean']}
              statusMarks={todayIndicators.anti_ratio.statusMarks}
              isFaceEmoji={true}
              facialExpressions={todayIndicators.anti_ratio.facialExpressions}
              metric='%'
              activeCommunity={communities[active.community].korean}
              handleClick={this.handleChange}
            />
          </Link>

          <Link to='/'>
            <Indicator
              title='최다빈도 단어'
              index='word1'
              value={this.getValue('word1')}
              isNumber={false}
              word_value={this.getValue('word1_1')}
              isFaceEmoji={false}
              min={0}
              max={1}
              activeCommunity={communities[active.community].korean}
            />
          </Link>
        </div>
      </section>
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
