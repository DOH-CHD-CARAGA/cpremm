import {
  SET_OFFICES,
  SET_SEARCHED_OFFICES,
  ADD_NEW_OFFICE,
  SET_OFFICE_DETAIL,
  SET_OFFICE_VALUE,
  SET_OFFICE_DEFAULT,
} from '../actions/types';

import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  offices: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  office: {},

  officeDefault: {
    officeID: "",
    division: "",
    section: "",
    code: "",
    createdAt: new Date()
  },

};

var temp = "";
initialState.office = SpreadOps({...initialState.officeDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_OFFICES:
      return {
        ...state,
        searched: action.data.offices,
        toDisplay: action.data.offices,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page)?action.page:1
      }

    case SET_OFFICES:
      return {
        ...state,
        offices: (action.data)?action.data.offices:state.offices,
        toDisplay: (action.data)?action.data.offices:state.offices,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_OFFICE:
      return {
        ...state,
        offices: [action.data, ...state.offices],
        toDisplay: [action.data, ...state.offices],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_OFFICE_DETAIL:
      console.log(action);
      return {
        ...state,
        office: {...action.detail.office[0]}
      }

    case SET_OFFICE_VALUE:
      temp = {...state.office};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        office: {...temp}
      }


    case SET_OFFICE_DEFAULT:
      return {
        ...state,
        office: SpreadOps({...state.officeDefault}),
      }
  

    default:
      return state

  }
}
