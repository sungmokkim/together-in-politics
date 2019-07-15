export const descriptionOptions = {
  anti_ratio: {
    index: 'anti_ratio',
    name: '대통령 적극 거부율',
    icon: 'far fa-angry',
    colorClassName: 'anti-status-3',
    desc: {
      korean: '대통령 전체 여론 중 극단적인 부정 여론의 비율입니다.'
    }
  },
  popularity: {
    index: 'popularity',
    name: '대통령 게시판 지분율',
    colorClassName: 'popularity-status-3',
    icon: 'fas fa-users',
    desc: {
      korean: '커뮤니티 게시글 중 대통령과 관련된 글의 비율입니다.'
    }
  },
  femi_ratio: {
    index: 'femi_ratio',
    name: '페미 이슈 지수',
    icon: 'fas fa-venus-mars',
    colorClassName: 'femi-status-3',
    desc: {
      korean: '커뮤니티 게시글 중 페미 이슈과 관련된 글의 비율입니다.'
    }
  },
  problem_ratio: {
    index: 'problem_ratio',
    name: '시니컬 지수',
    icon: 'fas fa-exclamation',
    colorClassName: 'problem-status-3',
    desc: {
      korean: '커뮤니티 게시글 중 문제를 제기하는 글의 비율입니다.'
    }
  },
  indicatorOptions: {
    index: 'indicatorOptions',
    name: '상대적 지수/절대적 지수',
    icon: 'fas fa-tachometer-alt',
    colorClassName: 'normal-status',
    desc: {
      korean:
        '상대적 지수는 해당 게시판 내 가장 이슈가 되었던 날을 기준으로 계산한 지수입니다. 절대적 지수는 모든 게시판에 동일하게 적용된 지수입니다.'
    }
  },
  mentionPortion: {
    index: 'mentionPortion',
    name: '필터링',
    icon: 'fas fa-filter',
    colorClassName: 'normal-status',
    desc: {
      korean:
        '필터링은 모든 지수가 비율을 기준으로 계산되기 때문에 적은 샘플이 과대 대표되는 오류를 방지할 수 있도록 샘플의 수를 사용자가 조절할 수 있는 기능입니다. 해당 필터링 기준에 부합하지 않는 지수는 회색으로 표시됩니다. 결론적으로 이슈가 적었던 글은 회색으로 표시됩니다.'
    }
  }
};
