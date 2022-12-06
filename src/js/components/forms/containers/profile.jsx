import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone'
import ProfileForm from '../profile';
import { updateFormErrors } from './utils';
import { showNotification } from '../../../actions/app';
import { bootstrapApp } from '../../../actions/async';
import API from '../../../api';
import i18next from 'i18next';
import { UseNotifyWording, resizeBase64 } from '../../../utils';
import { CButton, CCircularProgress } from '../../common/atoms';

class ProfileFormContainer extends React.Component {

  constructor(props) {
    super(props);
    let { initial_data, user } = this.props;
    let form_data = { onChange: this.forceUpdate.bind(this) };
    if (initial_data) {
      if (!initial_data.bundesland) {
        initial_data.bundesland = '-';
      }
      Object.assign(form_data, { data: initial_data });
    }
    let profile_form = ProfileForm(this.props.customer);
    this.state = {
      form: new profile_form(form_data),
      show_spinner: false,
      progress: 0,
      image: null
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { form } = this.state;
    let { dispatch, onSubmit } = this.props;
    let isValid = form.validate();
    if (isValid) {
      this.setState({ 'show_spinner': true, progress: 0 });
     
      let data = form.cleanedData;
      if(this.avatarEditor && this.state.image) {
        let base64Img = this.avatarEditor.getImage("image/jpeg").toDataURL("image/jpeg");
        if (base64Img) {
          data.image = base64Img;
        }
      }
      resizeBase64(data.image, 1024, 1024)
      .then(resizedImage => {
        if (resizedImage) {
          data.image = resizedImage
        }
        API.update_profile(data,
          {
            onUploadProgress: progressEvent => {
              this.setState({progress: (progressEvent.loaded * 100) / progressEvent.total})
            }
          })
        .then(() => onSubmit())
        .then(() => {
          dispatch(bootstrapApp());
          dispatch(showNotification(UseNotifyWording(this.props, 'notification_profile_updated')));
        })
        .catch(resp => {
          updateFormErrors(form, resp);
          this.forceUpdate();
        });
      })
      .catch(err => {})
    }
  }
  
  handleDrop = dropped => {
    this.setState({ image: dropped[0] })
  }
  handleClick = e => {
    const attached = e.target.files
    this.setState({ image: attached[0] })
  }
  setAvatarEditorRef = (avatarEditor) => this.avatarEditor = avatarEditor

  render() {
    let { form } = this.state;
    let { onResetPassword, user } = this.props;
    let buttonText = this.state.show_spinner ?
                      <CCircularProgress value={this.state.progress}/> 
                      : i18next.t('Update profile');
    return (
      <div className="fullform">
        <div className="fullform-header">
          <h1>{i18next.t('Profile')}</h1>
        </div>
        <div className="fullform-body">
          <form onSubmit={this.handleSubmit}>
            {form.render()}
            <div className="fullform-section avatar-section">
              <h2>{ i18next.t('Profile picture')}</h2>
              <Dropzone
                onDrop={this.handleDrop}
                noClick
                noKeyboard
                style={{ width: '200px', height: '200px' }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                      <AvatarEditor
                        image={this.state.image || user.image.original}
                        ref={this.setAvatarEditorRef}
                        width={200}
                        height={200}
                        border={20}
                        color={[255, 255, 255, 0.6]}
                        scale={1}
                      />
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
              <CButton 
                isFilePicker
                onFileChange={this.handleClick}
                fileAccept="image/png, image/jpeg"
                type="secondary"
                containerStyle={{height: '40px'}}>{i18next.t('Add Photo')}</CButton>
              <div className="help-text">
                { i18next.t(
                  'Please drag a picture to the image area to change your profile picture'
                )}
              </div>
            </div>
            <div className="fullform-footer">
              <button
                className=""
                onClick={(e) => onResetPassword(e)}
              >
                { i18next.t('Reset Password')}
              </button>
              <button className="primary" disabled={this.state.show_spinner}>{buttonText}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ProfileFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  initial_data: PropTypes.object,
  user: PropTypes.object,
  onResetPassword: PropTypes.func.isRequired,
};

export default ProfileFormContainer;
