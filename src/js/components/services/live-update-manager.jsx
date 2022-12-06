import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserHasPermission } from '../../utils';
import { CAN_CHANGE_USER } from '../../constants';
import { bootstrapApp } from '../../actions/async';
import moment from 'moment';
import API from '../../api';
let is_timer_initialized = false;

class LiveUpdateManager extends Component {
    constructor(props) {
      super(props);
      this.runLiveUpdate = this.runLiveUpdate.bind(this);
    }
    componentDidMount(){
      this.startTimerForLiveUpdate()
    }
    componentWillUnmount() {
      is_timer_initialized = false;
      clearInterval(this.timer);
    }

    startTimerForLiveUpdate () {
      let intervalForUser = this.getLiveUpdateIntervalForUser()
      if(intervalForUser > 999 && !is_timer_initialized) {

        this.timer = setInterval(this.runLiveUpdate, intervalForUser);
        is_timer_initialized = true;
      }
    }
    runLiveUpdate() {
      const { modal, app } = this.props;
      const { lastUpdated } = app
      if(!modal.hidden) {
        console.log("LOG: liveUpdate triggered but not update as user is in modal");
        return;
      }
      if(!window.brabbl.articleId) {
        console.log("LOG: no discussion is selected");
        return;
      }
      let data = {
        external_id: window.brabbl.articleId,
        date_of_last_fetch: lastUpdated
      }
      API.get_update_info(data)
      .then(response => {
        if(response && response.data && response.data.needsUpdate) {
          if(response.data.fullUpdate) {
            this.props.dispatch(bootstrapApp(null, true));
          }
        }
      })
      .catch(ex => {
        console.log("get_update_info error", ex)
      })
    }

    getLiveUpdateIntervalForUser() {
      const { user, customer } = this.props;
      if(!user || !customer) return 0;
      let isAdmin = UserHasPermission(user, CAN_CHANGE_USER, customer);
      if(isAdmin) {
        return customer.auto_update_interval_for_admins || 0
      } else {
        return customer.auto_update_interval || 0
      }
    }

    render () {
        return null
    }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
  alert: state.alert,
  notification: state.notification,
  discussion: state.discussion,
  discussions: state.discussions,
  discussion_list: state.discussion_list,
  app: state.app,
  user: state.user,
  customer: state.customer,
});

export default connect(mapStateToProps)(LiveUpdateManager);
