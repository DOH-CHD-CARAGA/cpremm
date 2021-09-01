import {
  SET_USER_COMMENTS,
  SET_USER_COMMENT_DETAIL,
  SET_USER_COMMENT_DEFAULT,
  SET_SEARCHED_USER_COMMENTS,
  SET_USER_COMMENT_VALUE,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  userComments: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,  
  count: 0,
  page: 1,
  userComment: {},

  userCommentDefault: {
    commentID: "",
    commentType: 1,
    user: {},	
    location: "",
    comment: "",
    resolved: 0,
    replies: [
    ],
  
    viewed: 0,
  },

};

var temp = "";
initialState.userComment = SpreadOps({...initialState.userCommentDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_USER_COMMENTS:
      return {
        ...state,
        searched: action.data.userComments,
        toDisplay: action.data.userComments,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page)?action.page:1
      }


    case SET_USER_COMMENTS:
      return {
        ...state,
        userComments: (action.data)?action.data.userComments:state.userComments,
        toDisplay: (action.data)?action.data.userComments:state.userComments,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case SET_USER_COMMENT_DETAIL:
      return {
        ...state,
        userComment: {...action.detail.userComment[0]}
      }
      
    case SET_USER_COMMENT_VALUE:
      temp = {...state.userComment};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        userComment: {...temp}
      }


    case SET_USER_COMMENT_DEFAULT:
      return {
        ...state,
        userComment: SpreadOps({...state.userCommentDefault}),
      }
  

    default:
      return state

  }
}
