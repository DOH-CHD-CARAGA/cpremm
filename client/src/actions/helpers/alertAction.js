import { TOGGLE_ALERT } from '../types';
import axios from 'axios';


export const ToggleAlert = (type, msg, val) => dispatch => {
  console.log("::::::");
  dispatch({
    type: TOGGLE_ALERT,
    resType: type,
    msg: msg,
    value: val
  })
}

export const Nigate = () => getState => {
  const store = getState();

  store.alert.toggle = false;
}
