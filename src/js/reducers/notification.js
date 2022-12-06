import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../constants';

const initialState = {
  text: '',
  hidden: true,
  style: 'default',
};

function notification(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { ...state, hidden: false, text: action.text };
    case HIDE_NOTIFICATION:
      return { ...state, hidden: true, text: '' };
    default:
      return state;
  }
}

export default notification;
