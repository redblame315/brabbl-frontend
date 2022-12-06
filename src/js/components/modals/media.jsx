import React from 'react';
import PropTypes from 'prop-types';
import { hideModal } from '../../actions/app';
import Media from '../../components/media';

class MediaModal extends React.Component {

  onCancel = (e) => {
    e.preventDefault();
    this.props.dispatch(hideModal());
  }
  
  render() {
    return (
      <div className="media-modal">
        <div className="modal-media-body">
          <Media data={this.props.data} />
        </div>
      </div>
    );
  }
}

MediaModal.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MediaModal;
