import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import moment from 'moment';
import { DISCUSSION_HAS_NOT_STARTED, DISCUSSION_STARTED, DISCUSSION_COMPLETED } from '../../constants';

import BaseDetailView from '../base-detail-view';

class DiscussionTimeLeft extends BaseDetailView {
  getTimeLeft = () => {
    let discussion_status = this.state.discussion_status,
      discussion = this.props.discussion,
      time_left = '';
    if (discussion_status === DISCUSSION_HAS_NOT_STARTED) {
      time_left = (<span>{i18next.t('Starts')} {moment(discussion.start_time).fromNow()}</span>);
    } else if (discussion_status === DISCUSSION_STARTED) {
      if (discussion.end_time) {
        time_left = (<span>{i18next.t('Finishes')} {moment(discussion.end_time).fromNow()}</span>);
      } else {
        return;
      }
    } else if (discussion_status === DISCUSSION_COMPLETED) {
      time_left = (<b>{i18next.t('Completed')}</b>);
    }
    return time_left;
  }

  render() {
    return (<div className="discussion-time-left">
      {this.getTimeLeft()}
    </div>);
  }
}

DiscussionTimeLeft.propTypes = {
  discussion: PropTypes.object.isRequired,
};

export default DiscussionTimeLeft;
