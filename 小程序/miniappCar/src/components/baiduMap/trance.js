import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Map, CoverView, CoverImage } from "@tarojs/components";
import "./trance.scss";
import StartIcon from "../../images/map_trace_info_start_icon.png";
import EndIcon from "../../images/map_trace_info_end_icon.png";
import KmIcon from "../../images/map_trace_info_km_icon.png";
import LIcon from "../../images/map_trace_info_L_icon.png";
@connect(({ car }) => ({
  car
}))
export default class MapTrace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { carGuijiDetail, choiceGuiJi } = this.props.car;

    return (
      <View class="trance-map-container">
        <Map
          id="myMap"
          include-points={carGuijiDetail.polyline[0].points}
          polyline={carGuijiDetail.polyline}
          markers={carGuijiDetail.Marker}
          style="width: 100%; height: 100%;"
        />
        <CoverView class="info-wrap">
          <CoverView class="wrap">
            <CoverView class="title">{choiceGuiJi.carName}</CoverView>
            <CoverView class="num">
              车牌号：
              {choiceGuiJi.carName}
            </CoverView>
            <CoverView class="item">
              <CoverView class="item-left">
                <CoverView class="name">开始时间</CoverView>
                <CoverView class="value">
                  <CoverImage class="image" src={StartIcon} />
                  <CoverView class="desp">
                    <CoverView class="">{choiceGuiJi.startData}</CoverView>
                    <CoverView class="">{choiceGuiJi.startTime}</CoverView>
                  </CoverView>
                </CoverView>
                {/* <CoverView class="item-left"></CoverView> */}
              </CoverView>
              <CoverView class="item-right">
                <CoverView class="name">结束时间</CoverView>
                <CoverView class="value">
                  <CoverImage class="image" src={EndIcon} />
                  <CoverView class="desp">
                    <CoverView class="">{choiceGuiJi.endData}</CoverView>
                    <CoverView class="">{choiceGuiJi.endTime}</CoverView>
                  </CoverView>
                </CoverView>
              </CoverView>
            </CoverView>
            <CoverView class="item">
              <CoverView class="item-left">
                <CoverView class="name">行驶里程</CoverView>
                <CoverView class="value">
                  <CoverImage class="image" src={KmIcon} />
                  <CoverView class="desp">
                    <CoverView class="">
                      {(choiceGuiJi.runDistance / 1000).toFixed(1)}
                    </CoverView>
                    <CoverView class="">km</CoverView>
                  </CoverView>
                </CoverView>
                {/* <CoverView class="item-left"></CoverView> */}
              </CoverView>
              <CoverView class="item-right">
                <CoverView class="name">耗油量</CoverView>
                <CoverView class="value">
                  <CoverImage class="image" src={LIcon} />
                  <CoverView class="desp">
                    <CoverView class="">{choiceGuiJi.effic}</CoverView>
                    <CoverView class="">L</CoverView>
                  </CoverView>
                </CoverView>
              </CoverView>
            </CoverView>
          </CoverView>
        </CoverView>
      </View>
    );
  }
}
