import {
  SET_ROLES,
  SET_SEARCHED_ROLES,
  ADD_NEW_ROLE,
  SET_ROLE_DETAIL,
  SET_ROLE_VALUE,
  SET_ROLE_DEFAULT,
  SET_ROLE_NEW_ROUTE,
  SET_ROLE_REMOVE_ROUTE,
  SET_ROLE_NEW_SYSTEM,
  SET_ROLE_REMOVE_SYSTEM,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {

  roles: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  role: {},

  roleDefault: {
    name: "",
    routes: [],
    systems: [],
  },

};

var temp = "";
initialState.role = SpreadOps({...initialState.roleDefault});

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_SEARCHED_ROLES:
      return {
        ...state,
        searched: action.data.roles,
        toDisplay: action.data.roles,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page)?action.page:1
      }


    case SET_ROLES:
      return {
        ...state,
        roles: (action.data)?action.data.roles:state.roles,
        toDisplay: (action.data)?action.data.roles:state.roles,
        gCount: (action.data)?action.data.count:state.gCount,
        count: (action.data)?action.data.count:state.gCount,
        page: (action.page)?action.page:1
      }

    case ADD_NEW_ROLE:
      return {
        ...state,
        roles: [action.data, ...state.roles],
        toDisplay: [action.data, ...state.roles],
        gCount: state.gCount + 1,
        count: state.count + 1
      }

    case SET_ROLE_DETAIL:
      console.log(action);
      return {
        ...state,
        role: {...action.detail.role[0]}
      }
      
    case SET_ROLE_REMOVE_ROUTE:
      temp = [...state.role.routes];

      temp = temp.filter((route, i) => i != action.ind)

      return {
        ...state,
        role: {
          ...state.role,
          routes: [...temp]
        }
      }
      
    case SET_ROLE_REMOVE_SYSTEM:
      temp = [...state.role.systems];

      temp = temp.filter((system, i) => i != action.ind)

      return {
        ...state,
        role: {
          ...state.role,
          systems: [...temp]
        }
      }

    case SET_ROLE_NEW_ROUTE:
      temp = [...state.role.routes];
      temp.push({path: action.route});
      return {
        ...state,
        role: {
          ...state.role,
          routes: [...temp]
        }
      }

    case SET_ROLE_NEW_SYSTEM:
      temp = (state.role.systems)?[...state.role.systems]:[];
      temp.push({path: action.system});
      return {
        ...state,
        role: {
          ...state.role,
          systems: [...temp]
        }
      }
      
    case SET_ROLE_VALUE:
      temp = {...state.role};
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        role: {...temp}
      }


    case SET_ROLE_DEFAULT:
      return {
        ...state,
        role: SpreadOps({...state.roleDefault}),
      }
  

    default:
      return state

  }
}
