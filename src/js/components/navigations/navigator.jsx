import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VIEW_LOGIN, VIEW_SIGNUP, VIEW_DISCUSSION_LIST, VIEW_DISCUSSION_NEWS,
         VIEW_DISCUSSION_DETAIL, VIEW_LOST_PASSWORD, MODAL_SIGNUP } from '../../constants'; //TODO:import VIEW_DISCUSSION_NEWS const [Blame 12/09]
import DetailView from '../views/detail-view';
import ListContainer from '../views/list-view';
import NewsView from '../views/news-view';
import LoginView from '../views/login-view';
import SignupView from '../views/signup-view';
import ResetPasswordView from '../views/reset-password-view';
import { navigateView, showModal } from '../../actions/app';
import { getQueryStringParams } from '../../utils';

class Navigator extends React.Component {
    componentDidMount() {
        let self = this
        window.onpopstate = function () {   
            let view = getQueryStringParams("view");
            let articleId = getQueryStringParams("articleId");
            let statementId = getQueryStringParams("statementId");
            if(view == undefined) view = window.brabbl.view || 'detail';
            if(view == VIEW_DISCUSSION_DETAIL && articleId) {
                let data = { view: VIEW_DISCUSSION_DETAIL, articleId: articleId }
                if (statementId) {
                    data.statementId = Number(statementId)
                } else {
                    data.statementId = null
                }
                self.props.dispatch(navigateView(data))
            } else {
                self.props.dispatch(navigateView({view: view}))
            }
        
        }
        const { app, customer, user } = this.props
        if (!customer.is_private && !user) {
     
            if ( app.view == VIEW_SIGNUP ) {
                this.props.dispatch(showModal(MODAL_SIGNUP))
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {

        if(prevProps.app.view !== this.props.app.view){
            var ele = document.getElementById("brabbl-widget");
            var distance = 0
            do {
                distance += ele.offsetTop;
                ele = ele.offsetParent;
            
            } while (ele);
            distance = distance < 0 ? 0 : distance;
            window.scrollTo(0, distance); 
        } else if(this.props.app.view == VIEW_DISCUSSION_DETAIL) {
            if(prevProps.app.argumentId !== this.props.app.argumentId ||
               prevProps.app.statementId !== this.props.app.statementId ||
               prevProps.app.articleId !== this.props.app.articleId ) {
                var ele = document.getElementById("brabbl-widget");
                var distance = 0
                do {
                    distance += ele.offsetTop;
                    ele = ele.offsetParent;
                
                } while (ele);
                distance = distance < 0 ? 0 : distance;
                window.scrollTo(0, distance); 
            }
        }
    }
    checkNeedRedirectToLogin = () => {
        const { app, user, customer } = this.props
        if (customer.is_private && !user) {
            return app.view != VIEW_LOST_PASSWORD && app.view != VIEW_SIGNUP
        }
        return false
    }
    redirectToDefaultView = () => {
        this.props.dispatch(navigateView({view: window.brabbl.view || 'detail'}))
    }
    renderViewWithName = (viewName) => {
        const { app, customer, user } = this.props
        if (!customer.is_private || user) {
            if (viewName == VIEW_LOGIN ||
                viewName == VIEW_SIGNUP ||
                viewName == VIEW_LOST_PASSWORD) {
                    viewName = window.brabbl.view
                }
        }
        switch(viewName) {
            case VIEW_DISCUSSION_DETAIL:
                return <DetailView
                    articleId={app.articleId}
                    argumentId={app.argumentId}
                    statementId={app.statementId}
                    {...this.props}
                />
            case VIEW_DISCUSSION_LIST:
                return <ListContainer {...this.props} />
            case VIEW_DISCUSSION_NEWS: //add case VIEW_DISCUSSION_NEWS for show news list [Blame 12/09]
                return <NewsView {...this.props} />
            case VIEW_LOGIN:
                return <LoginView {...this.props} />
            case VIEW_SIGNUP:
                return <SignupView {...this.props} />
            case VIEW_LOST_PASSWORD: 
                return <ResetPasswordView {...this.props} />
            default: 
                return null
        }
    }
    renderView = () => {

        const { app } = this.props
        if (this.checkNeedRedirectToLogin()) {
            window.history.replaceState({page: 'login'},
            'login', 
            "?view="+VIEW_LOGIN)
            return this.renderViewWithName(VIEW_LOGIN)
        }
        if(app.view == VIEW_DISCUSSION_DETAIL) {
            if(app.isDiscussed) {
                return this.renderViewWithName(VIEW_DISCUSSION_DETAIL)
            } else {
                return null
            }
        }
        if(app.view == VIEW_DISCUSSION_LIST && this.props.discussions) {
            return this.renderViewWithName(VIEW_DISCUSSION_LIST)
        }
        return this.renderViewWithName(app.view)
    }
    render(){
        return this.renderView()
    }
}

 
export default Navigator;
  