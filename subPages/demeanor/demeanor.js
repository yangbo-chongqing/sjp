// subPages/demeanor/demeanor.js
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
    list:[]
  },

  //跳转风采详情
  // godetails(e) {
  //   let { title, newsId } = getDataValue(e).item
  //   let url = "/subPages/demeanorDetails/demeanorDetails?title=" + title + "&id=" + newsId;
  //   wx.navigateTo({
  //     url
  //   })
  // },

  // 获取列表
  getList() {
    const that = this;
    let data = {
      newsType:7,
      pageNum: 1,
    }
    get({
      link: '/information/list',
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
  goNews(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id;
    const title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: "/subPages/demeanorDetails/demeanorDetails?title=" + title + "&id=" + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '党员个人图片',
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