import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, ScrollView } from "@tarojs/components";

import "./historyView.scss";

@connect(({ userInfo, car }) => ({
  userInfo,
  car
}))
class ScrollHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View>我是头部</View>;
  }
}

export default ScrollHeader;
