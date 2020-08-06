import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SiteTitle from './components/common/SiteTitle';

import { fetchLatestDate, fetchMaxValues } from './actions/actions';

class App extends Component {
  constructor(props) {
    super(props);
  }
  monitorMaxValues = () => {
    // this function is to monitor if users change mention portion value
    // if a change occurs, it will fetch max values again
    const { active, maxValues, communities } = this.props.dashboardManager;
    console.log('active mention portion index', active.mentionPortion.index);
    console.log('what ever')
    console.log(maxValues[active.community.index].mentionPortion)
    if (
      active.mentionPortion.index !==
      maxValues[active.community.index].mentionPortion
    ) {
      this.props.fetchMaxValues(active, communities);
    }
  };
  render() {
    const { route } = this.props;
    {
      this.monitorMaxValues();
    }
    return (
      <React.Fragment>
        <div id='bg' />
        <Header />
        {renderRoutes(route.routes)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboardManager: state.dashboardManager
  };
};

// this is to fetch latest(most recent) date before it renders on client(latest date is needed for many other data fetching)
const fetchDataFromServerSide = store => {
  const { communities, active } = store.getState()['dashboardManager'];
  return [
    store.dispatch(fetchLatestDate()),
    store.dispatch(fetchMaxValues(active, communities))
  ];
};

export default {
  component: connect(
    mapStateToProps,
    { fetchLatestDate, fetchMaxValues }
  )(App),
  fetchDataFromServerSide
};
