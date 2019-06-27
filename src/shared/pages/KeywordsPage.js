import React, { Component } from 'react';
import KeywordsMain from '../components/keywords/sections/KeywordsMain';
import { logPageView } from '../googleAnalytics';
class KeywordsPage extends Component {
  componentDidMount() {
    logPageView();
  }
  render() {
    return <KeywordsMain />;
  }
}

export default {
  component: KeywordsPage
};
