import {
  SET_DUPLICATES,
  SET_SEARCHED_DUPLICATES,
  ADD_NEW_DUPLICATE,
  SET_DUPLICATE_DETAIL,
  SET_DUPLICATE_VALUE,
  SET_DUPLICATE_DEFAULT,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  duplicates: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  duplicate: {},
  duplicateData: {},

  duplicateDefault: {
  },

};

var temp = '';
initialState.duplicate = SpreadOps({...initialState.duplicateDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_DUPLICATES:
      return {
        ...state,
        searched: action.data.duplicates,
        toDisplay: action.data.duplicates,
        sCount: action.data.count,
        count: action.data.count,
        page: action.page
      }

    case SET_DUPLICATES:
      temp = (action.data)?action.data.duplicates:state.duplicates;
      var prov = "", faci = "";
      var provFin = "", faciFin = "";
      var provR = "", faciR = "";
      var arranged = {};

      console.log(":::::::::::::::::::::**^^^^^^^^^^");
      for (let x = 0, len = temp.length; x < len; x++) {
        prov = temp[x].provinces.join("---");
        faci = temp[x].facilities.join("---");
        provR = temp[x].provinces.reverse().join("---");
        faciR = temp[x].facilities.reverse().join("---");

        faciFin = (arranged.hasOwnProperty(prov) && arranged[prov].hasOwnProperty(faciR))?faciR:faci;
        faci = faciFin;

        arranged = {
          ...arranged,
          [prov]: {
            ...(arranged.hasOwnProperty(prov)?arranged[prov]:{}),
            [faci]: [ 
              ...(arranged.hasOwnProperty(prov) && arranged[prov].hasOwnProperty(faci))
                ?arranged[prov][faci]
                :[],
              {...temp[x]}
            ]
          }
        }

      }

      console.log("::::::::___+++");
      console.log(arranged);
      temp = Object.keys(arranged);

      return {
        ...state,
        duplicates: temp,
        toDisplay: temp,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1,
        duplicateData: {...arranged}
      }

    case ADD_NEW_DUPLICATE:
      return {
        ...state,
        duplicates: [action.data, ...state.duplicates],
        toDisplay: [action.data, ...state.duplicates],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_DUPLICATE_DETAIL:
      return {
        ...state,
        duplicate: {...action.detail.duplicate[0]}
      }

    case SET_DUPLICATE_VALUE:
      temp = {...state.duplicate};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      return {
        ...state,
        duplicate: {...temp}
      }

    case SET_DUPLICATE_DEFAULT:
      return {
        ...state,
        duplicate: SpreadOps({...state.duplicateDefault}),
      }

    default:
      return state

  }
}
