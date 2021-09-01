import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  SET_JOB_ORDER_REQUEST_DETAIL,
  SET_JOB_ORDER_REQUEST_DEFAULT,
  SET_JOB_ORDER_REQUESTS,
  SET_JOB_ORDER_ACTION_DEFAULT,
} from './types';
import { SERVER_API, JWT } from '../config';
import axios from 'axios';

export const SetJobOrderRequestDetail = (id) => (dispatch, getState) => {

  const { toDisplay } = getState().jobOrderRequest;

  const jobOrderRequest = toDisplay.filter((jobOrderRequest) => jobOrderRequest._id == id);

  dispatch({
    type: SET_JOB_ORDER_REQUEST_DETAIL,
    detail: {
      jobOrderRequest: [...jobOrderRequest]
    }
  })
}

export const SetJobOrderRequestDefault = () => (dispatch) => {
  dispatch({
    type: SET_JOB_ORDER_REQUEST_DEFAULT,
  })
}

export const SetJobOrderActionDefault = () => (dispatch) => {
  dispatch({
    type: SET_JOB_ORDER_ACTION_DEFAULT,
  })
}

export const SetUserRequestPersonnel = (data) => (dispatch, getState) => {

  const { jobOrderRequest } = getState().jobOrderRequest;

  dispatch({
    type: SET_JOB_ORDER_REQUEST_DETAIL,
    detail: {
      jobOrderRequest: [{
        ...jobOrderRequest,
        requestingPersonnel: {
          id: data._id,
          name: data.name,
          designation: data.designation,
          divSec: data.office.division + " - " + data.office.section,
        }
      }]
    }
  })
}

export const addJobOrderRequest = (toggle = null) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding Job Order Request"
  })
  const { jobOrderRequest, gCount } = getState().jobOrderRequest;
  const jobOrderRequests = [...getState().jobOrderRequest.jobOrderRequests];

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/jobOrderRequest/new`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        jobOrderRequest: {
          device: jobOrderRequest.device._id,     
          jobOrderRequestID: jobOrderRequest.jobOrderRequestID,
          requestingPersonnel: jobOrderRequest.requestingPersonnel,
          natureOfComplaint: jobOrderRequest.natureOfComplaint,
          requestDate: jobOrderRequest.requestDate,     
          createdAt: jobOrderRequest.createdAt,
        }
      }
    })
    .then((res) =>{
      console.log(res);

      if (res.data.status) {

        jobOrderRequests.unshift({
          ...res.data.jobOrderRequest,
          device: jobOrderRequest.device,      
        });
        if (gCount > 10){
          jobOrderRequests.pop();
        }
        
        dispatch({
          type: SET_JOB_ORDER_REQUESTS,
          data: {
            jobOrderRequests: [...jobOrderRequests],
            count: gCount + 1,
          }
        })
  
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "Job Order Request Successfully Added"
        })
        
        var timer = setTimeout(() => {
          toggle();
          clearTimeout(timer);
        }, 2000);
    
      } else {
        dispatch({
          type: CHANGE_ALERT,
          resType: "failed",
          msg: "Failed to Add Job Order Request"
        })
        
      }
      
      
    })
    .catch(err => {
      dispatch({
        type: CHANGE_ALERT,
        resType: "failed",
        msg: "Failed to Add Job Order Request"
      })
      reject(err);
    })
  })
}

export const updateJobOrderRequest = () => (dispatch, getState) => {

  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Updating Job Order Request"
  })

  const { jobOrderRequest, gCount } = getState().jobOrderRequest;
  const jobOrderRequests = [...getState().jobOrderRequest.jobOrderRequests];

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/jobOrderRequest/update`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        jobOrderRequest: {
          ...jobOrderRequest,
          device: jobOrderRequest.device._id,                      
        }
      }
    })
    .then((res) =>{
      console.log(res);
      if (res.status){

        jobOrderRequests.map((r) => {
          if (jobOrderRequest._id == r._id) {
            r.name = jobOrderRequest.name;
            r.routes = jobOrderRequest.routes;
          }
          return r;
        });
      
        dispatch({
          type: SET_JOB_ORDER_REQUESTS,
          data: {
            jobOrderRequests: [...jobOrderRequests],
            count: gCount,
          }
        })
      
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "Job Order Request Successfully Updated"
        })
        
      }else {

        dispatch({
          type: CHANGE_ALERT,
          resType: "failed",
          msg: "Failed to Updated Job Order Request"
        })
        
      }


      
    })
    .catch(err => {
      reject(err);
    })
  })
}

export const addJobOrderRequestAction = (toggle) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: "Adding Job Order Request Action"
  })
  const { jobOrderRequest, gCount, jobOrderAction } = getState().jobOrderRequest;
  const jobOrderRequests = [...getState().jobOrderRequest.jobOrderRequests];
  console.log("!!!!!$$$$$$$$$$$$$$$$%&*");
  console.log({
    jobOrderRequest: jobOrderRequest._id,
    device: jobOrderRequest.device,
    jobOrderRequestAction: {
      actionDetails: {
        ...jobOrderRequest.technician.actionDetails
      }        
    },
    technician: jobOrderRequest.technician.id
  });

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/jobOrderRequest/action/add`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        jobOrderRequest: jobOrderRequest._id,
        device: jobOrderRequest.device,
        jobOrderRequestAction: {
          actionDetails: {
            ...jobOrderRequest.technician.actionDetails
          }        
        },
        technician: jobOrderRequest.technician.id
      }
    })
    .then((res) =>{
      console.log(res);

      if (res.data.status) {

        var newList = jobOrderRequests.map((r) => {
          if (res.data.jobOrderRequest == r._id) {
            r.technician = {
              ...res.data.technician,
              id: [{...res.data.technician.id}]
            };
            // r.name = jobOrderRequest.name;
            // r.routes = jobOrderRequest.routes;
          }
          return r;
        });
        
        dispatch({
          type: SET_JOB_ORDER_REQUESTS,
          data: {
            jobOrderRequests: [...newList],
            count: gCount,
          }
        })

        dispatch({
          type: SET_JOB_ORDER_REQUEST_DETAIL,
          detail: {
            jobOrderRequest: [{
              ...jobOrderRequest,
              technician: {
                ...res.data.technician,
                id: [{...res.data.technician.id}]
              }
            }]
          }
        })      
  
        dispatch({
          type: CHANGE_ALERT,
          resType: "success",
          msg: "Job Order Request Action Successfully Added"
        })

        var timer = setTimeout(() => {
          toggle();
          clearTimeout(timer);
        }, 1700);
    
      } else {
        dispatch({
          type: CHANGE_ALERT,
          resType: "failed",
          msg: "Failed to Add Job Order Request Action"
        })
        
      }
      
      
    })
    .catch(err => {
      dispatch({
        type: CHANGE_ALERT,
        resType: "failed",
        msg: "Failed to Add Job Order Request Action"
      })
      reject(err);
    })
  })

}

export const updateJobOrderRequestStatus = (id, status) => (dispatch, getState) => {

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/jobOrderRequest/update/status`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      data: {
        id: id,
        status: status,
      }
    })
    .then((res) =>{
      console.log(res);
      const { gCount } = getState().jobOrderRequest;
      const jobOrderRequests = [...getState().jobOrderRequest.jobOrderRequests];
    
      if (res.data.status) {

        var newList = jobOrderRequests.map((r) => {
          if (id == r._id) {
            r = {
              ...r,
              status: status,
            };
          }
          return r;
        });
        
        dispatch({
          type: SET_JOB_ORDER_REQUESTS,
          data: {
            jobOrderRequests: [...newList],
            count: gCount,
          }
        })
      }
    })
    .catch(err => {
      reject(err);
    })
  })
}

