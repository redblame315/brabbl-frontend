// Actions
export const SHOW_STATEMENT = 'SHOW_STATEMENT';
export const SHOW_ARGUMENT = 'SHOW_ARGUMENT';
export const SHOW_SURVEY = 'SHOW_SURVEY';
export const UPDATE_DISCUSSION = 'UPDATE_DISCUSSION';
export const BOOTSTRAP = 'BOOTSTRAP';
export const LOADING = 'LOADING';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';
export const FILTER_DISCUSSIONS = 'FILTER_DISCUSSIONS';
export const FILTER_DISCUSSIONS_BY_RELEVANCE = 'FILTER_DISCUSSIONS_BY_RELEVANCE';
export const SORT_ARGUMENTS = 'SORT_ARGUMENTS';
export const SORT_SURVEY = 'SORT_SURVEY';
export const SHOW_MORE_ARGUMENTS = 'SHOW_MORE_ARGUMENTS';
export const FETCH_TRANSLATION = 'FETCH_TRANSLATION';
export const PROCESS_DISCUSSION_LIST = 'PROCESS_DISCUSSION_LIST';
export const UPDATE_DISCUSSION_PARTICIPANTS = 'UPDATE_DISCUSSION_PARTICIPANTS';
export const SET_AUTO_UPDATE_LOADING = 'SET_AUTO_UPDATE_LOADING'
export const SET_SHOULD_SKIP_UPDATE = 'SET_SHOULD_SKIP_UPDATE'
export const NAVIGATE_VIEW = 'NAVIGATE_VIEW';

// Discussion status
export const DISCUSSION_HAS_NOT_STARTED = 'DISCUSSION_HAS_NOT_STARTED';
export const DISCUSSION_STARTED = 'DISCUSSION_STARTED';
export const DISCUSSION_COMPLETED = 'DISCUSSION_COMPLETED';

// Modals
export const MODAL_LOGIN = 'LOGIN';
export const MODAL_SIGNUP = 'SIGNUP';
export const MODAL_DISCUSSION = 'DISCUSSION';
export const MODAL_PASSWORD = 'PASSWORD_RESET';
export const MODAL_ARGUMENT_PRO = 'ARGUMENT_PRO';
export const MODAL_ARGUMENT_CONTRA = 'ARGUMENT_CONTRA';
export const MODAL_ARGUMENT_EDIT = 'ARGUMENT_EDIT';
export const MODAL_STATEMENT = 'STATEMENT';
export const MODAL_PROFILE = 'PROFILE';
export const MODAL_DISCUSSION_LIST = 'DISCUSSION_LIST';
export const MODAL_MEDIA = 'MEDIA';
export const MODAL_IFRAME = 'IFRAME';
export const MODAL_BAROMETER = 'BAROMETER';
export const MODAL_DATAPOLICY = 'DATA_POLICY';
export const MODAL_DELETE_DISCUSSION = 'DELETE_DISCUSSION';
export const MODAL_RESET_DISCUSSION = 'RESET_DISCUSSION';
export const MODAL_EXPORT_DISCUSSION = 'EXPORT_DISCUSSION';
export const MODAL_EXPORT_STATISTICS = 'EXPORT_STATISTICS';
export const MODAL_DELETE_STATEMENT = 'DELETE_STATEMENT';
export const MODAL_PRIVATE_INVITE = 'PRIVATE_INVITE_LIST';


// Views
export const VIEW_LOGIN = 'login';
export const VIEW_SIGNUP = 'signup';
export const VIEW_LOST_PASSWORD = 'loss-password';
export const VIEW_DISCUSSION_LIST = 'list';
export const VIEW_DISCUSSION_DETAIL = 'detail';

export const BY_DATE = 'BY_DATE';
export const BY_RELEVANCE = 'BY_RELEVANCE';
export const BY_USER_RATING = 'BY_USER_RATING';
export const BY_VOTES = 'BY_USER_RATING';
export const ONLY_ARGUMENTS = 'ONLY_ARGUMENTS';
export const ONLY_BAROMETER = 'ONLY_BAROMETER';
export const SURVEY = 'SURVEY';
export const DISCUSSION = 'DISCUSSION';
export const ARGUMENTS_AND_BAROMETER = 'ARGUMENTS_AND_BAROMETER';
export const PRO = true;
export const CONTRA = false;

// INTERFACE STRINGS
export const MSG_ORDER_BY_DATE = 'sort by date';
export const MSG_ORDER_BY_USER_RATING = 'sort by personal review';
export const MSG_ORDER_BY_VOTES = 'sorted by own rating';
export const MSG_ORDER_BY_AVERAGE_RATING = 'sort by average rating';

// DISCUSSION LIST SEARCH BY
export const DISCUSSION_LIST_SEARCH_BY_SHOW_ALL = 1;
export const DISCUSSION_LIST_SEARCH_BY_ANY_TAG = 2;
export const DISCUSSION_LIST_SEARCH_BY_ALL_TAGS = 3;

// MEDIA TYPES
export const MEDIA_TYPE_IMAGE = 'image';
export const MEDIA_TYPE_YOUTUBE = 'youtube';

// PERMISSIONS
export const CAN_ADD_DISCUSSION = 'add_discussion';
export const CAN_CHANGE_DISCUSSION = 'change_discussion';
export const CAN_CHANGE_DISCUSSION_LIST = 'change_discussionlist';
export const CAN_CHANGE_ARGUMENT = 'change_argument';
export const CAN_ADD_STATEMENT = 'add_statement';
export const CAN_CHANGE_STATEMENT = 'change_statement';
export const CAN_CHANGE_USER = 'change_user';
export const CAN_ADD_TAG = 'add_tag';

// IFRAME TYPES
export const IFRAME_USERLIST = 'userlist';

// CUSTOME SETTINGS
export const DISPLAY_USERNAME = 1;
export const DISPLAY_NAME_LAST_NAME = 2;

// ARGUMENT STATUSES
export const ARGUMENT_STATUS_ACTIVE = 1;
export const ARGUMENT_STATUS_HIDDEN = 2;

// ARGUMENT STATUSES
export const STATEMENT_STATUS_ACTIVE = 1;
export const STATEMENT_STATUS_HIDDEN = 2;

// BAROMETER BEHAVIOR

export const BAROMETER_BEHAVIOR_ALWAYS_SHOW = 1;
export const BAROMETER_BEHAVIOR_ONLY_FOR_VOTED_USER = 2;
export const BAROMETER_BEHAVIOR_ONLY_FOR_VOTED_USER_OR_ADMIN = 3;
