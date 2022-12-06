import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

class MarkupWording extends React.Component {

  getValue = () => {
    let { wording, customer } = this.props;
    let default_wordings = this.defaultWordings();
    let wordings = customer.markdown_wording;
    if (wording in wordings && wordings[wording].length > 0) {
      return wordings[wording];
    } else if (wording in default_wordings) {
      return default_wordings[wording];
    } else {
      return '';
    }
  }

  defaultWordings = () => {
    return {
      sign_up_title: i18next.t('Sign up with'),
      sign_up_text: i18next.t('Sign Up Text'),
      login_title: i18next.t('Login to participate'),
      login_text: '',
      welcome_title: i18next.t('Welcome Title'),
      welcome_text_social: i18next.t('Welcome Text (after Social-Auth Sign Up)'),
      welcome_text_email: i18next.t('Welcome Text (after Email Sign Up)'),
      barometer_start_sign: i18next.t('What do you think?'),
      blocking_notification_signup_to_private_account_failed: i18next.t("Your email address could not be found"+
        " in our list of allowed participants. Please contact "+
        "the person who invited you to this TeamDecide account."),
      accept_data_policy_overlay_title: i18next.t("Your privacy matters!"),
      accept_data_policy_overlay_textbody: i18next.t("YES, I agree to let brabbl process"+
        " my data according to brabbl's privacy statement."),
      private_discussions_not_logged_in: i18next.t("This content is confidential. Please follow the instructions"+
        " in your invitation email to sign-up / login."),
      private_discussions_not_confirmed: i18next.t("This content is confidential")+". "+
        i18next.t("Please confirm your email address by clicking the verification link"+
          " in the email we sent you after you signed up."),
      blocking_notification_verification_required: i18next.t("Please confirm your email address"+
      " by clicking the verification link"+
      " in the email we sent you after you signed up."),
      list_of_duplicate_invitation_emails: i18next.t("Some of the emails you provided were not invited again,"+
      " because these participants have already signed up for this platform"),
    };
  }

  render() {
    return <span dangerouslySetInnerHTML={{ __html: this.getValue() }}></span>;
  }
}

MarkupWording.propTypes = {
  wording: PropTypes.string.isRequired,
  customer: PropTypes.object.isRequired,
};

export default MarkupWording;
