export const todayIndicators = {
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
      'popularity-status-1',
      'popularity-status-2',
      'popularity-status-3',
      'popularity-status-4',
      'popularity-status-5'
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
      'anti-status-1',
      'anti-status-2',
      'anti-status-3',
      'anti-status-4',
      'anti-status-5'
    ],
    facialExpressions: [
      'far fa-angry',
      'far fa-frown-open',
      'far fa-frown',
      'far fa-meh',
      'far fa-smile'
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
      'far fa-frown-open',
      'far fa-frown',
      'far fa-meh',
      'far fa-smile'
    ]
  },

  femi_ratio: {
    korean: '페미 이슈 지수',
    index: 'femi_ratio',
    statusValues: [20, 15, 10, 5],
    statusNames: {
      korean: [
        '이슈 매우 높음',
        '이슈 비교적 높음',
        '이슈 보통',
        '이슈 비교적 낮음',
        '이슈 매우 낮음'
      ]
    },
    statusMarks: [
      'femi-status-1',
      'femi-status-2',
      'femi-status-3',
      'femi-status-4',
      'femi-status-5'
    ]
  },

  problem_ratio: {
    korean: '시니컬 지수',
    index: 'problem_ratio',
    statusValues: [20, 15, 10, 5],
    statusNames: {
      korean: [
        '시니컬 매우 높음',
        '시니컬 비교적 높음',
        '시니컬 보통',
        '시니컬 비교적 낮음',
        '시니컬 매우 낮음'
      ]
    },
    statusMarks: [
      'problem-status-1',
      'problem-status-2',
      'problem-status-3',
      'problem-status-4',
      'problem-status-5'
    ]
  },
  word1: '게시판 최빈 단어'
};
