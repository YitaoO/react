/**
 * 组件 - 实施情况
 */
import React, { Component } from "react";
import { connect } from "dva";
import { Row, Col, Progress } from "antd";
import BaiduMap from "../../components/baiduMap";
import "./index.scss";

@connect(({ userInfo, deviceState }) => ({
  userInfo,
  devList: deviceState.statusCountList
}))
export default class State extends Component {
  componentDidMount() {
    const { userInfo, dispatch } = this.props;

    dispatch({
      type: "deviceState/fetchStatusCount",
      payload: { userId: userInfo.UserID }
    });
    dispatch({
      type: "deviceState/fetchAreaCount",
      payload: { userId: userInfo.UserID }
    });
  }
  render() {
    const { devList } = this.props;

    return (
      <Row gutter={16} className="wrap">
        <Col className="gutter-row" span={18} className="wrapLeft">
          <div className="border stateWrap">
            <p className="itemTitle">设备情况</p>
            <Row gutter={16} className="itemCenter">
              {devList.map((item, key) => {
                return (
                  <Col span={key + 1 === devList.length ? 4 : 5} key={item.id}>
                    <Row gutter={16}>
                      <Col span={10} key={item.id}>
                        <Progress
                          width={85}
                          strokeWidth={6}
                          strokeLinecap="square"
                          type="circle"
                          strokeColor="#fd7762"
                          percent={item.percentage}
                        />
                      </Col>
                      <Col span={14} className="progressDes">
                        <span className="title">{item.name}中</span>
                        <br />
                        <span>{item.value}</span>台
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </div>
          <div className="border mapWrap">
            <div className="mapTitle">我的区域</div>
            <div className="mapCenter">
              <BaiduMap mapMarks={true} />
            </div>
          </div>
        </Col>
        <Col className={`border $"wrapRight}`} span={6} />
      </Row>
    );
  }
}
