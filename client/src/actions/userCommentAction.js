import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_USER_COMMENTS,
  SET_USER_COMMENT_DETAIL,
  SET_USER_COMMENT_DEFAULT,
  SET_SEARCHED_USER_COMMENTS,
  SET_USER_COMMENT_VALUE,
} from './types';
import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetUserCommentDetail = (id) => (dispatch, getState) => {

  const { toDisplay } = getState().userComment;

  const userComment = toDisplay.filter((userComment) => userComment._id == id);

  dispatch({
    type: SET_USER_COMMENT_DETAIL,
    detail: {
      userComment: [...userComment]
    }
  })
}

export const SetUserCommentDefault = () => (dispatch) => {
  dispatch({
    type: SET_USER_COMMENT_DEFAULT,
  })
}

export const addUserComment = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding UserComment"
  })
  const { userComment, gCount } = getState().userComment;
  const userComments = [...getState().userComment.userComments];

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/userComment/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        userComment: {...userComment}
      }
    })
    .then((res) =>{
      if (gCount < 10){
        userComments.unshift({
          ...res.data.userComment,
          user: {
            name: JSON.parse(localStorage.getItem("doh-user-name"))
          }
        });
      }

      dispatch({
        type: SET_USER_COMMENTS,
        data: {
          userComments: [...userComments],
          count: gCount + 1,
        }
      })
      

      dispatch({
        type: CHANGE_ALERT,
        resType: "success",
        msg: "User Comment Successfully Added"
      })
      
      
    })
    .catch(err => {
      reject(err);
    })
  })
}

export const updateUserComment = () => (dispatch, getState) => {

  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Updating UserComment"
  })

  const { userComment, gCount } = getState().userComment;
  const userComments = [...getState().userComment.userComments];
  
  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/userComment/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        userComment: {...userComment}
      }
    })
    .then((res) =>{
      if (res.status){

        userComments.map((s) => {
          if (userComment._id == s._id) {
            s.name = userComment.name;
            s.routes = userComment.routes;
          }
          return s;
        });
      
        dispatch({
          type: SET_USER_COMMENTS,
          data: {
            userComments: [...userComments],
            count: gCount,
          }
        })
      
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "User Comment Successfully Updated"
        })
        
      }else {

        dispatch({
          type: CHANGE_ALERT,
          resType: "failed",
          msg: "Failed to Updated User Comment"
        })
        
      }


      
    })
    .catch(err => {
      reject(err);
    })
  })
}

export const SendCommentReply = (comment, reply) => (dispatch, getState) => {


  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/userComment/comment-reply`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        commentId: comment._id,
        reply: reply
      }
    })
    .then((res) =>{

      if (res.status) {
        var userComments = getState().userComment.userComments;
    
        userComments = userComments.map((userComment, i) => {
          if (userComment._id == comment._id) {
            userComment = {
              ...userComment,
              replies: [...userComment.replies, {
                msg: reply,
                user: {
                  name: {...JSON.parse(localStorage.getItem('doh-user-name'))}
                },
                date: res.data.date,
              }]
            }
          }
          return userComment;
        })
    
        dispatch({
          type: SET_USER_COMMENTS,
          data: {
            userComments: [...userComments],
          }
        })
    
        resolve(true)
      }
    
    })
    .catch(err => {
      reject(err);
    })
  })



}


