Webpack / Deployment
--------------------
* Better seperation of configs and commands for the different environments

AXIOS / API-Interaction
-----------------------
* Improve API client once this is available in a stable release: https://github.com/mzabriskie/axios#axioscreateconfig
* Better organization of API module or use API-Client in directly in actions and remove API module
* Global intercept for server errors (5xx) => Decide how to handle them best (user message, error page, ...)

REDUX/State-Management
----------------------

* Use redux for async stuff (More granular actions)

Testing
-------

* Setup test tools
* Add tests for reducers
* Add tests for everything else

Deployment/Setup
----------------

* Check babel stage (really 0?: https://babeljs.algolia.com/docs/usage/experimental/)
* Check raven/sentry integration
* Improve build size:
  - http://moduscreate.com/optimizing-react-es6-webpack-production-build/
  - https://github.com/robertknight/webpack-bundle-size-analyzer
* Check better separation of client builds (deploy new features/versions only for some clients)
  - Tag versions and map clients to tags?
