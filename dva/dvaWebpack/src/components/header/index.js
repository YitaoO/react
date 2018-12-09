/**
 * 组件 - 头部
 */
import React, { Component } from "react";
import { connect } from "dva";
import { Row, Col, Menu, Popover, Icon } from "antd";
import ModelPass from "../../components/model/changePass";
import jsCookie from "js-cookie";
import "./index.scss";

@connect(({ menu }) => ({
  list: menu.headerList,
  modId: menu.modId
}))
export default class Headers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popShow: false,
      passModelShow: false,
      userInfo: jsCookie.getJSON("wb_lot_userInfo")
    };
    this.handlePassModel = this.handlePassModel.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "menu/fetchHeaderList"
    });
  }

  //打开个人信息弹窗
  handlPopShowChange = popShow => {
    this.setState({ popShow });
  };
  //打开修改密码Model
  handlePassModel = () => {
    this.setState({
      passModelShow: !this.state.passModelShow
    });
  };

  //渲染卡片;
  handleRenderCard = () => {
    return (
      <div className="popContent">
        <div className="">
          <p className="">欢迎 {this.state.userInfo.name} 回来！</p>
          <p className="">您的单位为: {this.state.userInfo.compName}</p>
          <p className="">
            ID:
            {this.state.userInfo.UserID}
          </p>
        </div>
        <Row className="popFooter">
          <Col span={12}>
            <Icon type="key" />
            <span
              className="footer-name cursor-point"
              onClick={() => {
                this.state.popShow = false;
                this.setState({
                  popShow: false,
                  passModelShow: true
                });
                // this.handlePassModel(true);
              }}
            >
              修改密码
            </span>
          </Col>
          <span className="line" />
          <Col span={12}>
            <Icon type="logout" />
            <span
              className="footer-name cursor-point"
              onClick={() => {
                this.handleLoginOut();
              }}
            >
              退出登录
            </span>
          </Col>
        </Row>
      </div>
    );
  };
  // 退出登录
  handleLoginOut = () => {
    jsCookie.remove("wb_lot_loginInfo");

    window.location.href = "./login.html";
  };
  // 渲染菜单
  handleMenuChild = () => {
    const { dispatch, list, modId } = this.props;
    if (list.length == 0) return;
    return (
      <Menu className="menu" mode="horizontal" selectedKeys={[`${modId}`]}>
        {list.map(item => {
          return (
            <Menu.Item
              key={item.modId}
              onClick={() => {
                dispatch({
                  type: "menu/fetchSideList",
                  payload: { modId: item.modId }
                });
              }}
            >
              {item.name}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };
  render() {
    return (
      <Row className="headerWrap">
        <Col span={3} className="logoWrap">
          <div className="logo" />
        </Col>
        <Col span={18} className="menuWrap">
          {/* 菜单模块 */}
          {this.handleMenuChild()}
        </Col>
        <Col span={3} className="popWrap">
          <Popover
            content={this.handleRenderCard()}
            placement="bottom"
            trigger="click"
            visible={this.state.popShow}
            onVisibleChange={this.handlPopShowChange}
          >
            <div className="popItem cursor-point" slot="reference">
              <span className="itemLine" />
              <span className="itemUserName">
                Hi!
                {this.state.userInfo.name}
              </span>
              <span className="itemIconWrap">
                <Icon type={!!this.state.visible ? "caret-up" : "caret-down"} />
              </span>
              <span className="itemUserIcon" />
            </div>
          </Popover>
        </Col>
        {/* 修改密码弹窗 */}
        <ModelPass
          handlePassModel={this.handlePassModel}
          passModelShow={this.state.passModelShow}
        />
      </Row>
    );
  }
}
