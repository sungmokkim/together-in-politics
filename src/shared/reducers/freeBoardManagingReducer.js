import {
  FETCH_FREEBOARD,
  FETCH_COMMENTS,
  FETCH_HOT_POSTS
} from '../actions/actions';

const initialState = {
  maxLength: {
    text: 280,
    userName: 10,
    password: 16,
    comment: 150
  },
  minLength: {
    text: 5,
    userName: 2,
    password: 4,
    comment: 2
  },
  submit: {
    korean: '등록'
  },
  placeHolders: {
    text: { korean: '글 내용을 입력해주세요' },
    userName: {
      korean: 'ID를 지정해주세요'
    },
    password: {
      korean: '비밀번호를 지정해주세요'
    },
    comment: {
      korean: '댓글을 작성해주세요'
    }
  },
  errorCodes: {
    inputIsTooLong: {
      korean: {
        text: '본문 길이 제한은 280자입니다',
        userName: 'ID 길이 제한은 10자입니다',
        password: '비밀번호 길이 제한은 16자입니다',
        comment: '댓글 길이 제한은 150자입니다'
      }
    },
    inputIsTooShort: {
      korean: {
        text: '본문 길이는 최소 5자입니다',
        userName: 'ID 길이는 최소 2자입니다',
        password: '비밀번호 길이는 최소 4자입니다',
        comment: '댓글 길이는 최소 2자입니다'
      }
    },
    userNameIsMissing: {
      korean: '아이디를 입력해주세요'
    },
    textIsMissing: {
      korean: '글 내용을 입력해주세요'
    }
  },
  status: {
    noComment: {
      korean: '댓글이 아직 없습니다. 댓글을 작성해주세요!'
    }
  },
  data: [],
  comments: [],
  hotPosts: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FREEBOARD:
      return {
        ...state,
        data: action.payload
      };

    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case FETCH_HOT_POSTS:
      return {
        ...state,
        hotPosts: action.payload
      };
    default:
      return state;
  }
};
