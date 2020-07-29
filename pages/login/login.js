// pages/login/login.js
import {
  hexMD5
} from "../../utils/md5"
import {
  get
} from "../../assets/js/request"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytop: {
      title: "登录",
      color: "#333",
      background: "transparent",
      showBack: true,
      ver: ''
    },
    Top: app.globalData.Top,
    one: 0,
    two: 0,
    ismenber: false,
    password: wx.getStorageSync("accountpassword") ? wx.getStorageSync("accountpassword").password : '', //登录密码密码
    username: wx.getStorageSync("accountpassword") ? wx.getStorageSync("accountpassword").username : '', //登录账号

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

    }
  },
  setversion(ver){
    return ver.split('.').join('')
  },
  //登录
  formSubmit(e) {
    console.log(e)
    if(this.data.ver.split('.').join('') < 704){
      wx.showToast({
        title: '微信版本过低，请升级微信版本后使用',
        icon: "none"
      })
      return
    }
    let {
      username,
      password
    } = e.detail.value
    this.setData({
      username,
      password
    })
    console.log(username, password)
    if (!username) {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    }
    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: "none"
      })
      return
    }
    wx.request({
      url: app.globalData.baseUrl + '/loginByApplet',
      header: {
        "clientOrigin": 2
      },
      data: {
        username,
        password: hexMD5(password)
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 0) {
          let cookies = ''
           if (res.cookies && res.cookies[0].indexOf("JSESSIONID") >= 0) {
            console.log('111')
            cookies = res.cookies[0]
            wx.setStorageSync('userCookie', cookies);
          }else if(res.cookies && res.cookies[1].indexOf("JSESSIONID") >= 0){
            cookies = res.cookies[1]
            wx.setStorageSync('userCookie', cookies);
          }
          else {
            cookies = res.header['Set-Cookie'].split(';')[0]
            wx.setStorageSync('userCookie', cookies)
          } 
          // wx.setStorageSync('userCookie', res.header['Set-Cookie']);
          console.log(wx.getStorageSync('userCookie'))
          wx.setStorageSync('userInfo', res.data.data);
          wx.setStorageSync('password', hexMD5(password));
          wx.setStorageSync('username', username);
          //app.globalData.userInfo = JSON.stringify(res.data.data) 
          this.save() //登录成功后如果点击记住密码了（ismenber为true）储存用户账号密码
          // console.log(app.globalData.userInfo)
          // wx.showToast({
          //   title: '登陆成功', 
          //   icon: 'success'
          // })
          setTimeout(() => {
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              mask: false,
              duration: 2000,
              success: () => {
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }, 2000)
              }
            })
          }, 300)

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })

  },
  //记住密码状态切换
  toggle() {
    this.setData({
      ismenber: !this.data.ismenber
    })
    if (!this.data.ismenber) {
      wx.removeStorageSync('accountpassword')
    }
  },
  //存密码方法
  save() {
    if (this.data.ismenber) {
      let accountpassword = {
        username: this.data.username,
        password: this.data.password
      }
      wx.setStorageSync('accountpassword', accountpassword)
      this.setData({
        ismenber: true,
      })
      console.log(this.data.ismenber, wx.getStorageSync('accountpassword'))

    }
  },
  goeach(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('accountpassword')) {
      this.setData({
        ismenber: true,
        username: wx.getStorageSync('accountpassword').username,
        password: wx.getStorageSync('accountpassword').password
      })
    }
    var that =this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          ver: res.version
        })
      }
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