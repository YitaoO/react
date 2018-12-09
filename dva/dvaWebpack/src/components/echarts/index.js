/**
 * 组件 - echarts
 */
import React, { Component } from "react";
import echarts from "echarts";

export default class Echarts extends Component {
  // 初始化
  initEcharts = () => {};
  render() {
    return <div>{this.initEcharts()}</div>;
  }
}
