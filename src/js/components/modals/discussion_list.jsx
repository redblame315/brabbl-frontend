import React from 'react';
import PropTypes from 'prop-types';
import { DiscussionListFormContainer } from '../forms';
import { bootstrapApp, getDiscussionList } from '../../actions/async';
import { hideModal } from '../../actions/app';
import i18next from 'i18next';

class DiscussionListModal extends React.Component {

  onSubmit = () => {
    this.props.dispatch(bootstrapApp());
    this.props.dispatch(getDiscussionList(window.location.href));
  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.dispatch(hideModal());
  }

  render() {
    let { user, customer, discussion_list } = this.props;
    if (Object.keys(discussion_list).length === 0) {
      discussion_list = null;
    }
    return (
      <div className="fullform discussion-list-create">
        <div className="fullform-header">
          <h1>{ i18next.t('Edit List') }</h1>
        </div>
        <div className="fullform-body">
          <DiscussionListFormContainer
            username={user.username}
            customer={customer}
            initial_data={discussion_list}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
          />
        </div>
      </div>
    );
  }
}

DiscussionListModal.propTypes = {
  user: PropTypes.object,
  customer: PropTypes.object,
  discussion_list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default DiscussionListModal;
