import { combineReducers } from 'redux';

import manageReducer from './manageReducer';
import dashBoardManagingReducer from './dashBoardManagingReducer';
import todayDataReducer from './todayDataReducer';
import dashboardDataReducer from './dashboardDataReducer';
import freeBoardManagingReducer from './freeBoardManagingReducer';

export default combineReducers({
  manage: manageReducer,

  dashboardManager: dashBoardManagingReducer,
  today: todayDataReducer,
  dashboardData: dashboardDataReducer,
  freeboard: freeBoardManagingReducer
});
