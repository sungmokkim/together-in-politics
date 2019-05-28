import {
  RESET_CURRENT_DATE,
  CHANGE_CURRENT_DATE,
  CHANGE_ACTIVE,
  RESET_CURRENT_RANGE,
  FETCH_LATEST_DATE
} from '../actions/actions';

const initialState = {
  active: {
    community: 'mlbpark',
    indicator: 'anti_ratio',
    range: {
      label: '1년',
      value: '1년',
      duration: 'years',
      number: 1,
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
  rangeOptions: [
    {
      label: '2년',
      value: '2년',
      duration: 'years',
      number: 2,
      split: 7
    },
    {
      label: '1년',
      value: '1년',
      duration: 'years',
      number: 1,
      split: 7
    },
    {
      label: '6개월',
      value: '6개월',
      duration: 'months',
      number: 6,
      split: 7
    },
    {
      label: '3개월',
      value: '3개월',
      duration: 'months',
      number: 3,
      split: 10
    },
    {
      label: '1개월',
      value: '1개월',
      duration: 'months',
      number: 1,
      split: 10
    },
    { label: '7일', value: '7일', duration: 'days', number: 7, split: 10 }
  ],

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
    mlbpark: 'MLB파크',
    ruli: '루리웹',
    ilbe: '일간베스트',
    clien: '클리앙',
    cook: '82cook',
    ygosu: '와이고수'
  },

  dashboardIndicators: {
    '민심 지수': 'anti_ratio',
    '관심 지수': 'popularity',
    '민심 랭킹': 'real_rank'
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
