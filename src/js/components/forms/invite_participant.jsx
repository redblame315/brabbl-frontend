import forms from '../common/newforms/newforms';
import i18next from 'i18next';


let InviteParticipantForm = function InviteParticipantForm() {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    invitations: forms.CharField({
      required: true,
      label: i18next.t('key_invite-participants-modal_textfield-email_label'),
      helpText: i18next.t('key_invite-participants-modal_textfield-email_help-text'),
      maxLength: 1000,
      widget: forms.Textarea,
      errorMessages: {
        required: i18next.t('key_invite-participants-modal_textfield-email_error-email'),
        invalid: i18next.t('key_invite-participants-modal_textfield-email_error-emails'),
      },
    })
  });
};

export default InviteParticipantForm;
