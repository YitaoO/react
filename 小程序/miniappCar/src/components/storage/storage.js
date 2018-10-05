/**
 * 封装微信的缓存功能
 */
class Storage {
  // 存数据
  setKey(key, val) {
    wx.setStorage({
      key: key,
      data: val
    })
  }
  // 存数据(更新)
  setStorageSync(key, val) {
    wx.setStorageSync({
      key: key,
      data: val
    })
  }
  // 取数据
  getKey(key) {
    return new Promise(function(resolve, reject) {
      wx.getStorage({
        key: key,
        success: function(res) {
          resolve(res.data)
        },
        fail: function(err) {
          console.log(err);
          // TODO: 这里错误逻辑需要完善
        }
      })
    })
  }
  // 移除数据
  removeKey(key) {
    wx.removeStorage({
      key: key,
      success: function(res) {
        console.log(res.data)
      }
    })
  }
}

export default new Storage()
