export const bubblePeriodOptions = {
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
};

export const bubblePeriodDefault =
  bubblePeriodOptions[Object.keys(bubblePeriodOptions)[4]];
