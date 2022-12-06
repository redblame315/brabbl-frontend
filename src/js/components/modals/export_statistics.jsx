import React from 'react';
import PropTypes from 'prop-types';
import { hideModal } from '../../actions/app';
import i18next from 'i18next';
import { exportStatisticsToExcel } from "../../helpers"

class ExportStatisticsModal extends React.Component {
  exportToExcel(e) {
    exportStatisticsToExcel(this.props.discussion, this.props.customer)
    this.props.dispatch(hideModal());
  }
  onExport = (e) => {
    this.exportToExcel(e)
  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.dispatch(hideModal());
  }

  render() {
    return (
      <div>
        <p>{ i18next.t('key_export_statistics_modal_confirm_question') }</p>
        <button onClick={this.onExport}>{ i18next.t('key_export_statistics_modal_btn_export') }</button>
        <button style={{marginLeft: '16px'}} onClick={this.onCancel}>{ i18next.t('cancel') }</button>
      </div>
    );
  }
}

ExportStatisticsModal.propTypes = {
    user: PropTypes.object,
    discussion: PropTypes.object,
};

export default ExportStatisticsModal;
