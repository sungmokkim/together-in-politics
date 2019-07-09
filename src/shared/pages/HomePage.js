import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchTodayIndicators,
  fetchTodayRankings,
  changeCurrentDate,
  resetCurrentDate,
  fetchLatestDate
} from '../actions/actions';
import IndicatorSection from '../components/main/sections/indicator/IndicatorSection';
import AdjustSection from '../components/main/sections/adjust/AdjustSection';
import CurrentStatus from '../components/common/CurrentStatus';
import dateAndTime from 'date-and-time';

import { logPageView } from '../googleAnalytics';

class HomePage extends Component {
  componentDidMount() {
    logPageView();
    const { indicators } = this.props.today;
    const { active, currentDate } = this.props.dashboardManager;

    // stringify currentDate(in object form)
    const currentDateString = `${currentDate.year}-${currentDate.month}-${
      currentDate.date
    }`;

    // when component is mounted, there are some possible situations
    // case 1 : there is no indicator dataset at all
    // case 2 : web app's current date and datatset's current date do not match (most likely due to date change in other pages)
    // case 3 :web app's current community and dataset's current community do not match(most likely due to change in other pages)
    // in these cases, there should be data fetching
    if (
      !indicators.length ||
      indicators[0].name !== active.community.index ||
      indicators[0].dates !== currentDateString
    ) {
      this.props.fetchTodayIndicators(
        currentDate.year,
        currentDate.month,
        currentDate.date,
        false,
        active
      );
    }
  }

  render() {
    const { currentDate, active } = this.props.dashboardManager;
    const currentDateParsed = dateAndTime
      .parse(
        `${currentDate.year}-${currentDate.month}-${currentDate.date}`,
        'YYYY-MM-DD',
        true
      )
      .toLocaleString('ko-KR', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });

    return (
      <React.Fragment>
        <CurrentStatus
          list={[
            {
              icon: 'far fa-calendar-alt',
              status: currentDateParsed
            },
            {
              icon: 'fas fa-tasks',
              status: active.community['korean']
            },
            {
              icon: 'fas fa-tachometer-alt',
              status: active.indicatorOption['korean']
            }
          ]}
        />
        <AdjustSection />
        <IndicatorSection />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    today: state.today,
    dashboardManager: state.dashboardManager
  };
};

const fetchDataFromServerSide = store => {
  const { currentDate, active } = store.getState()['dashboardManager'];

  return [
    store.dispatch(
      fetchTodayIndicators(
        currentDate.year,
        currentDate.month,
        currentDate.date,
        true, // fetch latest. this has to be true since it is the first time loading this page
        active
      )
    )
  ];
};

export default {
  component: connect(
    mapStateToProps,
    {
      fetchTodayIndicators,
      fetchTodayRankings,
      changeCurrentDate,
      resetCurrentDate,
      fetchLatestDate
    }
  )(HomePage),
  fetchDataFromServerSide
};
