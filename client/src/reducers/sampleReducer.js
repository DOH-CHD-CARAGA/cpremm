import { SAMPLE } from '../actions/types';

const initialState = {
    sample1:"sampl1",
    sample2:"sampl2"
};


export default function(state = initialState, action) {
  switch (action.type) {
    case SAMPLE:
        console.log(action);
        return {
            ...state,
            sample1:action.value,
            sample2:action.name
        }

    default:
      return state
  }
}
