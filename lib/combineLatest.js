'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rxCombineLatestObj = require('rx-combine-latest-obj');

var _rxCombineLatestObj2 = _interopRequireDefault(_rxCombineLatestObj);

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj) {
    return (0, _lodash2.default)(obj) ? (0, _rxCombineLatestObj2.default)(obj) : obj;
};