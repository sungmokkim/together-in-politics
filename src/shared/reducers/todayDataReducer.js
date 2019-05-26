import {
  FETCH_DATA,
  FETCH_TODAY_INDICATORS,
  FETCH_TODAY_RANKINGS
} from '../actions/actions';

const initalState = {
  data: [],
  indicators: [],
  rankings: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload
      };
    case FETCH_TODAY_INDICATORS:
      return {
        ...state,
        indicators: action.payload
      };

    case FETCH_TODAY_RANKINGS:
      return {
        ...state,
        rankings: action.payload
      };
    default:
      return state;
  }
};
