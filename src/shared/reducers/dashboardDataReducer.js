import {
  FETCH_DASHBOARD_DATA,
  FETCH_PERIOD_DATA,
  FETCH_BUBBLE_DATA,
  FETCH_KEYWORDS
} from '../actions/actions';

const initialState = {
  dashboardData: [],
  periodData: [],
  bubbleData: [],
  keywords: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_DATA:
      return { ...state, dashboardData: action.payload };

    case FETCH_PERIOD_DATA:
      return {
        ...state,
        periodData: action.payload
      };
    case FETCH_BUBBLE_DATA:
      return {
        ...state,
        bubbleData: action.payload
      };
    case FETCH_KEYWORDS:
      return {
        ...state,
        keywords: action.payload
      };
    default:
      return state;
  }
};
