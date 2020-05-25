// subPages/changePhone/changePhone.js
import {
  get
} from "../../assets/js/request"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // mytop: {
    //   title: "注册",
    //   color: "#333",
    //   background: "transparent",
    //   showBack: true
    // },
    Top: app.globalData.Top,
    one:0,
    two:0,
    type:'',
    send:true,//倒计时按钮
    second:30,//倒计时时间
    timer:'',//定时器
    phone:"",//手机号码
    code:"",//用户输入的验证码
    realcode:"",//后台返的验证码
    userinfo:""
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
  //获取号码
  phone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  //获取用户输入的验证码
  code(e){
    this.setData({
      code: e.detail.value
    })
  },
  //确认
  formSubmit(e){
    console.log(e)
    let mobile=this.data.phone
    let data={
      mobile: mobile,
    }
    console.log(data)
    
    get({
      link:"/sys/user/updateByMe",
      data:data
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        wx.showToast({
          title: '修改成功',
          icon:"success"
        })
        let { userinfo } = this.data;
        userinfo.mobile = mobile;
        this.setData({
          userinfo,
        })
        wx.setStorageSync("userInfo", this.data.userinfo)
        wx.navigateTo({
          url: '/subPages/personData/personData'
        })
      }
    })
  },
//发送验证码
  sendcode(){
    let reg = /^[1][3-9][0-9]{9}$/; //严格匹配
    if(!this.data.phone){
      wx.showToast({
        title: '请输入手机号码',
        icon:"none"
      })
      return
    }
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号码输入错误',
        icon: 'none'
      })
      return
    }
    this.timedwon()
    wx.request({
      url: app.globalData.baseUrl +'/sys/user/getSMSMsg',
      data:{
        mobile: this.data.phone
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded', 
        'cookie': wx.getStorageSync("userCookie"),
        "clientOrigin": 2,
      },
      success:(res)=>{
        console.log(res)
        if(res.statusCode==200&&res.data.code==200){
          wx.setStorageSync('sessionId', res.data.sessionId)
          this.setData({
            realcode:res.data.data
          })
          wx.showToast({
            title: "发送成功！",
            icon:"success"
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
        }
      }
    })
    
  },
  //倒计时方法
  timedwon(){
    var time = 30
    var timer = setInterval(() => {
      if (time == 1) {
        this.clearTimeInterval()
        this.setData({
          send: true,
        })
        time = 31
      }
      time = time - 1
      this.setData({
        second: time,
      })

    }, 1000)
    this.setData({
      send: false,
      timer,
    })
  },
  clearTimeInterval() {
    var timer = this.data.timer;
    clearInterval(timer)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userinfo:wx.getStorageSync("userInfo"),
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