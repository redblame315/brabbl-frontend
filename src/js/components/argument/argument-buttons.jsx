import React from 'react';
import PropTypes from 'prop-types';
import { showModal, showNotification } from '../../actions/app';
import {
  MODAL_ARGUMENT_PRO, MODAL_ARGUMENT_CONTRA, DISCUSSION_STARTED,
  DISCUSSION_COMPLETED, DISCUSSION_HAS_NOT_STARTED,
} from '../../constants';
import { UseWording, UseNotifyWording } from '../../utils';

class ArgumentButtons extends React.Component {
  getTitle = () => {
    let { discussion, argument, app, statement } = this.props;
    if (argument && app.argumentId) {
      return argument.title;
    } else {
      return statement.statement || discussion.statement;
    }
  }
  handleProArgumentButton = () => {
    let { app, statement, user, argument, dispatch } = this.props;
    if (!user) {
      dispatch(showModal('LOGIN'));
      return;
    }
    dispatch(showModal(
      MODAL_ARGUMENT_PRO, {
        statement: statement,
        argument: app.argumentId !== null ? argument : null,
        title: this.getTitle(),
      }
    ));
  }
  handleContraArgumentButton = () => {
    let { app, statement, user, argument, dispatch } = this.props;
    if (!user) {
      dispatch(showModal('LOGIN'));
      return;
    }
    dispatch(showModal(
      MODAL_ARGUMENT_CONTRA, {
        statement: statement,
        argument: app.argumentId !== null ? argument : null,
        title: this.getTitle(),
      }
    ));
  }

  handleDisabledDiscussion = () => {
    let { dispatch, discussion_status } = this.props;
    let notification;
    if (discussion_status === DISCUSSION_COMPLETED) {
      notification = UseNotifyWording(this.props, 'notification_discussion_already_completed');
    } else if (discussion_status === DISCUSSION_HAS_NOT_STARTED) {
      notification = UseNotifyWording(this.props, 'notification_discussion_not_started');
    }
    dispatch(showNotification(notification));
  }

  render() {
    let new_contra_argument_link,
      new_pro_argument_link,
      new_contra_argument_button,
      new_pro_argument_button;
    if (this.props.discussion_status === DISCUSSION_STARTED) {
      new_contra_argument_link = (<a onClick={this.handleContraArgumentButton}>
        <i className="fa fa-pencil">
        </i> { UseWording(this.props, 'button_short_new_contra') }
      </a>);
      new_pro_argument_link = (<a onClick={this.handleProArgumentButton}>
        <i className="fa fa-pencil">
        </i> { UseWording(this.props, 'button_short_new_pro') }
      </a>);
      new_contra_argument_button = (
        <button className="primary" onClick={this.handleContraArgumentButton}>
            <i className="fa fa-pencil"></i> { UseWording(this.props, 'button_new_contra') }
          </button>);
      new_pro_argument_button = (
        <button className="primary" onClick={this.handleProArgumentButton}>
            <i className="fa fa-pencil"></i> { UseWording(this.props, 'button_new_pro') }
          </button>);
    } else {
      new_contra_argument_link = (<span className="not-active" onClick={this.handleDisabledDiscussion}>
        <i className="fa fa-pencil">
        </i> { UseWording(this.props, 'button_short_new_contra') }
      </span>);
      new_pro_argument_link = (<span className="not-active" onClick={this.handleDisabledDiscussion}>
        <i className="fa fa-pencil">
        </i> { UseWording(this.props, 'button_short_new_pro') }
      </span>);
    }
    if (this.props.layout === 'links') {
      return (
        <div>
          <div className="argument-list-header-title left">
            <h2>{ UseWording(this.props, 'list_header_contra') }</h2>
            { new_contra_argument_link}
          </div>
          <div className="argument-list-header-title right">
            <h2>{ UseWording(this.props, 'list_header_pro') }</h2>
            { new_pro_argument_link}
          </div>
        </div>
      );
    } else {
      return (
        <div className="discussion-buttons">
          { new_contra_argument_button}
          { new_pro_argument_button}

        </div>
      );
    }
  }
}

ArgumentButtons.propTypes = {
  user: PropTypes.object,
  statement: PropTypes.object,
  discussion: PropTypes.object,
  discussion_status: PropTypes.string.isRequired,
  argument: PropTypes.object,
  app: PropTypes.object,
  layout: PropTypes.string,
};

export default ArgumentButtons;
