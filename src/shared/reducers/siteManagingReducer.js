import { navDisplay } from '../options/navDisplay';

const initialState = {
  isFromClient: false,
  navDisplay: navDisplay
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      try {
        return {
          ...state,
          isFromClient: true
        };
      } catch (err) {
        return {
          ...state,
          isFromClient: false
        };
      }
  }
};
