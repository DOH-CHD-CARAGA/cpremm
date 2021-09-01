import {
  SET_RECORDS_NEW,
  SET_SEARCHED_RECORDS_NEW,
  ADD_NEW_RECORD_NEW,
  SET_RECORD_DETAIL_NEW,
  SET_RECORD_VALUE_NEW,
  SET_RECORD_DEFAULT_NEW,
  SET_USER_RECORD_ENTRY_NEW,
  SET_RECORD_SUBMITTED_NEW,
  SET_RECORD_QR_FETCH_DATE,
  SET_SELECTED_RECORD_NEW,
  SET_RECORD_NEW_TO_DISPLAY,
  SET_RECORD_NEW_TO_PRINT_QR,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  records: [],
  searched: [],
  toDisplay: [],
  selected: [],
  toPrintQR: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  record: {},

  recordDefault: {
    recordID: "",
    prevRecordId: {},
    endUser: {
      userPAR: {},
      userCO: {},
    },
    office: {},
    text: {
      userPAR: "",
      userCO: "",
      division: "",
      section: "",
    },

    devices: {
      desktop: {},
      printer: {},
      scanner: {},
      monitor: {},
      avr: {},
      ups: {},
    },

    otherDevices: [],

    actions: [{
      _id: false,
      propertyCode: "",
      actionTaken: "",
      findings: "",
      item: "",
      date: null,
    }],
  },

  submitted: false,

};

var temp = "";
initialState.record = SpreadOps({ ...initialState.recordDefault });
initialState.record.actions[0] = SpreadOps({ ...initialState.recordDefault.actions[0] });

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_USER_RECORD_ENTRY_NEW:
      temp = { ...state.record };
      temp = SetRegValueHelper(temp, action.data, action.key, action.key.length, 0);

      return {
        ...state,
        record: { ...temp }
      }


    case SET_SEARCHED_RECORDS_NEW:
      return {
        ...state,
        searched: action.data.records,
        toDisplay: action.data.records,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1,
      }


    case SET_RECORDS_NEW:
      return {
        ...state,
        records: (action.data) ? action.data.records : state.records,
        toDisplay: (action.data) ? action.data.records : state.records,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1,
        listPage: (action.page) ? action.page : 1,
        submitted: (action.submitted) ? action.submitted : state.submitted
      }

    case SET_RECORD_SUBMITTED_NEW:
      return {
        ...state,
        submitted: action.submitted
      }

    case ADD_NEW_RECORD_NEW:
      return {
        ...state,
        records: [action.data, ...state.records],
        toDisplay: [action.data, ...state.records],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_RECORD_DETAIL_NEW:
      temp = {
        ...state.recordDefault,
        actions: [{
          ...state.recordDefault.actions[0]
        }]
      }
      return {
        ...state,
        record: {
          ...temp,
          ...action.detail.detail
        }
      }

    case SET_RECORD_VALUE_NEW:
      console.log(action);
      temp = { ...state.record };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        record: { ...temp },
        submitted: false
      }

    case SET_RECORD_DEFAULT_NEW:
      return {
        ...state,
        record: SpreadOps({ ...state.recordDefault }),
        submitted: false
      }

    case SET_RECORD_QR_FETCH_DATE:
      console.log(action);
      return {
        ...state,
        record: {
          ...state.recordDefault,
          ...action.data.records[0]
        }
      }

    case SET_SELECTED_RECORD_NEW:
      return {
        ...state,
        selected: [...action.selected],
      }

    case SET_RECORD_NEW_TO_DISPLAY:
      return {
        ...state,
        toDisplay: [...action.toDisplay],
      }

    case SET_RECORD_NEW_TO_PRINT_QR:
      return {
        ...state,
        toPrintQR: [...action.toPrintQR],
      }

    default:
      return state

  }
}
