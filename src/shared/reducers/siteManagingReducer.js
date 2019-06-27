const initialState = {
  isFromClient: false,
  navDisplay: {
    home: {
      korean: '메인',
      index: 'home',
      linkTo: '/'
    },
    dashboard: {
      korean: '대시보드',
      index: 'dashboard',
      linkTo: '/dashboard'
    },
    keywords: {
      korean: '키워드',
      index: 'keywords',
      linkTo: '/keywords'
    },

    rankings: {
      korean: '랭킹',
      index: 'rankings',
      linkTo: '/rankings'
    },
    // ,
    // freeboard: {
    //   korean: '게시판',
    //   index: 'freeboard',
    //   linkTo: '/freeboard'
    // },
    about: {
      korean: 'About',
      index: 'about',
      linkTo: '/about'
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      try {
        return {
          ...state,
          isFromClient: true
        };
      } catch (err) {
        return {
          ...state,
          isFromClient: false
        };
      }
  }
};
