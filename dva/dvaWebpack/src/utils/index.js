/**
 * 工具类方法
 */
class Utils {
  // 获得百分比
  getPercent(num, total) {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
      return "-";
    }
    return total <= 0 ? "0" : Math.round((num / total) * 10000) / 100.0 + "";
  }
  // 判断值是否为空
  isNull(value) {
    if (value === "" || value === null || value === undefined) {
      return true;
    } else {
      return false;
    }
  }
}

export default new Utils();
