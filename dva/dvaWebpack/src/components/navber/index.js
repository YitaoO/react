/**
 * 组件 - navberLeft
 */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "dva";
import { Menu, Icon } from "antd";
import "./index.scss";
const { SubMenu } = Menu;

@connect(({ menu }) => {
  return {
    list: menu.sideList,
    navberId: menu.sideId,
    modId: menu.modId,
    sideId: menu.sideId
  };
})
export default class NavberLeft extends Component {
  componentDidMount() {
    const { dispatch, modId } = this.props;
    dispatch({
      type: "menu/fetchSideList",
      payload: { modId: modId }
    });
  }
  // 渲染菜单
  handleChild = list => {
    const { dispatch } = this.props;

    return list.map(item => {
      if (item.moduleList.length > 0) {
        return (
          <SubMenu
            key={item.modId}
            title={
              <span>
                <Icon className={`icon ${item.iconClass}`} />
                {item.name}
              </span>
            }
          >
            {this.handleChild(item.moduleList)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item
          key={item.modId}
          onClick={() => {
            dispatch({
              type: "menu/clickSideMenu",
              payload: { sideId: item.modId }
            });
          }}
        >
          <NavLink to={item.jsPath}>
            {/* {//TODO：这里警告了，需要修复} */}
            <Icon className={`icon ${item.iconClass}`} />
            <span>{item.name}</span>
          </NavLink>
        </Menu.Item>
      );
    });
  };

  render() {
    const { list, sideId } = this.props;

    return (
      <Menu
        className="navberWrap"
        mode="inline"
        selectedKeys={[`${sideId}`]}
        defaultOpenKeys={[`${sideId}`]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {this.handleChild(list)}
      </Menu>
    );
  }
}
