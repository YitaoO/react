const proxy = {
  // 登录
  "POST /login2": (req, res) => {
    res.json({
      code: "0",
      message: "",
      data: {
        compId: "100",
        UserID: 1001116,
        roleId: 5,
        name: "冀保杰",
        roleName: "普通管理员",
        telephone: "15626451043",
        state: 1,
        compName: "微柏软件",
        email: "",
        debug: false,
        sessionId: "b3768523-4a12-472d-a360-99c04e0122ba"
      },
      ok: true
    });
  },

  // 头部菜单
  "GET /module/selectModule": (req, res) => {
    res.json({
      code: "0",
      message: "",
      data: [
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
      ],
      ok: true
    });
  },
  // 侧边菜单
  "GET /module/selectModuleTreeByParent": (req, res) => {
    var parent = Number(req.query.modId);
    switch (parent) {
      case 100: //首页菜单
        res.json({
          code: "0",
          message: "",
          data: [
            {
              modId: 10010,
              parent: 100,
              level: 1,
              seq: 1,
              name: "实时情况",
              jsPath: "/index/state",
              modType: 2,
              iconClass: "icon-state",
              isDel: 0,
              delDate: null,
              moduleList: [],
              checked: false
            },
            {
              modId: 10020,
              parent: 100,
              level: 2,
              seq: 2,
              name: "工作台-视图",
              jsPath: "/index/workbench",
              iconClass: "icon-wBench",
              modType: 2,
              isDel: 0,
              delDate: null,
              moduleList: [],
              checked: false
            }
          ],
          ok: true
        });
        break;
      case 200: //日常管理
        res.json({
          code: "0",
          message: "",
          data: [
            {
              modId: 20010,
              parent: 200,
              level: 1,
              seq: 1,
              name: "设备巡检",
              jsPath: "/dailyManager/inspection",
              modType: 2,
              isDel: 0,
              delDate: null,
              iconClass: "icon-insp",
              moduleList: [],
              checked: true
            },
            {
              modId: 20020,
              parent: 200,
              level: 2,
              seq: 2,
              name: "工单管理",
              jsPath: "/dailyManager/workOrder",
              modType: 2,
              isDel: 0,
              delDate: null,
              iconClass: "icon-wOrder",
              moduleList: [],
              checked: true
            },
            {
              modId: 20030,
              parent: 200,
              level: 3,
              seq: 3,
              name: "维修登记",
              jsPath: "/dailyManager/repair",
              modType: 2,
              isDel: 0,
              delDate: null,
              iconClass: "icon-repair",
              moduleList: [],
              checked: true
            }
          ],
          ok: true
        });
        break;
      case 300: //统计报表
        res.json({
          code: "0",
          message: "",
          data: [
            {
              modId: 10010,
              parent: 100,
              level: 1,
              seq: 1,
              name: "温度统计",
              jsPath: "/index/state",
              modType: 2,
              isDel: 0,
              delDate: null,
              iconClass: "icon-state",
              moduleList: [],
              checked: true
            },
            {
              modId: 10020,
              parent: 100,
              level: 2,
              seq: 2,
              name: "湿度统计",
              jsPath: "/index/workbench",
              modType: 2,
              isDel: 0,
              delDate: null,
              iconClass: "icon-wBench",
              moduleList: [],
              checked: true
            }
          ],
          ok: true
        });
        break;
      case 400: //基础设置
        res.json({
          code: "0",
          message: "",
          data: [
            {
              modId: 40010,
              parent: 400,
              level: 1,
              seq: 1,
              name: "基础数据",
              jsPath: "/setup/baseSet",
              iconClass: "icon-baseSet",
              modType: 2,
              isDel: 0,
              delDate: null,
              moduleList: [
                {
                  modId: 4001010,
                  parent: 40010,
                  level: 1,
                  seq: 1,
                  name: "区域管理",
                  jsPath: "/baseSet/areaSet",
                  iconClass: "",
                  modType: 2,
                  isDel: 0,
                  delDate: null,
                  moduleList: [],
                  checked: false
                },
                {
                  modId: 4001020,
                  parent: 40010,
                  level: 2,
                  seq: 2,
                  name: "设备管理",
                  jsPath: "/baseSet/deviceSet",
                  iconClass: "",
                  modType: 2,
                  isDel: 0,
                  delDate: null,
                  moduleList: [],
                  checked: false
                },
                {
                  modId: 4001030,
                  parent: 40010,
                  level: 2,
                  seq: 2,
                  name: "告警设置",
                  jsPath: "/baseSet/alarmSet",
                  iconClass: "",
                  modType: 2,
                  isDel: 0,
                  delDate: null,
                  moduleList: [],
                  checked: false
                }
              ],
              checked: false
            },
            {
              modId: 40020,
              parent: 400,
              level: 2,
              seq: 2,
              name: "系统设置",
              jsPath: "/setup/systemSet",
              iconClass: "icon-systemSet",
              modType: 2,
              isDel: 0,
              delDate: null,
              moduleList: [],
              checked: false
            }
          ],
          ok: true
        });
        break;
      default:
    }
  },
  // 设备情况
  "GET /device/getDeviceStatusCount": (req, res) => {
    res.json({
      code: "0",
      message: "",
      data: {
        onlineCount: 0,
        devCount: 8,
        ordinaryCount: 0,
        offlineCount: 8,
        hintCount: 0,
        scrapCount: 0,
        shutDownCount: 0,
        pauseCount: 0,
        repairCount: 0,
        severityCount: 0
      },
      ok: true
    });
  },
  // 设备情况
  "GET /area/getAreaDeviceStatus": (req, res) => {
    res.json({
      code: "0",
      message: "",
      data: [
        {
          devCount: 6,
          onlineCount: 0,
          offlineCount: 6,
          areaId: "102",
          areaName: "办公区域",
          latitude: 23.132194,
          shutDownCount: 0,
          pauseCount: 0,
          location: "微柏软件16楼数据中心左侧",
          repairCount: 0,
          longitude: 112.274132
        },
        {
          devCount: 1,
          onlineCount: 0,
          offlineCount: 1,
          areaId: "ADvQ1HQIZowxIm5xN1DsaOKH3GcGhWBY",
          areaName: "芙蓉区",
          latitude: 24.13295,
          shutDownCount: 0,
          pauseCount: 0,
          location: "魔都",
          repairCount: 0,
          longitude: 115.33503
        },
        {
          devCount: 1,
          onlineCount: 0,
          offlineCount: 1,
          areaId: "eTjS6YaaIAcgtdGCh2f1HYEmWsncUOOr",
          areaName: "郴州市",
          latitude: 24.13295,
          shutDownCount: 0,
          pauseCount: 0,
          location: "魔都",
          repairCount: 0,
          longitude: 115.33503
        }
      ],
      ok: true
    });
  },
  // 区域树
  "GET /area/getAreaTree": (req, res) => {
    res.json({
      code: "0",
      message: "",
      data: [
        {
          areaId: "102",
          userId: 1001119,
          userName: "谢小平",
          areaName: "办公区域",
          parent: "111",
          listAreaUser: [],
          device: false
        },
        {
          areaId: "ADvQ1HQIZowxIm5xN1DsaOKH3GcGhWBY",
          userId: 1001119,
          userName: "谢小平",
          areaName: "芙蓉区",
          parent: "P1ZviVc0mEDlpwCXdAZkNebYg79BPZOm",
          listAreaUser: [],
          device: false
        },
        {
          areaId: "tyxXenFM1eG22WWKtOJTIXXCbIEm8l0I",
          userId: 1001119,
          userName: "谢小平",
          areaName: "湖南省",
          parent: "root",
          listAreaUser: [
            {
              areaId: "BEWYPE7VbtuZu9Y6DY7cI2YTwm9v9tCk",
              userId: null,
              userName: null,
              areaName: "张家界",
              parent: "tyxXenFM1eG22WWKtOJTIXXCbIEm8l0I",
              listAreaUser: [],
              device: false
            },
            {
              areaId: "eTjS6YaaIAcgtdGCh2f1HYEmWsncUOOr",
              userId: null,
              userName: null,
              areaName: "郴州市",
              parent: "tyxXenFM1eG22WWKtOJTIXXCbIEm8l0I",
              listAreaUser: [],
              device: false
            },
            {
              areaId: "P1ZviVc0mEDlpwCXdAZkNebYg79BPZOm",
              userId: null,
              userName: null,
              areaName: "益阳市",
              parent: "tyxXenFM1eG22WWKtOJTIXXCbIEm8l0I",
              listAreaUser: [
                {
                  areaId: "ADvQ1HQIZowxIm5xN1DsaOKH3GcGhWBY",
                  userId: null,
                  userName: null,
                  areaName: "芙蓉区",
                  parent: "P1ZviVc0mEDlpwCXdAZkNebYg79BPZOm",
                  listAreaUser: [],
                  device: false
                }
              ],
              device: false
            }
          ],
          device: false
        }
      ],
      ok: true
    });
  }
};
module.exports = proxy;
