import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_ROLE_DETAIL,
  SET_ROLE_DEFAULT,
  SET_ROLES,
  SET_ROLE_NEW_ROUTE,
  SET_ROLE_REMOVE_ROUTE,
  SET_ROLE_NEW_SYSTEM,
  SET_ROLE_REMOVE_SYSTEM,
} from './types';
import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetRoleDetail = (id) => (dispatch, getState) => {

  const { toDisplay } = getState().role;

  const role = toDisplay.filter((role) => role._id == id);

  dispatch({
    type: SET_ROLE_DETAIL,
    detail: {
      role: [...role]
    }
  })
}

export const SetRoleDefault = () => (dispatch) => {
  dispatch({
    type: SET_ROLE_DEFAULT,
  })
}

export const addRoute = (route) => (dispatch) => {
  dispatch({
    type: SET_ROLE_NEW_ROUTE,
    route: route
  })
}

export const addSystem = (system) => (dispatch) => {
  dispatch({
    type: SET_ROLE_NEW_SYSTEM,
    system: system
  })
}


export const removeRoute = (ind) => (dispatch) => {
  dispatch({
    type: SET_ROLE_REMOVE_ROUTE,
    ind: ind
  })
}

export const removeSystem = (ind) => (dispatch) => {
  dispatch({
    type: SET_ROLE_REMOVE_SYSTEM,
    ind: ind
  })
}

export const addRole = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding Role"
  })
  const { role, gCount } = getState().role;
  const roles = [...getState().role.roles];

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/role/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        role: {...role}
      }
    })
    .then((res) =>{
      console.log(res);

      if (gCount > 10){
        roles.pop();
        roles.unshift({...res.data.role});
      }
      
      dispatch({
        type: SET_ROLES,
        data: {
          roles: [...roles],
          count: gCount + 1,
        }
      })
      

      dispatch({
        type: CHANGE_ALERT,
        resType: "success",
        msg: "Role Successfully Added"
      })
      
      
    })
    .catch(err => {
      reject(err);
    })
  })
}

export const updateRole = () => (dispatch, getState) => {

  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Updating Role"
  })

  const { role, gCount } = getState().role;
  const roles = [...getState().role.roles];

  console.log(localStorage.getItem(JWT));
  
  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/role/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        role: {...role}
      }
    })
    .then((res) =>{
      console.log(res);
      if (res.status){

        roles.map((r) => {
          if (role._id == r._id) {
            r.name = role.name;
            r.routes = role.routes;
          }
          return r;
        });
      
        dispatch({
          type: SET_ROLES,
          data: {
            roles: [...roles],
            count: gCount,
          }
        })
      
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "Role Successfully Updated"
        })
        
      }else {

        dispatch({
          type: CHANGE_ALERT,
          resType: "failed",
          msg: "Failed to Updated Role"
        })
        
      }


      
    })
    .catch(err => {
      reject(err);
    })
  })
}


