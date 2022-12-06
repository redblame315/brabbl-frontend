import React from 'react';
import config from '../../../config/index';

import i18next from 'i18next';

let base_url = config.BaseUrl;
let cid = window.brabbl.customerId;
let next = window.location.href;

class SocialButtons extends React.Component {

  socialNetworkLogo = (network) => {
    return base_url.replace(/\/$/, '') + '/static/img/social/' + network + '.png';
  }

  loginOnFacebook = (e) => {
    e.preventDefault();
    window.location.href = `${base_url}/auth/login/facebook/?customer_token=${cid}&back_url=${next}`;
  }

  loginOnGoogle = (e) => {
    e.preventDefault();
    window.location.href = `${base_url}/auth/login/google-oauth2/?customer_token=${cid}&back_url=${next}`;
  }

  loginOnTwitter = (e) => {
    e.preventDefault();
    window.location.href = `${base_url}/auth/login/twitter/?customer_token=${cid}&back_url=${next}`;
  }

  render() {
    return (<div className="social-login">
      <div>
        <a onClick={ this.loginOnFacebook } className="social-login-button full-width">
          <img
            src={ this.socialNetworkLogo('facebook') }
            alt={ i18next.t('Login with Facebook')}
            title={ i18next.t('Login with Facebook')}
          />
        </a>
        <a onClick={ this.loginOnTwitter } className="social-login-button full-width">
          <img
            src={ this.socialNetworkLogo('twitter') }
            alt={ i18next.t('Login with Twitter')}
            title={ i18next.t('Login with Twitter')}
          />
        </a>
        <a onClick={ this.loginOnGoogle } className="social-login-button full-width">
          <img
            src={ this.socialNetworkLogo('google') }
            alt={ i18next.t('Login with Google')}
            title={ i18next.t('Login with Google')}
          />
        </a>
      </div>
        <p className="alternate-login"><span>{ i18next.t('or via mail') }</span></p>
    </div>);
  }
}

export default SocialButtons;
