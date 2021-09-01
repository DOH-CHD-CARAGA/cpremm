import {
  SET_ANNEX_AS,
  SET_SEARCHED_ANNEX_AS,
  ADD_NEW_ANNEX_A,
  SET_ANNEX_A_DETAIL,
  SET_ANNEX_A_VALUE,
  SET_ANNEX_A_DEFAULT,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  annex_as: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  annex_a: {},

  annex_aDefault: {
    annex_aID: '',
    Name: '',
  },

};

var temp = '';
initialState.annex_a = SpreadOps({...initialState.annex_aDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_ANNEX_AS:
      return {
        ...state,
        searched: action.data.annex_as,
        toDisplay: action.data.annex_as,
        sCount: action.data.count,
        count: action.data.count,
        page: action.page
      }

    case SET_ANNEX_AS:
      return {
        ...state,
        annex_as: (action.data)?action.data.annex_as:state.annex_as,
        toDisplay: (action.data)?action.data.annex_as:state.annex_as,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_ANNEX_A:
      return {
        ...state,
        annex_as: [action.data, ...state.annex_as],
        toDisplay: [action.data, ...state.annex_as],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_ANNEX_A_DETAIL:
      return {
        ...state,
        annex_a: {...action.detail.annex_a[0]}
      }

    case SET_ANNEX_A_VALUE:
      temp = {...state.annex_a};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);
      return {
        ...state,
        annex_a: {...temp}
      }

    case SET_ANNEX_A_DEFAULT:
      return {
        ...state,
        annex_a: SpreadOps({...state.annex_aDefault}),
      }

    default:
      return state

  }
}
