import {
  RESET_CURRENT_DATE,
  CHANGE_CURRENT_DATE,
  CHANGE_ACTIVE,
  RESET_CURRENT_RANGE,
  FETCH_LATEST_DATE
} from '../actions/actions';
import dateAndTime from 'date-and-time';

const initialState = {
  activeCommunity: 'ilbe',
  activeIndicator: '관심 지수',
  active: {
    community: 'ilbe',
    indicator: 'popularity',
    range: { value: '3개월', duration: 'months', number: 3, label: '3개월' }
  },

  rangeOptions: [
    { label: '2년', value: '2년', duration: 'years', number: 2 },
    { label: '1년', value: '1년', duration: 'years', number: 1 },
    { label: '6개월', value: '6개월', duration: 'months', number: 6 },
    { label: '3개월', value: '3개월', duration: 'months', number: 3 },
    { label: '1개월', value: '1개월', duration: 'months', number: 1 },
    { label: '7일', value: '7일', duration: 'days', number: 7 }
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
  indicatorList: ['관심 지수', '민심 지수', '최빈 단어'],
  dashboardIndicators: {
    '관심 지수': 'popularity',
    '민심 지수': 'anti_ratio',
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
