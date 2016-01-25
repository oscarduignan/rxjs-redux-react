'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _withContext = require('recompose/withContext');

var _withContext2 = _interopRequireDefault(_withContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  ## EXAMPLE

  ```js
  <Provider store={store}>
    <CurrentCount/>
  </Provider>
  ```
*/
exports.default = (0, _withContext2.default)({ store: _react.PropTypes.object }, function (props) {
  return { store: props.store };
}, function (_ref) {
  var children = _ref.children;
  return children;
});