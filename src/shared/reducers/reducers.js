import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import manageReducer from './manageReducer';
import dashBoardManagingReducer from './dashBoardManagingReducer';
import todayDataReducer from './todayDataReducer';
import dashboardDataReducer from './dashboardDataReducer';

export default combineReducers({
  manage: manageReducer,
  examples: exampleReducer,
  dashboardManager: dashBoardManagingReducer,
  today: todayDataReducer,
  dashboardData: dashboardDataReducer
});
