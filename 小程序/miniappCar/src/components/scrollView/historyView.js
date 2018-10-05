import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import moment from "moment";
import { View, ScrollView } from "@tarojs/components";
import ArrowIcon from "../../images/navigator_arrow_icon.png";
import "./historyView.scss";

@connect(({ userInfo, car, map }) => ({
  userInfo,
  car,
  map
}))
class HistoryView extends Component {
  constructor(props) {
    super(props);
    this.onScrolltolower = this.onScrolltolower.bind(this);
    this.handleToDetail = this.handleToDetail.bind(this);
  }
  componentDidMount() {}
  onScrolltolower = () => {
    console.log("我到底了");
  };
  spliceData(type, Str) {
    if (type == 0) {
      return Str.substring(0, Str.indexOf(" "));
    } else if (type == 1) {
      return Str.substring(Str.indexOf(" "), Str.length);
    }
  }
  handleToDetail = item => {
    this.props.dispatch({
      type: "map/saveState",
      response: {
        type: 1
      }
    });
    this.props.dispatch({
      type: "car/saveCar",
      response: {
        choiceGuiJi: {
          startData: this.spliceData(0, item.inTime),
          startTime: this.spliceData(1, item.inTime),
          endData: this.spliceData(0, item.outTime),
          endTime: this.spliceData(1, item.outTime),
          ...item
        }
      }
    });
    Taro.navigateTo({
      url: `/pages/traceDetail/index`
    });
  };
  render() {
    const { carGuijiList } = this.props.car;

    return (
      <View className="scroll-wrap">
        {/* <HeaderScroll /> */}
        <ScrollView
          className="scorll"
          scrollY
          scrollWithAnimation
          scrollTop="0"
          lowerThreshold="20"
          upperThreshold="20"
          onScrolltolower={this.onScrolltolower}
          // onScroll={this.onScroll}
        >
          {carGuijiList.list.map(item => {
            return (
              <View
                className="item"
                key={item.useEffic}
                onClick={this.handleToDetail.bind(this, item)}
              >
                <View className="left">
                  <View className="cirle" />
                  <View className="line" />
                </View>
                <View className="right">
                  <View className="right-top">
                    <View className="text">{item.date}</View>
                    <Image src={ArrowIcon} className="navigator-arrow" />
                  </View>
                  <View className="right-bottom">
                    <View className="time">
                      <View className="item-title">点火</View>
                      <View className="item-value">
                        {moment(item.totalMinuter).format("mm:ss")}
                      </View>
                    </View>
                    <View className="distance">
                      <View className="item-title">行驶</View>
                      <View className="item-value">
                        {(item.runDistance / 1000).toFixed(0)}
                        公里
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default HistoryView;
