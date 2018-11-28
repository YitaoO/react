/**
 * 菜单数据
 */
// 头部菜单
const headerMenuData = [
  {
    modId: 100,
    parent: 0,
    level: 1,
    seq: 0,
    name: "首页",
    jsPath: "/index",
    modType: 2,
    isDel: 0,
    delDate: null,
    iconClass: null,
    moduleList: [],
    checked: false
  },
  {
    modId: 200,
    parent: 0,
    level: 2,
    seq: 0,
    name: "日常管理",
    jsPath: "/dailyManager",
    modType: 2,
    isDel: 0,
    delDate: null,
    iconClass: "icon-insp",
    moduleList: [],
    checked: false
  },
  {
    modId: 300,
    parent: 0,
    level: 3,
    seq: 0,
    name: "统计报表",
    jsPath: "/report",
    modType: 2,
    isDel: 0,
    delDate: null,
    iconClass: null,
    moduleList: [],
    checked: false
  },
  {
    modId: 400,
    parent: 0,
    level: 4,
    seq: 0,
    name: "设置",
    jsPath: "/setup",
    modType: 2,
    isDel: 0,
    delDate: null,
    iconClass: null,
    moduleList: [],
    checked: false
  }
];
const MenuData = [];

export { headerMenuData, MenuData };
