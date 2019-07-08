export const rankingSortingOptions = {
  anti_ratio: {
    korean: '적극 거부율 순 랭킹',
    koreanShort: '거부',
    index: 'anti_ratio'
  },
  popularity: {
    korean: '대통령 지분율 순 랭킹',
    koreanShort: '지분',
    index: 'popularity'
  },
  femi_ratio: {
    korean: '페미 이슈 지수 순 랭킹',
    koreanShort: '페미',
    index: 'femi_ratio'
  },
  problem_ratio: {
    korean: '시니컬 지수 순 랭킹',
    koreanShort: '시니컬',
    index: 'problem_ratio'
  }
};

export const rankingSortingDefault =
  rankingSortingOptions[Object.keys(rankingSortingOptions)[0]];
