import { FETCH_EXAMPLE } from '../actions/actions';

const initalState = {
  test: 'thisisthest',
  results: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_EXAMPLE:
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
};
