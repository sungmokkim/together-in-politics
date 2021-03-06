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
import CalendarModule from '../../../common/CalendarModule';
import withModal from '../../../hoc/withModal';

class DateAdjust extends Component {
  state = {
    opacity: 0,
    toggle: false,
    calendarClicked: false
  };

  handleDateChangeFromCalendar = ({ year, month, date }) => {
    this.props
      .changeCurrentDate(year, month, date)
      .then(({ year, month, date }) => {
        const { active } = this.props.dashboardManager;
        this.props.fetchTodayIndicators(year, month, date, false, active);
      });
  };

  handleCommunityChange = (type, value) => {
    this.props.changeActive(type, value, () => {
      const { year, month, date } = this.props.dashboardManager.currentDate;
      const { active } = this.props.dashboardManager;

      this.props.fetchTodayIndicators(year, month, date, false, active);
    });
  };

  handleChange = (type, value) => {
    this.props.changeActive(type, value);
  };
  render() {
    const { latestDate, currentDate } = this.props.dashboardManager;

    return (
      <React.Fragment>
        <CalendarModule
          latestDate={latestDate}
          currentDate={currentDate}
          handleDateChangeFromCalendar={this.handleDateChangeFromCalendar}
          btnClicked={this.props.btnClicked}
        />

        <IndicatorBtn
          handleClick={this.handleCommunityChange}
          type='community'
          valueIsObject={true}
          btnClicked={this.props.btnClicked}
        />

        <IndicatorBtn
          handleClick={this.handleChange}
          type='indicatorOption'
          valueIsObject={true}
          btnClicked={this.props.btnClicked}
        />

        <IndicatorBtn
          handleClick={this.handleChange}
          type='mentionPortion'
          valueIsObject={true}
          btnClicked={this.props.btnClicked}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboardManager: state.dashboardManager
  };
};

export default withModal({
  configBtn: true,
  fixedPositionClassName: 'setting-container'
})(
  connect(
    mapStateToProps,
    {
      changeCurrentDate,
      fetchTodayIndicators,
      changeActive,
      fetchTodayRankings,
      fetchDashboardData
    }
  )(DateAdjust)
);
