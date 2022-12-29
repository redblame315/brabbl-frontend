import { BOOTSTRAP, UPDATE_DISCUSSION, PROCESS_DISCUSSION_LIST, PROCESS_UNDISCUSSION_LIST,
         UPDATE_DISCUSSION_PARTICIPANTS, 
         PROCESS_UNDISCUSSION_LIST_DETAIL} from '../constants';


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

//TODO:add undiscussion_list function to get news from action [Blame 12/09]
function undiscussion_list(state = [], action) {
  switch (action.type) {
    case PROCESS_UNDISCUSSION_LIST:
      return action.resp.undiscussion_list;
    case BOOTSTRAP:
      return action.resp.undiscussion_list;
    default:
      return state;
  }
}

function undiscussion_detail_list(state = [], action) {
  switch (action.type) {
    case PROCESS_UNDISCUSSION_LIST_DETAIL:
      return action.resp.undiscussion_detail_list;
    case BOOTSTRAP:
      return action.resp.undiscussion_detail_list;
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
export { discussion, discussions, undiscussion_list, discussion_list, discussion_participants }; //TODO:add undiscussion_list for news [Blame 12/09]
