import ReactGA from 'react-ga';
import { ga } from './clientEnv';

const googleAnalyticsID = ga;
export const initGA = () => {
  ReactGA.initialize(googleAnalyticsID);
};

export const logPageView = () => {
  try {
    ReactGA.set({ page: window.location.pathname });

    ReactGA.pageview(window.location.pathname);
  } catch (error) {}
};

export const attachAnalytics = () => {
  initGA();
  logPageView();
};
