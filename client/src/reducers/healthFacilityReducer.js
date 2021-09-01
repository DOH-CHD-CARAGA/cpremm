import {
  SET_HEALTH_FACILITYS,
  SET_SEARCHED_HEALTH_FACILITYS,
  ADD_NEW_HEALTH_FACILITY,
  SET_HEALTH_FACILITY_DETAIL,
  SET_HEALTH_FACILITY_VALUE,
  SET_HEALTH_FACILITY_DEFAULT,
  SET_HF_UPLOAD_DETAILS_VALUE,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  healthFacilitys: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  healthFacility: {},
  toBeUploaded: [],
  resetUpload: false,

  healthFacilityDefault: {
    healthFacilityID: '',
    region: 'CARAGA',
    province: '',
    munCity: '',
    category: '',
    ownership: '',
    name: '',
    contact: '',
    email: '',
    focals: [],
  },

};

var temp = '';
initialState.healthFacility = SpreadOps({...initialState.healthFacilityDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_HEALTH_FACILITYS:
      return {
        ...state,
        searched: action.data.healthFacilitys,
        toDisplay: action.data.healthFacilitys,
        sCount: action.data.count,
        count: action.data.count,
        page: action.page
      }

    case SET_HEALTH_FACILITYS:
      return {
        ...state,
        healthFacilitys: (action.data)?action.data.healthFacilitys:state.healthFacilitys,
        toDisplay: (action.data)?action.data.healthFacilitys:state.healthFacilitys,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_HEALTH_FACILITY:
      return {
        ...state,
        healthFacilitys: [action.data, ...state.healthFacilitys],
        toDisplay: [action.data, ...state.healthFacilitys],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_HEALTH_FACILITY_DETAIL:
      return {
        ...state,
        healthFacility: {...action.detail.healthFacility[0]}
      }

    case SET_HEALTH_FACILITY_VALUE:
      temp = {...state.healthFacility};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      return {
        ...state,
        healthFacility: {...temp}
      }

    case SET_HEALTH_FACILITY_DEFAULT:
      return {
        ...state,
        healthFacility: SpreadOps({...state.healthFacilityDefault}),
      }

    case SET_HF_UPLOAD_DETAILS_VALUE:
      return {
        ...state,
        toBeUploaded: [...action.data],
      }

    default:
      return state

  }
}
