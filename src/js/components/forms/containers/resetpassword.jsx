import React from 'react';
import PropTypes from 'prop-types';
import { showNotification } from '../../../actions/app';
import forms from '../../common/newforms/newforms';
import API from '../../../api';
import PasswordResetForm from '../resetpassword';
import { updateFormErrors } from './utils';
import i18next from 'i18next';
import { UseNotifyWording } from '../../../utils';

class ResetPasswordFormContainer extends React.Component {

  onSubmit = (e) => {
    let form = this.refs.passwordResetForm.getForm();
    let isValid = form.validate();
    e.preventDefault();
    if (isValid) {
      this.resetPassword(form);
    }
  }

  resetPassword = (form) => {
    API.reset_password(form.cleanedData.email)
      .then(() => {
        this.props.dispatch(showNotification(UseNotifyWording(this.props, 'notification_reset_password')));
        if(this.props.closeModalHandler) {
          this.props.closeModalHandler();
        }
      })
      .catch(resp => {
        updateFormErrors(form, resp);
        this.forceUpdate();
      });
  }

  render() {
    return (
      <div className="fullform">
        <div className="fullform-header">
          <h1>{ i18next.t('Reset Password') }</h1>
        </div>
        <div className="fullform-body">
          <form onSubmit={this.onSubmit}>
            <forms.RenderForm form={PasswordResetForm()} ref="passwordResetForm" />
            <div className="fullform-footer">
              <button className="primary" onClick={this.submit}>{ i18next.t('Reset Password') }</button>
              <button onClick={this.props.showLoginHandler}>{ i18next.t('Back') }</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ResetPasswordFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object,
  customer: PropTypes.object,
  closeModalHandler: PropTypes.func,
  showLoginHandler: PropTypes.func.isRequired,
};

export default ResetPasswordFormContainer;
