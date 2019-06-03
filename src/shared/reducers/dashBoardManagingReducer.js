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
    }
  },
  period: [
    { display: '1년차' },
    { display: '2년차' },
    { display: '3년차' },
    { display: '4년차' },
    { display: '5년차' }
  ],
  // rangeOptions: [
  //   {
  //     label: '2년',
  //     value: '2년',
  //     duration: 'years',
  //     number: 2,
  //     split: 7
  //   },
  //   {
  //     label: '1년',
  //     value: '1년',
  //     duration: 'years',
  //     number: 1,
  //     split: 7
  //   },
  //   {
  //     label: '6개월',
  //     value: '6개월',
  //     duration: 'months',
  //     number: 6,
  //     split: 7
  //   },
  //   {
  //     label: '3개월',
  //     value: '3개월',
  //     duration: 'months',
  //     number: 3,
  //     split: 10
  //   },
  //   {
  //     label: '1개월',
  //     value: '1개월',
  //     duration: 'months',
  //     number: 1,
  //     split: 10
  //   },
  //   { label: '7일', value: '7일', duration: 'days', number: 7, split: 10 }
  // ],

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
    },
    '7d': {
      index: '7d',
      korean: '7일(일간)',
      koreanShort: '7일',
      duration: 'days',
      number: 7,
      split: 10
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
  // communities: {
  //   mlbpark: 'MLB파크ee',
  //   ruli: '루리웹',
  //   ilbe: '일간베스트',
  //   clien: '클리앙',
  //   cook: '82쿡',
  //   ygosu: '와이고수'
  // },
  communities: {
    mlbpark: { korean: 'MLB파크', koreanShort: '엠' },
    ruli: { korean: '루리웹', koreanShort: '루' },
    ilbe: { korean: '일간베스트', koreanShort: '일' },
    clien: { korean: '클리앙', koreanShort: '클' },
    cook: { korean: '82쿡', koreanShort: '쿡' },
    ygosu: { korean: '와이고수', koreanShort: '와' }
  },

  dashboardIndicators: {
    '민심 지수': 'anti_ratio',
    '관심 지수': 'popularity',
    '민심 랭킹': 'real_rank'
  },
  // dashboardIndicatorsName: {
  //   anti_ratio: '민심 지수',
  //   popularity: '관심 지수',
  //   real_rank: '민심 랭킹'
  // },
  dashboardIndicatorsName: {
    anti_ratio: { korean: '민심 지수', koreanShort: '민심' },
    popularity: { korean: '관심 지수', koreanShort: '관심' },
    real_rank: { korean: '민심 랭킹', koreanShort: '랭킹' }
  },

  todayIndicators: {
    popularity: '오늘의 관심도',
    anti_ratio: '오늘의 민심',
    word1: '오늘의 단어'
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
