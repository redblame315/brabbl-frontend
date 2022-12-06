import i18next from 'i18next';
import forms from '../common/newforms/newforms';


let LoginForm = function LoginForm() {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    username: forms.CharField({
      label: i18next.t('Email Address'),
      maxLength: 160,
      errorMessages: {
        required: i18next.t('key_login_email-textfield_error-text'),
      },
    }),
    password: forms.CharField({
      widget: forms.PasswordInput,
      label: i18next.t('Password'),
      maxLength: 160,
      errorMessages: {
        required: i18next.t('Please provide a password'),
      },
    }),
  });
};

export default LoginForm;
