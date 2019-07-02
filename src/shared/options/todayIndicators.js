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
      'status-very-high',
      'status-high',
      'status-mid',
      'status-low',
      'status-very-low'
    ]
  },

  problem_ratio: {
    korean: '반발 지수',
    index: 'problem_ratio',
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
};
