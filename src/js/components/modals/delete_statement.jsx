import React from 'react';
import PropTypes from 'prop-types';
import { hideModal } from '../../actions/app';
import API from '../../api';
import i18next from 'i18next';
import { reloadDiscussion } from '../../actions/async';
import { navigateView } from '../../actions/app';
import { getQueryStringParams } from '../../utils';
import { VIEW_DISCUSSION_LIST } from '../../constants';

class DeleteStatementModal extends React.Component {

  onDelete = (e) => {
    e.preventDefault();
    let { statementId } = this.props.modal.data;
    let { external_id } = this.props.discussion;
    if (statementId) {
      API.delete_statement(statementId)
      .then(() =>{
        this.props.dispatch(hideModal());
        this.props.dispatch(reloadDiscussion(external_id));
        let currentUrl = window.location.href
        let statementIdFromUrl = getQueryStringParams("statementId", currentUrl);
        if(!statementIdFromUrl) {
          document.location.reload()
        } else {
          window.history.back()
          this.props.dispatch(navigateView({view: VIEW_DISCUSSION_LIST, articleId: external_id}))
        }
      })
    }
  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.dispatch(hideModal());
  }

  render() {
    return (
      <div>
        <p>{ i18next.t('Really delete this statement? (This cannot be undone!)') }</p>
        <button onClick={this.onDelete}>{ i18next.t('Delete statement') }</button>
        <button style={{marginLeft: '16px'}} onClick={this.onCancel}>{ i18next.t('cancel') }</button>
      </div>
    );
  }
}

DeleteStatementModal.propTypes = {
    user: PropTypes.object,
    discussion: PropTypes.object,
};

export default DeleteStatementModal;
