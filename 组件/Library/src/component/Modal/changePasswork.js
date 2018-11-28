import React, { Component } from "react";
import { Modal, Button, Input } from "antd";

export default class ModalChangePass extends Component {
  render() {
    const { show, handlePassState } = this.props;

    return (
      <Modal
        visible={show}
        title="修改密码"
        onCancel={() => {
          console.log("eee");
        }}
        footer={[
          <Button key="back">Return</Button>,
          <Button key="submit" type="primary">
            Submit
          </Button>
        ]}
      >
        <div>
          <Input addonBefore={<span>旧密码</span>} />
        </div>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}
