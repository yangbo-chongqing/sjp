// subPages/judLaw/judLaw.js
import { getDataValue } from "../../assets/js/public";
import {  get } from "../../assets/js/request";
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { title: "组织周末读书日活动组织周末读书日活动组织周末读书日活动", time: "2019.12.9", stage: "23", browse: "浏览量" },
      { title: "组织周末读书日活动", time: "2019.12.9", stage: "23", browse: "浏览量" }
    ],
    id: 0
  },
  //法律详情
  goDetails(e) {
    console.log(e)
    let id = getDataValue(e).item.lawId;
    // let title = getDataValue(e).item.lawTitle;
    let url = "/subPages/voldetails/voldetails?id=" + id;
    wx.navigateTo({
      url
    })
  },

  // 获取列表
  getList() {
    const that = this;
    let data = {
      pageNum:1,
      pageSize:6
    }
    get({
      link: '/law/info/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data.list
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
    wx.setNavigationBarTitle({
      title: '法律常识',
    })
    console.log(app.globalData)
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