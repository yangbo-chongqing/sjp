// pages/pay/payDetail/payDetail.js
import {
  get, post
} from "../../../assets/js/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    jifen: '',
    showSign: false, //活动签到拍照模态框
    picId: '',//用户头像
    userName: '',//用户名称
    userId: '',//用户ID
    textareaValue:''//文本域内容
  },
  getValue(e){//获取textarea输入值
    this.setData({
      textareaValue:e.detail.value
    })
  },
  goto() {
    wx.navigateTo({
      url: '/subPages/manexchange/manexchange',
    })
  },
  bindKeyInput(e) {
    this.setData({
      value: e.detail.value
    })
    console.log(this.data.value)
  },
  //点击活动签到
  sign() {

    this.setData({
      showSign: true
    })
  },
  closeSign(e) {

    this.setData({
      showSign: false
    })
  },
  checkin(e) {
    console.log(e)
    let t = this
    // if (!e.detail) {
    //   wx.showToast({
    //     title: '请拍照！！！',
    //     icon: "none"
    //   })
    //   return
    // }
    if(!e.detail){
      wx.showToast({
        title: '请传入面部照片',
      })
      return 
    }
    let data = {
      payUserId: this.data.userId,
      // finishStatus: 1,
      integral: this.data.value,
      orderInfo:this.data.textareaValue ,
      faceUrl: e.detail,
    }
    post({
      link: '/integralOrder/save',
      data: data
    }).then(msg => {
      this.setData({
        showSign: false
      })
      if(msg.code==0){
        wx.showModal({
          showCancel: false,
          title: '交易成功！',
          content: "当前交易已完成，积分将转移到对方账户。",
          confirmText: '退出',
          confirmColor: '#DC143C'
        })
      }else{
        wx.showModal({
          showCancel: false,
          title: '交易失败！',
          content: "当前账户积分不足，请核对积分后再试",
          confirmText: '退出',
          confirmColor: '#DC143C'
        })
      }

    }).catch(error => {
      console.log(error)
    })

  },
  myconfirm() {
    if (!this.data.value) {
      wx.showModal({
        showCancel: false,
        title: '警告',
        content: "请输入所消费的积分",
        confirmText: '知道了',
        confirmColor: '#DC143C'
      })
    } else {
      this.setData({
        showSign: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var queryBean = JSON.parse(options.queryBean);
    that.setData({
      picId: queryBean.picId,
      userId: queryBean.payUserId,
      userName: queryBean.name
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showModal({
      showCancel: false,
      title: '警告',
      content: "支付后积分将直接进入对方账户，无法撤销退回，为保证安全，请核对对方信息后支付",
      confirmText: '知道了',
      confirmColor: '#DC143C'
    })
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