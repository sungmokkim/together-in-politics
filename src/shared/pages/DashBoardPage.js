import React, { Component } from 'react';
import MainBoardSection from '../components/dashboard/sections/mainboard/MainboardSection';
import { connect } from 'react-redux';
import { fetchDashboardData, resetCurrentRange } from '../actions/actions';

class DashBoardPage extends Component {
  componentDidMount() {}
  render() {
    return <MainBoardSection />;
  }
}

// const fetchDataFromServerSide = store => {
//   const { active } = store.getState()['dashboardManager'];
//   return [store.dispatch(fetchDashboardData(active, ***include weight ***))];
// };

export default {
  component: connect(
    null,
    { resetCurrentRange, fetchDashboardData }
  )(DashBoardPage)
};
