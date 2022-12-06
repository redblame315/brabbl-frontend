import React from 'react';
import PropTypes from 'prop-types';
import Crouton from 'react-crouton';

class UserMessage extends React.Component {

  render() {
    let { message, closeHandler, hidden } = this.props;
    let data = {
      id: Date.now(),
      type: 'user-message',
      message: message,
      onDismiss: closeHandler,
      hidden: hidden,
      timeout: 6000,
    };
    return (
      <Crouton {...data} />
    );
  }
}

UserMessage.propTypes = {
  message: PropTypes.string,
  closeHandler: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
};

export default UserMessage;

