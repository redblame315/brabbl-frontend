import React from 'react';
import PropTypes from 'prop-types';
import { SignUpFormContainer } from '../forms';
import { showNotification, showModal } from '../../actions/app';
import { bootstrapApp } from '../../actions/async';
import { MODAL_LOGIN, MODAL_SIGNUP,
  MODAL_PASSWORD } from '../../constants';
import { UseNotifyWording } from '../../utils';

class SignupModal extends React.Component {

  onShowLoginClick = (e) => {
    if(e) e.preventDefault();
    this.props.dispatch(showModal(MODAL_LOGIN));
  }

  onShowSignUpClick = (e) => {
    if(e) e.preventDefault();
    this.props.dispatch(showModal(MODAL_SIGNUP));
  }

  onShowLostPasswordClick = (e) => {
    if(e) e.preventDefault();
    this.props.dispatch(showModal(MODAL_PASSWORD));
  }

  onSignUpSubmit = (registeredUser) => {
    this.props.dispatch(bootstrapApp());
    if(this.props.customer && !this.props.customer.is_private) {
      if(!registeredUser.is_confirmed) {
        this.props.dispatch(
          showNotification(UseNotifyWording(this.props, 'notification_registration'))
        );
      }
    }

  }

  render() {
    return (
      <SignUpFormContainer
        onSubmit={this.onSignUpSubmit}
        customer={this.props.customer}
        showLoginHandler={this.onShowLoginClick}
        showSignUpHandler={this.onShowSignUpClick}
        showLostPasswordHandler={this.onShowLostPasswordClick}
        {...this.props}
      />
    );
  }
}

SignupModal.propTypes = {
  customer: PropTypes.object,
};

export default SignupModal;
