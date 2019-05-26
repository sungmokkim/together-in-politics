import React, { Component } from 'react';

import { renderRoutes, matchRoutes } from 'react-router-config';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { attachAnalytics } from './googleAnalytics';

const App = ({ route }) => {
  attachAnalytics();
  return (
    <React.Fragment>
      <Header />
      {renderRoutes(route.routes)}
      <Footer />
    </React.Fragment>
  );
};

export default {
  component: App
};
