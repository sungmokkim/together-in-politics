import ReactGA from 'react-ga';
import { googleAnalyticsID } from './clientEnv';

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
