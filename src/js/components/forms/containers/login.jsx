import React from 'react';
import PropTypes from 'prop-types';
import forms from '../../common/newforms/newforms';
import { showModal } from '../../../actions/app';
import API from '../../../api';
import LoginForm from '../login';
import { updateFormErrors } from './utils';
import { MODAL_SIGNUP, MODAL_PASSWORD } from '../../../constants';
import SocialButtons from './social_buttons';
import MarkupWording from '../../markup_wording';
import i18next from 'i18next';
import { showAlert, hideModal } from '../../../actions/app';
import { UseNotifyWording, UserHasPermission } from '../../../utils';

class LoginFormContainer extends React.Component {

  checkVerificationError = (error) => {
    let resp = error.response;
    let errors = resp.data;

    if (resp.status == 400) {
      if ('non_field_errors' in errors) {
        if(Array.isArray(errors.non_field_errors) 
           && errors.non_field_errors.length == 1
           && (errors.non_field_errors[0]).includes('verified')) {
            this.props.dispatch(showAlert({markdownWording: 'blocking_notification_verification_required'}))
            return true;
        }
      }
    }
    return false;
  }
  onSubmit = (e) => {
    let cleaned_data;
    let form = this.refs.loginForm.getForm();
    let isValid = form.validate();
    e.preventDefault();
    if (isValid) {
      cleaned_data = form.cleanedData;
      API.login(cleaned_data.username, cleaned_data.password)
        .then(resp => {
          if (resp.loggedIn) {
            this.props.onSubmit();
          } else {
            if(!this.checkVerificationError(resp)) {
              updateFormErrors(form, resp);
              this.forceUpdate();
            }
          }
        });
    }
  }

  render() {
    let login_form = LoginForm();
    return (
      <div className="fullform">
        <div className="fullform-header login-header">
          <h1><MarkupWording {...this.props} wording="login_title" /></h1>
          <div className="login-text"><MarkupWording {...this.props} wording="login_text" /></div>
        </div>
        {
          this.props.customer && !this.props.customer.is_private &&
          <SocialButtons />
        }

        <div className="fullform-body login-body">
          <form onSubmit={ this.onSubmit }>
            <forms.RenderForm form={ login_form } ref="loginForm" />
            <div className="fullform-footer login-footer">
              <button className="primary">{ i18next.t('Sign In')}</button>
              <button className="right-button" onClick={this.props.showSignUpHandler}>
                { i18next.t('Create a new account')}
              </button>
            </div>
          </form>
          <div className="forgot-password-button">
            <a onClick={this.props.showLostPasswordHandler}>{ i18next.t('Forgot your password?')}</a>
          </div>
        </div>
      </div>
    );
  }
}

LoginFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object,
  showSignUpHandler: PropTypes.func.isRequired,
  showLostPasswordHandler: PropTypes.func.isRequired,
};

export default LoginFormContainer;
