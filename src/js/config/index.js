let env = process.env.APP_ENV || 'development';

let config = {
  development: require('./development.config'),
  production: require('./production.config'),
  new_staging: require('./new_staging.config'),
};

export default config[env];
