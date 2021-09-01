import {
  SET_VACCINATION_SITESS,
  SET_SEARCHED_VACCINATION_SITESS,
  ADD_NEW_VACCINATION_SITES,
  SET_VACCINATION_SITES_DETAIL,
  SET_VACCINATION_SITES_VALUE,
  SET_VACCINATION_SITES_DEFAULT,
  SET_VACCINATION_TO_UPLOAD_LIST,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  vaccinationSitess: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  vaccinationSites: {},

  vaccinationSitesDefault: {
    vaccinationSitesID: '',
    code: '',
    codeShort: '',
    name: '',
    type: '',
    ownership: '',
    address: '',
    supervisor: '',
    representativeStaff: '',
    inventoryStaff: '',
    status: '',
    inactiveNote: '',
    numberOfTeams: '',
    addedBy: '',
    dateReported: '',
    updatedBy: '',
    dateUpdated: '',
  },

};

var temp = '';
initialState.vaccinationSites = SpreadOps({...initialState.vaccinationSitesDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_VACCINATION_SITESS:
      return {
        ...state,
        searched: action.data.vaccinationSitess,
        toDisplay: action.data.vaccinationSitess,
        sCount: action.data.count,
        count: action.data.count,
        page: action.page
      }

    case SET_VACCINATION_SITESS:
      return {
        ...state,
        vaccinationSitess: (action.data)?action.data.vaccinationSitess:state.vaccinationSitess,
        toDisplay: (action.data)?action.data.vaccinationSitess:state.vaccinationSitess,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_VACCINATION_SITES:
      return {
        ...state,
        vaccinationSitess: [action.data, ...state.vaccinationSitess],
        toDisplay: [action.data, ...state.vaccinationSitess],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_VACCINATION_SITES_DETAIL:
      return {
        ...state,
        vaccinationSites: {...action.detail.vaccinationSites[0]}
      }

    case SET_VACCINATION_SITES_VALUE:
      temp = {...state.vaccinationSites};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      return {
        ...state,
        vaccinationSites: {...temp}
      }

    case SET_VACCINATION_SITES_DEFAULT:
      return {
        ...state,
        vaccinationSites: SpreadOps({...state.vaccinationSitesDefault}),
      }

    case SET_VACCINATION_TO_UPLOAD_LIST:
      return {
        ...state,
        toBeUploaded: [...action.data],
      }      

    default:
      return state

  }
}
