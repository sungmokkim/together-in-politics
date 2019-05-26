import { FETCHED_FROM_SERVER } from '../actions/actions';

const initialState = {
  isFromServer: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_FROM_SERVER:
      return {
        ...state,
        fetchedFromServer: action.payload
      };
    default:
      return state;
  }
};
