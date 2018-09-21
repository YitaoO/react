/**
 * api列表
 */
import { stringify } from "qs";
import request from "./request";

// 测试
export async function reqTest(params) {
  return request(`/api/test?${stringify(params)}`);
}
// 登录
export async function reqLogin(params) {
  return request("/login2", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

// export function reqLogout(params) {
//   return request({
//     url: "",
//     method: "get",
//     data: params
//   });
// }
// 菜单
export async function reqHeader(params) {
  return request(`/module/selectModule?${stringify(params)}`);
}
// 侧边菜单
export async function reqNavbar(params) {
  return request(`/module/selectModuleTreeByParent?${stringify(params)}`);
}
// 设备情况
export async function reqDevStatusCount(params) {
  return request(`/device/getDeviceStatusCount?${stringify(params)}`);
}
// 区域设备情况
export async function reqDevAreaCount(params) {
  return request(`/area/getAreaDeviceStatus?${stringify(params)}`);
}
// 区域树
export async function reqAreaTree(params) {
  return request(`/area/getAreaTree?${stringify(params)}`);
}
