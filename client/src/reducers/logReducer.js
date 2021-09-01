import {
  DISPLAY_LOGS,
  LOGS_COUNT,
  ADD_NEW_LOG,
  GET_LOG,
  LOG_VIEWED,
  LOG_RESOLVED,
  SET_LOG_COMMENT,
  SET_USER_COMMENT
} from '../actions/types';

const initialState = {
  logs: [],
  logsCount: {
    resolved: 0,
    unresolved: 0,
    viewed: 0,
    unviewed: 0,
  },
  currentLog: {},
  userComment: ""
};

var temp;

export default function(state = initialState, action) {

  switch (action.type) {
// ============================================ TRICYCLE ============================================
    case DISPLAY_LOGS:
      if (!action.logsCount){
        action.logsCount = {...state.logsCount};
      }
      return {
        ...state,
        logs: [...action.logs],
        logsCount: action.logsCount
      }

    case ADD_NEW_LOG:
      return {
        ...state,
        logs: [action.log, ...state.logs],
        logsCount: {
          ...state.logsCount,
          unresolved: state.logsCount.unresolved + 1,
          unviewed: state.logsCount.unviewed + 1
        }
      }

    case GET_LOG:
      return {
        ...state,
        currentLog: {...state.logs[action.index]}
      }

    case LOG_VIEWED:
      var tempLogs = [...state.logs];
      tempLogs[action.index].viewed = 1;

      return {
        ...state,
        logs: [...tempLogs],
        logsCount: {
          ...state.logsCount,
          viewed: state.logsCount.viewed + 1,
          unviewed: state.logsCount.unviewed - 1
        }
      }

    case LOG_RESOLVED:
      tempLogs = [...state.logs];
      tempLogs.forEach((l) => {
        if (l._id == action.id) {
          l.resolved = 1;
        }
      });

      return {
        ...state,
        logs: [...tempLogs],
        logsCount: {
          ...state.logsCount,
          resolved: state.logsCount.resolved + 1,
          unresolved: state.logsCount.unresolved - 1
        }
      }

    case SET_LOG_COMMENT:
      tempLogs = [...state.logs];
      tempLogs.forEach((l) => {
        if (l._id == action.value.id) {
          l.comment = action.value.comment;
        }
      });
      return {
        ...state,
        logs: [...tempLogs],
        currentLog: {
          ...state.currentLog,
          comment: action.value.comment
        }
      }

    case SET_USER_COMMENT:
      return {
        ...state,
        userComment: action.value
      }
// ============================================ TRICYCLE (CLOSE) ============================================

    default:
      return state

  }
}
