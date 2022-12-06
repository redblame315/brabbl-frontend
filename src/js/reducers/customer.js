import { BOOTSTRAP } from '../constants';


function customer(state = null, action) {
  switch (action.type) {
    case BOOTSTRAP:
      return action.resp.customer;
    default:
      return state;
  }
}

export default customer;
