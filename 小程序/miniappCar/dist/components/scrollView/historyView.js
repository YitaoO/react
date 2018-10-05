"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _moment = require("../../npm/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrowIcon = "/images/navigator_arrow_icon.png";

var HistoryView = (_dec = (0, _index3.connect)(function (_ref) {
  var userInfo = _ref.userInfo,
      car = _ref.car,
      map = _ref.map;
  return {
    userInfo: userInfo,
    car: car,
    map: map
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(HistoryView, _BaseComponent);

  function HistoryView() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, HistoryView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = HistoryView.__proto__ || Object.getPrototypeOf(HistoryView)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["carGuijiList", "loopArray0", "ArrowIcon"], _this.onScrolltolower = function () {
      console.log("我到底了");
    }, _this.handleToDetail = function (item) {
      _this.props.dispatch({
        type: "map/saveState",
        response: {
          type: 1
        }
      });
      _this.props.dispatch({
        type: "car/saveCar",
        response: {
          choiceGuiJi: _extends({
            startData: _this.spliceData(0, item.inTime),
            startTime: _this.spliceData(1, item.inTime),
            endData: _this.spliceData(0, item.outTime),
            endTime: _this.spliceData(1, item.outTime)
          }, item)
        }
      });
      _index2.default.navigateTo({
        url: "/pages/traceDetail/index"
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HistoryView, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(HistoryView.prototype.__proto__ || Object.getPrototypeOf(HistoryView.prototype), "_constructor", this).call(this, props);
      this.onScrolltolower = this.onScrolltolower.bind(this);
      this.handleToDetail = this.handleToDetail.bind(this);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "spliceData",
    value: function spliceData(type, Str) {
      if (type == 0) {
        return Str.substring(0, Str.indexOf(" "));
      } else if (type == 1) {
        return Str.substring(Str.indexOf(" "), Str.length);
      }
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var carGuijiList = this.__props.car.carGuijiList;


      var loopArray0 = carGuijiList.list.map(function (item) {
        item = {
          $$original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = (0, _moment2.default)(item.$$original.totalMinuter).format("mm:ss");
        var $loopState__temp4 = (item.$$original.runDistance / 1000).toFixed(0);
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $$original: item.$$original
        };
      });
      Object.assign(this.__state, {
        carGuijiList: carGuijiList,
        loopArray0: loopArray0,
        ArrowIcon: ArrowIcon
      });
      return this.__state;
    }
  }]);

  return HistoryView;
}(_index.Component)) || _class);
HistoryView.properties = {
  "dispatch": null,
  "car": null
};
HistoryView.$$events = ["onScrolltolower", "handleToDetail"];
exports.default = HistoryView;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(HistoryView));