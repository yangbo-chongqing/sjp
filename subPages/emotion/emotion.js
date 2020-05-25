// subPages/emotion/emotion.js
import { get,post } from "../../assets/js/request";
import { getDataValue, getSubDataValue } from "../../assets/js/public";

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { imgSrc: "https://webservers.sjpdqfwzx.com/file/icon/Group 195.png", title: "发布帖子", bannerurl:"/subPages/emotionpost/emotionpost"},
      { imgSrc: "https://webservers.sjpdqfwzx.com/file/icon/Group 197.png", title: "与我相关", bannerurl: "/subPages/emotionTome/emotionTome" },
      { imgSrc: "https://webservers.sjpdqfwzx.com/file/icon/Group 198 (1).png", title: "浏览历史", bannerurl: "/subPages/emotionHistory/emotionHistory" }
    ],
    listContent:[],
    id: 0
  },
  // 跳转
  godetails(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  //情绪宣泄点详情
  goDetails(e) {
    console.log(e)
    let id = getDataValue(e).item.messageId;
    let title = getDataValue(e).item.messageTitle;
    let url = "/subPages/emotiondetails/emotiondetails?title=" + title + "&id=" + id;
    wx.navigateTo({
      url
    })
  },

  // 获取情绪列表
  getList(e) {
    const that = this;
    let data = {
      isOpen:0
    }
    get({
      link: '/message/info/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        for (let i = 0; i < msg.data.list.length;i++){
          that.setData({
            listContent: msg.data.list,
            open: msg.data.list[i].isOpen
          });
        }
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