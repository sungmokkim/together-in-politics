import {
  RESET_CURRENT_DATE,
  CHANGE_CURRENT_DATE,
  CHANGE_ACTIVE,
  RESET_CURRENT_RANGE,
  FETCH_LATEST_DATE
} from '../actions/actions';

import { communityOptions, communityDefault } from '../options/communities';
import {
  mentionPortionOptions,
  mentionPortionDefault
} from '../options/mentionPortion';
import {
  bubblePeriodDefault,
  bubblePeriodOptions
} from '../options/bubblePeriod';
import {
  rankingSortingDefault,
  rankingSortingOptions
} from '../options/rankingSorting';

const initialState = {
  active: {
    community: communityDefault,
    indicator: 'anti_ratio',
    range: {
      index: '6m',
      korean: '6개월(월간)',
      koreanShort: '6개월',
      duration: 'months',
      number: 6,
      split: 7
    },
    barPeriod: {
      korean: '월간',
      koreanShort: '월간',
      index: 'months'
    },
    bubblePeriod: bubblePeriodDefault,
    chart: { korean: '기간별 혐오 발언', koreanShort: '혐오', index: 'bar' },
    keywordPeriod: {
      korean: '최근 6개월 키워드',
      koreanShort: '6개월',
      index: '6m',
      type: 'month',
      value: 6,
      limit: 30,
      splitRange: [10, 30],
      defaultSplitRange: 30
    },
    mentionPortion: mentionPortionDefault,
    rankingSorting: rankingSortingDefault
  },

  barPeriodOptions: {
    years: {
      korean: '연간',
      koreanShort: '연간',
      index: 'years'
    },
    months: {
      korean: '월간',
      koreanShort: '월간',
      index: 'months'
    },
    weeks: {
      korean: '주간',
      koreanShort: '주간',
      index: 'weeks'
    }
  },
  rankingSortingOptions: rankingSortingOptions,
  mentionPortionOptions: mentionPortionOptions,

  bubblePeriodOptions: bubblePeriodOptions,

  keywordPeriodOptions: {
    total: {
      korean: '전체 기간 키워드',
      koreanShort: '전체',
      index: 'total',
      type: 'total',
      value: 0,
      limit: 100,
      splitRange: [10, 30, 50, 100],
      defaultSplitRange: 50
    },

    '1y': {
      korean: '최근 1년 키워드',
      koreanShort: '1년',
      index: '1y',
      type: 'year',
      value: 1,
      limit: 50,
      splitRange: [10, 30, 50],
      defaultSplitRange: 50
    },
    '6m': {
      korean: '최근 6개월 키워드',
      koreanShort: '6개월',
      index: '6m',
      type: 'month',
      value: 6,
      limit: 30,
      splitRange: [10, 30],
      defaultSplitRange: 30
    },
    '1m': {
      korean: '최근 1개월 키워드',
      koreanShort: '1개월',
      index: '1m',
      type: 'month',
      value: 1,
      limit: 10,
      splitRange: [],
      defaultSplitRange: 10
    },
    '1w': {
      korean: '최근 1주 키워드',
      koreanShort: '1주',
      index: '1w',
      type: 'day',
      value: 6,
      limit: 7,
      splitRange: [],
      defaultSplitRange: 7
    }
  },

  rangeOptions: {
    total: {
      index: 'total',
      korean: '전체',
      koreanShort: '전체',
      duration: 'total',
      number: 0,
      split: 7
    },
    '2y': {
      index: '2y',
      korean: '2년(월간)',
      koreanShort: '2년',
      duration: 'years',
      number: 2,
      split: 7
    },
    '1y': {
      index: '1y',
      korean: '1년(월간)',
      koreanShort: '1년',
      duration: 'years',
      number: 1,
      split: 7
    },
    '6m': {
      index: '6m',
      korean: '6개월(월간)',
      koreanShort: '6개월',
      duration: 'months',
      number: 6,
      split: 7
    }
  },

  currentDate: {
    year: '2019',
    month: '03',
    date: '06'
  },

  latestDate: {
    year: null,
    month: null,
    date: null
  },

  communities: communityOptions,

  dashboardIndicatorsName: {
    anti_ratio: { korean: '적극 거부율', koreanShort: '거부율' },
    popularity: { korean: '게시판 지분율', koreanShort: '지분율' },
    femi_ratio: { korean: '여성 갈등 지수', koreanShort: '여성 지수' },
    femi_count: { korean: '여성 갈등 빈도', koreanShort: '여성 빈도' }
    // ,
    // anti_count: { korean: '대통령 혐오 발언 빈도', koreanShort: '혐오(빈도)' }
  },

  chartName: {
    bar: { korean: '기간별 혐오 발언', koreanShort: '혐오', index: 'bar' },
    line: { korean: '기간별 지표 변화', koreanShort: '지표', index: 'line' },
    bubble: {
      korean: '커뮤니티 지형도',
      koreanShort: '지형도',
      index: 'bubble'
    }
  },

  todayIndicators: {
    popularity: {
      korean: '대통령 게시판 지분율',
      index: 'popularity',
      statusValues: [60, 40, 20, 10],
      statusNames: {
        korean: [
          '지분율 매우 높음',
          '지분율 높음',
          '지분율 보통',
          '지분율 낮음',
          '지분율 매우 낮음'
        ]
      },
      statusMarks: [
        'status-very-good',
        'status-good',
        'status-okay',
        'status-bad',
        'status-very-bad'
      ]
    },
    anti_ratio: {
      korean: '대통령 적극 거부율 ',
      index: 'anti_ratio',
      statusValues: [60, 40, 20, 10],
      statusNames: {
        korean: [
          '거부율 매우 높음',
          '거부율 높음',
          '거부율 보통',
          '거부율 낮음',
          '거부율 매우 낮음'
        ]
      },

      statusMarks: [
        'status-very-bad',
        'status-bad',
        'status-okay',
        'status-good',
        'status-very-good'
      ],
      facialExpressions: [
        'far fa-angry',
        'far fa-frown',
        'far fa-meh',
        'far fa-smile',
        'far fa-laugh'
      ]
    },
    anti_popularity: {
      korean: '대통령 혐오 지분율 ',
      index: 'anti_popularity',
      statusValues: [20, 15, 10, 5],
      statusNames: {
        korean: [
          '지분율 매우 높음',
          '지분율 높음',
          '지분율 보통',
          '지분율 낮음',
          '지분율 매우 낮음'
        ]
      },

      statusMarks: [
        'status-very-bad',
        'status-bad',
        'status-okay',
        'status-good',
        'status-very-good'
      ],
      facialExpressions: [
        'far fa-angry',
        'far fa-frown',
        'far fa-meh',
        'far fa-smile',
        'far fa-laugh'
      ]
    },

    femi_ratio: {
      korean: '여성 갈등 지수',
      index: 'femi_ratio',
      statusValues: [20, 15, 10, 5],
      statusNames: {
        korean: [
          '갈등 매우 높음',
          '갈등 비교적 높음',
          '갈등 보통',
          '갈등 비교적 낮음',
          '갈등 매우 낮음'
        ]
      },
      statusMarks: [
        'status-very-bad',
        'status-bad',
        'status-okay',
        'status-good',
        'status-very-good'
      ]
    },
    word1: '게시판 최빈 단어'
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LATEST_DATE:
      return {
        ...state,
        latestDate: {
          year: action.payload.year,
          month: action.payload.month,
          date: action.payload.date
        },
        currentDate: {
          year: action.payload.year,
          month: action.payload.month,
          date: action.payload.date
        }
      };

    case CHANGE_ACTIVE:
      return {
        ...state,
        active: {
          ...state.active,
          [action.key]: action.value
        }
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
            label: '3개월'
          }
        }
      };
    case RESET_CURRENT_DATE:
      return {
        ...state,
        currentDate: {
          year: '2019',
          month: '01',
          date: '06'
        }
      };
    case CHANGE_CURRENT_DATE:
      return {
        ...state,
        currentDate: {
          year: action.payload.year,
          month: action.payload.month,
          date: action.payload.date
        }
      };

    default:
      return state;
  }
};
