"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StartIcon = "/images/map_trace_info_start_icon.png";
var EndIcon = "/images/map_trace_info_end_icon.png";
var KmIcon = "/images/map_trace_info_km_icon.png";
var LIcon = "/images/map_trace_info_L_icon.png";

var MapTrace = (_dec = (0, _index3.connect)(function (_ref) {
  var car = _ref.car;
  return {
    car: car
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(MapTrace, _BaseComponent);

  function MapTrace() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, MapTrace);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = MapTrace.__proto__ || Object.getPrototypeOf(MapTrace)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "carGuijiDetail", "StartIcon", "EndIcon", "KmIcon", "LIcon", "choiceGuiJi"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MapTrace, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(MapTrace.prototype.__proto__ || Object.getPrototypeOf(MapTrace.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var _props$car = this.__props.car,
          carGuijiDetail = _props$car.carGuijiDetail,
          choiceGuiJi = _props$car.choiceGuiJi;


      var anonymousState__temp = (choiceGuiJi.runDistance / 1000).toFixed(1);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        carGuijiDetail: carGuijiDetail,
        StartIcon: StartIcon,
        EndIcon: EndIcon,
        KmIcon: KmIcon,
        LIcon: LIcon,
        choiceGuiJi: choiceGuiJi
      });
      return this.__state;
    }
  }]);

  return MapTrace;
}(_index.Component)) || _class);
MapTrace.properties = {
  "car": null
};
MapTrace.$$events = [];
exports.default = MapTrace;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(MapTrace));