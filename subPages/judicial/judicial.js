// subPages/judicial/judicial.js
import { getSubDataValue } from "../../assets/js/public";
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    img:"https://webservers.sjpdqfwzx.com/file/icon/sf.png",
    navList:[
      {
        img:"https://webservers.sjpdqfwzx.com/file/icon/flcs.png",
        navTitle:"法律常识",
        smallTitle:"及时了解，懂法运用",
        navUrl:"/subPages/judLaw/judLaw"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/mfzx.png",
        navTitle: "律师帮忙",
        smallTitle: "法律团队，专业指导",
        navUrl: "/subPages/judLawyer/judLawyer"
      },
      {
        img: "https://webservers.sjpdqfwzx.com/file/icon/xiazai.png",
        navTitle: "范本下载",
        smallTitle: "各种合同，一键下载",
        navUrl: "/subPages/judTemplate/judTemplate"
      }
    ]
  },
  goNav(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '司法协助助和',
    })
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