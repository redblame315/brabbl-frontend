module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "node": true
  },
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "rules": {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "react/display-name": 0,
    "prefer-const": 0,
    "prefer-template": 0,
    "no-console": 0,
    "new-cap": 0,
    "no-param-reassign": 0,
    "no-else-return": 0,
	  "object-shorthand": 0,
	  "prefer-arrow-callback": 0,
	  "camelcase": 0,
	  "quote-props": 0,
	  "one-var": 0,
	  "consistent-return": 0,
	  "react/no-underscore-dangle": 0,
    "react/jsx-pascal-case": 0,
    "react/prefer-stateless-function": 0,
	  "react/prefer-es6-class": 0,
	  "react/no-multi-comp": 0,
    "react/prop-types": 0,
  },
};
