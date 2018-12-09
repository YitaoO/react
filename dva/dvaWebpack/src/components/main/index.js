/**
 * 主要模块
 */
import "./index.scss";
import React from "react";
import { connect } from "dva";
import Header from "../../components/header"; //头部组件
import Navber from "../../components/navber"; //侧边菜单组件
import { Layout, Breadcrumb } from "antd";
const { Content, Sider } = Layout;

class MainPage extends React.Component {
  render() {
    return (
      <Layout className="layoutWrap">
        <Header />
        <Layout className="layoutCenter">
          <Sider className="centerLeft">
            <Navber />
          </Sider>
          <Layout className="centerRight">
            <Breadcrumb className="rightBread">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content className="rightCenter">{this.props.children}</Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(MainPage);
