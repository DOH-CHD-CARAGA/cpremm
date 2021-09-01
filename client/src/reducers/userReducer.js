import {
  SET_USER,
  SET_EMPLOYEES,
  SET_ROLES,
  SET_USERS,
  SET_SEARCHED_USERS,
  SET_USER_DETAIL,
  SET_USER_DEFAULT,
  ADD_NEW_USER,
  SET_USER_VALUE,
  PASSWORD_CHECKED,
} from '../actions/types';
import { SetRegValueHelper, SpreadOps } from './reducer-helper';

const initialState = {
  name: '',
  role: [],
  username: '',
  employees: [],

  roles: [],

  users: [],
  searched: [],
  toDisplay: [],
  gCount: 0,
  sCount: 0,
  count: 0,
  page: 1,
  user: {},

  userDefault: {
    username: "",
    name: {
      first: "",
      mid: "",
      last: "",
    },
    role: {},
    designation: "",
    status: "",
    office: {},
    userId: "",
  },

  passwordChecked: false,
};

var temp;
initialState.supplier = SpreadOps({ ...initialState.supplierDefault });

export default function (state = initialState, action) {
  switch (action.type) {

    case PASSWORD_CHECKED:
      return {
        ...state,
        passwordChecked: action.bool
      }

    case SET_USER:
      return {
        ...state,
        name: action.name,
        role: action.role,
        username: action.username
      }

    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees
      }

    case SET_ROLES:
      return {
        ...state,
        roles: action.roles
      }

    case SET_SEARCHED_USERS:
      return {
        ...state,
        searched: action.data.users,
        toDisplay: action.data.users,
        sCount: action.data.count,
        count: action.data.count,
        page: (action.page) ? action.page : 1
      }

    case SET_USERS:
      return {
        ...state,
        users: (action.data) ? action.data.users : state.users,
        toDisplay: (action.data) ? action.data.users : state.users,
        gCount: (action.data) ? action.data.count : state.gCount,
        count: (action.data) ? action.data.count : state.gCount,
        page: (action.page) ? action.page : 1
      }

    case SET_USER_DETAIL:
      return {
        ...state,
        user: { ...action.detail.user[0] }
      }

    case SET_USER_VALUE:
      temp = { ...state.user };
      temp = SetRegValueHelper(temp, action.value, action.props, action.props.length, 0);

      return {
        ...state,
        user: { ...temp }
      }

    case SET_USER_DEFAULT:
      return {
        ...state,
        user: SpreadOps({ ...state.userDefault }),
      }

    default:
      return state

  }
}
