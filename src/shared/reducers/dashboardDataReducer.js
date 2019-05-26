import { FETCH_DASHBOARD_DATA } from '../actions/actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_DATA:
      const editedData = action.payload.map(dt => {
        return {
          ...dt,
          real_rank: dt['total_community'] - dt['rank'] + 1
        };
      });
      return editedData;
    default:
      return state;
  }
};
