import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DiscussionItem, ListDiscussionItemWrapper } from '../discussion';
import TagSelect from '../tag-select';
import {
  DISCUSSION_LIST_SEARCH_BY_ALL_TAGS,
  DISCUSSION_LIST_SEARCH_BY_ANY_TAG,
  DISCUSSION_LIST_SEARCH_BY_SHOW_ALL,
  CAN_ADD_TAG,
  VIEW_DISCUSSION_DETAIL
} from '../../constants';
import moment from 'moment';
import { IntersecArrays, UserHasPermission } from '../../utils';
import { navigateView } from '../../actions/app.js'
import { deleteUndisussion } from '../../actions/async';

const ListDiscussionItem = ListDiscussionItemWrapper(DiscussionItem);

const sortDiscussions = (discussions) => {
  let current_date = moment().add(15, 'seconds').toJSON();
  let activeDiscussions = discussions.filter(d => (
    d.start_time === undefined || new Date(d.start_time) < new Date(current_date)) && (
    d.end_time === undefined || new Date(d.end_time) > new Date(current_date)));
    activeDiscussions.sort((a, b) => {
      let a_start_time = a.start_time;
      let b_start_time = b.start_time;
      if (a.start_time === undefined) a_start_time = a.created_at
      if (b.start_time === undefined) b_start_time = b.created_at
      return new Date(b_start_time) - new Date(a_start_time)
    });
  let futureDiscussions = discussions.filter(d =>
    d.start_time !== undefined &&  new Date(d.start_time) >  new Date(current_date));
  futureDiscussions.sort((a, b) => {
    return new Date(a.start_time) - new Date(b.start_time)
  });   
  let completedDiscussions = discussions.filter(d =>
    d.end_time !== undefined &&  new Date(d.end_time) <  new Date(current_date));
  completedDiscussions.sort((a, b) => {
    return new Date(b.end_time) - new Date(a.end_time)
  });
  let fullDiscussions = [...activeDiscussions, ...futureDiscussions, ...completedDiscussions ]
  return fullDiscussions
}

const NewsView = (props) => {
  let { discussions, discussion_list, undiscussion_list,
    app: { tags, discussionFilter }, dispatch, user } = props;
  let tagSelector;
  
  //if(undiscussion_list)
  //  discussions = sortDiscussions(undiscussion_list)

  // filter by user selected tags
  if (discussionFilter) {
    discussions = discussions.filter(d => d.tags.indexOf(discussionFilter) > -1);
  }
  // filter by discussion list settings
  if (discussion_list && discussion_list.search_by !== DISCUSSION_LIST_SEARCH_BY_SHOW_ALL) {
    if (discussion_list.search_by === DISCUSSION_LIST_SEARCH_BY_ALL_TAGS) {
      discussions = discussions.filter(
        d => IntersecArrays(d.tags, discussion_list.tags).length === discussion_list.tags.length);
    } else if (discussion_list.search_by === DISCUSSION_LIST_SEARCH_BY_ANY_TAG) {
      discussions = discussions.filter(d => IntersecArrays(d.tags, discussion_list.tags).length > 0);
    }
  }

  if ((!discussion_list.hide_tag_filter_for_users || UserHasPermission(user, CAN_ADD_TAG))
    && tags.length > 0) {
    tagSelector = (
      <TagSelect tags={tags} dispatch={dispatch} />
    );
  }

  
  const onDiscussionClick = (statement) => {

    let { app } = props;
    let url = statement.url + '#brabbl-widget';
    if(statement.url && statement.url != "") {
      window.open(url, "_self")
    } else {
      window.brabbl.articleId = statement.external_id
      window.history.pushState({page: 'discussion-detail'}, 'discussion-detail',
                                "?articleId="+statement.external_id+"&view="+VIEW_DISCUSSION_DETAIL+"#brabbl-widget")
      props.dispatch(navigateView({view: VIEW_DISCUSSION_DETAIL, articleId: statement.external_id}))
    }
    props.dispatch(deleteUndisussion("discussion", statement.external_id));
  }
  return (
    <div>
      <div className="discussion-list-header">
        {tagSelector}
        {/* <TimeLimitSelect dispatch={dispatch} /> */}
        <div className="clearfix"></div>
      </div>
      <div></div>
      <div className="discussion-list-body">
        {discussions.map(discussion =>
          undiscussion_list.discussion.includes(discussion.external_id) &&
          <ListDiscussionItem
            {...props}
            key={discussion.external_id}
            discussion={discussion}
            handleDiscussionClick={()=>{onDiscussionClick(discussion)}}
       
          />
        )}
      </div>
    </div>
  );
};

NewsView.propTypes = {
  discussion_list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  discussions: PropTypes.array.isRequired,
  user: PropTypes.object,
  discussion: PropTypes.object,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  discussions: state.discussions,
  modal: state.modal,
  notification: state.notification,
  app: state.app,
  user: state.user,
  customer: state.customer,
});

export default connect(mapStateToProps)(NewsView);
