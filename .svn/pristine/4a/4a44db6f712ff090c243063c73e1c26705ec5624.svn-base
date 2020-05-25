// subPages/psyTeacherdetalis/psyTeacherdetalis.js
import {
  get
} from "../../assets/js/request"
//获取应用实例
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "https://www.mlxc365.com/images/zhongyixiang/zhihuidangjian.png",
    name: "",
    age: "",
    time: "",
    zb: "",
    text: "简介内容",
    zw: "12"
  },

  // 获取心理师详情
  getDetails() {
    const that = this;
    let data = {
      psId: that.data.id
    }
    get({
      link: '/psychologist/info/getOne',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          img: msg.data.psPic,
          name: msg.data.psName,
          text: msg.data.psIntro,
          zw: msg.data.psActor
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
    //接收id
    this.setData({
      id: options.id,
      title: options.title
    })
    //修改页面标题
    const { title } = options;
    wx.setNavigationBarTitle({
      title
    })
    this.getDetails()
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