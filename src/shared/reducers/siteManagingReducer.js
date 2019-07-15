import { navDisplay } from '../options/navDisplay';
import { TOGGLE_STATUS } from '../actions/actions';

const initialState = {
  isFromClient: false,
  navDisplay: navDisplay,
  status: { clicked: false, modalDisplay: false, componentDisplay: false },
  description: {
    clicked: false,
    modalDisplay: false,
    componentDisplay: false
  },
  menu: {
    clicked: false,
    modalDisplay: false,
    componentDisplay: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_STATUS:
      return {
        ...state,
        [action.toggleType]: {
          ...state[action.toggleType],
          [action.toggleComponent]: !state[action.toggleType][
            action.toggleComponent
          ]
        }
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
