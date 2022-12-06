import i18next from 'i18next';
import React from 'react';
import PropTypes from 'prop-types';
import { bootstrapApp } from '../actions/async';
import { showNotification, showModal } from '../actions/app';
import { DropDown, DropDownItem } from './dropdown';
import API from '../api';
import { MODAL_LOGIN, MODAL_PROFILE, MODAL_DISCUSSION, MODAL_DISCUSSION_LIST, MODAL_IFRAME,
CAN_CHANGE_DISCUSSION, CAN_CHANGE_DISCUSSION_LIST, CAN_CHANGE_USER, 
IFRAME_USERLIST, MODAL_PRIVATE_INVITE, MODAL_EXPORT_STATISTICS } from '../constants';
import { UseNotifyWording, UserHasPermission } from '../utils';
import AvatarContainer from './avatar-container';

class UserLogin extends React.Component {

  onLogoutClick = () => {
    API.logout();
    this.props.dispatch(bootstrapApp());
    this.props.dispatch(
      showNotification(UseNotifyWording(this.props, 'notification_logout'))
    );
  }

  render() {
    let cssClass = 'user-login-menu';
    let { user, customer, dispatch } = this.props;
    let loginItem,
      profileItem,
      editDiscussionItem,
      userListItem,
      inviteParticipants,
      loginOrProfile,
      refreshDiscussion,
      exportStatistics,
      avatar;

    if (user) {
      loginItem = (
        <DropDownItem onSelect={() => dispatch(showModal(MODAL_PROFILE, { ...user }))}>
          { i18next.t('Profile') }
        </DropDownItem>
      );
      profileItem = (
        <DropDownItem onSelect={this.onLogoutClick}>
          { i18next.t('Logout') }
        </DropDownItem>
      );
      if (UserHasPermission(user, CAN_CHANGE_DISCUSSION_LIST, customer) && this.props.currentView === 'list') {
        editDiscussionItem = (
          <DropDownItem onSelect={() => dispatch(showModal(MODAL_DISCUSSION_LIST, { ...this.props }))}>
            { i18next.t('Edit List') }
          </DropDownItem>
        );
      }
      if (UserHasPermission(user, CAN_CHANGE_USER, customer)) {
        userListItem = (
          <DropDownItem
            onSelect={() => dispatch(showModal(MODAL_IFRAME, { iframe_type: IFRAME_USERLIST, ...this.props }))}
          >
            { i18next.t('User list') }
          </DropDownItem>
        );
      }
      if (UserHasPermission(user, CAN_CHANGE_USER, customer)) {
        inviteParticipants = (
          <DropDownItem
            onSelect={() => dispatch(showModal(MODAL_PRIVATE_INVITE, { ...this.props }))}
          >
            { i18next.t('key_invite-participants-modal_title-of-invite-participants') }
          </DropDownItem>
        );
      }
      refreshDiscussion = (
        <DropDownItem
          onSelect={() => {
            this.props.dispatch(bootstrapApp(null, true));
          }}
        >
          { i18next.t('key_user-menu_refresh-data') }
        </DropDownItem>
      )
      if (UserHasPermission(user, CAN_CHANGE_USER, customer)) {
        exportStatistics = (
          <DropDownItem
            onSelect={() => dispatch(showModal(MODAL_EXPORT_STATISTICS, { ...this.props }))}
          >
            { i18next.t('key_export_statistics') }
          </DropDownItem>
        )
      }
      avatar = (<AvatarContainer user={user} size={32}/>);
      loginOrProfile = (
        <DropDown className={cssClass} fixedActiveItem={avatar} hideDownArrow>
          {loginItem}
          {profileItem}
          {editDiscussionItem}
          {userListItem}
          {inviteParticipants}
          {refreshDiscussion}
          {exportStatistics}
        </DropDown>
      );
    } else {
      if(customer.is_private) {
        loginOrProfile = (
          <div className="dropdown-select user-login-menu">
          </div>
        );
      } else {
        loginOrProfile = (
          <div className="dropdown-select user-login-menu">
            <a className="dropdown-active" onClick={() => dispatch(showModal(MODAL_LOGIN))}>
              <span className="login-link">{ i18next.t('Login') }</span>
            </a>
          </div>
        );
      }

    }
    return loginOrProfile;
  }
}

UserLogin.propTypes = {
  user: PropTypes.object,
  customer: PropTypes.object,
  currentView: PropTypes.string,
};

export default UserLogin;
