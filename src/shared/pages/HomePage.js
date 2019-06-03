import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchTodayIndicators,
  fetchTodayRankings,
  changeCurrentDate,
  resetCurrentDate,
  fetchLatestDate
} from '../actions/actions';
import HeroSection from '../components/main/sections/hero/HeroSection';
import IndicatorSection from '../components/main/sections/indicator/IndicatorSection';
import RankingSection from '../components/main/sections/ranking/RankingSection';
import AdjustSection from '../components/main/sections/adjust/AdjustSection';

class HomePage extends Component {
  componentDidMount() {
    const { rankings } = this.props.today;
    const { latestDate, active } = this.props.dashboardManager;

    if (!rankings.length) {
      if (!latestDate.year) {
        //there was no data fetching from server side
        this.props.fetchLatestDate().then(({ year, month, date }) => {
          this.props.fetchTodayIndicators(
            year,
            month,
            date,
            false,
            active.community
          );
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
    return (
      <React.Fragment>
        {/* <HeroSection /> */}
        <AdjustSection />
        <IndicatorSection />
        {/* <hr className='section-seperator global-width global-center' /> */}
        <RankingSection />
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
        true,
        active.community
      )
    ),
    store.dispatch(fetchLatestDate())
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
  fetchDataFromServerSide: fetchDataFromServerSide
};
