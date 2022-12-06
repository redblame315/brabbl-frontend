import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { connect } from 'react-redux';
import AvatarContainer from '../../avatar-container';
import moment from 'moment';
import { updateDiscussionParticipants } from '../../../actions/app'
import { CPagination } from '../../common/atoms';

class DiscussionParticipantFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      currentPage: 1
    };
  }

  onChangePage = (page) => {
    this.setState({ currentPage: page })
  }

  onItemClick = (touchedItem) => {
    const {discussion_participants} = this.props
    let participant_ids = discussion_participants || [];
    if(!this.checkParticipant(touchedItem)) {
        let new_participant_ids = [...participant_ids]
        new_participant_ids.push(touchedItem.id);
        this.props.dispatch(updateDiscussionParticipants(new_participant_ids))
    }else {
        let new_participant_ids = [];
        participant_ids.map(participant_id =>{
            if(participant_id != touchedItem.id) {
              new_participant_ids.push(participant_id);
            }
        })
        this.props.dispatch(updateDiscussionParticipants(new_participant_ids))
    }
  }

  checkParticipant = (item) => {
    const { discussion_participants } = this.props
    if (discussion_participants && discussion_participants.includes(item.id)) {
      return true
    }
    return false
  }
  renderParticipant = (item) => {
    let formatedDate = moment(item.date_joined).format("DD.MM.YYYY");
    let isChecked = this.checkParticipant(item)
    let nameClass = "name"
    if (isChecked) {
      nameClass += " selected"
    }
    return <a className="participant-item" key={item.id} onClick={() =>{this.onItemClick(item)}}>
      <div className="participant-checkbox">
        {
          isChecked &&
          <i className="fa fa-check"></i>
        }
      </div>

      <AvatarContainer user={item} size={36} hide_info={true}
                       containerStyle={isChecked ? "avatar-select" : "avatar-non-select"} />
      <div className="participant-info">
        <div className={nameClass}>{item.display_name}</div>
        <div className="email">{item.email}</div>
      </div>
    </a>
  }
  renderParticipants = (participants) => {
    const { currentPage, limit } = this.state
    if(!participants) return null
    let users = participants.sort((a, b) => {
      const a_email = a.email ? a.email.toUpperCase() : ""
      const b_email = b.email ? b.email.toUpperCase() : ""
      if(a_email > b_email) {
        return 1
      } else if(a_email === b_email) {
        return 0
      } else {
        return -1
      }
    });
    let totalCount = users.length;
    let items = users.slice((currentPage - 1) * limit, Math.min(currentPage * limit, totalCount ))
    return <div className="participant-list">
      {
        items.map(item => {
          return this.renderParticipant(item)
        })
      }
      {
        totalCount > this.state.limit &&
        <CPagination
            onChange={(page) => { this.onChangePage(page) }}
            current={this.state.currentPage}
            pageSize={this.state.limit}
            total={totalCount}
        />
      }
    </div>
  }
  render() {
    const { customer } = this.props
    if(!customer) return null
    return (
      this.renderParticipants(customer.users)
    );
  }
}

DiscussionParticipantFormContainer.propTypes = {
  customer: PropTypes.object,
};

const mapStateToProps = (state) => ({
  discussion_participants: state.discussion_participants
});


export default connect(mapStateToProps)(DiscussionParticipantFormContainer);
