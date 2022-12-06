import React from 'react';
import PropTypes from 'prop-types';
import MarkdownWording from '../markup_wording';
import i18next from 'i18next';

class InfoView extends React.Component {
  render() {
    let title = null
    let message = null
    let markdownWording = null
    const { user, customer } = this.props;
    if( customer.is_private ) {
        if(!user) {
            markdownWording = "private_discussions_not_logged_in"
        } else if(!user.is_confirmed) {
            markdownWording = "private_discussions_not_confirmed"
        }
    }
    return (
        customer && customer.is_private && markdownWording ?
        <div style={{display:"flex", flex:1, flexDirection:'column', alignItems: 'center'}}> 
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
        </div>
        :
        null
    );
  }
}

InfoView.propTypes = {
  user: PropTypes.object,
  customer: PropTypes.object,
};
export default InfoView;
