import { navDisplay } from '../options/navDisplay';
import { TOGGLE_STATUS } from '../actions/actions';

const initialState = {
  isFromClient: false,
  navDisplay: navDisplay,
  statusClicked: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_STATUS:
      return {
        ...state,
        statusClicked: !state.statusClicked
      };
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
