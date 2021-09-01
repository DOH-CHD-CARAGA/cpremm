import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_PRE_POST_MONITORING_DETAIL,
  SET_PRE_POST_MONITORING_DEFAULT,
  SET_PRE_POST_MONITORINGS,
} from './types';

import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetPrePostMonitoringDetail = (id) => (dispatch, getState) => {
  const { toDisplay } = getState().prePostMonitoring;
  const prePostMonitoring = toDisplay.filter((prePostMonitoring) => prePostMonitoring._id == id);

  dispatch({
    type: SET_PRE_POST_MONITORING_DETAIL,
    detail: {
      prePostMonitoring: [...prePostMonitoring]
    }
  })

}

export const SetPrePostMonitoringDefault = () => (dispatch) => {
  dispatch({
    type: SET_PRE_POST_MONITORING_DEFAULT,
  })
}

export const addPrePostMonitoring = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Adding PrePostMonitoring'
  })

  const { prePostMonitoring, prePostMonitorings, gCount } = getState().prePostMonitoring;

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/admin/prePostMonitoring/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        prePostMonitoring: {...prePostMonitoring}
      }
    })
    .then((res) =>{
      if (res.data.status){
        prePostMonitorings.unshift({...res.data.prePostMonitoring});
        if (gCount > 10){
          prePostMonitorings.pop();
        }
        dispatch({
          type: SET_PRE_POST_MONITORINGS,
          data: {
            prePostMonitorings: [...prePostMonitorings],
            count: gCount + 1,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'PrePostMonitoring Successfully Added'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated PrePostMonitoring'
        })
      }
    })
    .catch(err => {
      reject(err);
    })

  })
}

export const updatePrePostMonitoring = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Updating PrePostMonitoring'
  })

  const { prePostMonitoring, gCount } = getState().prePostMonitoring;
  const prePostMonitorings = [...getState().prePostMonitoring.prePostMonitorings];

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/admin/prePostMonitoring/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        prePostMonitoring: {...prePostMonitoring}
      }
    })
    .then((res) =>{

      if (res.data.status){
        prePostMonitorings.map((r) => {
          if (prePostMonitoring._id == r._id) {
            r = {...prePostMonitoring};
          }
          return r;
        });

        dispatch({
          type: SET_PRE_POST_MONITORINGS,
          data: {
            prePostMonitorings: [...prePostMonitorings],
            count: gCount,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'PrePostMonitoring Successfully Updated'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated PrePostMonitoring'
        })
      }
    })
    .catch(err => {
      reject(err);
    })
  })
}
