import {
  hexMD5
} from "../../utils/md5"
import {
  get, post
} from "../../assets/js/request"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytop: {
      title: "修改密码",
      color: "#333",
      background: "transparent",
      showBack: true
    },
    Top: app.globalData.Top,
    one: 0,
    two: 0,
    three: 0,
    code: '',
    userinfo: wx.getStorageSync("userInfo")
  },
  change(val) {
    let num = val.detail.value
    let determine = val.currentTarget.dataset.show
    switch (determine) {
      case '1':
        this.setData({
          one: 1
        })
        break;
      case '2':
        this.setData({
          two: 1
        })
        break;
      case '3':
        this.setData({
          three: 1
        })
        break;

    }
  },
  inChange(val) {
    let num = val.detail.value
    let determine = val.currentTarget.dataset.show
    switch (determine) {
      case '1':
        if (num != '') {
          this.setData({
            one: 1
          })
        } else {
          this.setData({
            one: 0
          })
        }
        break;
      case '2':
        if (num != '') {
          this.setData({
            two: 1
          })
        } else {
          this.setData({
            two: 0
          })
        }
        break;
      case '3':
        if (num != '') {
          this.setData({
            three: 1
          })
        } else {
          this.setData({
            three: 0
          })
        }
        break;

    }
  },
  formSubmit(e) {
    console.log(e)
    let { password, newpassword } = e.detail.value
    let userInfo = wx.getStorageSync("userInfo")
    if (!password) {
      wx.showToast({
        title: '请输入原密码',
        icon: "none"
      })
      return
    }
    if (!newpassword) {
      wx.showToast({
        title: '请确认新密码',
        icon: "none"
      })
      return
    }
    // if (password != newpassword) {
    //   wx.showToast({
    //     title: '两次输入不一致，请重新输入',
    //     icon: "none"
    //   })
    //   return
    // }
    wx.request({
      url: app.globalData.baseUrl + '/sys/user/updatePassword',
      data: {
        oldPassword: hexMD5(password),
        password: hexMD5(newpassword),
        // captcha: this.data.code,
        // username: userInfo.username
      },
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("userCookie")
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 0) {
          wx.setStorageSync('userCookie', res.header['Set-Cookie'])
          wx.showModal({
            title: '提示',
            content: '修改成功！请登录',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              } else if(res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

          this.logout()
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //退出登录
  logout() {
    get({
      link: "/logout"
    }).then(res => {
      if (res.code == 0) {

        this.cleardata()
      }
    })
  },
  //清除数据
  cleardata() {
    wx.clearStorageSync()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code: options.code
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})