import React from 'react';
import PropTypes, { array } from 'prop-types';
import forms from '../../common/newforms/newforms';
import SignUpForm from '../signup';
import API from '../../../api';
import { updateFormErrors } from './utils';
import SocialButtons from './social_buttons';
import i18next from 'i18next';
import MarkdownWording from '../../markup_wording';
import { showAlert } from '../../../actions/app';
import { VIEW_SIGNUP } from '../../../constants';

class SignUpFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.togglePolicyChecked = this.togglePolicyChecked.bind(this);
    let initial_data = {}
    let token = null
    if (this.checkSignUpDeeplink()) {
      initial_data.email = window.brabbl.email 
      token = window.brabbl.token 
      window.brabbl.token = ""
      window.brabbl.email = ""
    }
    let form_data = { onChange: this.forceUpdate.bind(this) };
    if (initial_data) {
      Object.assign(form_data, { data: initial_data });
    }
    let signup_form = SignUpForm(this.props.customer);
    this.state = {
      form: new signup_form(form_data),
      isCheckedPolicy: false,
      isShowPolicyError: false,
      token: token
    };
  }

  checkSignUpDeeplink = () => {
    return window.brabbl.email && window.brabbl.deeplink == VIEW_SIGNUP
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.alert.hidden == false && this.props.alert.hidden == true){
      if(this.props.showLoginModalHandler) {
        this.props.showLoginModalHandler()
      }
    }
  }
  checkAccessDenied = (error) => {
    let resp = error.response;
    let errors = resp.data;

    if (resp.status == 400) {
      if ('non_field_errors' in errors) {
        if(Array.isArray(errors.non_field_errors) 
           && errors.non_field_errors.length == 1
           && (errors.non_field_errors[0]).includes('invite')) {
             this.props.dispatch(showAlert({markdownWording: 'blocking_notification_signup_to_private_account_failed'}))
            return true;
        }
      }
    }
    return false;
  }
  handleAfterRegister = (cleanedData, registeredUser) => {
    if(!this.props.customer) return;
    if(!this.props.customer.is_private || registeredUser.is_confirmed) {
      API.login(cleanedData.email, cleanedData.password)
      .then(() => {
        this.props.onSubmit(registeredUser);
      });
    } else {      
      this.props.onSubmit(registeredUser)
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let cleanedData;
    let { form, token } = this.state;
    let isValid = form.validate();
    if(!this.state.isCheckedPolicy) {
      this.setState({isShowPolicyError: true})
      return;
    }
    if (isValid && this.state.isCheckedPolicy) {
      cleanedData = form.cleanedData;

      if (token) {
        cleanedData.token = token
      }
      let param = {}
      for(let key in cleanedData) {
        if(cleanedData[key] != '') {
          param[key] = cleanedData[key]
        }
      }
      API.register_user(param)
        .then((resp) => {
          this.handleAfterRegister(cleanedData, resp.data)
        })
        .catch((resp) => {
          if(!this.checkAccessDenied(resp)) {
            updateFormErrors(form, resp);
            this.forceUpdate();
          }
        });
    }
  }
  togglePolicyChecked() {
    this.setState({
      isCheckedPolicy: !this.state.isCheckedPolicy,
      isShowPolicyError: false
    });
  }

  render() {
    let { form } = this.state;
    return (
      <div className="fullform">
        <div className="fullform-header">
          <h1><MarkdownWording {...this.props} wording="sign_up_title" /></h1>
        </div>
        {
            this.props.customer && !this.props.customer.is_private &&
            <SocialButtons />
        }

        <div className="fullform-body">
          <form onSubmit={this.handleSubmit}>
            <p className="sign-up-text">
              <MarkdownWording {...this.props} wording="sign_up_text" />
            </p>
            {form.render()}
            <div style={{display:'block', marginTop: '24px'}}>
              <input
                className={this.state.isShowPolicyError ? "errorcheckbox": null}
                style={{ 'float': 'left' }}
                type="checkbox"
                checked={this.state.isCheckedPolicy}
                onChange={this.togglePolicyChecked}
                id="data_policy"
              />
              <label
                style={{ 'width': '75%', 'marginLeft': '20px' }}
                htmlFor="data_policy"
              >
                <MarkdownWording customer={this.props.customer} wording="accept_data_policy_overlay_textbody" />
              </label>
            </div>
            {
              this.state.isShowPolicyError &&
              <div className="errorlist" style={{marginTop: '16px'}}>
                {i18next.t('accept_data_policy_overlay_not_checked_error')}
              </div>
            }

            <div className="fullform-footer login-footer">
              <button className="primary">{ i18next.t('Register') }</button>
              <button className="right-button" onClick={this.props.showLoginHandler}>
                { i18next.t('Already have an account?') }
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignUpFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  showSignUpHandler: PropTypes.func.isRequired,
  showLoginHandler: PropTypes.func.isRequired,
};

export default SignUpFormContainer;
