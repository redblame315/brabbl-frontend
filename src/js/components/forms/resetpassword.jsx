import forms from '../common/newforms/newforms';
import i18next from 'i18next';


let PasswordResetForm = function PasswordResetForm() {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    email: forms.EmailField({
      required: true,
      label: i18next.t('Email Address'),
      errorMessages: {
        required: i18next.t('Please specify an email address.'),
        invalid: i18next.t('Please enter a valid email address.'),
      },
    }),
  });
};

export default PasswordResetForm;
