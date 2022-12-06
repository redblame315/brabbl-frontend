import React from 'react';
import PropTypes from 'prop-types';
import { InviteParticipantFormContainer } from '../forms';
import { hideModal } from '../../actions/app';
import { reloadDiscussion } from '../../actions/async';
import i18next from 'i18next';

class InviteParticipantModal extends React.Component {

  onSubmit = (resp) => {
    /*let articleId = window.brabbl.articleId;
    if(this.props.app) {
      articleId = this.props.app.articleId;
    } 
    this.props.dispatch(reloadDiscussion(articleId));
    location.hash = `statement-${resp.data.id}`;*/
  }

  render() {
    let { customer,user, initial_data, dispatch } = this.props;

    return (
      <div className="fullform invite-participant">
        <InviteParticipantFormContainer
          customer={customer}
          user={user}
          initial_data={initial_data}
          handleSubmit={this.onSubmit}
          closeModalHandler={() => dispatch(hideModal())}
          dispatch = {dispatch}
        />
      </div>
    );
  }
}

InviteParticipantModal.propTypes = {
  user: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
  initial_data: PropTypes.object,
};

export default InviteParticipantModal;
