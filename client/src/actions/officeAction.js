import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_OFFICE_DETAIL,
  SET_OFFICE_DEFAULT,
  SET_OFFICES,
} from './types';
import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetOfficeDetail = (id) => (dispatch, getState) => {

  const { toDisplay } = getState().office;

  const office = toDisplay.filter((office) => office._id == id);

  dispatch({
    type: SET_OFFICE_DETAIL,
    detail: {
      office: [...office]
    },
  })
}

export const SetOfficeDefault = () => (dispatch) => {
  dispatch({
    type: SET_OFFICE_DEFAULT,
  })
}


export const addOffice = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding Office"
  })

  const { office, gCount } = getState().office;
  const offices = [...getState().office.offices];

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/office/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        office: {...office}
      }
    })
    .then((res) =>{
      console.log(res);

      if (gCount > 10){
        offices.pop();
        offices.unshift({...res.data.office});
      }
      
      dispatch({
        type: SET_OFFICES,
        data: {
          offices: [...offices],
          count: gCount + 1,
        }
      })
      

      dispatch({
        type: CHANGE_ALERT,
        resType: "success",
        msg: "Office Successfully Added"
      })
      
      
    })
    .catch(err => {
      reject(err);
    })
  })
}


export const updateOffice = () => (dispatch, getState) => {

  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Updating Office"
  })

  const { office, gCount } = getState().office;
  const offices = [...getState().office.offices];

  console.log(localStorage.getItem(JWT));
  
  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/office/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        office: {...office}
      }
    })
    .then((res) =>{
      console.log(res);
      if (res.status){

        offices.map((r) => {
          if (office._id == r._id) {
            r.division = office.division;
            r.section = office.section;
            r.code = office.code;
          }
          return r;
        });
      
        dispatch({
          type: SET_OFFICES,
          data: {
            offices: [...offices],
            count: gCount,
          }
        })
      
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "Office Successfully Updated"
        })
        
      }else {

        dispatch({
          type: CHANGE_ALERT,
          resType: "failed",
          msg: "Failed to Updated Office"
        })
        
      }


      
    })
    .catch(err => {
      reject(err);
    })
  })
}
