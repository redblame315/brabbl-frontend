import { BOOTSTRAP, UPDATE_DISCUSSION, PROCESS_DISCUSSION_LIST,
         UPDATE_DISCUSSION_PARTICIPANTS } from '../constants';


function discussion(state = null, action) {
  switch (action.type) {
    case BOOTSTRAP:
      return action.resp.discussion;
    case UPDATE_DISCUSSION:
      return action.resp.discussion;
    default:
      return state;
  }
}

function discussions(state = [], action) {
  switch (action.type) {
    case BOOTSTRAP:
      return action.resp.discussions;
    default:
      return state;
  }
}

function discussion_list(state = [], action) {
  switch (action.type) {
    case PROCESS_DISCUSSION_LIST:
      return action.resp.discussion_list;
    case BOOTSTRAP:
      return action.resp.discussion_list;
    default:
      return state;
  }
}
function discussion_participants(state= [], action) {
  switch(action.type) {
    case BOOTSTRAP:
      return action.resp.discussion_participants;
    case UPDATE_DISCUSSION_PARTICIPANTS:
      return action.data
    default:
      return state;
  }
}
export { discussion, discussions, discussion_list, discussion_participants };
