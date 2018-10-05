/**
 * api列表
 */
import { stringify } from "qs";
import request from "./request";
const mockBaseUrl =
  "https://www.easy-mock.com/mock/5ba99eeab9b3b431f78ef57b/www.weibai.com/api";
const localUrl = "http://192.168.1.94:9020/portal-car/api";
const proUrl = "https://www.weepal.cn/portal-car/api";

const baseUrl = mockBaseUrl;

// 绑定
export async function reqWeixinAdd(params) {
  return request({
    url: `${baseUrl}/wppersonweixinadd`,
    data: params,
    method: "POST"
  });
}
// 登录
export async function reqLogin(params) {
  return request(
    {
      url: `${baseUrl}/login?openID=${params.openID}&weixin=${params.weixin}`,
      // data: params,
      method: "POST"
    },
    true
  );
}
//查询车辆最新状态接口
export async function reqCarStateList(params) {
  return request({
    url: `${baseUrl}/gpsdevicebuffers/getCarLastStateBySimNo?userId=${
      params.UserId
    }&mapType=3`,
    method: "GET"
  });
}
//获取车辆树
export async function reqListTreeCar(params) {
  return request({
    url: `${baseUrl}/ConsumerProjCarCarInfo/listTreeCar`,
    method: "POST",
    data: params
  });
}
//行驶统计接口
export async function reqCarAccInfo(params) {
  return request({
    url: `${baseUrl}/carproj/getCarAccInfoByUserIdForWeiXin?${stringify(
      params
    )}`,
    method: "GET"
  });
}
//轨迹详情接口
export async function reqCarTrance(params) {
  return request({
    url: `${baseUrl}/gpsdevicebuffers/getCarGuiJiBySimNoTime?${stringify(
      params
    )}`,
    method: "GET"
  });
}
// 搜索数据
export async function reqSearch(url, params) {
  console.log(url);
  console.log(params);

  return request({
    url: `${baseUrl}${url}?${stringify(params)}`,
    method: "GET"
  });
}
