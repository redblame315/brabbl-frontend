import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalSelector from './modal-selector';
import { hideModal } from '../../actions/app';
import { bootstrapApp } from '../../actions/async';
import { MODAL_DATAPOLICY } from '../../constants';
import API from '../../api';

class ModalContent extends React.Component {

  closeModal = () => {
    let { dispatch, modal } = this.props;
    dispatch(hideModal());
    if (modal.modal === MODAL_DATAPOLICY) {
      API.logout();
      dispatch(bootstrapApp());
    }
  }
  componentDidMount() {
    Modal.setAppElement('body');
  }
  render() {
    let { alert, modal, statementId, user, discussion, discussion_list, customer, dispatch } = this.props;
    return (
      <Modal
        isOpen={!modal.hidden}
        onRequestClose={this.closeModal}
        closeTimeoutMS={200}
        className={'modal_content'}
        style={{
          content: {
            top: '10%',
            bottom: '10%',
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: '100%',
          },
        }}
      >
        <span className="close-button" onClick={this.closeModal}>✕</span>
        <div>
          <ModalSelector
            modal={modal}
            alert={alert}
            user={user}
            customer={customer}
            statementId={statementId}
            discussion={discussion || modal.data.discussion}
            discussion_list={discussion_list}
            dispatch={dispatch}
          />
        </div>
      </Modal>
    );
  }
}

ModalContent.propTypes = {
  discussion: PropTypes.object,
  discussion_list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  app: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  user: PropTypes.object,
  customer: PropTypes.object,
  statementId: PropTypes.number,
};
export default ModalContent;
