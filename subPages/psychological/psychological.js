// subPages/psychological/psychological.js
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
    nav:1,
    title:"",
    time:"",
    space:"",
    jianjie:"",
    zhanList: [],
    list: []
  },
  //切换菜单
  goNav(e) {
    this.setData({
      nav: e.currentTarget.dataset.nav
    })
  },
  //跳转发布
  goAdd(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  //跳转心理服务师详情
  // goDang(e) {
  //   let id = getDataValue(e).item.psId;
  //   let title = getDataValue(e).item.psName;
  //   wx.navigateTo({
  //     url: `/subPages/psyTeacherdetalis/psyTeacherdetalis?id=${id}`,
  //   })
  // },
  //跳转心理活动风采详情
  goDetails(e) {
    let id = getDataValue(e).item.newsId;
    let title = getDataValue(e).item.title;
    let url = "/subPages/poldetails/poldetails?title=" + title + "&id=" + id;
    wx.navigateTo({
      url
    })
  },

  // 获取心理活动风采列表
  getPsyList() {
    const that = this;
    let data = {
      newsType:11
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

  // 获取活动预告
  getPsy() {
    const that = this;
    let data = {
      newsType: 10,
      getType:1
    }
    get({
      link: '/information/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        for(let i=0;i<msg.data.list.length;i++){
          that.setData({
            title: msg.data.list[i].title,
            time: msg.data.list[i].startTime,
            space: msg.data.list[i].address,
            jianjie: msg.data.list[i].introduction
          })
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },

  // 获取心理师列表
  getList() {
    const that = this;
    let data = {
      pageNum:1,
      pageSize:30
    }
    get({
      link: '/psychologist/info/list',
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
    console.log(app.globalData)
    this.getList()
    this.getPsyList()
    this.getPsy()
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