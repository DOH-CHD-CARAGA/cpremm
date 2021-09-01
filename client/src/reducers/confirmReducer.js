import { TOGGLE_CONFIRMATION } from '../actions/types';

const initialState = {
  show: false,
};


export default function(state = initialState, action) {
  switch (action.type) {

    case TOGGLE_CONFIRMATION:
      return {
        ...state,
        show: (action.hasOwnProperty("show"))?action.show:!state.show,
      }

    default:
      return state

  }
}
