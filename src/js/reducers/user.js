import { BOOTSTRAP } from '../constants';


function user(state = null, action) {
  switch (action.type) {
    case BOOTSTRAP:
      return action.resp.user;
    default:
      return state;
  }
}

export default user;
