export const mentionPortionOptions = {
  mentionPortionHigh: {
    korean: '필터링 높음',
    koreanShort: '높음',
    index: 'mentionPortionHigh'
  },
  mentionPortionMid: {
    korean: '필터링 보통',
    koreanShort: '보통',
    index: 'mentionPortionMid'
  },
  mentionPortionLow: {
    korean: '필터링 낮음',
    koreanShort: '낮음',
    index: 'mentionPortionLow'
  },
  mentionPortionNone: {
    korean: '필터링 없음',
    koreanShort: '없음',
    index: 'mentionPortionNone'
  }
};

export const mentionPortionDefault =
  mentionPortionOptions[Object.keys(mentionPortionOptions)[2]];
