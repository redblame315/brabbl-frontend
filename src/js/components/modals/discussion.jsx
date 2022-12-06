import React from 'react';
import PropTypes from 'prop-types';
import { DiscussionFormContainer } from '../forms';
import { bootstrapApp } from '../../actions/async';
import { hideModal, showModal } from '../../actions/app';
import i18next from 'i18next';
import moment from 'moment';

class DiscussionModal extends React.Component {

  onSubmit = () => {
    this.props.dispatch(bootstrapApp());
  }

  onDelete = (e) => {
    e.preventDefault();
    this.props.dispatch(
      showModal('DELETE_DISCUSSION', { discussion: this.props.discussion })
    );
  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.dispatch(hideModal());
  }

  render() {
    const { user, customer, discussion } = this.props;
    let initial_data = null
    if (typeof discussion !== 'undefined') {
      initial_data = { ...discussion }
      if (initial_data.start_time) {
        initial_data.start_time = moment(initial_data.start_time).format('YYYY-MM-DD HH:mm');
      }
      if (initial_data.end_time) {
        initial_data.end_time = moment(initial_data.end_time).format('YYYY-MM-DD HH:mm');
      }
    }
    return (
      <div className="fullform discussion-create">
        <div className="fullform-header">
          <h1>{discussion ? i18next.t('Edit discussion') : i18next.t('Add new Discussion')}</h1>
        </div>
        <div className="fullform-body">
          <DiscussionFormContainer
            username={user.username}
            customer={customer}
            initial_data={initial_data}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            onDelete={this.onDelete}
          />
        </div>
      </div>
    );
  }
}

DiscussionModal.propTypes = {
  user: PropTypes.object,
  customer: PropTypes.object,
  discussion: PropTypes.object,
};

export default DiscussionModal;
