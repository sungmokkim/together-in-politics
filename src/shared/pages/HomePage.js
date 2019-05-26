import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchTodayIndicators,
  fetchData,
  fetchTodayRankings,
  changeCurrentDate,
  resetCurrentDate,
  fetchLatestDate
} from '../actions/actions';
import HeroSection from '../components/main/sections/hero/HeroSection';
import IndicatorSection from '../components/main/sections/indicator/IndicatorSection';
import RankingSection from '../components/main/sections/ranking/RankingSection';
import DateAdjustSection from '../components/main/sections/dateAdjust/DateAdjustSection';

class HomePage extends Component {
  componentDidMount() {
    const { rankings } = this.props.today;
    const { latestDate } = this.props.dashboardManager;

    if (!rankings.length) {
      if (!latestDate.year) {
        //there was no data fetching from server side
        this.props.fetchLatestDate().then(({ year, month, date }) => {
          this.props.fetchTodayIndicators(year, month, date);
          this.props.fetchTodayRankings(year, month, date);
        });
      } else {
        // there was some data fetching from server side
        this.props.fetchTodayRankings(
          latestDate.year,
          latestDate.month,
          latestDate.date
        );
      }
    }
  }

  render() {
    const { latestDate } = this.props.dashboardManager;

    return (
      <React.Fragment>
        <HeroSection />
        <DateAdjustSection />
        <IndicatorSection />
        <hr className='section-seperator global-width global-center' />
        <RankingSection />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    today: state.today,
    dashboardManager: state.dashboardManager
  };
}

function fetchDataFromServerSide(store) {
  const { currentDate } = store.getState()['dashboardManager'];

  return [
    store.dispatch(
      fetchTodayIndicators(
        currentDate.year,
        currentDate.month,
        currentDate.date,
        true
      )
    ),
    store.dispatch(fetchLatestDate())
  ];
}

export default {
  component: connect(
    mapStateToProps,
    {
      fetchData,
      fetchTodayIndicators,
      fetchTodayRankings,
      changeCurrentDate,
      resetCurrentDate,
      fetchLatestDate
    }
  )(HomePage),
  fetchDataFromServerSide: fetchDataFromServerSide
};
