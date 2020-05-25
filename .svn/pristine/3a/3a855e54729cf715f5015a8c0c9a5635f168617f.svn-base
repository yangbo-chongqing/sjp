// subPages/gridservice/gridservice.js
import {  get} from "../../assets/js/request"
import { getDataValue, getSubDataValue } from "../../assets/js/public";

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    // bannerList: [
    //   { 
    //     imgSrc: "https://webservers.sjpdqfwzx.com/file/icon/Group 195.png",
    //     title: "网格组织", 
    //     bannerUrl:"/subPages/gridorganization/gridorganization" 
    //   },
    //   { 
    //     imgSrc: "https://webservers.sjpdqfwzx.com/file/icon/Group 197.png", 
    //     title: "网格阵地", 
    //     bannerUrl:"/subPages/gridposition/gridposition" 
    //   },
    //   { 
    //     imgSrc: "https://webservers.sjpdqfwzx.com/file/icon/Group 198.png", 
    //     title: "网格日志", 
    //     bannerUrl:"/subPages/addlog/addlog" 
    //   }
    // ]
    gridPersonList:null
  },
  // 网格组织
  wgzu: function() {
    wx.navigateTo({
      url: '/subPages/gridorganization/gridorganization'
    })
  },
  //网格阵地
  wgzd: function() {
    wx.navigateTo({
      url: '/subPages/gridposition/gridposition'
    })
  },
  // 网格服务
  wglog: function() {
    let gridPersonList = this.data.gridPersonList;
    if (gridPersonList.length<=0) {
      wx.showToast({
        title: '您不是网格员！',
        icon: 'none',
      })
    } else {
      wx.navigateTo({
        url: '/subPages/addlog/addlog'
      })
    }
  },
  // goDetails(e) {
  //   wx.navigateTo({
  //     url: e.currentTarget.dataset.url,
  //   })
  // },

  //跳转详情
  goListDetails(e) {
    let { logInfo, logId } = getDataValue(e).item
    let url = "/subPages/logdetails/logdetails?title=" + logInfo + "&id=" + logId;
    wx.navigateTo({
      url
    })
  },

  // 获取党员学习生活列表
  getList(e) {
    const that = this;
    let data = {
     
    }
    get({
      link: '/gridLog/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list:msg.data.list
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
    let userInfo = wx.getStorageSync("userInfo")
    this.setData({
      gridPersonList: userInfo.gridPersonList,    //网格员
    })
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