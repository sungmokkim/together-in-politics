import {
  RESET_CURRENT_DATE,
  CHANGE_CURRENT_DATE,
  CHANGE_ACTIVE,
  RESET_CURRENT_RANGE,
  FETCH_LATEST_DATE
} from '../actions/actions';

const initialState = {
  active: {
    community: 'ruli',
    indicator: 'anti_ratio',
    range: {
      index: '6m',
      korean: '6개월(월간)',
      koreanShort: '6개월',
      duration: 'months',
      number: 6,
      split: 7
    },
    period: {
      korean: '월간',
      koreanShort: '월간',
      index: 'months'
    },
    bubblePeriod: {
      korean: '최근 1개월 지형도',
      koreanShort: '1개월',
      index: '1m',
      type: 'month',
      value: 1
    },
    chart: { korean: '기간별 혐오 발언', koreanShort: '혐오', index: 'bar' }
  },
  period: [
    { display: '1년차' },
    { display: '2년차' },
    { display: '3년차' },
    { display: '4년차' },
    { display: '5년차' }
  ],

  periodOptions: {
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
  bubblePeriodOptions: {
    total: {
      korean: '전체 기간 지형도',
      koreanShort: '전체',
      index: 'total',
      type: 'total',
      value: 0
    },

    '1y': {
      korean: '최근 1년 지형도',
      koreanShort: '1년',
      index: '1y',
      type: 'year',
      value: 1
    },
    '6m': {
      korean: '최근 6개월 지형도',
      koreanShort: '6개월',
      index: '6m',
      type: 'month',
      value: 6
    },
    '3m': {
      korean: '최근 3개월 지형도',
      koreanShort: '3개월',
      index: '3m',
      type: 'month',
      value: 3
    },
    '1m': {
      korean: '최근 1개월 지형도',
      koreanShort: '1개월',
      index: '1m',
      type: 'month',
      value: 1
    }
  },
  rangeOptions: {
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
    },
    '3m': {
      index: '3m',
      korean: '3개월(일간)',
      koreanShort: '3개월',
      duration: 'months',
      number: 3,
      split: 10
    },
    '1m': {
      index: '1m',
      korean: '1개월(일간)',
      koreanShort: '1개월',
      duration: 'months',
      number: 1,
      split: 10
    }
    // ,
    // '7d': {
    //   index: '7d',
    //   korean: '7일(일간)',
    //   koreanShort: '7일',
    //   duration: 'days',
    //   number: 7,
    //   split: 10
    // }
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

  communities: {
    mlbpark: {
      korean: 'MLB파크',
      koreanShort: '엠',
      color: '#E7813C',
      weight: 0.029
    },
    ruli: {
      korean: '루리웹',
      koreanShort: '루',
      color: '#01417F',
      weight: 0.051
    },
    ilbe: {
      korean: '일간베스트',
      koreanShort: '일',
      color: '#ED1F23',
      weight: 0.014
    },
    clien: {
      korean: '클리앙',
      koreanShort: '클',
      color: '#516C83',
      weight: 0.037
    },
    cook: {
      korean: '82쿡',
      koreanShort: '쿡',
      color: '#4AA43A',
      weight: 0.036
    },
    ygosu: {
      korean: '와이고수',
      koreanShort: '와',
      color: '#86331D',
      weight: 0.045
    }
  },

  dashboardIndicators: {
    '민심 지수': 'anti_ratio',
    '관심 지수': 'popularity',
    '민심 랭킹': 'real_rank'
  },

  dashboardIndicatorsName: {
    anti_ratio: { korean: '적극 거부율', koreanShort: '거부율' },
    popularity: { korean: '게시판 지분율', koreanShort: '지분율' },
    real_rank: { korean: '랭킹 변화', koreanShort: '랭킹' }
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
      korean: '게시판 지분율',
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
      korean: '적극 거부율 ',
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
