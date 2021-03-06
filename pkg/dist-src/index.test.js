"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@testing-library/react-hooks");

var _index = _interopRequireWildcard(require("./index.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn()
};

var wrapper = function wrapper(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_index.NavigateProvider, config, children);
};

beforeAll(function () {
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/hello/world'
    }
  });
});
test('navigate if "when" is true and no paths are specified', function () {
  var _renderHook = (0, _reactHooks.renderHook)(function () {
    return (0, _index["default"])();
  }, {
    wrapper: wrapper
  }),
      result = _renderHook.result;

  (0, _reactHooks.act)(function () {
    result.current.push({
      to: '/home',
      when: true
    });
  });
  expect(config.push).toHaveBeenCalledTimes(1);
});
test('never navigate if "when" is false', function () {
  var _renderHook2 = (0, _reactHooks.renderHook)(function () {
    return (0, _index["default"])();
  }, {
    wrapper: wrapper
  }),
      result = _renderHook2.result;

  (0, _reactHooks.act)(function () {
    result.current.push({
      to: '/home',
      when: false,
      onPaths: ['/hello/world'],
      notOnPaths: ['/unrelated']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(0);
});
test('dont navigate if no exact path match in onPaths', function () {
  var _renderHook3 = (0, _reactHooks.renderHook)(function () {
    return (0, _index["default"])();
  }, {
    wrapper: wrapper
  }),
      result = _renderHook3.result;

  (0, _reactHooks.act)(function () {
    result.current.push({
      to: '/home',
      when: true,
      onPaths: ['/unrelated']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(0);
});
test('navigate if pathname matches glob in "onPaths"', function () {
  var _renderHook4 = (0, _reactHooks.renderHook)(function () {
    return (0, _index["default"])();
  }, {
    wrapper: wrapper
  }),
      result = _renderHook4.result;

  (0, _reactHooks.act)(function () {
    result.current.push({
      to: '/home',
      when: true,
      onPaths: ['/unrelated', '/hello/**']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(1);
});
test('dont navigate if user is on a path specified in "notOnPaths"', function () {
  var _renderHook5 = (0, _reactHooks.renderHook)(function () {
    return (0, _index["default"])();
  }, {
    wrapper: wrapper
  }),
      result = _renderHook5.result;

  (0, _reactHooks.act)(function () {
    result.current.push({
      to: '/home',
      when: true,
      notOnPaths: ['/hello/world']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(0);
});
test('navigate if user is not on a path specified in "notOnPaths"', function () {
  var _renderHook6 = (0, _reactHooks.renderHook)(function () {
    return (0, _index["default"])();
  }, {
    wrapper: wrapper
  }),
      result = _renderHook6.result;

  (0, _reactHooks.act)(function () {
    result.current.push({
      to: '/home',
      when: true,
      notOnPaths: ['/unrelated']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(1);
});