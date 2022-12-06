import React from 'react';
import PropTypes from 'prop-types';
import API from '../../api';
import { bootstrapApp } from '../../actions/async';
import MarkupWording from '../markup_wording';
import i18next from 'i18next';


class DataPolicyModal extends React.Component {

  static propTypes = {
    customer: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm(e) {
    e.preventDefault();
    let { dispatch } = this.props;
    API.confirm_data_policy().then(() => {
      dispatch(bootstrapApp())
    });
  }

  toggleCheckbox() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    let { customer } = this.props;
    return (
    <div>
      <div className="fullform">
        <div className="fullform-header">
          <h1>
            <MarkupWording customer={customer} wording="accept_data_policy_overlay_title" />
          </h1>
        </div>
        <div className="fullform-body">
          <input
            style={{ 'float': 'left', 'marginLeft': '45px' }}
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.toggleCheckbox}
            id="data_policy"
          />
          <label
            style={{ 'width': '75%', 'float': 'left', 'marginLeft': '20px', 'marginBottom': '45px' }}
            htmlFor="data_policy"
          >
            <MarkupWording customer={customer} wording="accept_data_policy_overlay_textbody" />
          </label>
          <div style={{ 'textAlign': 'center', 'clear': 'left' }}>
            {
             this.state.isChecked &&
              <button className="primary" onClick={ this.onConfirm }>{ i18next.t('OK')}</button>
            }
        </div>
        </div>
      </div>
    </div>
    );
  }
}
export default DataPolicyModal;
