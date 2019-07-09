export const communityOptions = {
  mlbpark: {
    korean: 'MLB파크',
    koreanShort: '엠',
    color: '#E7813C',
    popularityWeight: 0.031151645372260655,
    femiWeight: 0.022020354467060983,
    antiWeight: 0.011585039637495378,
    problemWeight: 0.033957036261765564,
    index: 'mlbpark',
    mentionPortionHigh: 150,
    mentionPortionMid: 100,
    mentionPortionLow: 50,
    mentionPortionNone: 1
  },
  ruli: {
    korean: '루리웹',
    koreanShort: '루',
    color: '#01417F',
    popularityWeight: 0.06038309299008818,
    femiWeight: 0.03591275163651442,
    antiWeight: 0.01860396066976154,
    problemWeight: 0.060822919574681174,
    index: 'ruli',
    mentionPortionHigh: 150,
    mentionPortionMid: 100,
    mentionPortionLow: 50,
    mentionPortionNone: 1
  },
  ilbe: {
    korean: '일간베스트',
    koreanShort: '일',
    color: '#f75467',
    popularityWeight: 0.01719911800418923,
    femiWeight: 0.006423554732597898,
    antiWeight: 0.00424286869569477,
    problemWeight: 0.016822653858328932,
    index: 'ilbe',
    mentionPortionHigh: 150,
    mentionPortionMid: 100,
    mentionPortionLow: 50,
    mentionPortionNone: 1
  },
  clien: {
    korean: '클리앙',
    koreanShort: '클',
    color: '#516C83',
    popularityWeight: 0.04096724185261541 / 5, // fix weights according to community size
    femiWeight: 0.023602468662212304,
    antiWeight: 0.0026890040235587258,
    problemWeight: 0.03395827098792921,
    index: 'clien',
    mentionPortionHigh: 250,
    mentionPortionMid: 150,
    mentionPortionLow: 50,
    mentionPortionNone: 1
  },
  cook: {
    korean: '82쿡',
    koreanShort: '쿡',
    color: '#4AA43A',
    popularityWeight: 0.040142290848683114 / 5, // fix weights according to community size
    femiWeight: 0.017907287413314935,
    antiWeight: 0.005779236548754306,
    problemWeight: 0.02665739023732758,
    index: 'cook',
    mentionPortionHigh: 150,
    mentionPortionMid: 100,
    mentionPortionLow: 50,
    mentionPortionNone: 1
  },
  ygosu: {
    korean: '와이고수',
    koreanShort: '와',
    color: '#86331D',
    popularityWeight: 0.044793733495071354 / 3, // fix weights according to community size
    femiWeight: 0.034967450588000014,
    antiWeight: 0.020568947736082102,
    problemWeight: 0.054315477178662024,
    index: 'ygosu',
    mentionPortionHigh: 150,
    mentionPortionMid: 100,
    mentionPortionLow: 30,
    mentionPortionNone: 1
  }
};

export const communityDefault =
  communityOptions[Object.keys(communityOptions)[0]];
