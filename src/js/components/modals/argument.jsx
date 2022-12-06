import React from 'react';
import PropTypes from 'prop-types';
import { ArgumentFormContainer } from '../forms';
import { showNotification } from '../../actions/app';
import { reloadDiscussion, fetchArgument } from '../../actions/async';
import { UseNotifyWording } from '../../utils';

class ArgumentModal extends React.Component {

  onArgumentSubmit = () => {
    let { dispatch } = this.props;
    let articleId = window.brabbl.articleId;
    if(this.props.app) {
      articleId = this.props.app.articleId;
    } 
    if (this.props.edit) {
      dispatch(showNotification(UseNotifyWording(this.props, 'notification_message_updated')));
    } else {
      dispatch(showNotification(UseNotifyWording(this.props, 'notification_message_posted')));
    }
    if (this.props.data.argument) {
      dispatch(reloadDiscussion(articleId));
      dispatch(fetchArgument(this.props.data.argument.id));
    } else {
      dispatch(reloadDiscussion(articleId));
    }
  }

  render() {
    let { is_pro, user, edit, data } = this.props;
    let { initial, title, argument, statement } = data;
    let initial_data;
    if (edit) {
      initial_data = initial;
    }
    return (
      <div>
        <ArgumentFormContainer
          is_pro={is_pro}
          statement={statement}
          argument={argument}
          title={title}
          username={user.username}
          initial_data={initial_data}
          onSubmit={this.onArgumentSubmit}
          {...this.props}
        />
      </div>
    );
  }
}

ArgumentModal.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  is_pro: PropTypes.bool.isRequired,
  edit: PropTypes.bool,
};

export default ArgumentModal;
