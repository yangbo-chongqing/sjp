
// subPages/politics/politics.js
import {
  get
} from "../../assets/js/request"
import { getDataValue, getSubDataValue } from "../../assets/js/public";
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    huiList:[],
    zhanList:[]
  },

  //跳转详情
  goDetails(e) {
    let { title, newsId } = getDataValue(e).item
    let url = "/subPages/polticsHui/polticsHui?title=" + title + "&id=" + newsId;
    wx.navigateTo({
      url
    })
  },

  // 获取列表
  getList() {
    const that = this;
    let data = {

    }
    get({
      link: '/jointMeetingMember/list',
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

  // 获取联席会议
  getHui() {
    const that = this;
    let data = {
      newsType:13,
      getType:1
    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          huiList:msg.data.list
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },

  // 获取联席会议成果展示
  getZhanList() {
    const that = this;
    let data = {
      newsType: 13,
      getType: 3
    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          zhanList: msg.data.list
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
    console.log(app.globalData)
    this.getList()
    this.getHui()
    this.getZhanList()
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
