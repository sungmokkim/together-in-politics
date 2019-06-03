import { FETCH_FREEBOARD } from '../actions/actions';

const initialState = {
  maxLength: {
    text: 280,
    userName: 10,
    password: 16
  },
  minLength: {
    text: 5,
    userName: 2,
    password: 4
  },
  submit: {
    korean: '게시'
  },
  placeHolders: {
    text: { korean: '글 내용을 입력해주세요' },
    userName: {
      korean: 'ID를 입력해주세요'
    }
  },
  errorCodes: {
    inputIsTooLong: {
      korean: {
        text: '본문 길이 제한은 280자입니다',
        userName: 'ID 길이 제한은 10자입니다',
        password: '비밀번호 길이 제한은 16자입니다'
      }
    },
    inputIsTooShort: {
      korean: {
        text: '본문 길이는 최소 5자입니다',
        userName: 'ID 길이는 최소 2자입니다',
        password: '비밀번호 길이는 최소 4자입니다'
      }
    },
    userNameIsMissing: {
      korean: '아이디를 입력해주세요'
    },
    textIsMissing: {
      korean: '글 내용을 입력해주세요'
    }
  },
  data: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FREEBOARD:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
