"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _api = require("../services/api.js");

var _index3 = require("../components/dialog/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: "userInfo",
  state: {
    openId: "",
    weixinUserInfo: {}, //微信用户信息
    carUserInfo: "" //车辆用户信息
  },
  reducers: {
    saveOpenId: function saveOpenId(state, payload) {
      return _extends({}, state, {
        openId: payload.openId
      });
    },
    saveUserInfo: function saveUserInfo(state, payload) {
      return _extends({}, state, payload.response);
    },
    saveCarUserInfo: function saveCarUserInfo(state, payload) {
      return _extends({}, state, {
        carUserInfo: payload.response
      });
    }
  },
  effects: {
    // 注册
    weixinAdd: /*#__PURE__*/regeneratorRuntime.mark(function weixinAdd(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var response;
      return regeneratorRuntime.wrap(function weixinAdd$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(_api.reqWeixinAdd, payload);

            case 2:
              response = _context.sent;

              _index4.default.hideLoading();
              _index2.default.navigateTo({
                url: "/pages/index/index"
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, weixinAdd, this);
    }),

    // 登录
    login: /*#__PURE__*/regeneratorRuntime.mark(function login(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var response;
      return regeneratorRuntime.wrap(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(_api.reqLogin, payload);

            case 2:
              response = _context2.sent;

              //TODO:这里因为在别的地方要用到，所以用了缓存，后期看看可以在model直接取吗
              wx.setStorage({
                key: "sessionId",
                data: response.sessionId
              });

              _context2.next = 6;
              return put({
                type: "saveCarUserInfo",
                response: response
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, login, this);
    })
  }
};