import React from 'react';
import PropTypes from 'prop-types';
import { SignUpFormContainer } from '../forms';
import { showNotification } from '../../actions/app';
import { bootstrapApp } from '../../actions/async';
import { UseNotifyWording } from '../../utils';
import { navigateView, showAlert } from '../../actions/app';
import { VIEW_LOGIN, VIEW_LOST_PASSWORD, VIEW_DISCUSSION_LIST, VIEW_DISCUSSION_DETAIL } from '../../constants';

class SignupView extends React.Component {

  onShowLoginClick = (e) => {
    if(e) e.preventDefault();
    window.history.pushState({page: 'login'}, 'login', "?view="+VIEW_LOGIN+"#brabbl-widget")
    this.props.dispatch(navigateView({view: VIEW_LOGIN}))
  }

  onShowLostPasswordClick = (e) => {
    if(e) e.preventDefault();
    this.props.dispatch(navigateView({view: VIEW_LOST_PASSWORD}))
  }

  onSignUpSubmit = (registeredUser) => {
    if(this.props.customer) {
      if(!this.props.customer.is_private) {
        this.props.dispatch(bootstrapApp());
        if(!registeredUser.is_confirmed) {
          this.props.dispatch(
            showNotification(UseNotifyWording(this.props, 'notification_registration'))
          );
        }
      } else {
        if (!registeredUser.is_confirmed) {
          this.props.dispatch(showAlert({markdownWording: 'blocking_notification_verification_required'}))
          this.props.dispatch(navigateView({view: VIEW_LOGIN}))
        } else {
          const { app } = this.props
          let homeView = VIEW_DISCUSSION_LIST
          if(app.articleId) {
            homeView = VIEW_DISCUSSION_DETAIL
          }
          window.history.pushState({page: homeView}, homeView, "?view="+homeView+"#brabbl-widget")
          this.props.dispatch(navigateView({view: homeView}))
          this.props.dispatch(bootstrapApp());
        }
      }
    }
  }

  render() {
    return (
      <div class="view-form">
        <SignUpFormContainer
          onSubmit={this.onSignUpSubmit}
          customer={this.props.customer}
          showLoginHandler={this.onShowLoginClick}
          showLostPasswordHandler={this.onShowLostPasswordClick}
          {...this.props}
        />
      </div>
    );
  }
}

SignupView.propTypes = {
  customer: PropTypes.object,
};

export default SignupView;
