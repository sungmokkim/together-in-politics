import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeCurrentDate,
  fetchTodayIndicators,
  fetchTodayRankings,
  fetchDashboardData,
  changeActive
} from '../../../../actions/actions';
import IndicatorBtn from '../../../common/IndicatorBtn';
import CalendarModule from './CalendarModule';

class DateAdjust extends Component {
  state = {
    opacity: 0,
    toggle: false,
    calendarClicked: false
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      opacity: 1
    });
  }

  handleDateChangeFromCalendar = ({ year, month, date }) => {
    document.body.style.overflow = 'scroll';
    this.props
      .changeCurrentDate(year, month, date)
      .then(({ year, month, date }) => {
        const { active, communities } = this.props.dashboardManager;
        this.props.fetchTodayRankings(year, month, date);
        this.props.fetchTodayIndicators(
          year,
          month,
          date,
          false,
          active.community,
          communities[active.community].weight
        );
      });
  };

  handleCommunityChange = (type, value) => {
    this.props.changeActive(type, value, () => {
      const { year, month, date } = this.props.dashboardManager.currentDate;
      const { communities, active } = this.props.dashboardManager;
      this.props.fetchTodayIndicators(
        year,
        month,
        date,
        false,
        value,
        communities[value].weight
      );

      this.props.fetchDashboardData(active, communities[value].weight);
    });
  };

  render() {
    const { latestDate, currentDate, active } = this.props.dashboardManager;

    return (
      <section className='section-global'>
        <div className='date-adj-container'>
          <CalendarModule
            latestDate={latestDate}
            currentDate={currentDate}
            handleDateChangeFromCalendar={this.handleDateChangeFromCalendar}
          />

          <IndicatorBtn
            handleClick={this.handleCommunityChange}
            type='community'
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboardManager: state.dashboardManager
  };
};

export default connect(
  mapStateToProps,
  {
    changeCurrentDate,
    fetchTodayIndicators,
    changeActive,
    fetchTodayRankings,
    fetchDashboardData
  }
)(DateAdjust);
