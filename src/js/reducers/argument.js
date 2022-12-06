import { SHOW_ARGUMENT } from '../constants';


function argument(state = null, action) {
  switch (action.type) {
    case SHOW_ARGUMENT:
      return action.argument;
    default:
      return state;
  }
}

export default argument;
