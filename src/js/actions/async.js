import API from '../api';
import { undiscussion_list } from '../reducers/discussion';
import { processBootstrap, processDiscussionList, processUnDiscussionList, updateDiscussion, showArgument,
         fetchTrans, loading, setShouldSkipUpdate, setAutoUpdateLoading } from './app';


export function bootstrapApp(articleId=null, isSilent=false) {
  return (dispatch, getState) => {
    if(!isSilent) {
      dispatch(loading(true))
    }
    dispatch(setAutoUpdateLoading(true))
    API.bootstrap(articleId).then(resp => {
      const { shouldSkipUpdate } = getState().app;
      if(!shouldSkipUpdate) {
        dispatch(processBootstrap(resp))
      } else {
        dispatch(setShouldSkipUpdate(false))
      }

      if(articleId != null)
        API.get_undiscussion_list().then(resp=>{dispatch(processUnDiscussionList(resp))})
    })    
  } 
}

export function getDiscussionList(url) {
  return dispatch => API.get_discussion_list(url).then(resp => dispatch(processDiscussionList(resp)));
}

export function getUnDiscussionList() {
  return dispatch => API.get_undiscussion_list().then(resp => dispatch(processUnDiscussionList(resp)));
}

export function reloadDiscussion(articleId) {
  return (dispatch, getState) =>
    API.get_discussion(articleId || window.brabbl.articleId)
      .then(resp => {
        console.log("reaload_discussion");
        const { isAutoUpdateFetchInProgress }  = getState().app;
        if(isAutoUpdateFetchInProgress) {
          dispatch(setShouldSkipUpdate(true))
        }
        dispatch(updateDiscussion(resp))        
        console.log("call_get_undiscussion");
        return API.get_undiscussion_list();
      })
      .then(resp=>{
        console.log("undiscussion_list_resp");
        console.log(resp);
        dispatch(undiscussion_list(resp))
      });
}

export function fetchArgument(id) {
  return dispatch => API.get_argument(id).then(resp => dispatch(showArgument(resp)));
}

export function loadTrans() {
  return dispatch => API.get_trans().then(resp => dispatch(fetchTrans(resp)));
}