import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_ANNEX_A_DETAIL,
  SET_ANNEX_A_DEFAULT,
  SET_ANNEX_AS,
} from './types';

import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetAnnex_aDetail = (id) => (dispatch, getState) => {
  const { toDisplay } = getState().annex_a;
  const annex_a = toDisplay.filter((annex_a) => annex_a._id == id);

  dispatch({
    type: SET_ANNEX_A_DETAIL,
    detail: {
      annex_a: [...annex_a]
    }
  })

}

export const SetAnnex_aDefault = () => (dispatch) => {
  dispatch({
    type: SET_ANNEX_A_DEFAULT,
  })
}

export const addAnnex_a = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Adding Annex_a'
  })

  const { annex_a, annex_as, gCount } = getState().annex_a;

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/admin/annex_a/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        annex_a: {...annex_a}
      }
    })
    .then((res) =>{
      if (res.data.status){
        annex_as.unshift({...res.data.annex_a});
        if (gCount > 10){
          annex_as.pop();
        }
        dispatch({
          type: SET_ANNEX_AS,
          data: {
            annex_as: [...annex_as],
            count: gCount + 1,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'Annex_a Successfully Added'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated Annex_a'
        })
      }
    })
    .catch(err => {
      reject(err);
    })

  })
}

export const updateAnnex_a = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Updating Annex_a'
  })

  const { annex_a, gCount } = getState().annex_a;
  const annex_as = [...getState().annex_a.annex_as];

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/admin/annex_a/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        annex_a: {...annex_a}
      }
    })
    .then((res) =>{

      if (res.data.status){
        annex_as.map((r) => {
          if (annex_a._id == r._id) {
            r = {...annex_a};
          }
          return r;
        });

        dispatch({
          type: SET_ANNEX_AS,
          data: {
            annex_as: [...annex_as],
            count: gCount,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'Annex_a Successfully Updated'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated Annex_a'
        })
      }
    })
    .catch(err => {
      reject(err);
    })
  })
}
