import React, { Component } from 'react';
import RankingMain from '../components/rankings/sections/RankingMain';
import { logPageView } from '../googleAnalytics';
class RankingPage extends Component {
  componentDidMount() {
    logPageView();
  }
  render() {
    return <RankingMain />;
  }
}

export default {
  component: RankingPage
};
