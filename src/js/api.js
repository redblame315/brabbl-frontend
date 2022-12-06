require('es6-promise').polyfill();
import axios from 'axios';
import * as Cookie from 'tiny-cookie'
import config from './config';
import moment from 'moment';
import { addCSS, UserHasPermission } from './utils';
import { CAN_CHANGE_USER } from './constants';
import { isArray } from 'lodash';

let API = {

  get(url, axiosConfig) {
    return axios.get(`${config.ApiBaseUrl}${url}`, API.get_config(axiosConfig));
  },

  post(url, data, axiosConfig) {
    return axios.post(`${config.ApiBaseUrl}${url}`, data, API.get_config(axiosConfig));
  },

  multipartPost(url, form_data, axiosConfig) {
    return axios.post(`${config.ApiBaseUrl}${url}`, form_data, API.get_config(axiosConfig));
  },

  delete(url, axiosConfig) {
    return axios.delete(`${config.ApiBaseUrl}${url}`, API.get_config(axiosConfig));
  },

  patch(url, data, axiosConfig) {
    return axios.patch(`${config.ApiBaseUrl}${url}`, data, API.get_config(axiosConfig));
  },

  get_config(config) {
    return {
      headers: {
        'X-Brabbl-Token': window.brabbl.customerId,
        'Authorization': Cookie.get('brabbl-token'),
      },
      ...config
    };
  },

  get_all_customer_users() {
    return API.get('account/user-list/')
    .then(resp => {
      return { users: resp.data.users }
    })
    .catch(() => ({ users: null }));
  },

  get_statistics() {
    return API.get(`statistics/`)
      .then(resp => ({ statistics: resp.data.statistics}))
      .catch(() => ({ statistics: null}));
  },

  get_discussions() {
    return API.get('discussions/')
      .then(resp => {
        return { discussions: resp.data }
      })
      .catch(() => ({ discussions: null }));
  },

  get_discussion(external_id) {
    if(!external_id) {
      return new Promise((resolve) => {
        resolve({ discussion: null });
      })
    }
    let urlencode = (strings, value) => strings[0] + encodeURIComponent(value);
    if (typeof external_id === 'string') {
      external_id = external_id.split('#')[0];
    }
    return API.get(urlencode`discussions/detail/?external_id=${external_id}`)
      .then(resp => ({ discussion: resp.data }))
      .catch(() => ({ discussion: null }));
  },

  delete_discussion(external_id) {
    let urlencode = (strings, value) => strings[0] + encodeURIComponent(value);
    if (typeof external_id === 'string') {
      external_id = external_id.split('#')[0];
    }
    return API.delete(urlencode`discussions/1/?external_id=${external_id}`)
      .then(resp => ({ discussion: resp.data }))
      .catch(() => ({ discussion: null }));
  },
  reset_discussion(external_id) {
    let urlencode = (strings, value) => strings[0] + encodeURIComponent(value);
    if (typeof external_id === 'string') {
      external_id = external_id.split('#')[0];
    }
    return API.post(urlencode`discussions/detail/reset/?external_id=${external_id}`)
      .then(resp => ({ discussion: resp.data }))
      .catch(() => ({ discussion: null }));
  },

  create_discussion(data, axiosConfig) {
    var form_data = new FormData();
    for ( var key in data ) {
      if (key == 'pdfs') {
        if (data[key]) {
          data[key].forEach(pdf => {
            form_data.append('pdfs', pdf, pdf.name);
          })
        }
      } else if(data[key] && isArray(data[key])) {
        data[key].forEach(item => {
          form_data.append(key, item)
        })
      } else if(data[key]) {
        form_data.append(key, data[key]);
      }
    }

    return this.multipartPost('discussions/', form_data, axiosConfig);
  },

  create_discussion_pdf(discussion_id, pdf, axiosConfig) {
    var form_data = new FormData();
    form_data.append('discussion_id', discussion_id);
    form_data.append('pdf', pdf, pdf.name);

    return this.multipartPost('associated_file_upload/', form_data, axiosConfig);
  },

  delete_discussion_pdf(id) {
    return this.delete('associated_file_upload/' + id + '/');
  },

  update_discussion(external_id, changed_fields, axiosConfig) {
    return this.patch('discussions/detail/?external_id=' +
        encodeURIComponent(external_id), changed_fields, axiosConfig);
  },

  get_discussion_list(url) {
    return API.get(`discussion_list/detail/?url=${url}`)
      .then(resp => ({ discussion_list: resp.data ? resp.data : {} }))
      .catch(() => ({ discussion_list: {} }));
  },

  create_discussion_list(data, axiosConfig) {
    return this.post('discussion_list/', data, axiosConfig);
  },

  update_discussion_list(url, changed_fields, axiosConfig) {
    return this.patch('discussion_list/detail/?url=' +
        encodeURIComponent(url), changed_fields, axiosConfig);
  },

  get_update_info(data) {
    return this.post('get_update_info/', data);
  },

  bootstrap(articleId = null) {
    let account,
      discussions,
      discussion,
      availableWordings,
      customer,
      version,
      tags,
      isAuthorized;
    return this.get_backend_version()
      .then(resp => {
        version = resp.version;
        return this.get_account()
      })
      .then(resp => {
        account = resp;
        if (account.user) {
          isAuthorized = true
        }
        return this.get_customer_data();
      })
      .then(resp => {
        customer = resp.data;
        if (isAuthorized && UserHasPermission(account.user, CAN_CHANGE_USER, customer)) {
              return this.get_all_customer_users();
            } else {
              return new Promise(function emptyfunc(resolve) {
                resolve();
              }).then(() => ({
                users: null,
              }));
            }
      })
      .then(resp => {
        customer.users = resp.users;
        if (isAuthorized && UserHasPermission(account.user, CAN_CHANGE_USER, customer)) {
          return this.get_statistics();
        } else {
          return new Promise(function emptyfunc(resolve) {
            resolve();
          }).then(() => ({
            statistics: null,
          }));
        }
      })
      .then(resp => {
        customer.statistics = resp.statistics;
        this.set_theme(customer.theme);
        return this.get_available_wordings();
      })
      .then(resp => {
        availableWordings = resp.data;
        if (!isAuthorized && customer.is_private) {
          return new Promise(function emptyfunc(resolve) {
            resolve();
          }).then(() => ({
            discussions: null,
          }));
        }
        return this.get_discussions();
      })
      .then(resp => {
        discussions = resp.discussions;
        if (!isAuthorized && customer.is_private) {
          return new Promise(function emptyfunc(resolve) {
            resolve();
          }).then(() => ({
            discussion: null,
          }));
        }
        return this.get_discussion(articleId || window.brabbl.articleId);
      })
      .then(resp => {
        discussion = resp.discussion;
        customer.barometerOptions = availableWordings;
        return this.get_notification_wording_data(customer.notification_wording);
      })
      .then(resp => {
        let notification_wording = {},
          markdown_wording = {};
        if (resp.data) {
          let wording_list = resp.data.notification_wording_messages;
          let markdown_wording_list = resp.data.markdown_wording_messages;
          for (let i = 0; i < wording_list.length; i++) {
            notification_wording[wording_list[i].key] = wording_list[i].value;
          }
          for (let i = 0; i < markdown_wording_list.length; i++) {
            markdown_wording[markdown_wording_list[i].key] = markdown_wording_list[i].value;
          }
        }
        customer.notification_wording = notification_wording;
        customer.markdown_wording = markdown_wording;
        return this.get_tags();
      })
      .then(resp => {
        tags = resp.data;
        let url = window.location.href.split("?")[0];
        if (!isAuthorized && customer.is_private) {
          return new Promise(function emptyfunc(resolve) {
            resolve();
          }).then(() => ({
            discussion_list: null,
          }));
        }
        return this.get_discussion_list(url);
      })
      .then(resp => ({
        backendVersionNumber: version,
        user: account.user,
        customer: customer,
        discussions: discussions,
        discussion: discussion,
        discussion_list: resp.discussion_list,
        discussion_participants: discussion? discussion.discussion_users : null,
        tags: tags,
      }));
  },

  get_account() {
    if (Cookie.get('brabbl-token')) {
      return API.get('account/')
        .then(resp => ({
          'user': resp.data,
        }))
        .catch(() => {
          Cookie.remove('brabbl-token');
          return { 'user': null };
        });
    } else {
      return new Promise(function emptyfunc(resolve) {
        resolve();
      }).then(() => ({
        'user': null,
      }));
    }
  },

  get_backend_version() {
    return API.get(`version/`)
    .then(resp => {
      return resp.data;
    })
    .catch(() => ({ version: null }));
  },

  get_argument(id) {
    let replies,
      argument;
    return API.get(`arguments/${id}/`)
      .then(resp => {
        argument = resp.data;
        return API.get(`arguments/${id}/replies/`);
      })
      .then(resp => {
        replies = resp.data;
        return {
          argument: argument,
          replies: replies,
        };
      });
  },

  reset_password(email) {
    return this.post('account/reset/', { email: email });
  },


  confirm_data_policy() {
    return this.post('account/confirm-data-policy/');
  },


  register_user(user_data) {
    return this.post('account/register/', user_data);
  },

  vote_statement(statement_id, rating) {
    return this.post('statements/' + statement_id + '/vote/', { 'rating': rating });
  },

  change_statement_status(statement_id, status) {
    return this.post('statements/' + statement_id + '/change_status/', { 'status': status });
  },

  rate_argument(argument_id, rating) {
    return this.post('arguments/' + argument_id + '/rate/', { 'rating': rating });
  },

  delete_argument(argument_id) {
    return this.delete('arguments/' + argument_id + '/');
  },

  change_argument_status(argument_id, status) {
    return this.post('arguments/' + argument_id + '/change_status/', { 'status': status });
  },

  flag(data) {
    return this.post('flag/', data);
  },

  get_available_wordings() {
    return this.get('wordings/');
  },

  get_customer_data() {
    return this.get('customer/');
  },

  get_notification_wording_data(n_wording_id) {
    if (n_wording_id) {
      return this.get('notification_wording/' + n_wording_id + '/');
    } else {
      return new Promise(function emptyfunc(resolve) {
        resolve();
      }).then(() => ({
        'notification_wording': {},
      }));
    }
  },

  get_tags() {
    return this.get('tags/');
  },

  get_trans() {
    return API.get('translation/')
      .then(resp => {
        moment.locale(resp.data.language);
        return resp.data.translations;
      })
      .catch(() => ({ translators: null }));
  },

  set_theme(customer_theme) {
    let theme = customer_theme || config.defaultTheme;
    addCSS(`${config.CSSBaseUrl}${theme}.css`);
  },

  login(username, password) {
    return this.post('account/login/', { 'username': username, 'password': password })
      .then(resp => {
        Cookie.set('brabbl-token', 'Token ' + resp.data.token);
        resp.loggedIn = true;
        return resp;
      })
      .catch(resp => {
        resp.loggedIn = false;
        return resp;
      });
  },

  logout() {
    API.get('account/logout/');
    Cookie.remove('brabbl-token');
  },

  update_profile(user, axiosConfig) {
    return this.patch('account/', user, axiosConfig);
  },

  create_argument(argument, axiosConfig) {
    return this.post('arguments/', argument, axiosConfig);
  },

  update_argument(argument_id, changed_fields, axiosConfig) {
    return this.patch('arguments/' + argument_id + '/', changed_fields, axiosConfig);
  },

  create_statement(data, axiosConfig) {
    var form_data = new FormData();
    for ( var key in data ) {
      if (key == 'pdfs') {
        if (data[key]) {
          data[key].forEach(pdf => {
            form_data.append('pdfs', pdf, pdf.name);
          })
        }
      } else if(data[key]) {
        form_data.append(key, data[key]);
      }
    }

    return this.multipartPost('statements/', form_data, axiosConfig);
  },

  create_statement_pdf(statement_id, pdf, axiosConfig) {
    var form_data = new FormData();
    form_data.append('statement_id', statement_id);
    form_data.append('pdf', pdf, pdf.name);

    return this.multipartPost('associated_file_upload/', form_data, axiosConfig);
  },

  delete_statement_pdf(id) {
    return this.delete('associated_file_upload/' + id + '/');
  },
  update_statement(statement_id, data, axiosConfig) {
    return this.patch('statements/' + statement_id + '/', data, axiosConfig);
  },

  delete_statement(statement_id) {
    return this.delete('statements/' + statement_id + '/');
  },

  invite_participant(data) {
    return this.post('account/invite-participant/', data);
  },

  revoke_invitation(data) {
    return this.patch('account/invite-participant/', data);
  },

  get_pending_invitations() {
    return this.get('account/invite-participant/');
  }
};

export default API;
