// subPages/gridlog/gridlog.js
import { get } from "../../assets/js/request";
import { getDataValue, getSubDataValue } from "../../assets/js/public";
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { title:"事件标题还是正常晋升？干部选拔热点的背后是否隐哈哈哈哈",type:"事件类型",time:"2019年12月 11时29分"},
      { title: "事件标题还是正常晋升？干部选拔热点的背后是否隐", type: "事件类型", time: "2019年12月 11时29分" }
    ]
  },

  //添加
  goAdd(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  // 网格日志详情
  goDetail(e) {
    let id = getDataValue(e).item.logId;
    let title = getDataValue(e).item.gridLogTypeDesc;
    let url = "/subPages/logdetails/logdetails?title=" + title + "&id=" + id;
    wx.navigateTo({
      url
    })
  },

  // 获取网络日志列表
  getList() {
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
      title: '网格日志',
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