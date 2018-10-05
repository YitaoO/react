import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import IndexMap from "./index";
import TraceMap from "./trance";

import "./main.scss";

@connect(({ map }) => ({
  map
}))
export default class MapMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props.map;

    return (
      <View class="map_container">
        {type == "0" && <IndexMap />}
        {type == "1" && <TraceMap />}
      </View>
    );
  }
}
