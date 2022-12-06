import React from 'react';
import PropTypes from 'prop-types';
import { ResetPasswordFormContainer } from '../forms';
import { showModal, hideModal } from '../../actions/app';
import { reloadDiscussion } from '../../actions/async';
import { MODAL_LOGIN, MODAL_SIGNUP } from '../../constants';

class PasswordResetModal extends React.Component {

  onShowLoginClick = (e) => {
    e.preventDefault();
    this.props.dispatch(showModal(MODAL_LOGIN));
  }

  onLoginSubmit = (e) => {
    e.preventDefault();
    let articleId = window.brabbl.articleId;
    if(this.props.app) {
      articleId = this.props.app.articleId;
    } 
    this.props.dispatch(reloadDiscussion(articleId));
  }

  render() {
    let { dispatch } = this.props;
    return (
      <ResetPasswordFormContainer
        onSubmit={this.onLoginSubmit}
        user={this.props.user}
        customer={this.props.customer}
        dispatch={dispatch}
        closeModalHandler={() => dispatch(hideModal())}
        showLoginHandler={this.onShowLoginClick}
      />
    );
  }
}

PasswordResetModal.propTypes = {
  app: PropTypes.object,
  user: PropTypes.object,
  customer: PropTypes.object,
};

export default PasswordResetModal;
