import axios from 'axios';
import dateAndTime from 'date-and-time';
import { clientFetchingReference, protocol } from '../clientEnv';

// FETCH ----------------------------------------------------------------------------
export const FETCH_LATEST_DATE = 'FETCH_LATEST_DATE';
export const fetchLatestDate = () => async dispatch => {
  const res = await axios.get(
    `${protocol}://${clientFetchingReference}/api/latest_date`
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
    `${protocol}://${clientFetchingReference}/api/ranking`,
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
  community = null,
  weight = 1
) => async dispatch => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/today_indicator`,
    {
      year,
      month,
      date,
      get_latest: getLatest,
      community,
      weight
    }
  );

  dispatch({
    type: FETCH_TODAY_INDICATORS,
    payload: res.data
  });
};

//      ***********DASHBOARD
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';
export const fetchDashboardData = (
  { community, indicator, range },
  weight = 1
) => async dispatch => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/dashboard_data`,
    {
      community,
      indicator,
      range,
      weight
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
export const fetchPeriodData = ({ community, period }) => async dispatch => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/period_data`,
    { community, period }
  );

  dispatch({
    type: FETCH_PERIOD_DATA,
    payload: res.data
  });

  return res.data;
};

export const FETCH_BUBBLE_DATA = 'FETCH_BUBBLE_DATA';
export const fetchBubbleData = (
  { bubblePeriod },
  latestDate
) => async dispatch => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/bubble_data`,
    { latestDate: latestDate, period: bubblePeriod }
  );

  dispatch({
    type: FETCH_BUBBLE_DATA,
    payload: res.data
  });

  return res.data;
};

export const FETCH_FREEBOARD = 'FETCH_FREEBOARD';
export const fetchFreeboard = () => async dispatch => {
  const res = await axios.get(
    `${protocol}://${clientFetchingReference}/api/freeboard`
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
    `${protocol}://${clientFetchingReference}/api/hot_posts`
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

//          *********** FREEBOARD
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const fetchComments = postId => async dispatch => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/comments`,
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

export const FETCHED_FROM_SERVER = 'FETCHED_FROM_SERVER';
export const fetchedFromServer = () => async dispatch => {
  dispatch({
    type: FETCHED_FROM_SERVER,
    payload: true
  });
};

// CHANGE -----------------------------------------------------------
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

// RESET ------------------------------------------------------------
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

//INSERT -------------------------------------------------------------

export const INSERT_IN_FREEBOARD = 'INSERT_IN_FREEBOARD';
export const insertInFreeboard = ({
  text,
  userName,
  password
}) => async dispatch => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/insert_freeboard`,
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

// UPDATE----------------------------------------------------
export const UPDATE_NEW_COMMENT = 'UPDATE_NEW_COMMENT';
export const updateNewComment = ({
  inputId,
  comment,
  userName,
  password
}) => async dispatch => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/new_comment`,
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
