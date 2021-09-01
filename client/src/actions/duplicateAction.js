import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_DUPLICATE_DETAIL,
  SET_DUPLICATE_DEFAULT,
  SET_DUPLICATES,
} from './types';

import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetDuplicateDetail = (id) => (dispatch, getState) => {
  const { toDisplay } = getState().duplicate;
  const duplicate = toDisplay.filter((duplicate) => duplicate._id == id);

  dispatch({
    type: SET_DUPLICATE_DETAIL,
    detail: {
      duplicate: [...duplicate]
    }
  })

}

export const SetDuplicateDefault = () => (dispatch) => {
  dispatch({
    type: SET_DUPLICATE_DEFAULT,
  })
}

export const addDuplicate = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Adding Duplicate'
  })

  const { duplicate, duplicates, gCount } = getState().duplicate;

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/admin/duplicate/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        duplicate: {...duplicate}
      }
    })
    .then((res) =>{
      if (res.data.status){
        duplicates.unshift({...res.data.duplicate});
        if (gCount > 10){
          duplicates.pop();
        }
        dispatch({
          type: SET_DUPLICATES,
          data: {
            duplicates: [...duplicates],
            count: gCount + 1,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'Duplicate Successfully Added'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated Duplicate'
        })
      }
    })
    .catch(err => {
      reject(err);
    })

  })
}

export const updateDuplicate = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Updating Duplicate'
  })

  const { duplicate, gCount } = getState().duplicate;
  const duplicates = [...getState().duplicate.duplicates];

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/admin/duplicate/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        duplicate: {...duplicate}
      }
    })
    .then((res) =>{

      if (res.data.status){
        duplicates.map((r) => {
          if (duplicate._id == r._id) {
            r = {...duplicate};
          }
          return r;
        });

        dispatch({
          type: SET_DUPLICATES,
          data: {
            duplicates: [...duplicates],
            count: gCount,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'Duplicate Successfully Updated'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated Duplicate'
        })
      }
    })
    .catch(err => {
      reject(err);
    })
  })
}
