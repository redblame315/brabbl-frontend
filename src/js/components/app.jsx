import React from 'react';
import PropTypes from 'prop-types';
import * as Cookie from 'tiny-cookie';
import { connect } from 'react-redux';
import Header from './header';
import DetailView from './views/detail-view';
import ListContainer from './views/list-view';
import UserMessage from './user-message';
import ModalContent from './modals/modal';
import AlertModal from './modals/alert';
import { hideNotification, showModal, navigateView } from '../actions/app';
import { bootstrapApp, getDiscussionList } from '../actions/async';
import { DiscussionButton } from './discussion';
import { MODAL_DATAPOLICY, VIEW_DISCUSSION_LIST } from '../constants';
import i18next from 'i18next';
import Navigator from './navigations/navigator';
import LiveUpdateManager from './services/live-update-manager';

class App extends React.Component {

  componentDidMount() {
    let { app, dispatch } = this.props;
    dispatch(bootstrapApp());
  }

  componentWillReceiveProps(nextProps) {
    // make sure the open class for react-modal gets also added to the root html element
    let root = document.getElementsByTagName('html')[0];
    let modalOpenClass = 'ReactModal__Body--open';
    if (!nextProps.modal.hidden) {
      root.classList.add(modalOpenClass);
    } else {
      root.classList.remove(modalOpenClass);
    }
    let { user: oldUser } = this.props;
    let { user, dispatch } = nextProps;
    // show data privacy modal if user hasn't confirmed yet
    let userChanged = (
      user && !oldUser && !user.has_accepted_current_data_policy ||
      user && oldUser && user.id !== oldUser.id && !user.has_accepted_current_data_policy
    );
    if (userChanged) {
      dispatch(showModal(MODAL_DATAPOLICY));
    }
 
    if(!nextProps.app.loading && ( nextProps.app.view != this.props.app.view ||
       nextProps.app.articleId != this.props.app.articleId)) {
       this.props.dispatch(bootstrapApp(nextProps.app.articleId));
    }
  }
  
  showDiscussionList = () => {
      if(window.history.state.page == 'discussion-detail') {
        let currentUrl = window.location.href
        window.history.back()
        this.props.dispatch(navigateView({view: VIEW_DISCUSSION_LIST, articleId: null}))
      }
  }

  renderVersion = (appVersion, backendVersion) => {
    if (appVersion == backendVersion) {
      return <p className="version">
        v{appVersion}
      </p>
    } else {
      return <p className="version">
        v{appVersion}(f), v{backendVersion}(b)
      </p>
    }
  }

  render() {
    let mainContent,
      branding,
      listLink;
    let { app, user, notification, dispatch, customer, discussion_list } = this.props;
    console.log(this.props);
    let isDetailView = app.view === 'detail';

    
    if (window.location.hash.indexOf('token') !== -1) {
      let params = window.location.hash.split('&');
      for (let i = 0; i < params.length; i++) {
        let pare = params[i].split('=');
        if (pare[0] === 'token' || pare[0] === '#token') {
          Cookie.set('brabbl-token', 'Token ' + pare[1]);
        }
      }
      window.location.hash = '#brabbl-widget';
    }

    if (app.loading) {
      return (
        <div className="spinner">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    }

    let title = i18next.t('All discussions');
    if (app.isDiscussed || !isDetailView) {
      let link = '/discussion';

      if (customer.default_back_link) {
        link = customer.default_back_link;
      }
      if (customer.default_back_title) {
        title = customer.default_back_title;
      }
      if (isDetailView) {
        listLink = (
          <p className="brabbl-list-link">
            <a href={ link }>
              { title } »
            </a>
          </p>
        );
      }
      branding = (
        <div className="footer-links">
          <p className="powered-by">
            { i18next.t('powered by') }
            <a href="http://www.brabbl.com"> brabbl</a>
            {this.renderVersion(app.appVersionNumber, app.backendVersionNumber)}
          </p>

          {listLink}
        </div>
      );
    }
    if (discussion_list && discussion_list.name) {
      title = discussion_list.name;
    }

    return (
      <div key={user} className={isDetailView ? 'discussion-widget' : 'discussion-list-widget'}>
        {
          window.history.state && window.history.state.page == 'discussion-detail' && !this.props.app.statementId &&
          <div className="back-link" onClick={this.showDiscussionList}>
            <i className="fa fa-long-arrow-left"></i>
            <span>{title}</span>
         </div>
        }

        <Header
          currentView={app.view}
          isVisible={true}
          {...this.props}
        />
        {
          notification.text &&
            <UserMessage
              hidden={notification.hidden}
              message={notification.text}
              closeHandler={() => dispatch(hideNotification())}
            />

        }
        <Navigator {...this.props}/>
        {
          (!isDetailView || (isDetailView && !app.isDiscussed)) &&
          <div className="discussion-create-button">
            <DiscussionButton {...this.props} />
          </div>
        }
        {branding}
        <div className="clearfix"></div>
        <ModalContent
          statementId={app.statementId}
          {...this.props}
        />
        <AlertModal
          statementId={app.statementId}
          {...this.props}
        />
        <LiveUpdateManager />

      </div>
    );
  }
}

App.propTypes = {
  notification: PropTypes.object,
  user: PropTypes.object,
  app: PropTypes.object,
  customer: PropTypes.object,
  discussion_list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  //TODO:define list for news [Blame 12/08]
  undiscussion_list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  translators: PropTypes.object,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  alert: state.alert,
  notification: state.notification,
  discussion: state.discussion,
  discussions: state.discussions,
  discussion_list: state.discussion_list,
  //TODO:define map for news [Blame 12/08]
  undiscussion_list : state.undiscussion_list,
  app: state.app,
  user: state.user,
  customer: state.customer,
});

export default connect(mapStateToProps)(App);
