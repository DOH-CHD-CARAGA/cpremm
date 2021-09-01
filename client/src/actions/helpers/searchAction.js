import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
  CHANGE_SEARCH_VAL,
  SET_SEARCH_SUGGESTIONS,
  SET_SEARCH_DATA,
  DISPLAY_SEARCH_RESULT,
} from '../types';
import axios from 'axios';
import { SERVER_API, SERVER_URI, JWT } from '../../config';

import {
  GetObjectPropValue
} from './displayAction';

export const SearchData = (suggest, api, type, keyword="", reducer, reducer_empty, select, find, sort, page = 1, count = 10, withLoading=false) => (dispatch, getState) => {
  console.log("*&&&&&&&&&&&&&&&&&!!!!!!!!!!!!!!!!!");
  console.log({
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(JWT)}`
    },
    params: {
      value: {
        props: type,
        keyword: keyword,
      },
      filters: {
        page: page,
        count: count,
        find: find,
        sort: sort,
        select: select
      }
    }
  });
  if (true){

    const alert = getState().alert;

    if (withLoading) {
      if (!alert.show) {
        dispatch({
          type: TOGGLE_ALERT,
          resType: "loading",
          msg: ""
        })
      } else {
        dispatch({
          type: CHANGE_ALERT,
          resType: "loading",
          msg: "Searching"
        })
      }  
    }

    axios({
      url: `${SERVER_API}/${api}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      params: {
        value: {
          props: type,
          keyword: keyword,
        },
        filters: {
          page: page,
          count: count,
          find: find,
          sort: sort,
          select: select
        }
      }
    })
    .then((res) =>{
      console.log("-----------------------------------<<<>>");
      console.log(res);
      GetObjectPropValue(res.data.data, "", "array")();

      const alert2 = getState().alert;

      if (res.data.status) {
        if (suggest){
          dispatch({
            type: SET_SEARCH_SUGGESTIONS,
            data: GetObjectPropValue(res.data.data, "", "array")()
          });
        }else {
          dispatch({
            type: reducer,
            data: res.data.data,
            page: page,
          });
        }

        if (withLoading) {
          if (!alert2.show) {
            dispatch({
              type: TOGGLE_ALERT,
              value: true,
              msg: "Search Displayed",
            })
          } else {
            dispatch({
              type: CHANGE_ALERT,
              resType: "success",
              msg: "Search Displayed"
            })
          }
        }
  

        return true;
      }
    })
    .catch(err => {
    });
  }else {
    dispatch({
      type: SET_SEARCH_SUGGESTIONS,
      data: []
    });

    if (reducer_empty){
      dispatch({
        type: reducer_empty
      });
    }
  }
}

export const GetSearchDetail = (api, id, reducer, callback = () => {}) => async (dispatch) => {
  callback(dispatch);
  await axios({
    url: `${SERVER_API}/${api}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(JWT)}`
    },
    params: {
      id: id,
    }
  })
  .then((res) =>{
    if (res.data.success){
      dispatch({
        type: reducer,
        data: res.data.data[0]
      });
    }else {
    }
  });
}

export const SelectSearchOption = (reducer, data, page) => async (dispatch) => {

  dispatch({
    type: reducer,
    data: data,
    page: page,
  });

  dispatch({
    type: SET_SEARCH_SUGGESTIONS,
    data: []
  });
}

export const SearchUser = (keyword, type) => (dispatch) => {
  axios({
    url: `${SERVER_API}/report/alluser/search`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(JWT)}`
    },
    params: {
      keyword: keyword,
      type: type
    }
  })
  .then(res => {
      dispatch({
        type: DISPLAY_SEARCH_RESULT,
        passenger: res.data.Passenger,
        driver: res.data.Driver,
      });
  })
  .catch(err => {
    console.log(err);
  });
}
