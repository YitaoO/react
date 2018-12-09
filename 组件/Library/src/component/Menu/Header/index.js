import React, { Component } from "react";
import { Menu } from "antd";
export default class HeaderMenu extends Component {
  // 点击事件
  handleClick(modId) {
    console.log(modId);
  }
  render() {
    const { list } = this.props;

    return (
      <Menu className="menu" mode="horizontal" selectedKeys={[0]}>
        {list.map(item => {
          return (
            <Menu.Item
              key={item.modId}
              onClick={() => {
                this.handleClick(item.modId);
              }}
            >
              {item.name}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}
