// pages/changed/changed.js
import {
  get,post
} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    jifen:''
  },
  bindKeyInput(e){
    this.setData({
      value: e.detail.value
    })
    console.log(this.data.value)
  },
  allout(){
    this.setData({
      value:this.data.jifen
    })
  },
  myconfirm(){
    const that = this;
    let data = {
      integral:this.data.value
    }
    if(!this.data.value){
      wx.showToast({
        title: '请输入您所需兑换的积分',
        icon:'none'
      })
      return
    }
    post({
      link: '/fun/partyMember/exchangePersonIntegral',
      data: data
    }).then(msg => {
      if (msg.code == 0) {
        wx.showToast({
          title: '兑换成功',
          icon: 'success'
        })
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/Profile/Profile'
          })
        }, 500);
      }else{
        wx.showToast({
          title: msg.msg,
          icon:'none'
        })
      }
    }).catch(error => {
     console.log(error)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let jifen=wx.getStorageSync('userInfo')
    if(jifen.partyMember.mebIntegral>70){
    jifen=jifen.partyMember.mebIntegral-70
    this.setData({
      jifen:jifen
    })}else{
      this.setData({
        jifen:0
      })
    }
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