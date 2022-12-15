import { combineReducers } from 'redux';
import notification from './notification';
import translators from './translators';
import modal from './modal';
import alert from './alert';
import argument from './argument';
import { discussions, discussion, undiscussion_list, discussion_list, discussion_participants } from './discussion'; //TODO:add undiscussion_list for news [Blame 12/09]
import user from './user';
import customer from './customer';
import moment from 'moment';
import { SHOW_STATEMENT, SHOW_ARGUMENT, SHOW_SURVEY, BOOTSTRAP, PROCESS_DISCUSSION_LIST, PROCESS_UNDISCUSSION_LIST,
  SORT_ARGUMENTS, SHOW_MORE_ARGUMENTS, BY_RELEVANCE, FILTER_DISCUSSIONS, FILTER_DISCUSSIONS_BY_RELEVANCE,
  SORT_SURVEY, FETCH_TRANSLATION, NAVIGATE_VIEW, LOADING,
  SET_AUTO_UPDATE_LOADING, SET_SHOULD_SKIP_UPDATE } from '../constants';

const getDefaultView = () => {
  return (window.brabbl.articleId ? 'detail' : window.brabbl.deeplink || window.brabbl.view) || 'detail';
}

const initialState = {
  statementId: window.brabbl.statementId || null,
  loading: true,
  isDiscussed: false,
  tags: [],
  discussionFilter: null,
  view: getDefaultView(),
  articleId: window.brabbl.articleId || null,
  argumentOrder: BY_RELEVANCE,
  surveyOrder: BY_RELEVANCE,
  argumentLimit: 999,
  argumentId: null,
  appVersionNumber: window.brabbl.appVersionNumber,
  backendVersionNumber: '',
  isAutoUpdateFetchInProgress: false,
  shouldSkipUpdate: false,
  lastUpdated: moment().utc()
};

function app(state = initialState, action) {
  switch (action.type) {
    case NAVIGATE_VIEW:
      let params = { }
      if(action.articleId != undefined) {
        params.articleId = action.articleId
      }
      if(action.statementId != undefined) {
        params.statementId = action.statementId
      } else {
        params.statementId = null
      }
      params.view = action.view
      return { ...state, ...params }
    case SHOW_STATEMENT:
      return { ...state, statementId: action.id, argumentId: null };
    case SHOW_ARGUMENT:
      return {
        ...state,
        argumentId: action.argument.id,
      };
    case SHOW_SURVEY:
      return { ...state, statementId: null, argumentId: null };
    case SORT_ARGUMENTS:
      return { ...state, argumentOrder: action.order };
    case SORT_SURVEY:
      return { ...state, surveyOrder: action.order };
    case SHOW_MORE_ARGUMENTS:
      return { ...state, argumentLimit: action.limit };
    case FILTER_DISCUSSIONS:
      return { ...state, discussionFilter: action.tag };
    case FILTER_DISCUSSIONS_BY_RELEVANCE:
      return { ...state, discussionFilterByRelevance: action.relevance };
    case FETCH_TRANSLATION:
      return { ...state, translate: action.resp };
    case PROCESS_DISCUSSION_LIST:
      return { ...state, discussion_list: action.resp };
    case PROCESS_UNDISCUSSION_LIST:
      return { ...state, undiscussion_list: action.resp };
    case LOADING:
      return { ...state, loading: action.isLoading};
    case SET_AUTO_UPDATE_LOADING:
      return { ...state, isAutoUpdateFetchInProgress: action.flag }
    case SET_SHOULD_SKIP_UPDATE: 
      return { ...state, shouldSkipUpdate: action.flag}
    case BOOTSTRAP:
      return {        
        ...state,
        loading: false,
        backendVersionNumber: action.resp.backendVersionNumber,
        isDiscussed: action.resp.discussion !== null,
        tags: action.resp.tags.map(t => t.name),
        isAutoUpdateFetchInProgress: false,
        shouldSkipUpdate: false,
        lastUpdated: moment().utc()
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app,
  discussion,
  discussions,
  discussion_list,  
  undiscussion_list, //TODO:add undiscussion_list for news [Blame 12/09]
  discussion_participants,
  argument,
  notification,
  user,
  customer,
  modal,
  alert,
  translators,
});

export default rootReducer;
