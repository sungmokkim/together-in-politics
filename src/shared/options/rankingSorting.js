export const rankingSortingOptions = {
  anti_ratio: {
    korean: '적극 거부율 순 랭킹',
    koreanShort: '거부율',
    index: 'anti_ratio'
  },
  popularity: {
    korean: '대통령 지분율 순 랭킹',
    koreanShort: '지분율',
    index: 'popularity'
  },
  femi_ratio: {
    korean: '여성 갈등 지수 순 랭킹',
    koreanShort: '여성 지수',
    index: 'femi_ratio'
  }
};

export const rankingSortingDefault =
  rankingSortingOptions[Object.keys(rankingSortingOptions)[0]];
