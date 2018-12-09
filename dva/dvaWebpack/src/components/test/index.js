/**
 * 组件 - 测试页面
 */
import React, { Component } from "react";
import { connect } from "dva";

@connect(({ test }) => ({
  list: test.list
}))
export default class Test extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "test/fetchList"
    });
  }
  render() {
    return <div class="">测试页面</div>;
  }
}
