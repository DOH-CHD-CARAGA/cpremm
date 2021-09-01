import {
  SET_VAS_REPORTS,
  SET_SEARCHED_VAS_REPORTS,
  ADD_NEW_VAS_REPORT,
  SET_VAS_REPORT_DETAIL,
  SET_VAS_REPORT_VALUE,
  SET_VAS_REPORT_DEFAULT,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  vasReports: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  vasReport: {},

  vasReportDefault: {
    vasReportID: '',
    name: '',
  },

  uploadDetails: {
    province: "adn",
    facility: "",
  },
  toUpload: [],
  resetUpload: false,

};

var temp = '';
initialState.vasReport = SpreadOps({...initialState.vasReportDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_VAS_REPORTS:
      return {
        ...state,
        searched: action.data.vasReports,
        toDisplay: action.data.vasReports,
        sCount: action.data.count,
        count: action.data.count,
        page: action.page
      }

    case SET_VAS_REPORTS:
      console.log("&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*******!!!!!!!");
      console.log(action);
      return {
        ...state,
        vasReports: (action.data)?action.data.vasReports:state.vasReports,
        toDisplay: (action.data)?action.data.vasReports:state.vasReports,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_VAS_REPORT:
      return {
        ...state,
        vasReports: [action.data, ...state.vasReports],
        toDisplay: [action.data, ...state.vasReports],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_VAS_REPORT_DETAIL:
      return {
        ...state,
        vasReport: {...action.detail.vasReport[0]}
      }

    case SET_VAS_REPORT_VALUE:
      temp = {...state.vasReport};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      return {
        ...state,
        vasReport: {...temp}
      }

    case SET_VAS_REPORT_DEFAULT:
      return {
        ...state,
        vasReport: SpreadOps({...state.vasReportDefault}),
      }

    default:
      return state

  }
}
