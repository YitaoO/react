/**
 * 组件 - 通用菜单（待封装）
 */
import React, { Component } from "react";
import { connect } from "dva";

export default class Menu extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "test/fetchList"
    });
  }
  render() {
    return <div>通用菜单</div>;
  }
}
