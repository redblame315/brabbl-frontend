import React from 'react';
import PropTypes from 'prop-types';
import * as Cookie from 'tiny-cookie';
import { hideModal } from '../../actions/app';
import { IFRAME_USERLIST } from '../../constants';
import config from '../../config';
import i18next from 'i18next';

class IFrameModal extends React.Component {

  onCancel = (e) => {
    e.preventDefault();
    this.props.dispatch(hideModal());
  }

  URLtoType = (type) => {
    let result = {};

    result[IFRAME_USERLIST] = '/accounts/user-list/';

    if (result[type]) {
      return config.BaseUrl + result[type] + '?token=' + Cookie.get('brabbl-token');
    } else {
      return false;
    }
  }

  sendTokenMessage = () => {
    let iframe_tag = document.getElementById('iframe');
    iframe_tag.contentWindow.postMessage(Cookie.get('brabbl-token'), config.BaseUrl);
  }

  renderIFrame = (url, iframe_type) => {
    let height = 500;
    if(iframe_type == IFRAME_USERLIST) {
      height = window.innerHeight * 80 / 100;
    }
    if (url) {
      return (<iframe id="iframe" src={url} width="100%" height={height} onLoad={this.sendTokenMessage}></iframe>);
    } else {
      return (<div className="error">{ i18next.t('You try to open unknown window')}</div>);
    }
  }

  render() {
    let url = this.URLtoType(this.props.data.iframe_type);
    return (
      <div className="media-modal">
        <div className="modal-media-body">
          {this.renderIFrame(url, this.props.data.iframe_type)}
        </div>
      </div>
    );
  }
}

IFrameModal.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IFrameModal;
