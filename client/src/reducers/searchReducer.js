import {
    CHANGE_SEARCH_VAL,
    SET_SEARCH_SUGGESTIONS,
    SET_SEARCH_DATA
  } from '../actions/types';
  
  const initialState = {
    type: "",
    keyword: "",
    suggestions: []
  };
  
  
  export default function(state = initialState, action) {
    switch (action.type) {
  
      case SET_SEARCH_DATA:
        return {
          ...state,
          keyword: "",
          suggestions: []
        }
  
      case SET_SEARCH_SUGGESTIONS:
        return {
          ...state,
          suggestions: action.data,
        }
  
      case CHANGE_SEARCH_VAL:
        return {
          ...state,
          [action.vtype]: action.value,
        }
  
      default:
        return state
  
    }
  }
  