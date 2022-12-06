import { SHOW_ALERT, HIDE_ALERT } from '../constants';

const initialState = {
  hidden: true,
  data: {},
};

function alert(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        hidden: false,
        data: action.data || {},
      };
    case HIDE_ALERT:
      return { ...state, hidden: true };
    default:
      return state;
  }
}

export default alert;
