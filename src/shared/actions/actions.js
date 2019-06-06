import axios from 'axios';
import dateAndTime from 'date-and-time';
import { clientFetchingReference } from '../clientEnv';

export const FETCH_LATEST_DATE = 'FETCH_LATEST_DATE';
export const fetchLatestDate = () => async dispatch => {
  const res = await axios.get(
    `https://${clientFetchingReference}/api/latest_date`
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
    `https://${clientFetchingReference}/api/ranking`,
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
  getLatest = false,
  community = null
) => async dispatch => {
  const res = await axios.post(
    `https://${clientFetchingReference}/api/today_indicator`,
    {
      year,
      month,
      date,
      get_latest: getLatest,
      community
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
    `https://${clientFetchingReference}/api/dashboard_data`,
    {
      community,
      indicator,
      range
    }
  );

  const editedData = res.data.map(dt => {
    return {
      ...dt,
      real_rank: dt['total_community'] - dt['rank'] + 1
    };
  });

  dispatch({
    type: FETCH_DASHBOARD_DATA,
    payload: editedData
  });

  return editedData;
};

export const FETCH_PERIOD_DATA = 'FETCH_PERIOD_DATA';
export const fetchPeriodData = community => async dispatch => {
  const res = await axios.post(
    `https://${clientFetchingReference}/api/period_data`,
    { community }
  );

  dispatch({
    type: FETCH_PERIOD_DATA,
    payload: res.data
  });

  return res.data;
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

  return {
    year,
    month,
    date
  };
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

export const INSERT_IN_FREEBOARD = 'INSERT_IN_FREEBOARD';
export const insertInFreeboard = ({
  text,
  userName,
  password
}) => async dispatch => {
  const res = await axios.post(
    `https://${clientFetchingReference}/api/insert_freeboard`,
    {
      text,
      userName,
      password
    }
  );

  dispatch({
    type: INSERT_IN_FREEBOARD,
    payload: res.data
  });

  return res.data;
};

export const UPDATE_NEW_COMMENT = 'UPDATE_NEW_COMMENT';
export const updateNewComment = ({
  inputId,
  comment,
  userName,
  password
}) => async dispatch => {
  const res = await axios.post(
    `https://${clientFetchingReference}/api/new_comment`,
    {
      inputId,
      comment,
      userName,
      password
    }
  );

  dispatch({
    type: UPDATE_NEW_COMMENT,
    payload: res.data
  });

  return res.data;
};

export const FETCH_FREEBOARD = 'FETCH_FREEBOARD';
export const fetchFreeboard = () => async dispatch => {
  const res = await axios.get(
    `https://${clientFetchingReference}/api/freeboard`
  );

  const editedData = res.data.map(dt => {
    const ipArray = dt.ip.split('.');
    ipArray.splice(-2, 2, '*', '*');
    const newIp = ipArray.join('.');

    return {
      ...dt,
      ip: dt.admin ? 'together.in.politics.com' : newIp
    };
  });

  dispatch({
    type: FETCH_FREEBOARD,
    payload: editedData
  });

  return editedData;
};

export const FETCH_HOT_POSTS = 'FETCH_HOT_POSTS';
export const fetchHotPosts = () => async dispatch => {
  const res = await axios.get(
    `https://${clientFetchingReference}/api/hot_posts`
  );

  const editedData = res.data.map(dt => {
    const ipArray = dt.ip.split('.');
    ipArray.splice(-2, 2, '*', '*');
    const newIp = ipArray.join('.');

    return {
      ...dt,
      ip: dt.admin ? 'together.in.politics.com' : newIp
    };
  });

  dispatch({
    type: FETCH_HOT_POSTS,
    payload: editedData
  });

  return editedData;
};

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const fetchComments = postId => async dispatch => {
  const res = await axios.post(
    `https://${clientFetchingReference}/api/comments`,
    {
      postId
    }
  );

  const editedData = res.data[0].comments.map(comment => {
    const ipArray = comment.ip.split('.');
    ipArray.splice(-2, 2, '*', '*');
    const newIp = ipArray.join('.');

    return {
      ...comment,
      ip: comment.admin ? 'together.in.politics.com' : newIp
    };
  });

  dispatch({
    type: FETCH_COMMENTS,
    payload: editedData
  });

  return editedData;
};
