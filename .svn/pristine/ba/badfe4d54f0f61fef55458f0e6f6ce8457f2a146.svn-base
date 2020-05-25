// subPages/moreCommityActivity/moreCommityActivity.js
import {
  get
} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comList:[]
  },
  //获取活动预告
  getTeaser() {
    var t = this
    let data = {
      pageSize: 6,
      pageNum: 1,
      // getType: 1,
      newsType: 22
    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        t.setData({
          comList: msg.data.list
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
    this.getTeaser()
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