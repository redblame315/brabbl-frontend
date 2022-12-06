import React from 'react';
import PropTypes from 'prop-types';
import forms from '../../common/newforms/newforms';
import API from '../../../api';
import InviteParticipantForm from '../invite_participant';
import { updateFormErrors } from './utils';
import i18next from 'i18next';
import { UseNotifyWording } from '../../../utils';
import { CRemovableList } from '../../common/atoms';
import { showAlert, hideModal } from '../../../actions/app';

class InviteParticipantFormContainer extends React.Component {
  constructor(props) {
    super(props);
    let invite_participant_form = InviteParticipantForm()
    let form = new invite_participant_form({controlled: true, onChange: this.forceUpdate.bind(this)})
    this.state = {
      invitations_pending: [],
      is_private: true,
      show_spinner: false,
      form: form,
      isAdminInvitation: false
    }
  }
  componentDidMount() {
    this.load();
  }
  load = () => {
    this.setState({show_spinner: true})
    API.get_pending_invitations()
    .then((response) => {
      if(response && response.data) {

        let invitations = response.data.invitations_pending.map(email => {
          return {
            name: email
          }
        })
        this.setState({ is_private: response.data.is_private, 
          invitations_pending : invitations,
          show_spinner: false})
      }
    })
    .catch(resp => {
      updateFormErrors(form, resp);
      this.setState({show_spinner: false})
      this.forceUpdate();
    });
  }
  onSubmit = (e) => {
    let form = this.refs.inviteParticipantForm.getForm();
    let isValid = form.validate();
    e.preventDefault();
    if (isValid) {
      this.inviteParticipant(form);
    }
  }
  toggleAdminInvitation = () => {
    this.setState({isAdminInvitation: !this.state.isAdminInvitation})
  }

  inviteParticipant = (form) => {
    let data = form.data
    let emailStr = data.invitations
    emailStr = emailStr.replace(/ /g, "")
    let emails = emailStr.split(",")
    if(this.state.isAdminInvitation) {
      emails = this.convertEmailToAdminInvitation(emails)
    }
    let body = {
      invitations : emails
    }
    this.setState({show_spinner: true})
    API.invite_participant(body)
      .then((response) => {
        this.alertIfExistAlreadySignupEmail(response.data)
        this.load();
        this.resetForm();
      })
      .catch(resp => {
        updateFormErrors(form, resp);
        this.setState({show_spinner: false})
        this.forceUpdate();
      });
  }
  alertIfExistAlreadySignupEmail = (data) => {
    if (!data) return;

    if (data.already_signup_invitations && data.already_signup_invitations.length > 0) {
      let emailListMarkup = '';
      data.already_signup_invitations.map(email => {
        emailListMarkup += email+'<br/>'
      })
      this.props.dispatch(showAlert({markdownWording: "list_of_duplicate_invitation_emails",
                                     additionalMarkup: emailListMarkup}))
    }
  }
  resetForm = () => {
    let form = this.state.form
    form.reset({})
  }
  handleRevokeInvitation = (email) => {
    let body = {
      invitations : [email]
    }
    this.setState({show_spinner: true})
    API.revoke_invitation(body)
      .then(() => {
        this.load();
      })
      .catch(resp => {
        //updateFormErrors(form, resp);
        this.setState({show_spinner: false})
        this.forceUpdate();
      });
  }

  convertEmailToAdminInvitation = (emails) => {
    let adminEmails = emails.map(email => {
      if (email.endsWith('-admin')) {
        return email
      } else {
        return email + '-admin'
      }
    })
    return adminEmails
  }
  render() {

    let buttonText = this.state.show_spinner ? 
                      (<i className="fa fa-spinner fa-spin"></i>) 
                     : i18next.t('key_invite-participants-modal_submit-button_label');
    return (
      <div className="fullform">
        <div className="fullform-header">
          <h1>{ i18next.t('key_invite-participants-modal_title-of-invite-participants') }</h1>
        </div>
        <div className="fullform-body">
          <form onSubmit={this.onSubmit}>
          <forms.RenderForm key={1} form={this.state.form} ref="inviteParticipantForm" />
          {
            this.props.user && this.props.user.is_staff &&
            <div style={{display:'block', marginBottom: '16px'}}>
              <input
                className={this.state.isShowPolicyError ? "errorcheckbox": null}
                style={{ 'float': 'left', marginTop: '4px' }}
                type="checkbox"
                checked={this.state.isAdminInvitation}
                onChange={this.toggleAdminInvitation}
                id="is_admin"
              />
              <label
                style={{ 'width': '75%', 'marginLeft': '20px' }}
                htmlFor="is_admin"
              >
                {i18next.t('key_invite-participants_checkbox-is-admin-invitation')}
              </label>
            </div>
          }
          <div className="fullform-footer">
            <button className="primary" onClick={this.submit}>{buttonText}</button>
          </div>
          </form>
          <div className="fullform-section">
            <h2>
              {this.state.invitations_pending.length}{" "}
              {i18next.t('key_invite-participants-modal_invitation-count-title')}
            </h2>
            <CRemovableList 
              data={this.state.invitations_pending}
              removeItemTooltipText={i18next.t('key_invite-participants-modal_invitation-list_revoke-invitation-hint')}
              removeItemConfirmText={i18next.t('key_invite-participants-modal_alert_revoke-invitation-confirm')}
              onRemoveItem={(item) => {this.handleRevokeInvitation(item.name)}}
              />
          </div>
       
         
        </div>
      </div>
    );
  }
}

InviteParticipantFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  customer: PropTypes.object,
  user: PropTypes.object,
  closeModalHandler: PropTypes.func.isRequired,
};

export default InviteParticipantFormContainer;
