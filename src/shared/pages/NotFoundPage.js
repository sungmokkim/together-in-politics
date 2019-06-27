import React, { Component } from 'react';
import { logPageView } from '../googleAnalytics';

class NotFountPage extends Component {
  componentDidMount() {
    logPageView();
  }
  render() {
    return <div>NOT FOUND!</div>;
  }
}

export default {
  component: NotFountPage
};
