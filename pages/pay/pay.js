// pages/pay/pay.js
import {
  get, post
} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picid:'',
    isshop:false,
    isable:false
  },
  photo(){
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        let data={
          qrCode:res.result
        }
        get({
          link:'/sys/user/getByQR',
          data:data
        }).then(res=>{
          let queryBean=JSON.stringify({
            payUserId:res.data.userId,
            picId:res.data.picId,
            name:res.data.username
          })
          wx.navigateTo({
            url: '/pages/pay/payDetail/payDetail?queryBean=' + queryBean,
          })
        })
      }
    })
    // wx.navigateTo({
    //   url: '/pages/pay/payDetail/payDetail',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pic=wx.getStorageSync('userInfo')
    this.setData({
      picid:pic.qrImg,
      isshop:pic.market,
      isable:pic.ablePerson
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