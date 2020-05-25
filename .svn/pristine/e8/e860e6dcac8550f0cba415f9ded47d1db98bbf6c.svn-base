// subPages/emotionHistory/emotionHistory.js
import { get, post } from "../../assets/js/request";
import { getDataValue, getSubDataValue } from "../../assets/js/public";

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { 
        content:"我们石井坡街道附近有没有好的汽修店哦，我向找一家稳定在那维修保养",
        time:"2分钟前",
        detailsUrl:"/subPages/historyDetails/historyDetails"
      },
      {
        content: "家里面孩子老是不听我的话怎么办？",
        time: "2分钟前",
        detailsUrl: "/subPages/historyDetails/historyDetails"
      }
    ],
    idTwo:0
  },

  //浏览历史详情
  goDetails(e) {
    console.log(e)
    let id = getDataValue(e).item.hisMessageId;
    let title = getDataValue(e).item.hisTitle;
    let url = "/subPages/emotiondetails/emotiondetails?title=" + title + "&id=" + id;
    wx.navigateTo({
      url
    })
  },

  // 获取浏览历史列表
  getList(e) {
    const that = this;
    let data = {
      
    }
    get({
      link: '/read/history/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data.list,
        });
      }

    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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