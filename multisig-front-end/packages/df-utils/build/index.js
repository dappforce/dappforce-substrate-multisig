"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bnToStr = bnToStr;
exports.findNameByAddress = findNameByAddress;
exports.queryToProp = queryToProp;
exports.getUrlParam = getUrlParam;
exports.queryBlogsToProp = exports.nonEmptyArr = exports.parseNumStr = exports.nonEmptyStr = exports.isEmptyStr = exports.isNum = exports.isStr = exports.isObj = exports.notDef = exports.notDefined = exports.isDef = exports.isDefined = exports.ZERO = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _uiKeyring = _interopRequireDefault(require("@polkadot/ui-keyring"));

var _queryString = _interopRequireDefault(require("query-string"));

const ZERO = new _bn.default(0);
exports.ZERO = ZERO;

function bnToStr(bn) {
  let dflt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return bn ? bn.toString() : dflt;
} // String, Numbers, Object
// --------------------------------------


const isDefined = x => !notDefined(x);

exports.isDefined = isDefined;
const isDef = isDefined;
exports.isDef = isDef;

const notDefined = x => x === null || typeof x === 'undefined';

exports.notDefined = notDefined;
const notDef = notDefined;
exports.notDef = notDef;

const isObj = x => x !== null && typeof x === 'object';

exports.isObj = isObj;

const isStr = x => typeof x === 'string';

exports.isStr = isStr;

const isNum = x => typeof x === 'number';

exports.isNum = isNum;

const isEmptyStr = x => notDefined(x) || isStr(x) && x.trim().length === 0;

exports.isEmptyStr = isEmptyStr;

const nonEmptyStr = x => isStr(x) && x.trim().length > 0;

exports.nonEmptyStr = nonEmptyStr;

const parseNumStr = num => {
  try {
    return parseInt(num, undefined);
  } catch (err) {
    return undefined;
  }
};

exports.parseNumStr = parseNumStr;

const nonEmptyArr = x => Array.isArray(x) && x.length > 0; // Keyring stuff:
// --------------------------------------


exports.nonEmptyArr = nonEmptyArr;

function findNameByAddress(address) {
  try {
    return _uiKeyring.default.getAccount(address).getMeta().name;
  } catch (error) {
    try {
      return _uiKeyring.default.getAddress(address).getMeta().name;
    } catch (error) {
      // ok, we don't have account or address
      return undefined;
    }
  }
} // Substrate/Polkadot API utils
// --------------------------------------


/** Example of apiQuery: 'query.councilElection.round' */
function queryToProp(apiQuery, paramNameOrOpts) {
  let paramName;
  let propName;

  if (typeof paramNameOrOpts === 'string') {
    paramName = paramNameOrOpts;
  } else if (paramNameOrOpts) {
    paramName = paramNameOrOpts.paramName;
    propName = paramNameOrOpts.propName;
  } // If prop name is still undefined, derive it from the name of storage item:


  if (!propName) {
    propName = apiQuery.split('.').slice(-1)[0];
  }

  return [apiQuery, {
    paramName,
    propName
  }];
}

const queryBlogsToProp = (storageItem, paramNameOrOpts) => {
  return queryToProp("query.blogs.".concat(storageItem), paramNameOrOpts);
}; // Parse URLs
// --------------------------------------


exports.queryBlogsToProp = queryBlogsToProp;

function getUrlParam(location, paramName) {
  let deflt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  const params = _queryString.default.parse(location.search);

  return params[paramName] ? params[paramName] : deflt;
}