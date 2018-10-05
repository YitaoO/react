"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _api = require("../services/api.js");

var _index = require("../components/dialog/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: "search",
  state: {
    navFixed: false, //导航是否固定
    isCar: false, //车辆选择
    isTime: false, //时间选择
    isDate: false, //日期选择
    timeDialog: false, // 是否显示日期选择
    timeArr: ["1小时/班", "2小时/班", "3小时/班", "4小时/班", "5小时/班", "6小时/班", "7小时/班", "8小时/班", "9小时/班", "10小时/班", "11小时/班", "12小时/班", "13小时/班", "14小时/班", "15小时/班", "16小时/班", "17小时/班", "18小时/班", "19小时/班", "20小时/班", "21小时/班", "22小时/班", "23小时/班", "24小时/班"],
    dayHour: 7, //台班规则
    bdate: "", // 开始时间
    edate: "", //结束时间
    searchParams: {}, //搜索请求参数
    searchPage: 1,
    searchLimit: 20,
    searchLists: [] //搜索结果数据
  },
  reducers: {
    saveState: function saveState(state, payload) {
      return _extends({}, state, payload.response);
    }
  },
  effects: {
    // 搜索数据
    getList: /*#__PURE__*/regeneratorRuntime.mark(function getList(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var url, params, response;
      return regeneratorRuntime.wrap(function getList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = payload.url, params = payload.params;
              _context.next = 3;
              return call(_api.reqSearch, url, params);

            case 3:
              response = _context.sent;

              _index2.default.hideLoading();
              _context.next = 7;
              return put({
                type: "saveState",
                response: {
                  searchLists: response.data
                }
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, getList, this);
    })
  }
};