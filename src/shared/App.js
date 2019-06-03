import React from 'react';

import { renderRoutes } from 'react-router-config';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SiteTitle from './components/common/SiteTitle';
import { logPageView } from './googleAnalytics';

const App = ({ route }) => {
  logPageView();
  return (
    <React.Fragment>
      <div id='bg' />
      <Header />
      {/* <SiteTitle /> */}
      {renderRoutes(route.routes)}
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default {
  component: App
};
