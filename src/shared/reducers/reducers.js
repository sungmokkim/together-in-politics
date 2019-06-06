import { combineReducers } from 'redux';

import siteManagingReducer from './siteManagingReducer';
import dashBoardManagingReducer from './dashBoardManagingReducer';
import todayDataReducer from './todayDataReducer';
import dashboardDataReducer from './dashboardDataReducer';
import freeBoardManagingReducer from './freeBoardManagingReducer';

export default combineReducers({
  siteManager: siteManagingReducer,
  dashboardManager: dashBoardManagingReducer,
  today: todayDataReducer,
  dashboardData: dashboardDataReducer,
  freeboard: freeBoardManagingReducer
});
