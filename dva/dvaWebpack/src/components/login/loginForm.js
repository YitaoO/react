/**
 * 组件 - 登录逻辑
 */
import React, { Component } from "react";
import { connect } from "dva";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import jsCookie from "js-cookie";
import md5 from "md5";
const FormItem = Form.Item;

@connect(({ login }) => ({
  userInfo: login.userInfo
}))
class LoginForm extends Component {
  constructor(props) {
    super(props);
    console.log(jsCookie.getJSON("wb_lot_loginInfo"));

    this.state = {
      account: !!jsCookie.getJSON("wb_lot_loginInfo")
        ? jsCookie.getJSON("wb_lot_loginInfo").account
        : "",
      password: !!jsCookie.getJSON("wb_lot_loginInfo")
        ? jsCookie.getJSON("wb_lot_loginInfo").password
        : "",
      checked: true
    };
  }
  // 登录请求
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        let params = {
          account: values.account,
          checked: this.state.checked
        };

        if (
          !!jsCookie.getJSON("wb_lot_loginInfo") &&
          jsCookie.getJSON("wb_lot_loginInfo").password == values.password
        ) {
          params.password = jsCookie.getJSON("wb_lot_loginInfo").password;
        } else {
          params.password = md5(values.password);
        }

        dispatch({
          type: "login/fetchLogin",
          paylod: params
        });
      }
    });
  };
  handleCheck = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="loginForm">
        <div className="boder-bottom Formtitle">用户登录</div>
        <div className="formCenter">
          <FormItem>
            {getFieldDecorator("account", {
              initialValue: this.state.account,
              rules: [{ required: true, message: "请输入用户名!" }]
            })(
              <Input
                className="loginInput"
                type="number"
                placeholder="用户名"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              initialValue: this.state.password,
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                className="loginInput"
                placeholder="密码"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
              />
            )}
          </FormItem>
        </div>
        <div className="form-footer">
          <Button type="primary" htmlType="submit" className="footerButton">
            登录
          </Button>
          <FormItem className="footerCheck">
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: this.state.checked
            })(
              <Checkbox
                onClick={() => {
                  this.handleCheck();
                }}
              >
                记住密码
              </Checkbox>
            )}
          </FormItem>
        </div>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
