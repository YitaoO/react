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

var Arrow = "/images/index_arrow_icon.png";

var MarkerInfo = (_dec = (0, _index3.connect)(function (_ref) {
  var map = _ref.map,
      carTree = _ref.carTree;
  return {
    map: map,
    carTree: carTree
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(MarkerInfo, _BaseComponent);

  function MarkerInfo() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, MarkerInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = MarkerInfo.__proto__ || Object.getPrototypeOf(MarkerInfo)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["Arrow", "markerInfo"], _this.handleToDetail = function () {
      var markerInfo = _this.props.markerInfo;

      _this.props.dispatch({
        type: "carTree/saveState",
        response: {
          choiceCar: {
            // carName: 这个值缺少，需要加字段
            carNumber: markerInfo.carNumber,
            gpsDeviceSimNo: markerInfo.simno
          }
        }
      });
      _this.props.dispatch({
        type: "map/saveState",
        response: {
          showMarkerInfo: false,
          markerInfo: {}
        }
      });
      _index2.default.navigateTo({ url: "/pages/history/index?isChoice=true" });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MarkerInfo, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(MarkerInfo.prototype.__proto__ || Object.getPrototypeOf(MarkerInfo.prototype), "_constructor", this).call(this, props);

      this.handleToDetail = this.handleToDetail.bind(this);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};

      var markerInfo = this.__props.map.markerInfo;


      Object.assign(this.__state, {
        Arrow: Arrow,
        markerInfo: markerInfo
      });
      return this.__state;
    }
  }]);

  return MarkerInfo;
}(_index.Component)) || _class);
MarkerInfo.properties = {
  "markerInfo": null,
  "dispatch": null,
  "map": null
};
MarkerInfo.$$events = ["handleToDetail"];
exports.default = MarkerInfo;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(MarkerInfo));