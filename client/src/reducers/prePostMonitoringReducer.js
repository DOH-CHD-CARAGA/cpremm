import {
  SET_PRE_POST_MONITORINGS,
  SET_SEARCHED_PRE_POST_MONITORINGS,
  ADD_NEW_PRE_POST_MONITORING,
  SET_PRE_POST_MONITORING_DETAIL,
  SET_PRE_POST_MONITORING_VALUE,
  SET_PRE_POST_MONITORING_DEFAULT,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  prePostMonitorings: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  prePostMonitoring: {},

  prePostMonitoringDefault: {
    prePostMonitoringID: '',
    name: '',
  },

};

var temp = '';
initialState.prePostMonitoring = SpreadOps({...initialState.prePostMonitoringDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_PRE_POST_MONITORINGS:
      return {
        ...state,
        searched: action.data.prePostMonitorings,
        toDisplay: action.data.prePostMonitorings,
        sCount: action.data.count,
        count: action.data.count,
        page: action.page
      }

    case SET_PRE_POST_MONITORINGS:
      return {
        ...state,
        prePostMonitorings: (action.data)?action.data.prePostMonitorings:state.prePostMonitorings,
        toDisplay: (action.data)?action.data.prePostMonitorings:state.prePostMonitorings,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_PRE_POST_MONITORING:
      return {
        ...state,
        prePostMonitorings: [action.data, ...state.prePostMonitorings],
        toDisplay: [action.data, ...state.prePostMonitorings],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_PRE_POST_MONITORING_DETAIL:
      return {
        ...state,
        prePostMonitoring: {...action.detail.prePostMonitoring[0]}
      }

    case SET_PRE_POST_MONITORING_VALUE:
      temp = {...state.prePostMonitoring};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      return {
        ...state,
        prePostMonitoring: {...temp}
      }

    case SET_PRE_POST_MONITORING_DEFAULT:
      return {
        ...state,
        prePostMonitoring: SpreadOps({...state.prePostMonitoringDefault}),
      }

    default:
      return state

  }
}
