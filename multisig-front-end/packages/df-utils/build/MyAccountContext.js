"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyAccountProvider = MyAccountProvider;
exports.useMyAccount = useMyAccount;
exports.MyAccountContext = exports.MY_ADDRESS = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _store = _interopRequireDefault(require("store"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const MY_ADDRESS = 'df.myAddress';
exports.MY_ADDRESS = MY_ADDRESS;

function readMyAddress() {
  const myAddress = _store.default.get(MY_ADDRESS);

  console.log('Read my address from the local storage:', myAddress);
  return myAddress;
}

function reducer(state, action) {
  function forget() {
    console.log('Forget my address');

    _store.default.remove(MY_ADDRESS);

    return _objectSpread({}, state, {
      address: undefined
    });
  }

  let address;

  switch (action.type) {
    case 'reload':
      address = readMyAddress();
      console.log('Reload my address:', address);
      return _objectSpread({}, state, {
        address,
        inited: true
      });

    case 'set':
      address = action.address;

      if (address !== state.address) {
        if (address) {
          console.log('Set my new address:', address);

          _store.default.set(MY_ADDRESS, address);

          return _objectSpread({}, state, {
            address,
            inited: true
          });
        } else {
          return forget();
        }
      }

      return state;

    case 'forget':
      address = action.address;
      const isMyAddress = address && address === readMyAddress();

      if (!address || isMyAddress) {
        return forget();
      }

      return state;

    default:
      throw new Error('No action type provided');
  }
}

function functionStub() {
  throw new Error('Function needs to be set in MyAccountProvider');
}

const initialState = {
  inited: false,
  address: undefined
};
const contextStub = {
  state: initialState,
  dispatch: functionStub,
  set: functionStub,
  forget: functionStub
};
const MyAccountContext = (0, _react.createContext)(contextStub);
exports.MyAccountContext = MyAccountContext;

function MyAccountProvider(props) {
  const [state, dispatch] = (0, _react.useReducer)(reducer, initialState);
  (0, _react.useEffect)(() => {
    if (!state.inited) {
      dispatch({
        type: 'reload'
      });
    }
  }, [state.inited]); // Don't call this effect if `invited` is not changed

  const contextValue = {
    state,
    dispatch,
    set: address => dispatch({
      type: 'set',
      address
    }),
    forget: address => dispatch({
      type: 'forget',
      address
    })
  };
  return _react.default.createElement(MyAccountContext.Provider, {
    value: contextValue
  }, props.children);
}

function useMyAccount() {
  return (0, _react.useContext)(MyAccountContext);
}