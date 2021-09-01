import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
    SET_USERS,
    SET_USER_DETAIL,
    SET_USER_DEFAULT,
  } from './types';
  import { SERVER_URI, SERVER_API, JWT } from '../config';
  import axios from 'axios';
  
export const savePassword = (password) => (dispatch) =>  {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Changing Password"
    })
    axios({
        url: `${SERVER_URI}/api/user/savepassword`,
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem(JWT),
        },
        data: {
            password: password
        }
    })
    .then(res => {
        if (res.status) {
            dispatch({
                type: CHANGE_ALERT,
                resType: "success",
                msg: "Password Successfully Changed"
            })    
        }          
    })
    .catch(err => {
        return false;
    });
}

export const addUser = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding New User"
  })
  const { user, gCount } = getState().user;
  const users = [...getState().user.users];
  console.log(":::::::::::>>>>");
  console.log(user);

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/user/new-user`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
          ...user
      }
    })
    .then((res) =>{
      console.log(res);

      if (gCount > 10){
        users.pop();
      }
      users.unshift({
          ...res.data.user,
          branch: {
              name: user
          }
      });
      
      dispatch({
        type: SET_USERS,
        data: {
          users: [...users],
          count: gCount + 1,
        }
      })
      

      dispatch({
        type: CHANGE_ALERT,
        resType: "success",
        msg: "New User Successfully Added"
      })
      
      
    })
    .catch(err => {
      reject(err);
    })
  })
}

export const updateUser = () => (dispatch, getState) => {

  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Updating User"
  })

  const { user, gCount } = getState().user;
  const users = [...getState().user.users];
  console.log(user);
  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/user/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        user: {...user}
      }
    })
    .then((res) =>{
      console.log(res);
      if (res.status){

        users.map((r) => {
          if (user._id == r._id) {
            r.name = user.name;
            r.branch = user.branch;
            r.role = user.role;
            r.username = user.username;
            r.designation = user.designation;
            r.status = user.status;
            r.office = user.office;
          }
          return r;
        });
      
        dispatch({
          type: SET_USERS,
          data: {
            users: [...users],
            count: gCount,
          }
        })
      
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "User   Successfully Updated"
        })
        
      }else {

        dispatch({
          type: CHANGE_ALERT,
          resType: "failed",
          msg: "Failed to Updated User  "
        })
        
      }


      
    })
    .catch(err => {
      reject(err);
    })
  })
}


  

export const SetUserDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().user;

    const user = toDisplay.filter((user) => user._id == id);

    dispatch({
        type: SET_USER_DETAIL,
        detail: {
        user: [...user]
        }
    })
}
  
export const SetUserDefault = () => (dispatch) => {
    dispatch({
        type: SET_USER_DEFAULT,
    })
}


export const CheckSimilarAccount = (name) => (dispatch, getState) => {
  console.log(name);
  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/user/check-similar-account`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      params: {
        user: {...name}
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject({status: false})
      })
  })
}
