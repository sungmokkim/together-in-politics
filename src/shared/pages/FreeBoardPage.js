import React, { Component } from 'react';
import FreeBoardSection from '../components/freeboard/sections/FreeBoardSection';
import { logPageView } from '../googleAnalytics';

class FreeBoardPage extends Component {
  componentDidMount() {
    logPageView();
  }
  render() {
    return <FreeBoardSection />;
  }
}

export default {
  component: FreeBoardPage
};
