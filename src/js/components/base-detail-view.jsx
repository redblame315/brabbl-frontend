import { DISCUSSION_HAS_NOT_STARTED, DISCUSSION_STARTED, DISCUSSION_COMPLETED } from '../constants';
import { showNotification } from '../actions/app';
import { UseNotifyWording } from '../utils';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class BaseDetailView extends React.Component {
  constructor(props) {
    super(props);
    let { discussion_status } = this.getDiscussionStatus();
    this.state = {
      discussion_status: discussion_status,
    };
  }

  componentDidMount() {
    this.startPolling();
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  getDiscussionStatus = () => {
    let current_date = moment().add(15, 'seconds').utc();
    let { start_time, end_time } = this.props.discussion;
    let discussion_status,
      interval;
    if (start_time) {
      start_time = moment.utc(start_time);
    }
    if (end_time) {
      end_time = moment.utc(end_time);
    }
  
    if (end_time && end_time <= current_date) {
      discussion_status = DISCUSSION_COMPLETED;
      interval = 0;
    } else if (start_time && start_time >= current_date) {
      discussion_status = DISCUSSION_HAS_NOT_STARTED;
      interval = start_time.diff(current_date);
    } else if ((current_date > start_time || !start_time) && (current_date <= end_time || !end_time)) {
      discussion_status = DISCUSSION_STARTED;
      if(end_time) {
        interval = end_time.diff(current_date);
      }
    }
    // update view if status will changed in less than 6 hours
    if (!this._timer && interval > 0 && interval < 21600000) {
      this._timer = setInterval(this.poll, interval + 1000);
    }
    return { discussion_status, interval };
  }

  handleDisabledDiscussion = () => {
    let { dispatch } = this.props;
    let { discussion_status } = this.getDiscussionStatus();
    let notification;
    if (discussion_status === DISCUSSION_COMPLETED) {
      notification = UseNotifyWording(this.props, 'notification_discussion_already_completed');
    } else if (discussion_status === DISCUSSION_HAS_NOT_STARTED) {
      notification = UseNotifyWording(this.props, 'notification_discussion_not_started');
    }
    dispatch(showNotification(notification));
  }

  poll = () => {
    let { discussion_status, interval } = this.getDiscussionStatus();
    if (this.state.discussion_status !== discussion_status) {
      clearInterval(this._timer);
      if (interval > 0) {
        this._timer = setInterval(this.poll, interval);
      }
      this.setState({
        discussion_status: discussion_status,
      });
    }
  }

  startPolling = () => {
    let self = this;
    setTimeout(() => {
      self.poll(); // do it once and then start it up ...
    }, 1000);
  }
  
  render() { }
}

BaseDetailView.propTypes = {
  discussion: PropTypes.object.isRequired,
};

export default BaseDetailView;
