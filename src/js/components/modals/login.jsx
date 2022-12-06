import React from 'react';
import PropTypes from 'prop-types';
import { LoginFormContainer } from '../forms';
import { showModal } from '../../actions/app';
import { bootstrapApp } from '../../actions/async';
import { MODAL_LOGIN, MODAL_PASSWORD, MODAL_SIGNUP } from '../../constants';

class LoginModal extends React.Component {

  onShowSignUpClick = (e) => {
    if(e) e.preventDefault();
    this.props.dispatch(showModal(MODAL_SIGNUP));
  }

  onShowLostPasswordClick = (e) => {
    if(e) e.preventDefault();
    this.props.dispatch(showModal(MODAL_PASSWORD));
  }

  onLoginSubmit = () => {
    this.props.dispatch(bootstrapApp());
  }

  render = () => {
    return (
      <LoginFormContainer
        onSubmit={this.onLoginSubmit}
        user={this.props.user}
        showSignUpHandler={this.onShowSignUpClick}
        showLostPasswordHandler={this.onShowLostPasswordClick}
        {...this.props}
      />
    );
  }
}

LoginModal.propTypes = {
  user: PropTypes.object,
};

export default LoginModal;
