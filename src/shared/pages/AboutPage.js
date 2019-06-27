import React, { Component } from 'react';
import { logPageView } from '../googleAnalytics';
import AboutMain from '../components/about/sections/AboutMain';

class AboutPage extends Component {
  componentDidMount() {
    logPageView();
  }
  render() {
    return <AboutMain />;
  }
}

export default {
  component: AboutPage
};
