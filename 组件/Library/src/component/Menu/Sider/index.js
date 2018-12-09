import React, { Component } from "react";
import { Menu } from "antd";
export default class HeaderMenu extends Component {
  // 点击事件
  handleClick(modId) {
    console.log(modId);
  }
  render() {
    const { list } = this.props;

    return <div>我是侧边菜单</div>;
  }
}
