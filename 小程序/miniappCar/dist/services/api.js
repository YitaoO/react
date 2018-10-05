"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqSearch = exports.reqCarTrance = exports.reqCarAccInfo = exports.reqListTreeCar = exports.reqCarStateList = exports.reqLogin = exports.reqWeixinAdd = undefined;

// 绑定
var reqWeixinAdd = exports.reqWeixinAdd = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/wppersonweixinadd",
              data: params,
              method: "POST"
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function reqWeixinAdd(_x) {
    return _ref.apply(this, arguments);
  };
}();
// 登录


var reqLogin = exports.reqLogin = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/login?openID=" + params.openID + "&weixin=" + params.weixin,
              // data: params,
              method: "POST"
            }, true));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function reqLogin(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
//查询车辆最新状态接口


var reqCarStateList = exports.reqCarStateList = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/gpsdevicebuffers/getCarLastStateBySimNo?userId=" + params.UserId + "&mapType=3",
              method: "GET"
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function reqCarStateList(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
//获取车辆树


var reqListTreeCar = exports.reqListTreeCar = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(params) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/ConsumerProjCarCarInfo/listTreeCar",
              method: "POST",
              data: params
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function reqListTreeCar(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
//行驶统计接口


var reqCarAccInfo = exports.reqCarAccInfo = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(params) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/carproj/getCarAccInfoByUserIdForWeiXin?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function reqCarAccInfo(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
//轨迹详情接口


var reqCarTrance = exports.reqCarTrance = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(params) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", (0, _request2.default)({
              url: baseUrl + "/gpsdevicebuffers/getCarGuiJiBySimNoTime?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function reqCarTrance(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
// 搜索数据


var reqSearch = exports.reqSearch = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(url, params) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log(url);
            console.log(params);

            return _context7.abrupt("return", (0, _request2.default)({
              url: "" + baseUrl + url + "?" + (0, _index.stringify)(params),
              method: "GET"
            }));

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function reqSearch(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();

var _index = require("../npm/qs/lib/index.js");

var _request = require("./request.js");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * api列表
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var mockBaseUrl = "https://www.easy-mock.com/mock/5ba99eeab9b3b431f78ef57b/www.weibai.com/api";
var localUrl = "http://192.168.1.94:9020/portal-car/api";
var proUrl = "https://www.weepal.cn/portal-car/api";

var baseUrl = mockBaseUrl;