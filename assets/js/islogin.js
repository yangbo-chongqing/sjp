// 登录提醒
const app = getApp().globalData;
let e = wx.getStorageSync("userCookie")
const land = function (url) {
  wx.request({
    url: app.baseUrl + "/isLogin",
    header:{
      'cookie': wx.getStorageSync("userCookie")
    },
    success: (res => {
      console.log(res,e)
      if ( ~~res.data.code === 400) {
        wx.showModal({
          title: '登录提醒',
          content: '你还未登录，请登录后访问',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else if (res.cancel) {
              // wx.navigateBack()
            }
          }
        })
      } else if (~~res.data.code === 200){
        wx.navigateTo({
          url: url,
        })
      }else {
        wx.showToast({
          title: '登录状态失效，请登录！',
          icon:'none'
        })
      }
    })
  })

}


module.exports = {
  land: land

}