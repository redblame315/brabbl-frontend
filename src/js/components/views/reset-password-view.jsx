import React from 'react';
import PropTypes from 'prop-types';
import { ResetPasswordFormContainer } from '../forms';
import { VIEW_DISCUSSION_DETAIL, VIEW_LOGIN } from '../../constants';
import { navigateView } from '../../actions/app';

class PasswordResetView extends React.Component {

  onShowLoginClick = (e) => {
    e.preventDefault();
    this.props.dispatch(navigateView({view: VIEW_LOGIN}))
  }

  onLoginSubmit = (e) => {
    e.preventDefault();
    const { app } = this.props
    let homeView = VIEW_DISCUSSION_LIST
    if(app.articleId) {
      homeView = VIEW_DISCUSSION_DETAIL
    }
    this.props.dispatch(navigateView({view: homeView}))
  }

  render() {
    let { dispatch } = this.props;
    return (
      <div class="view-form">
        <ResetPasswordFormContainer
          onSubmit={this.onLoginSubmit}
          user={this.props.user}
          customer={this.props.customer}
          dispatch={dispatch}
          showLoginHandler={this.onShowLoginClick}
        />
      </div>
    );
  }
}

PasswordResetView.propTypes = {
  app: PropTypes.object,
  user: PropTypes.object,
  customer: PropTypes.object,
};

export default PasswordResetView;
