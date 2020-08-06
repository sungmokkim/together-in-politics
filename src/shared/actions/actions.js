import axios from 'axios';
import { clientFetchingReference, protocol } from '../clientEnv';

console.log(clientFetchingReference);
// FETCH ----------------------------------------------------------------------------
export const FETCH_LATEST_DATE = 'FETCH_LATEST_DATE';
export const fetchLatestDate = () => async (dispatch) => {
  const res = await axios.get(
    `${protocol}://${clientFetchingReference}/api/info/latest-date`,
  );

  const latestDateArray = res.data[0].dates.split('-');

  const latestYear = latestDateArray[0];
  const latestMonth = latestDateArray[1];
  const latestDate = latestDateArray[2];

  dispatch({
    type: FETCH_LATEST_DATE,
    payload: { year: latestYear, month: latestMonth, date: latestDate },
  });

  return { year: latestYear, month: latestMonth, date: latestDate };
};

export const FETCH_MAX_VALUES = 'FETCH_MAX_VALUES';
export const fetchMaxValues = (active, communities) => async (dispatch) => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/info/max-values`,
    { active, communities },
  );

  dispatch({
    type: FETCH_MAX_VALUES,
    payload: res.data,
  });
};

export const FETCH_TODAY_RANKINGS = 'FETCH_TODAY_RANKINGS';
export const fetchTodayRankings = (
  year,
  month,
  date,
  get_latest = false,
) => async (dispatch) => {
  const res = await axios.get(
    `${protocol}://${clientFetchingReference}/api/info/ranking`,
    {
      params: {
        year,
        month,
        date,
        get_latest,
      },
    },
  );

  dispatch({
    type: FETCH_TODAY_RANKINGS,
    payload: res.data,
  });

  return res.data; // return data for other actions
};

export const FETCH_TODAY_INDICATORS = 'FETCH_TODAY_INDICATORS';
export const fetchTodayIndicators = (
  year,
  month,
  date,
  getLatest = false,
  active,
) => async (dispatch) => {
  // destruct the current obj(active)
  const {
    index,
  } = active.community;

  const res = await axios.get(
    `${protocol}://${clientFetchingReference}/api/info/today-indicator`,
    {
      params: {
        year,
        month,
        date,
        get_latest: getLatest,
        community: index,
      },
    },
  );

  dispatch({
    type: FETCH_TODAY_INDICATORS,
    payload: res.data,
  });
};

//      ***********DASHBOARD
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';
export const fetchDashboardData = (
  {
    community, range, mentionPortion, indicator,
  },
  latestDate,
) => async (dispatch) => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/info/dashboard-data`,
    {
      community,
      mentionPortion,
      indicator,
      range,
      latestDate,
    },
  );

  const editedData = (res.data || []).map((dt) => ({
    ...dt,
    real_rank: dt.total_community - dt.rank + 1,
  }));

  dispatch({
    type: FETCH_DASHBOARD_DATA,
    payload: editedData,
  });

  return editedData;
};

export const FETCH_PERIOD_DATA = 'FETCH_PERIOD_DATA';
export const fetchPeriodData = ({ community, barPeriod }) => async (dispatch) => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/period_data`,
    { community: community.index, period: barPeriod },
  );

  dispatch({
    type: FETCH_PERIOD_DATA,
    payload: res.data,
  });

  return res.data;
};

export const FETCH_BUBBLE_DATA = 'FETCH_BUBBLE_DATA';
export const fetchBubbleData = (
  { bubblePeriod },
  latestDate,
) => async (dispatch) => {
  const { type, value } = bubblePeriod;

  const res = await axios.get(
    `${protocol}://${clientFetchingReference}/api/info/bubble-chart-data`,
    {
      params: {
        type,
        value,
      },
    },
  );

  dispatch({
    type: FETCH_BUBBLE_DATA,
    payload: res.data,
  });

  return res.data;
};

export const FETCH_KEYWORDS = 'FETCH_KEYWORDS';
export const fetchKeywords = (
  {
    community, keywordPeriod, mentionPortion, rankingSorting,
  },
  latestDate,
) => async (dispatch) => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/info/keyword-data`,
    {
      community,
      latestDate,
      period: keywordPeriod,
      mentionPortion,
      rankingSorting,
    },
  );

  dispatch({
    type: FETCH_KEYWORDS,
    payload: res.data,
  });

  return res.data;
};

//          *********** FREEBOARD
export const FETCH_FREEBOARD = 'FETCH_FREEBOARD';
export const fetchFreeboard = (socket) => async (dispatch) => {
  const res = await axios.get(
    `${protocol}://${clientFetchingReference}/api/freeboard`,
  );

  const editedData = res.data.map((dt) => {
    const ipArray = dt.ip.split('.');
    ipArray.splice(-2, 2, '*', '*');
    const newIp = ipArray.join('.');

    return {
      ...dt,
      ip: dt.admin ? 'together.in.politics.com' : newIp,
    };
  });

  // with received socket, emit event

  socket.emit('clear-post-count');
  dispatch({
    type: FETCH_FREEBOARD,
    payload: editedData,
  });

  return editedData;
};

export const FETCH_HOT_POSTS = 'FETCH_HOT_POSTS';
export const fetchHotPosts = () => async (dispatch) => {
  const res = await axios.get(
    `${protocol}://${clientFetchingReference}/api/freeboard/hot-posts`,
  );

  const editedData = res.data.map((dt) => {
    const ipArray = dt.ip.split('.');
    ipArray.splice(-2, 2, '*', '*');
    const newIp = ipArray.join('.');

    return {
      ...dt,
      ip: dt.admin ? 'together.in.politics.com' : newIp,
    };
  });

  dispatch({
    type: FETCH_HOT_POSTS,
    payload: editedData,
  });

  return editedData;
};

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const fetchComments = (postId, socket) => async (dispatch) => {
  const res = await axios.get(`${protocol}://${clientFetchingReference}/api/freeboard/${postId}/comments`);

  const editedData = res.data[0].comments.map((comment) => {
    const ipArray = comment.ip.split('.');
    ipArray.splice(-2, 2, '*', '*');
    const newIp = ipArray.join('.');

    return {
      ...comment,
      ip: comment.admin ? 'together.in.politics.com' : newIp,
    };
  });

  dispatch({
    type: FETCH_COMMENTS,
    payload: editedData,
  });

  // emit events to socket
  socket.emit('clear-comment-count', postId);

  return editedData;
};

export const FETCHED_FROM_SERVER = 'FETCHED_FROM_SERVER';
export const fetchedFromServer = () => async (dispatch) => {
  dispatch({
    type: FETCHED_FROM_SERVER,
    payload: true,
  });
};

// CHANGE -----------------------------------------------------------
export const CHANGE_ACTIVE = 'CHANGE_ACTIVE';
export const changeActive = (key, value, callback) => async (dispatch) => {
  await dispatch({
    type: CHANGE_ACTIVE,
    key,
    value,
  });

  callback ? callback() : null;
};

export const CHANGE_CURRENT_DATE = 'CHANGE_CURRENT_DATE';
export const changeCurrentDate = (
  year,
  month,
  date,
  callback,
) => async (dispatch) => {
  await dispatch({
    type: CHANGE_CURRENT_DATE,
    payload: { year, month, date },
  });

  callback ? callback() : null;

  return {
    year,
    month,
    date,
  };
};

// RESET ------------------------------------------------------------
export const RESET_CURRENT_DATE = 'RESET_CURRENT_DATE';
export const resetCurrentDate = (callback) => async (dispatch) => {
  await dispatch({
    type: RESET_CURRENT_DATE,
  });

  callback ? callback() : null;
};

export const RESET_CURRENT_RANGE = 'RESET_CURRENT_RANGE';
export const resetCurrentRange = (callback) => async (dispatch) => {
  await dispatch({
    type: RESET_CURRENT_RANGE,
  });

  callback ? callback() : null;
};

// INSERT -------------------------------------------------------------

export const INSERT_IN_FREEBOARD = 'INSERT_IN_FREEBOARD';
export const insertInFreeboard = (
  { text, userName, password },
  socket,
) => async (dispatch) => {
  const res = await axios.post(
    `${protocol}://${clientFetchingReference}/api/freeboard`,
    {
      text,
      userName,
      password,
    },
  );

  dispatch({
    type: INSERT_IN_FREEBOARD,
    payload: res.data,
  });

  // with received socket object, emit event,
  socket.emit('new-post');

  return res.data;
};

// UPDATE----------------------------------------------------
export const UPDATE_NEW_COMMENT = 'UPDATE_NEW_COMMENT';
export const updateNewComment = (
  {
    inputId, comment, userName, password,
  },
  socket,
) => async (dispatch) => {
  const res = await axios.put(
    `${protocol}://${clientFetchingReference}/api/freeboard/${inputId}/comment`,
    {
      comment,
      userName,
      password,
    },
  );

  dispatch({
    type: UPDATE_NEW_COMMENT,
    payload: res.data,
  });

  // with received socket object, emit event,
  socket.emit('new-comment', inputId);

  return res.data;
};

// TOGGLE------------------------------

export const TOGGLE_INDICATOR = 'TOGGLE_INDICATOR';
export const toggleIndicator = (value) => async (dispatch) => {
  dispatch({
    type: TOGGLE_INDICATOR,
    payload: value,
  });
};

// CONTROL SITE COMPONENTS
export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const toggleStatus = ({
  toggleType,
  toggleComponent,
}) => async (dispatch) => {
  dispatch({
    type: TOGGLE_STATUS,
    toggleType,
    toggleComponent,
  });
};
