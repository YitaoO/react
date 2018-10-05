import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { CoverView, CoverImage } from "@tarojs/components";
import Arrow from "../../images/index_arrow_icon.png";
import "./markerInfo.scss";
@connect(({ map, carTree }) => ({
  map,
  carTree
}))
export default class MarkerInfo extends Component {
  constructor(props) {
    super(props);

    this.handleToDetail = this.handleToDetail.bind(this);
  }

  handleToDetail = () => {
    const { markerInfo } = this.props;
    this.props.dispatch({
      type: "carTree/saveState",
      response: {
        choiceCar: {
          // carName: 这个值缺少，需要加字段
          carNumber: markerInfo.carNumber,
          gpsDeviceSimNo: markerInfo.simno
        }
      }
    });
    this.props.dispatch({
      type: "map/saveState",
      response: {
        showMarkerInfo: false,
        markerInfo: {}
      }
    });
    Taro.navigateTo({ url: `/pages/history/index?isChoice=true` });
  };
  render() {
    const { markerInfo } = this.props.map;

    return (
      <CoverView className="marker-info">
        <CoverView className="center">
          <CoverView className="item">
            <CoverView className="left">
              <CoverView className="title">车牌号</CoverView>
              <CoverView className="value">{markerInfo.carNumber}</CoverView>
            </CoverView>
            <CoverView className="right">
              <CoverView className="title">类型</CoverView>
              <CoverView className="value">{markerInfo.carModel}</CoverView>
            </CoverView>
          </CoverView>
          <CoverView className="item">
            <CoverView className="left">
              <CoverView className="title">速度</CoverView>
              <CoverView className="value">
                {markerInfo.speed}
                km/h
              </CoverView>
            </CoverView>
            <CoverView className="right">
              <CoverView className="title">熄火</CoverView>
              <CoverView className="value">
                {!!markerInfo.acc ? "否" : "是"}
              </CoverView>
            </CoverView>
          </CoverView>
          <CoverView className="item">
            <CoverView className="left">
              <CoverView className="title">司机</CoverView>
              <CoverView className="value">
                {!!markerInfo.driverName ? markerInfo.driverName : "无"}
              </CoverView>
            </CoverView>

            <CoverView className="right">
              <CoverView className="title">电话</CoverView>
              <CoverView className="value">
                {!!markerInfo.driverTel ? markerInfo.driverTel : "无"}
              </CoverView>
            </CoverView>
          </CoverView>
          <CoverView className="item">
            <CoverView className="left">
              <CoverView className="title">定位时间</CoverView>
              <CoverView className="value">{markerInfo.adddate}</CoverView>
            </CoverView>
          </CoverView>
        </CoverView>

        <CoverView className="footer" onTap={this.handleToDetail}>
          <CoverView className="title">历史轨迹</CoverView>
          <CoverImage className="image" src={Arrow} />
        </CoverView>
      </CoverView>
    );
  }
}
