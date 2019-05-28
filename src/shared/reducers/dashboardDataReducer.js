import { FETCH_DASHBOARD_DATA, FETCH_PERIOD_DATA } from '../actions/actions';

const initialState = {
  dashboardData: [],
  periodData: []
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
    default:
      return state;
  }
};
