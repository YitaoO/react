import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import HeaderMenu from "../src/component/Menu/Header"; //头部菜单

import ModalChangePass from "../src/component/Modal/changePasswork.js"; // 弹窗-修改密码

import { headerMenuData } from "../src/mock/menu.js";

import { Button, Welcome } from "@storybook/react/demo";

storiesOf("测试", module).add("第一个", () => (
  <Button onClick={action("clicked")}>Hello Button</Button>
));

// 头部菜单
storiesOf("菜单", module).add("头部", () => (
  <HeaderMenu list={headerMenuData} />
));
// 弹窗
storiesOf("弹窗", module).add("修改密码", () => (
  <ModalChangePass show={true} handlePassState={action("clicked")} />
));
