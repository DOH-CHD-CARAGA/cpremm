import {
  SOCKET_CONNECT,
} from '../actions/types';

const initialState = {
  socket: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
// ============================================ TRICYCLE ============================================
    case SOCKET_CONNECT:
      console.log("====================================================================================" + action.socket.id);
      return {
        ...state,
        socket: action.socket
      }

    default:
      return state
  }
}
