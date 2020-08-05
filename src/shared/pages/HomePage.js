import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchTodayIndicators,
  fetchTodayRankings,
  changeCurrentDate,
  resetCurrentDate,
  fetchLatestDate,
  toggleStatus
} from '../actions/actions';
import IndicatorSection from '../components/main/sections/indicator/IndicatorSection';
import AdjustSection from '../components/main/sections/adjust/AdjustSection';
import CurrentStatus from '../components/common/CurrentStatus';
import PhotoCard from '../components/common/PhotoCard';
import dateAndTime from 'date-and-time';

import { logPageView } from '../googleAnalytics';

class HomePage extends Component {
  // below 2 functions are needed to display modal(dark overlay) when one of the two conditions is met
  // 1. a user clicks a  button
  // 2. a user clicks a status card
  // to do both, these functions need to be where these 2 conditions can be controlled
  toggleBtn = toggleType => {
    if (this.props.site[toggleType].clicked) {
      // if it's already clicked, execute closing function
      this.controlModalFadeOut(toggleType);
    } else {
      // if it is not clicked, activate all these three
      this.props.toggleStatus({ toggleType, toggleComponent: 'clicked' });
      this.props.toggleStatus({ toggleType, toggleComponent: 'modalDisplay' });
      this.props.toggleStatus({
        toggleType,
        toggleComponent: 'componentDisplay'
      });
    }
  };

  controlModalFadeOut = async toggleType => {
    // this is closing function

    // change 'clicked' status first (to perform 'fade-out' animation first)
    this.props.toggleStatus({ toggleType, toggleComponent: 'clicked' });

    // give delay of 0.3s to perform fade-out animation
    const delayModal = await setTimeout(() => {
      // deactivate these two after the time out
      this.props.toggleStatus({ toggleType, toggleComponent: 'modalDisplay' });
      this.props.toggleStatus({
        toggleType,
        toggleComponent: 'componentDisplay'
      });
    }, 300);
  };

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
      !indicators?.length ||
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
        <PhotoCard />
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
          handleClick={this.toggleBtn}
          toggleType='status'
        />
        <AdjustSection
          clicked={this.props.site.status.clicked}
          modalDisplay={this.props.site.status.modalDisplay}
          componentDisplay={this.props.site.status.componentDisplay}
          controlModalFadeOut={this.controlModalFadeOut}
          toggleBtn={this.toggleBtn}
          toggleType='status'
        />
        <IndicatorSection />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.siteManager,
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
      fetchLatestDate,
      toggleStatus
    }
  )(HomePage),
  fetchDataFromServerSide
};
