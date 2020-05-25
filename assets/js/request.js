//数据请求封装
const app = getApp().globalData;
/**
 * get方法请求数据(已传递地区参数)
 * @param link 请求地址
 * @param data 请求参数
 */
export const get = function({link,data}) {
  return new Promise(((resolve, reject, callback) => {
    wx.request({
      url: app.baseUrl + link,
      header: {
        'cookie': wx.getStorageSync("userCookie"),
        "clientOrigin":2
      },
      data,
      success(msg) {
        if (parseInt(msg.statusCode) === 200) {
          msg = msg.data;
          resolve(msg);
        }
      },
      fail(err) {
        reject(err)
      },
      complete() {
        callback && callback()
      }
    })
  }))
};
/**
 * post方法请求数据(已传递地区参数)
 * @param link 请求地址
 * @param data 请求参数
 */
export const post = function({link,data}) {
  return new Promise((((resolve, reject,callback) => {
    wx.request({
      url: app.baseUrl + link,
      data,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("userCookie"),
        "clientOrigin": 2
      },
      success(msg) {
        //请求成功
        if (parseInt(msg.statusCode) === 200) {
          msg = msg.data;
          resolve(msg);
        }
      },
      fail(err) {
        //请求失败
        reject(err);
      },
      complete() {
        callback && callback()
      }
    })
  })))
};