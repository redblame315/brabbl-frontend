import React from 'react';
import PropTypes from 'prop-types';
import { hideModal } from '../../actions/app';
import API from '../../api';
import i18next from 'i18next';
import { getDiscussionList } from '../../actions/async';

class DeleteDiscussionModal extends React.Component {

  onDelete = (e) => {
    e.preventDefault();
    let { discussion } = this.props;
    API.delete_discussion(discussion.external_id)
    .then(() =>{
      this.props.dispatch(hideModal());
      this.props.dispatch(getDiscussionList());
      let currentUrl = window.location.href
      let baseUrl = currentUrl.split("?")[0]
      window.history.replaceState({page: 'home'}, 'home', baseUrl)
      document.location.reload()
    })

  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.dispatch(hideModal());
  }

  render() {
    return (
      <div>
        <p>{ i18next.t('Really delete this discussion? (This cannot be undone!)') }</p>
        <button onClick={this.onDelete}>{ i18next.t('Delete discussion') }</button>
        <button style={{marginLeft: '16px'}} onClick={this.onCancel}>{ i18next.t('cancel') }</button>
      </div>
    );
  }
}

DeleteDiscussionModal.propTypes = {
    user: PropTypes.object,
    discussion: PropTypes.object,
};

export default DeleteDiscussionModal;
