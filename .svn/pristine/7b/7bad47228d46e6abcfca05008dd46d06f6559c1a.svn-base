// subPages/forum/learning/learning.js
import { get } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:'1',
    news_type:20,//三会
    allList:[],//三会一课列表
    news_types:21,//主题
    allLists: [] //主题党日列表
  },
  //切换菜单
  changeNav(e){
    this.setData({
      nav: e.currentTarget.dataset.nav
    })
  },
  //跳转主题党日详情
  toThemes(e){
   
    let id = e.currentTarget.dataset.id;
    let titleone='主题党日'
    wx.navigateTo({
      url: `/subPages/forum/partyDetails/partyDetails?id=${id}&title=${titleone}`,
    })
  },
  //跳转三会一课详情
  toTheme(e) {
    
    let id = e.currentTarget.dataset.id;
    let title = '三会一课'
    wx.navigateTo({
      url: `/subPages/forum/partyDetails/partyDetails?id=${id}&title=${title}`,
    })
  },
  //获取三会一课列表
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
  //获取主题党日
  goParty() {
    let data = {
      newsType: this.data.news_types
    }
    get({
      link: '/information/list',
      data: data
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          allLists: res.data.list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goLesson(),
    this.goParty() 
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