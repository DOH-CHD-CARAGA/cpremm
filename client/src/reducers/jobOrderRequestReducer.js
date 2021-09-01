import {
  SET_JOB_ORDER_REQUESTS,
  SET_SEARCHED_JOB_ORDER_REQUESTS,
  ADD_NEW_JOB_ORDER_REQUEST,
  SET_JOB_ORDER_REQUEST_DETAIL,
  SET_JOB_ORDER_REQUEST_VALUE,
  SET_JOB_ORDER_REQUEST_DEFAULT,
  SET_JOB_ORDER_ACTION_DEFAULT,
  SET_JOB_ORDER_ACTION_VALUE,
  SET_JO_REQ_QR_FETCH_DATE,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  jobOrderRequests: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  jobOrderRequest: {},

  jobOrderRequestDefault: {
    jobOrderRequestID: "",
    requestingPersonnel: {
      id: "",
      name: "",
      designation: "",
      divSec: "",
    },

    device: {
      serial: "",
      propertyCode: "",
    },
    natureOfComplaint: "",

    requestDate: "",
    createdAt: "",

    supervisor: {
      seen: new Date(),
      dateApproved: new Date(),
      id: null,
    },

    technician: {
      seen: new Date(),
      dateAction: new Date(),
      id: null,
      actionDetails: {
        status: "",
        scopeOfWork: "",
        checkUpResult: "",
        recommendations: "",
        specifications: "",
      },
    },
    status: "",
  },

  jobOrderAction: {},

  jobOrderActionDefault: {
    status: "",
    scopeOfWork: "",
    checkUpResult: "",
    recommendations: "",
    specifications: "",
  },


};

var temp = "";
initialState.jobOrderRequest = SpreadOps({ ...initialState.jobOrderRequestDefault });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_JOB_ORDER_REQUESTS:
      return {
        ...state,
        searched: action.data.jobOrderRequests,
        toDisplay: action.data.jobOrderRequests,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }


    case SET_JOB_ORDER_REQUESTS:
      return {
        ...state,
        jobOrderRequests: (action.data) ? action.data.jobOrderRequests : state.jobOrderRequests,
        toDisplay: (action.data) ? action.data.jobOrderRequests : state.jobOrderRequests,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case ADD_NEW_JOB_ORDER_REQUEST:
      return {
        ...state,
        jobOrderRequests: [action.data, ...state.jobOrderRequests],
        toDisplay: [action.data, ...state.jobOrderRequests],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_JOB_ORDER_REQUEST_DETAIL:
      return {
        ...state,
        jobOrderRequest: {
          ...action.detail.jobOrderRequest[0],
          // supervisor: (action.detail.jobOrderRequest[0].hasOwnProperty("supervisor"))?{...action.detail.jobOrderRequest[0].supervisor}:{...state.jobOrderRequestDefault.supervisor},
          technician: (action.detail.jobOrderRequest[0].technician.hasOwnProperty("actionDetails")) ? { ...action.detail.jobOrderRequest[0].technician } : { ...state.jobOrderRequestDefault.technician },
        }
      }

    case SET_JOB_ORDER_REQUEST_VALUE:
      console.log("-------------------------- || ++++++++++++++++++++++=");
      console.log(action);
      temp = { ...state.jobOrderRequest };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      console.log(temp);

      return {
        ...state,
        jobOrderRequest: { ...temp }
      }


    case SET_JOB_ORDER_REQUEST_DEFAULT:
      return {
        ...state,
        jobOrderRequest: SpreadOps({ ...state.jobOrderRequestDefault }),
      }

    case SET_JOB_ORDER_ACTION_DEFAULT:
      return {
        ...state,
        jobOrderAction: SpreadOps({ ...state.jobOrderActionDefault }),
      }

    case SET_JOB_ORDER_ACTION_VALUE:
      temp = { ...state.jobOrderAction };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        jobOrderAction: { ...temp }
      }

    case SET_JO_REQ_QR_FETCH_DATE:
      console.log("_!!!!!!!@@@@@@@@@@@@@@@");
      console.log(action.data.devices[0]);
      return {
        ...state, 
        jobOrderRequest: {
          ...state.jobOrderRequest,
          device: {
            serial: action.data.devices[0].serial,
            propertyCode: action.data.devices[0].propertyCode,
            brand: action.data.devices[0].brand,
            model: action.data.devices[0].model,
            _id: action.data.devices[0]._id,
          }
        },
      }

    default:
      return state

  }
}
