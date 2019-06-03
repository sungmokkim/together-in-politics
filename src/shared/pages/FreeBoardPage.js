import React, { Component } from 'react';
import FreeBoardSection from '../components/freeboard/sections/FreeBoardSection';
import { connect } from 'react-redux';
import { fetchDashboardData, resetCurrentRange } from '../actions/actions';

class FreeBoardPage extends Component {
  componentDidMount() {}
  render() {
    return <FreeBoardSection />;
  }
}

// const fetchDataFromServerSide = store => {
//   // const { active } = store.getState()['dashboardManager'];
//   // return [store.dispatch(fetchDashboardData(active))];
//   return;
// };

export default {
  component: connect(
    null,
    { resetCurrentRange, fetchDashboardData }
  )(FreeBoardPage)
  // fetchDataFromServerSide
};
