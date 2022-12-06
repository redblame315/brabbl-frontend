import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import moment from 'moment';

class AvatarContainer extends React.Component {
  
  render() {
    let user = this.props.user;
    if (!user) return null;
    let avatar_props = {
      src: user.image ? user.image.small : null,
      name: user.display_name,
      size: this.props.size || 38,
      className: 'avatar',
    };
    let hideInfo = this.props.hide_info
    let dateonly = this.props.dateonly
    if (user.linked && user.linked.length > 0 && !user.image.small) {
      let social_props = user.linked[0];
      avatar_props[social_props[0].replace('-oauth2', '') + 'Id'] = social_props[2];
    }
    let formatedDate = moment(this.props.date).format(this.props.dateFormat || "DD.MM.YYYY");
    let containerStyle = "avatar-container " + (this.props.containerStyle || "")
    return (
      <div className={containerStyle}>
        {
          !dateonly &&
          <Avatar
            {...avatar_props}
            round
          />
        }

        {
          !hideInfo &&
          <div className="avatar-info">
            {
              !dateonly &&
              <span className="avatar-name">{user.display_name}</span>
            }
            {
              this.props.date &&
              <span className="avatar-date">
                {formatedDate}
              </span>
            }
          </div>
        }
      </div>
    );
  }
}

AvatarContainer.propTypes = {
  user: PropTypes.object,
  size: PropTypes.number,
  date: PropTypes.string,
  dateFormat: PropTypes.string
};

export default AvatarContainer;
