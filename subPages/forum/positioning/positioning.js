// subPages/forum/positioning/positioning.js

import { get } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_type: 19,//类型
    allList:[],  //数据列表
    content:""
  },
  //跳转风采详情
  toPostion(e) {

    let id = e.currentTarget.dataset.id;
    let titleter = '风采详情'
    wx.navigateTo({
      url: `/subPages/forum/partyDay/partyDay?id=${id}&title=${titleter}`,
    })
  },
  //获取列表
  goLesson() {
    let data = {
      newsType: this.data.news_type
    }
    get({
      link: '/information/list',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          allList: res.data.list
        })
      }
    })
  },

  //获取介绍
  getList() {
    let data = {
      newsType: 18
    }
    get({
      link: '/information/list',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          content: res.data.list[0].content
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goLesson()
    this.getList()
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