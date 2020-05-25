// subPages/dangPhoto/dangPhoto.js
import { getDataValue } from "../../assets/js/public";
import {  get } from "../../assets/js/request";

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    array:[],
    id:0,
    index:0,
  },
  //党建相册详情
  godetail(e) {
    console.log(e)
    let id = getDataValue(e).item.photoAlbumId;
    let title = getDataValue(e).item.photoAlbumName;
    let url = "/subPages/dangPhoto/photoDetails/photoDetails?title=" + title + "&id=" + id;
    wx.navigateTo({
      url
    })
  },
  //获取筛选列表
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  // 获取党建相册列表
  getList(e){
    const that=this;
    let data={
      
    }
    get({
      link: '/photoalbum/list',
      data: data
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data.list,      
          array: msg.data.list
        })
        var newArray = array.map(item => {　　　　// 此方法名称区分到一个新数组中
          return { photoAlbumName: item.photoAlbumName };
        });
        that.setData({
          list:newArray
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
    wx.setNavigationBarTitle({
      title: '党建相册',
    })
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