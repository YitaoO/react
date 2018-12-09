/**
 * 组件 - 百度地图
 */
/**
 * TODO:优化要求
 * 1:优化性能
 * 2:瞄点
 * 3:加入搜索
 */
import React, { Component } from "react";
import { connect } from "dva";

@connect(({ deviceState }) => ({
  areaList: deviceState.areaList
}))
export default class BaiduMap extends Component {
  constructor(props) {
    super(props);
    // console.log(props);

    this.state = {
      mapSearch: false, //是否开启搜索
      mapMarksShow: false //是否开启瞄点
    };
  }
  componentDidMount() {
    this.initMap();
  }
  // 初始化地图
  initMap = () => {
    this.Map = new window.BMap.Map("myMap");
    this.point = new window.BMap.Point(116.404, 39.915);
    this.marker = new window.BMap.Marker(this.point);
    this.Map.centerAndZoom(this.point, 8);
    this.Map.enableScrollWheelZoom(true);
  };

  componentDidUpdate() {
    let that = this;
    const { areaList } = that.props;
    let pointsView = [];
    //添加标注
    areaList.forEach(function(item, key, items) {
      let point = new window.BMap.Point(item.longitude, item.latitude);
      pointsView.push(point);
      that.addMarker(point, key, item);
    });

    that.Map.setViewport(pointsView);
  }
  // 添加market图标
  addMarker = (point, index, item) => {
    let that = this;
    // 创建标注对象并添加到地图
    let myIcon = new window.BMap.Icon(
      require("./map_marker_icon.png"),
      new window.BMap.Size(32, 38)
    );
    let marker = new window.BMap.Marker(point, {
      icon: myIcon
    });
    that.Map.addOverlay(marker);

    let labelName = !that.mapSearch ? item.areaName : item.name;

    //添加label标注
    let label = new window.BMap.Label(labelName, {
      offset: new window.BMap.Size(-10, -25)
    });
    label.setStyle({
      borderColor: "#17b990",
      padding: "2px 5px 2px 5px",
      color: "#333",
      cursor: "pointer"
    });
    marker.setLabel(label);

    marker.addEventListener("click", function() {
      that.openInfoWindow(that.addMarkerInfoWindow(item));
    });
  };
  // 添加market弹窗
  addMarkerInfoWindow = item => {
    let html = `
      <div style="font-size:14px;color:#666;">

      开启:<span style="font-size:16px;">:${item.onlineCount}</span>
        关闭:<span style="font-size:16px;">${item.shutDownCount}</span>
        离线:<span style="font-size:16px;">${item.offlineCount}</span>
        维修:<span style="font-size:16px;">${item.repairCount}</span>
        </div>
    `;
    let info = new window.BMap.InfoWindow(html, {
      width: 100, // 信息窗口宽度
      height: 30, // 信息窗口高度
      title: `<p style="text-align:center;padding-bottom:10px;">区域设备信息</p>`
      // title: `<p style="text-align:center;padding-bottom:10px;">区域设备信息</p>` // 信息窗口标题
    }); // 创建信息窗口对象
    return info;
  };

  render() {
    return (
      <div
        id="myMap"
        style={{
          width: "100%",
          height: "100%"
        }}
      />
    );
  }
}
