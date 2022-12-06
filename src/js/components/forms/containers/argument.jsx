import React from 'react';
import PropTypes from 'prop-types';
import ArgumentForm from '../argument';
import API from '../../../api';
import { updateFormErrors } from './utils';
import i18next from 'i18next';
import { UseWording } from '../../../utils';
import { CCircularProgress } from '../../common/atoms';

class ArgumentFormContainer extends React.Component {

  constructor(props) {
    super(props);
    let form_data = { onChange: this.forceUpdate.bind(this) };
    let argument_form = ArgumentForm();
    if (this.props.initial_data) {
      Object.assign(form_data, { data: this.props.initial_data });
    }
    this.state = {
      form: new argument_form(form_data),
      show_spinner: false,
      progress: 0
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    let data;
    let form = this.state.form;
    let isValid = form.validate();
    if (isValid) {
      this.setState({ 'show_spinner': true, progress: 0});
      data = form.cleanedData;
      data.statement_id = this.props.statement.id;
      if (this.props.initial_data) {
        this.updateArgument(data, form);
      } else {
        if (this.props.argument) {
          data.reply_to = this.props.argument.id;
        }
        data.is_pro = this.props.is_pro;
        this.createArgument(data, form);
      }
    }
    this.forceUpdate();
  }

  createArgument = (data, form) => {
    API.create_argument(data,
      {
        onUploadProgress: progressEvent => {
          this.setState({progress: (progressEvent.loaded * 100) / progressEvent.total})
        }
      })
      .then(() => {
        this.props.onSubmit(data);
      })
      .catch(resp => {
        updateFormErrors(form, resp);
        this.setState({ 'show_spinner': false, progress: 0 });
        this.forceUpdate();
      });
  }

  updateArgument = (data, form) => {
    delete data.statement_id;
    API.update_argument(this.props.initial_data.id, data,
      {
        onUploadProgress: progressEvent => {
          this.setState({progress: (progressEvent.loaded * 100) / progressEvent.total})
        }
      })
      .then(() => {
        this.props.onSubmit(data);
        this.setState({ 'show_spinner': false, progress: 0 });
      })
      .catch(resp => {
        updateFormErrors(form, resp);
        this.setState({ 'show_spinner': false, progress: 0 });
        this.forceUpdate();
      });
  }

  render() {
    let { initial_data } = this.props;
    let { form } = this.state;
    let headerText,
      buttonText;
    let formTitle = (this.props.is_pro === true) ? UseWording(this.props, 'button_new_pro') : UseWording(
      this.props, 'button_new_contra');
    if (initial_data) {
      buttonText = 'Edit';
      headerText = (<h1>{ i18next.t('Edit argument') }</h1>);
    } else {
      buttonText = 'Add new';
      headerText = (
        <div>
          <h1>{ i18next.t(formTitle) }</h1>
          <p>{ i18next.t('to') }</p>
          <h2>{this.props.title}</h2>
        </div>
      );
    }
    buttonText = this.state.show_spinner ? <CCircularProgress value={this.state.progress}/> : i18next.t(buttonText);
    return (
      <div className="fullform">
        <div className="fullform-header">
          {headerText}
        </div>
        <div className="fullform-body">
          <form ref="form" onSubmit={this.onSubmit}>
            <div className="fullform-section createArgumentForm">
              {form.render()}
            </div>
            <div className="fullform-footer">
              <button className="primary" disabled={this.state.show_spinner}>{buttonText}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ArgumentFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  statement: PropTypes.object,
  argument: PropTypes.object,
  title: PropTypes.string.isRequired,
  initial_data: PropTypes.object,
  is_pro: PropTypes.bool.isRequired,
};

export default ArgumentFormContainer;
