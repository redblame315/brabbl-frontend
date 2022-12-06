import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { hideAlert } from '../../actions/app';
import MarkdownWording from '../../components/markup_wording';

class AlertModal extends React.Component {

  closeModal = () => {
    let { dispatch, modal } = this.props;
    dispatch(hideAlert());
  }
  componentDidMount() {
    Modal.setAppElement('body');
  }
  submit = () => {
    this.closeModal()
  }
  render() {
    let { alert } = this.props;
    let title = alert.data ? alert.data.title : null
    let message = alert.data ? alert.data.message : null
    let markdownWording = alert.data ? alert.data.markdownWording : null
    let additionalMarkup = alert.data ? alert.data.additionalMarkup : null
    return (
      <Modal
        isOpen={!alert.hidden}
        onRequestClose={this.closeModal}
        closeTimeoutMS={200}
        className={'alert_modal_content'}
        style={{
          content: {
            top: '40%',
            bottom: '10%',
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
          },
        }}
        shouldCloseOnOverlayClick={false}
      >
        <div class="alert-modal"> 
            {
                title && 
                <div class="alert-modal-title">{title}</div>
            }
            {
                message && 
                <div class="alert-modal-message">{message}</div>
            }
            {
                markdownWording && 
                <div class="alert-modal-message">
                  <MarkdownWording {...this.props} wording={markdownWording} />
                </div>
            }
            {
                additionalMarkup && 
                <div class="alert-modal-message" style={{marginTop: '0px'}}>
                  <span dangerouslySetInnerHTML={{ __html: additionalMarkup }}></span>
                </div>
            }
            <button className="primary" onClick={this.submit}>{'OK'}</button>
        </div>
      </Modal>
    );
  }
}

AlertModal.propTypes = {
  discussion: PropTypes.object,
  discussion_list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  app: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  user: PropTypes.object,
  customer: PropTypes.object,
  statementId: PropTypes.number,
};
export default AlertModal;
