import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchTodayRankings,
  changeActive,
  changeCurrentDate
} from '../../../actions/actions';
import IndicatorBtn from '../../common/IndicatorBtn';
import CalendarModule from '../../common/CalendarModule';
import withModal from '../../hoc/withModal';

class RankingMenu extends Component {
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

  render() {
    const { latestDate, currentDate, active } = this.props.dashboardManager;

    return (
      <section className='section-global'>
        <div className='date-adj-container'>
          <CalendarModule
            latestDate={latestDate}
            currentDate={currentDate}
            handleDateChangeFromCalendar={
              this.props.handleDateChangeFromCalendar
            }
            btnClicked={this.props.btnClicked}
          />

          <IndicatorBtn
            handleClick={this.props.handleSortingChange}
            type='rankingSorting'
            valueIsObject={true}
            btnClicked={this.props.btnClicked}
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

export default withModal({
  configBtn: true,
  fixedPositionClassName: 'setting-container'
})(
  connect(
    mapStateToProps,
    {
      changeCurrentDate,
      changeActive,
      fetchTodayRankings
    }
  )(RankingMenu)
);
