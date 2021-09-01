import {
  SET_APP_MODULES,
  SET_SEARCHED_APP_MODULES,
  ADD_NEW_APP_MODULE,
  SET_APP_MODULE_DETAIL,
  SET_APP_MODULE_VALUE,
  SET_APP_MODULE_DEFAULT,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  appModules: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  appModule: {},

  appModuleDefault: {
    appModuleID: "",
    isGenerated: true,  
    moduleType: "main", //main, sub, helper
  
    name: "",
    description: "",
    schemas: [{
      name: "",
      fieldName: "",
      description: "",
      type: "String",
      defaultValue: "",
    }],
  
    addedAt: "",
    createdAt: "",
  },

};

var temp = "";
initialState.appModule = SpreadOps({...initialState.appModuleDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_APP_MODULES:
      return {
        ...state,
        searched: action.data.appModules,
        toDisplay: action.data.appModules,
        sCount: action.data.count,
        count: action.data.count,
        page: action.page
      }


    case SET_APP_MODULES:
      return {
        ...state,
        appModules: (action.data)?action.data.appModules:state.appModules,
        toDisplay: (action.data)?action.data.appModules:state.appModules,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_APP_MODULE:
      return {
        ...state,
        appModules: [action.data, ...state.appModules],
        toDisplay: [action.data, ...state.appModules],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_APP_MODULE_DETAIL:
      console.log(action);
      return {
        ...state,
        appModule: {...action.detail.appModule[0]}
      }

    case SET_APP_MODULE_VALUE:
      temp = {...state.appModule};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        appModule: {...temp}
      }


    case SET_APP_MODULE_DEFAULT:
      return {
        ...state,
        appModule: SpreadOps({...state.appModuleDefault}),
      }
  

    default:
      return state

  }
}
