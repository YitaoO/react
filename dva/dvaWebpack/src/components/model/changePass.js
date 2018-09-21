/**
 * 组件 - model-修改密码
 */
import React, { Component } from "react";
import { connect } from "dva";
import { Form, Button, Input, Modal } from "antd";
import jsCookie from "js-cookie";
import md5 from "md5";
const FormItem = Form.Item;

class ModelChangePass extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { passModelShow, handlePassModel } = this.props;

    return (
      <Modal
        visible={passModelShow}
        title="修改密码"
        onOk={handlePassModel}
        onCancel={handlePassModel}
        footer={[
          <Button key="back" onClick={handlePassModel}>
            Return
          </Button>,
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

export default Form.create()(ModelChangePass);
