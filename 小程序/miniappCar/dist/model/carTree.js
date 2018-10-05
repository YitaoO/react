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
  namespace: "carTree",
  state: {
    listTreeCar: [], //车辆树
    isMultiSelect: false, //是否多选
    choiceCar: null, //选中的单个车辆信息
    choiceFatherId: [], //父集合
    choiceCarsId: [], //选中车辆id集合
    showList: [] //展示默认
  },
  reducers: {
    saveState: function saveState(state, payload) {
      return _extends({}, state, payload.response);
    }
  },
  effects: {
    // 获取车辆树
    getCarTree: /*#__PURE__*/regeneratorRuntime.mark(function getCarTree(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var response;
      return regeneratorRuntime.wrap(function getCarTree$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(_api.reqListTreeCar, payload);

            case 2:
              response = _context.sent;

              _index4.default.hideLoading();
              _context.next = 6;
              return put({
                type: "saveState",
                response: {
                  listTreeCar: response,
                  showList: [String(response[0].projSubId)]
                }
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, getCarTree, this);
    })
  }
};