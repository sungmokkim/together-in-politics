import {
  RESET_CURRENT_DATE,
  CHANGE_CURRENT_DATE,
  CHANGE_ACTIVE,
  RESET_CURRENT_RANGE,
  FETCH_LATEST_DATE,
  TOGGLE_INDICATOR,
  FETCH_MAX_VALUES,
} from '../actions/actions';

import { communityOptions, communityDefault } from '../options/communities';
import {
  mentionPortionOptions,
  mentionPortionDefault,
} from '../options/mentionPortion';
import {
  bubblePeriodDefault,
  bubblePeriodOptions,
} from '../options/bubblePeriod';
import {
  rankingSortingDefault,
  rankingSortingOptions,
} from '../options/rankingSorting';
import {
  indicatorOptionDefault,
  indicatorOptions,
} from '../options/indicatorOptions';
import { lineChartIndicatorOptions } from '../options/lineChartIndicator';
import { todayIndicators } from '../options/todayIndicators';
import { descriptionOptions } from '../options/description';

const initialState = {
  active: {
    community: communityDefault,
    indicator: 'anti_ratio',
    range: {
      index: '1y',
      korean: '1년(월간)',
      koreanShort: '1년',
      duration: 'years',
      number: 1,
      split: 7,
    },
    barPeriod: {
      korean: '월간',
      koreanShort: '월간',
      index: 'months',
    },
    bubblePeriod: bubblePeriodDefault,
    chart: { korean: '기간별 지표 변화', koreanShort: '지표', index: 'line' },
    keywordPeriod: {
      korean: '최근 6개월 키워드',
      koreanShort: '6개월',
      index: '6m',
      type: 'month',
      value: 6,
      limit: 30,
      splitRange: [10, 30],
      defaultSplitRange: 30,
    },
    mentionPortion: mentionPortionDefault,
    rankingSorting: rankingSortingDefault,
    indicatorOption: indicatorOptionDefault,
  },

  barPeriodOptions: {
    years: {
      korean: '연간',
      koreanShort: '연간',
      index: 'years',
    },
    months: {
      korean: '월간',
      koreanShort: '월간',
      index: 'months',
    },
    weeks: {
      korean: '주간',
      koreanShort: '주간',
      index: 'weeks',
    },
  },
  rankingSortingOptions,
  mentionPortionOptions,

  bubblePeriodOptions,

  keywordPeriodOptions: {
    total: {
      korean: '전체 기간 키워드',
      koreanShort: '전체',
      index: 'total',
      type: 'total',
      value: 0,
      limit: 100,
      splitRange: [10, 30, 50, 100],
      defaultSplitRange: 50,
    },

    '1y': {
      korean: '최근 1년 키워드',
      koreanShort: '1년',
      index: '1y',
      type: 'year',
      value: 1,
      limit: 50,
      splitRange: [10, 30, 50],
      defaultSplitRange: 50,
    },
    '6m': {
      korean: '최근 6개월 키워드',
      koreanShort: '6개월',
      index: '6m',
      type: 'month',
      value: 6,
      limit: 30,
      splitRange: [10, 30],
      defaultSplitRange: 30,
    },
    '1m': {
      korean: '최근 1개월 키워드',
      koreanShort: '1개월',
      index: '1m',
      type: 'month',
      value: 1,
      limit: 10,
      splitRange: [],
      defaultSplitRange: 10,
    },
    '1w': {
      korean: '최근 1주 키워드',
      koreanShort: '1주',
      index: '1w',
      type: 'day',
      value: 6,
      limit: 7,
      splitRange: [],
      defaultSplitRange: 7,
    },
  },

  lineChartIndicatorOptions,

  rangeOptions: {
    total: {
      index: 'total',
      korean: '전체',
      koreanShort: '전체',
      duration: 'total',
      number: 0,
      split: 7,
    },
    '2y': {
      index: '2y',
      korean: '2년(월간)',
      koreanShort: '2년',
      duration: 'years',
      number: 2,
      split: 7,
    },
    '1y': {
      index: '1y',
      korean: '1년(월간)',
      koreanShort: '1년',
      duration: 'years',
      number: 1,
      split: 7,
    },
    '6m': {
      index: '6m',
      korean: '6개월(월간)',
      koreanShort: '6개월',
      duration: 'months',
      number: 6,
      split: 7,
    },
  },

  currentDate: {
    year: '2019',
    month: '03',
    date: '06',
  },

  latestDate: {
    year: null,
    month: null,
    date: null,
  },

  communities: communityOptions,

  dashboardIndicatorsName: {
    anti_ratio: { korean: '적극 거부율', koreanShort: '거부' },
    popularity: { korean: '대통령 지분율', koreanShort: '지분' },
    femi_ratio: { korean: '페미 이슈 지수', koreanShort: '페미' },
  },

  chartName: {
    line: { korean: '기간별 지표 변화', koreanShort: '지표', index: 'line' },
    bubble: {
      korean: '커뮤니티 지형도',
      koreanShort: '지형도',
      index: 'bubble',
    },
  },

  todayIndicators,

  maxValues: {},

  indicatorOptions,
  descriptionOptions,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LATEST_DATE:
      return {
        ...state,
        latestDate: {
          year: action.payload.year,
          month: action.payload.month,
          date: action.payload.date,
        },
        currentDate: {
          year: action.payload.year,
          month: action.payload.month,
          date: action.payload.date,
        },
      };

    case FETCH_MAX_VALUES:
      return {
        ...state,
        maxValues: action.payload.reduce((acc, val) => {
          acc[val.name] = val;
          return acc;
        }, {}),
      };

    case CHANGE_ACTIVE:
      return {
        ...state,
        active: {
          ...state.active,
          [action.key]: action.value,
        },
      };

    case RESET_CURRENT_RANGE:
      return {
        ...state,
        active: {
          ...state.active,
          range: {
            value: '3개월',
            duration: 'months',
            number: 3,
            label: '3개월',
          },
        },
      };
    case RESET_CURRENT_DATE:
      return {
        ...state,
        currentDate: {
          year: '2019',
          month: '01',
          date: '06',
        },
      };
    case CHANGE_CURRENT_DATE:
      return {
        ...state,
        currentDate: {
          year: action.payload.year,
          month: action.payload.month,
          date: action.payload.date,
        },
      };
    case TOGGLE_INDICATOR:
      return {
        ...state,
        lineChartIndicatorOptions: {
          ...state.lineChartIndicatorOptions,
          [action.payload.index]: action.payload,
        },
      };
    default:
      return state;
  }
};
