'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _omit = require('ramda/src/omit');

var _omit2 = _interopRequireDefault(_omit);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _getContext = require('recompose/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _observeProps = require('rx-recompose/observeProps');

var _observeProps2 = _interopRequireDefault(_observeProps);

var _combineLatest = require('./combineLatest');

var _combineLatest2 = _interopRequireDefault(_combineLatest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  ## EXAMPLE

  ```js
  const CurrentCount = observePropsFromStore(
    ({state$}) => 
      {count: state$},
    ({count}) =>
      <p>Current count is {count}</p>
  ```
)
*/

exports.default = (0, _curry2.default)(function (reducer, BaseComponent) {
  return (0, _compose2.default)((0, _getContext2.default)({
    store: _react.PropTypes.object.isRequired
  }), (0, _observeProps2.default)(function (props$) {
    return props$.flatMap(function (_ref) {
      var store = _ref.store;
      return (0, _combineLatest2.default)(reducer(store, props$.map((0, _omit2.default)('store'))));
    });
  }))(BaseComponent);
});