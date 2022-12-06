import React from 'react';
import PropTypes from 'prop-types';
import LoginModal from './login';
import SignupModal from './signup';
import PasswordResetModal from './password';
import DiscussionModal from './discussion';
import DiscussionListModal from './discussion_list';
import ArgumentModal from './argument';
import StatementModal from './statement';
import ProfileModal from './profile';
import MediaModal from './media';
import IFrameModal from './iframe';
import BarometerModal from './barometer';
import DataPolicyModal from './data_policy';
import DeleteDiscussionModal from './delete_discussion';
import DeleteStatementModal from './delete_statement';
import ResetDiscussionModal from './reset_discussion';
import InviteParticipantModal from './invite_participant';
import ExportDiscussionModal from './export_discussion';
import ExportStatisticsModal from './export_statistics';
import { MODAL_LOGIN, MODAL_SIGNUP, MODAL_DISCUSSION, MODAL_DISCUSSION_LIST,
  MODAL_PASSWORD, MODAL_ARGUMENT_PRO, MODAL_ARGUMENT_CONTRA,
  MODAL_ARGUMENT_EDIT, MODAL_STATEMENT, MODAL_PROFILE, MODAL_MEDIA,
  MODAL_IFRAME, MODAL_BAROMETER, MODAL_DATAPOLICY, MODAL_DELETE_DISCUSSION, 
  MODAL_PRIVATE_INVITE, MODAL_DELETE_STATEMENT, MODAL_RESET_DISCUSSION,
  MODAL_EXPORT_DISCUSSION, MODAL_EXPORT_STATISTICS } from '../../constants';

class ModalSelector extends React.Component {

  render() {
    let { modal } = this.props;
    switch (modal.modal) {
      case MODAL_DELETE_DISCUSSION:
        return <DeleteDiscussionModal {...this.props} />;
      case MODAL_DELETE_STATEMENT:
        return <DeleteStatementModal {...this.props} />;
      case MODAL_RESET_DISCUSSION:
          return <ResetDiscussionModal {...this.props} />;
      case MODAL_EXPORT_DISCUSSION:
          return <ExportDiscussionModal {...this.props} />;
      case MODAL_EXPORT_STATISTICS:
        return <ExportStatisticsModal {...this.props} />;
      case MODAL_LOGIN:
        return <LoginModal {...this.props} />;
      case MODAL_SIGNUP:
        return <SignupModal {...this.props} />;
      case MODAL_DATAPOLICY:
        return <DataPolicyModal {...this.props} />;
      case MODAL_PROFILE:
        return (
          <ProfileModal
            initial_data={modal.data}
            {...this.props}
          />
        );
      case MODAL_BAROMETER:
        return <BarometerModal {...this.props} />;
      case MODAL_STATEMENT:
        return (
          <StatementModal
            initial_data={modal.data}
            {...this.props}
          />
        );
      case MODAL_DISCUSSION:
        return (
          <DiscussionModal
            {...this.props}
            discussion={modal.data.discussion}
          />
        );
      case MODAL_DISCUSSION_LIST:
        return (
          <DiscussionListModal
            {...this.props}
          />
        );
      case MODAL_PRIVATE_INVITE: 
        return (
          <InviteParticipantModal
            {...this.props}
          />
        );
      case MODAL_PASSWORD:
        return <PasswordResetModal {...this.props} />;
      case MODAL_ARGUMENT_PRO:
      case MODAL_ARGUMENT_CONTRA:
      case MODAL_ARGUMENT_EDIT:
        return (
          <ArgumentModal
            data={modal.data}
            is_pro={modal.modal === MODAL_ARGUMENT_PRO}
            edit={modal.modal === MODAL_ARGUMENT_EDIT}
            {...this.props}
          />
        );
      case MODAL_MEDIA:
        return (
          <MediaModal
            data={modal.data}
            {...this.props}
          />
        );
      case MODAL_IFRAME:
        return (
          <IFrameModal
            data={modal.data}
            {...this.props}
          />
        );
      default:
        return null;
    }
  }
}

ModalSelector.propTypes = {
  modal: PropTypes.object,
  alert: PropTypes.object,
  customer: PropTypes.object,
  dispatch: PropTypes.func,
};

export default ModalSelector;
