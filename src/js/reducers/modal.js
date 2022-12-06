import { SHOW_MODAL, BOOTSTRAP, UPDATE_DISCUSSION, HIDE_MODAL } from '../constants';

const initialState = {
  modal: null,
  hidden: true,
  data: {},
};

function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        hidden: false,
        modal: action.modal,
        data: action.data || {},
      };
    case HIDE_MODAL:
      return { ...state, hidden: true };
    case BOOTSTRAP:
    case UPDATE_DISCUSSION:
      return { ...state, hidden: true, modal: null, data: {} };
    default:
      return state;
  }
}

export default modal;
