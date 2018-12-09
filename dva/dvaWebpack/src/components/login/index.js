/**
 * 组件 - 登录
 */
import React, { Component } from "react";
import { connect } from "dva";
import { message } from "antd";
import LoginForm from "./loginForm";
// import Loader from "../../components/loader/Loader";
import "./index.scss";

class Login extends Component {
  render() {
    const { loading } = this.props;

    if (!!loading) {
      //TODO:这里会报错，后期优化
      message.success("登录成功，正在跳转，请稍等。。。", 1).then(function() {
        window.location.href = "./index.html";
      });
    }

    return (
      <div className="loginWrap">
        <div className="loginHeader">
          <span className="headerIcon" />
        </div>
        <div className="loginContent">
          <span className="conterBg" />
          <div className="contentForm">
            <LoginForm />
          </div>
        </div>
        {!!loading ? <Loader spinning /> : ""}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loading: state.loading.models.login
  };
}
export default connect(mapStateToProps)(Login);
