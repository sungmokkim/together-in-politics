import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('** GOOGLE ANALYTICS ID **');
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
