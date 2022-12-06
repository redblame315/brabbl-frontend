import React from 'react';
import PropTypes from 'prop-types';
import { LoginFormContainer } from '../forms';
import { bootstrapApp } from '../../actions/async';
import { navigateView } from '../../actions/app';
import { VIEW_SIGNUP, VIEW_LOST_PASSWORD, VIEW_DISCUSSION_DETAIL, VIEW_DISCUSSION_LIST } from '../../constants';

class LoginView extends React.Component {

  onShowSignUpClick = (e) => {
    e.preventDefault();
    window.history.pushState({page: 'signup'}, 'signup', "?view="+VIEW_SIGNUP+"#brabbl-widget")
    this.props.dispatch(navigateView({view: VIEW_SIGNUP}))
  }

  onShowLostPasswordClick = (e) => {
    e.preventDefault();
    this.props.dispatch(navigateView({view: VIEW_LOST_PASSWORD}))
  }

  onLoginSubmit = () => {
    const { app } = this.props
    let homeView = VIEW_DISCUSSION_LIST
    if(app.articleId) {
      homeView = VIEW_DISCUSSION_DETAIL
    }
    this.props.dispatch(navigateView({view: homeView}))
    this.props.dispatch(bootstrapApp());
  }

  render = () => {
    return (
      <div class="view-form">
        <LoginFormContainer
          onSubmit={this.onLoginSubmit}
          user={this.props.user}
          showSignUpHandler={this.onShowSignUpClick}
          showLostPasswordHandler={this.onShowLostPasswordClick}
          {...this.props}
        />
      </div>
    );
  }
}

LoginView.propTypes = {
  user: PropTypes.object,
};

export default LoginView;
