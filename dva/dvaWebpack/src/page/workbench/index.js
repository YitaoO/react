/**
 * 组件 - 工作台
 */
import React, { Component } from "react";
import { Row, Col } from "antd";
import Tree from "../../components/tree";

export default class Workbench extends Component {
  render() {
    return (
      <Row gutter={16} className="fill-height">
        <Col span={4} className="fill-height">
          <div className="primary-color-bg-white fill-height border">
            <Tree />
          </div>
        </Col>
        <Col span={20} className="fill-height">
          <div className="primary-color-bg-white fill-height border">col-6</div>
        </Col>
      </Row>
    );
  }
}
