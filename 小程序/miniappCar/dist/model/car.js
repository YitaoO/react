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

var _ = require("../npm/lodash/lodash.js");

var carOn = "/images/index_car_on_icon.png";
var carOff = "/images/index_car_off_icon.png";
var StartIcon = "/images/map_trace_start_icon.png";
var EndIcon = "/images/map_trace_end_icon.png";

exports.default = {
  namespace: "car",
  state: {
    carStateList: [], //车辆最新状态
    listTreeCar: [], //车辆树
    choiceCar: null, //选中的车辆
    carGuijiList: {
      page: 1,
      limit: 20,
      list: []
    }, //轨迹
    choiceGuiJi: {}, //选择轨迹
    carGuijiDetail: {} //轨迹详情
  },
  reducers: {
    saveCar: function saveCar(state, payload) {
      return _extends({}, state, payload.response);
    }
  },
  effects: {
    // 车辆最新状态
    getCarLastState: /*#__PURE__*/regeneratorRuntime.mark(function getCarLastState(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var response;
      return regeneratorRuntime.wrap(function getCarLastState$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(_api.reqCarStateList, payload);

            case 2:
              response = _context.sent;

              _index4.default.hideLoading();
              response.forEach(function (item) {
                item.id = item.simno;
                item.width = 61;
                item.height = 61;
                item.iconPath = !!item.acc ? carOn : carOff;
              });
              _context.next = 7;
              return put({
                type: "saveCar",
                response: {
                  carStateList: response
                }
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, getCarLastState, this);
    }),

    // 获取车辆树
    getCarTree: /*#__PURE__*/regeneratorRuntime.mark(function getCarTree(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var response;
      return regeneratorRuntime.wrap(function getCarTree$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(_api.reqListTreeCar, payload);

            case 2:
              response = _context2.sent;

              _index4.default.hideLoading();
              _context2.next = 6;
              return put({
                type: "saveCar",
                response: {
                  listTreeCar: response
                }
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, getCarTree, this);
    }),

    // 获取行驶统计
    getCarList: /*#__PURE__*/regeneratorRuntime.mark(function getCarList(_ref5, _ref6) {
      var payload = _ref5.payload;
      var call = _ref6.call,
          put = _ref6.put;
      var page, limit, response;
      return regeneratorRuntime.wrap(function getCarList$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              page = payload.page, limit = payload.limit;
              _context3.next = 3;
              return call(_api.reqCarAccInfo, payload);

            case 3:
              response = _context3.sent;

              _index4.default.hideLoading();
              _context3.next = 7;
              return put({
                type: "saveCar",
                response: {
                  carGuijiList: {
                    list: response,
                    page: page,
                    limit: limit
                  }
                }
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, getCarList, this);
    }),


    // 获取轨迹详情
    getCarTrance: /*#__PURE__*/regeneratorRuntime.mark(function getCarTrance(_ref7, _ref8) {
      var payload = _ref7.payload;
      var call = _ref8.call,
          put = _ref8.put;
      var response, lists;
      return regeneratorRuntime.wrap(function getCarTrance$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return call(_api.reqCarTrance, payload);

            case 2:
              response = _context4.sent;
              lists = {
                polyline: [],
                Marker: []
              };

              lists.polyline.push({
                points: response.data,
                color: "#fa4949",
                width: 4,
                dottedLine: false,
                arrowLine: true,
                borderColor: "#000",
                borderWidth: 5
              });
              lists.Marker.push({
                id: 0,
                latitude: response.data[0].latitude,
                longitude: response.data[0].longitude,
                iconPath: StartIcon,
                width: 33,
                height: 37
              });
              lists.Marker.push({
                id: 1,
                latitude: _.last(response.data).latitude,
                longitude: _.last(response.data).longitude,
                iconPath: EndIcon,
                width: 23,
                height: 27
              });

              _index2.default.hideLoading();
              _context4.next = 10;
              return put({
                type: "saveCar",
                response: {
                  carGuijiDetail: lists
                }
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, getCarTrance, this);
    })
  }
};