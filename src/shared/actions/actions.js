import axios from 'axios';
import dateAndTime from 'date-and-time';

const clientFetchingReference = 'togetherinpolitics.com';

export const FETCH_EXAMPLE = 'FETCH_EXAMPLE';
export const fetchExample = () => async dispatch => {
  const res = await axios.get(`http://${clientFetchingReference}:5000/api/`);

  dispatch({
    type: FETCH_EXAMPLE,
    payload: res.data
  });
};

export const FETCH_DATA = 'FETCH_DATA';
export const fetchData = () => async dispatch => {
  const res = await axios.get(
    `http://${clientFetchingReference}:5000/api/mysql`
  );

  dispatch({
    type: FETCH_DATA,
    payload: res.data
  });
};

export const FETCH_LATEST_DATE = 'FETCH_LATEST_DATE';
export const fetchLatestDate = () => async dispatch => {
  const res = await axios.get(
    `http://${clientFetchingReference}:5000/api/latest_date`
  );

  const latestDateParsed = dateAndTime.parse(
    res.data[0].date,
    'YYYY-MM-DD',
    true
  );

  const latestYear = dateAndTime.format(latestDateParsed, 'YYYY', true);
  const latestMonth = dateAndTime.format(latestDateParsed, 'MM', true);
  const latestDate = dateAndTime.format(latestDateParsed, 'DD', true);

  dispatch({
    type: FETCH_LATEST_DATE,
    payload: { year: latestYear, month: latestMonth, date: latestDate }
  });

  return { year: latestYear, month: latestMonth, date: latestDate };
};

export const FETCH_TODAY_RANKINGS = 'FETCH_TODAY_RANKINGS';
export const fetchTodayRankings = (
  year,
  month,
  date,
  get_latest = false
) => async dispatch => {
  const res = await axios.post(
    `http://${clientFetchingReference}:5000/api/ranking`,
    {
      year,
      month,
      date,
      get_latest
    }
  );

  dispatch({
    type: FETCH_TODAY_RANKINGS,
    payload: res.data
  });
};

export const FETCH_TODAY_INDICATORS = 'FETCH_TODAY_INDICATORS';
export const fetchTodayIndicators = (
  year,
  month,
  date,
  getLatest = false
) => async dispatch => {
  const res = await axios.post(
    `http://${clientFetchingReference}:5000/api/today_indicator`,
    {
      year,
      month,
      date,
      get_latest: getLatest
    }
  );

  dispatch({
    type: FETCH_TODAY_INDICATORS,
    payload: res.data
  });
};

export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';
export const fetchDashboardData = ({
  community,
  indicator,
  range
}) => async dispatch => {
  const res = await axios.post(
    `http://${clientFetchingReference}:5000/api/dashboard_data`,
    {
      community,
      indicator,
      range
    }
  );

  dispatch({
    type: FETCH_DASHBOARD_DATA,
    payload: res.data
  });
};

export const FETCHED_FROM_SERVER = 'FETCHED_FROM_SERVER';
export const fetchedFromServer = () => async dispatch => {
  dispatch({
    type: FETCHED_FROM_SERVER,
    payload: true
  });
};

export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
export const changeActive = (key, value, callback) => async dispatch => {
  await dispatch({
    type: CHANGE_ACTIVE,
    key,
    value
  });

  callback ? callback() : null;
};

export const CHANGE_CURRENT_DATE = 'CHANGE_CURRENT_DATE';
export const changeCurrentDate = (
  year,
  month,
  date,
  callback
) => async dispatch => {
  await dispatch({
    type: CHANGE_CURRENT_DATE,
    payload: { year, month, date }
  });

  callback ? callback() : null;
};

export const RESET_CURRENT_DATE = 'RESET_CURRENT_DATE';
export const resetCurrentDate = callback => async dispatch => {
  await dispatch({
    type: RESET_CURRENT_DATE
  });

  callback ? callback() : null;
};

export const RESET_CURRENT_RANGE = 'RESET_CURRENT_RANGE';
export const resetCurrentRange = callback => async dispatch => {
  await dispatch({
    type: RESET_CURRENT_RANGE
  });

  callback ? callback() : null;
};
