import {
  SET_DOH_CHD_PERSONNELS,
  SET_DOH_CHD_PERSONNEL_DETAIL,
  SET_SEARCHED_DOH_CHD_PERSONNELS,
  SET_DOH_CHD_PERSONNEL_DEFAULT,
  SET_DOH_CHD_SEARCHED_PERSONNELS,
  ADD_NEW_DOH_CHD_PERSONNEL,
  SET_DOH_CHD_PERSONNEL_VALUE,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  DOHCHDPersonnels: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  DOHCHDPersonnel: {},

  DOHCHDPersonnelDefault: {

    DOHCHDPersonnelID : "",
    category : "",
    categoryID : "",
    categoryIDNumber : "",
    philHealthID : "",
    pwdID : "",
    name : {
      first: "",
      mid: "",
      last: "",
      suffix: "",
    },
    contactNo : "",
    address : {
      fullAddress: "",
      region: "",
      province: "",
      munCity: "",    
      barangay: "",    
    },
    sex : "",
    birthdate : new Date(),
    status : "",
    employment : {
      employed: "",
      profession: "",
      employerName: "",
      employerLGU: "",
      employerAddress: "",
      contactNo: "",
    },
    covidDetails: {
      directCovid: "",
      covidHistory: "",
      covidDate: new Date(),
      classification: "",
    },
  
    allergy: {
      drug: "",
      food: "",
      insect: "",
      latex: "",
      mold: "",
      pet: "",
      pollen: "",
    },
  
    comorbidities: {
      with: "",
      hypertension: "",
      heartDisease: "",
      kidneyDisease: "",
      diabetesMellitus: "",
      bronchialAsthma: "",
      immunodeficiencyStatus: "",
      cancer: "",
      others: "",
    },
    
    pregStatus: "",
    consent: "",
  
  },

};

var temp = '';
initialState.DOHCHDPersonnel = SpreadOps({...initialState.DOHCHDPersonnelDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_DOH_CHD_PERSONNELS:
      return {
        ...state,
        searched: action.data.hfPersonnels,
        toDisplay: action.data.hfPersonnels,
        sCount: action.data.count,
        count: action.data.count,
        page: action.page
      }

    case SET_DOH_CHD_PERSONNELS:
      console.log(":::::::::::::::::::::::------------");
      console.log(action);
      return {
        ...state,
        DOHCHDPersonnels: (action.data)?action.data.hfPersonnels:state.DOHCHDPersonnels,
        toDisplay: (action.data)?action.data.hfPersonnels:state.DOHCHDPersonnels,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_DOH_CHD_PERSONNEL:
      return {
        ...state,
        DOHCHDPersonnels: [action.data, ...state.DOHCHDPersonnels],
        toDisplay: [action.data, ...state.DOHCHDPersonnels],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_DOH_CHD_PERSONNEL_DETAIL:
      return {
        ...state,
        DOHCHDPersonnel: {...action.detail.DOHCHDPersonnel[0]}
      }

    case SET_DOH_CHD_PERSONNEL_VALUE:
      temp = {...state.DOHCHDPersonnel};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      return {
        ...state,
        DOHCHDPersonnel: {...temp}
      }

    case SET_DOH_CHD_PERSONNEL_DEFAULT:
      return {
        ...state,
        DOHCHDPersonnel: SpreadOps({...state.DOHCHDPersonnelDefault}),
      }
      

    default:
      return state

  }
}
