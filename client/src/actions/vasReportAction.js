import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_VAS_REPORT_DETAIL,
  SET_VAS_REPORT_DEFAULT,
  SET_VAS_REPORTS,
} from './types';

import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetVasReportDetail = (id) => (dispatch, getState) => {
  const { toDisplay } = getState().vasReport;
  const vasReport = toDisplay.filter((vasReport) => vasReport._id == id);

  dispatch({
    type: SET_VAS_REPORT_DETAIL,
    detail: {
      vasReport: [...vasReport]
    }
  })

}

export const SetVasReportDefault = () => (dispatch) => {
  dispatch({
    type: SET_VAS_REPORT_DEFAULT,
  })
}

export const addVasReport = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Adding VasReport'
  })

  const { vasReport, vasReports, gCount } = getState().vasReport;

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/ceir/vas-report/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        vasReport: {...vasReport}
      }
    })
    .then((res) =>{
      if (res.data.status){
        vasReports.unshift({...res.data.vasReport});
        if (gCount > 10){
          vasReports.pop();
        }
        dispatch({
          type: SET_VAS_REPORTS,
          data: {
            vasReports: [...vasReports],
            count: gCount + 1,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'VasReport Successfully Added'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated VasReport'
        })
      }
    })
    .catch(err => {
      reject(err);
    })

  })
}

export const updateVasReport = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: 'loading',
    msg: 'Updating VasReport'
  })

  const { vasReport, gCount } = getState().vasReport;
  const vasReports = [...getState().vasReport.vasReports];

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/ceir/vas-report/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        vasReport: {...vasReport}
      }
    })
    .then((res) =>{

      if (res.data.status){
        vasReports.map((r) => {
          if (vasReport._id == r._id) {
            r = {...vasReport};
          }
          return r;
        });

        dispatch({
          type: SET_VAS_REPORTS,
          data: {
            vasReports: [...vasReports],
            count: gCount,
          }
        })
        dispatch({
          type: CHANGE_ALERT,
          resType: 'success',
          msg: 'VasReport Successfully Updated'
        })
      }else {
        dispatch({
          type: CHANGE_ALERT,
          resType: 'failed',
          msg: 'Failed to Updated VasReport'
        })
      }
    })
    .catch(err => {
      reject(err);
    })
  })
}
