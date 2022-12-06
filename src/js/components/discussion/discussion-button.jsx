import React from 'react';
import PropTypes from 'prop-types';
import { showModal, hideModal, updateDiscussionParticipants } from '../../actions/app';
import { reloadDiscussion } from '../../actions/async';
import { MODAL_DISCUSSION, CAN_ADD_DISCUSSION } from '../../constants';
import { UserHasPermission } from '../../utils';
import i18next from 'i18next';

class DiscussionButton extends React.Component {

  onCreateDiscussionSubmit = () => {
    let articleId = window.brabbl.articleId;
    if(this.props.app) {
      articleId = this.props.app.articleId;
    } 
    this.props.dispatch(reloadDiscussion(articleId));
  }

  handleShowDiscussionButton = () => {
    this.props.dispatch(updateDiscussionParticipants([]))
    this.props.dispatch(showModal(MODAL_DISCUSSION));
  }

  closeModal = () => {
    this.props.dispatch(hideModal());
  }

  render() {
    let content;
    let { user, customer } = this.props;

    if (UserHasPermission(user, CAN_ADD_DISCUSSION, customer)) {
      content = (
        <button className="primary" onClick={this.handleShowDiscussionButton}>
          { i18next.t('Create discussion') }
        </button>
      );
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

DiscussionButton.propTypes = {
  user: PropTypes.object,
  customer: PropTypes.object,
};

export default DiscussionButton;
