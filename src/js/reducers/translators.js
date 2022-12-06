import { FETCH_TRANSLATION } from '../constants';


function translators(state = [], action) {
  switch (action.type) {
    case FETCH_TRANSLATION:
      return action.resp;// .translators;
    default:
      return state;
  }
}
export default translators;
