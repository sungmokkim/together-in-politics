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

  render() {
    const { route } = this.props;

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
  return [store.dispatch(fetchLatestDate()), store.dispatch(fetchMaxValues())];
};

export default {
  component: connect(
    mapStateToProps,
    { fetchLatestDate, fetchMaxValues }
  )(App),
  fetchDataFromServerSide
};
