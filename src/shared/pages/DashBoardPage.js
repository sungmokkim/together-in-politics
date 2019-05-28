import React, { Component } from 'react';
import MainBoardSection from '../components/dashboard/sections/mainboard/MainboardSection';
import { connect } from 'react-redux';
import {
  fetchData,
  fetchDashboardData,
  resetCurrentRange
} from '../actions/actions';

class DashBoardPage extends Component {
  componentDidMount() {}
  render() {
    return <MainBoardSection />;
  }
}

const mapStateToProps = state => {
  return {
    data: state.dashboardData,
    dashboardManager: state.dashboardManager
  };
};

const fetchDataFromServerSide = store => {
  const { active } = store.getState()['dashboardManager'];
  return [store.dispatch(fetchDashboardData(active))];
};

export default {
  component: connect(
    mapStateToProps,
    { resetCurrentRange, fetchDashboardData }
  )(DashBoardPage),
  fetchDataFromServerSide
};
