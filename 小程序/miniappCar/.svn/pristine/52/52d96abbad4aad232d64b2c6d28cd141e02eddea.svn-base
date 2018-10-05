/**
 * 通用工具
 */
// 功能 - 处理空调数据
import renderDataThree from "../DeviceData/renderThreeData";
import renderDataOne from "../DeviceData/renderOneData";
import renderInfraredData from "../DeviceData/renderInfraredData";
import renderDataDefault from "../DeviceData/renderDefaultData";
class Tools {
  // 获取URL参数值
  getUrl(param, url) {
    let num = url.indexOf("?");
    let paraArr = url.substr(num + 1).split("&");

    for (var i = 0; i < paraArr.length; i++) {
      if (param == paraArr[i].split("=")[0]) {
        return paraArr[i].split("=")[1];
      }
    }
    return "";
  }
  // 随机生成32位数
  getNum() {
    var chars = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    var nums = "";
    for (var i = 0; i < 32; i++) {
      var id = parseInt(Math.random() * 61);
      nums += chars[id];
    }
    return nums;
  }
  //反斜杠的转换
  slash(str) {
    str = str.replace(new RegExp("\\\\", "gm"), "/");
    return str;
  }
  //时间转化
  formate(fmt, types) {
    let type = !!types && types != undefined ? types : 0;
    let o = {
      Y: fmt.getFullYear(),
      M: fmt.getMonth() + 1, //月份
      D: fmt.getDate(), //日
      h: fmt.getHours(), //小时
      m: fmt.getMinutes(), //分
      s: fmt.getSeconds() //秒
    };
    switch (Number(type)) {
      case 1: //年月日
        return "" + o.Y + "-" + o.M + "-" + o.D;
        break;
      default:
        //默认
        return (
          "" + o.Y + "-" + o.M + "-" + o.D + " " + o.h + ":" + o.m + ":" + o.s
        );
    }
  }
  //手机号码验证
  isPoneAvailable($poneInput) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test($poneInput)) {
      return false;
    } else {
      return true;
    }
  }
  // 修改图片路径
  imagePath(image) {
    if (!image || image == null || image == undefined) {
      return image;
    } else {
      return `${wx.Interface.fileDownloadF}?p=${image}`;
    }
  }
  // 计时器
  setInterval(timer) {
    return new Promise(function(resolve, reject) {
      let time = setInterval(function() {
        timer = timer - 1; //倒计时
        if (timer === 0) {
          clearInterval(time);
          resolve();
        }
      }, 1000);
    });
  }
  // 判断值是否为空
  isNull(value) {
    if (value === "" || value === null || value === undefined) {
      return true;
    } else {
      return false;
    }
  }
  // 时间比较
  checkdate(t1, t2) {
    var t11 = t1.split(":");
    var t21 = t2.split(":");
    var sj1 = parseInt(t11[0]) * 12 + t11[1];
    var sj2 = parseInt(t21[0]) * 12 + t21[1];
    if (Number(sj2) < Number(sj1)) {
      return false;
    } else {
    }
    return true;
  }
  //渲染空调数据
  renderControlData(item) {
    let datas = {};
    switch (item.devType) {
      case 1:
        datas = renderDataOne(item);
        break;
      case 3:
        datas = renderDataThree(item);
        break;
      case 2:
        datas = renderInfraredData(item);
        break;

      default:
        datas = renderDataDefault(item);
        break;
    }

    return datas;
  }
}

export default new Tools();
