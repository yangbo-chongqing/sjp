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
    ceshi:[],
    id:0,
    index:0,
    deptId:36,
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
      index: e.detail.value,
      deptId:this.data.array[e.detail.value].deptId,
    })
    console.log(this.data.index)
    console.log(this.data.deptId)
    console.log(this.data.ceshi)
    this.getList(this.data.deptId)
  },
  // 获取党建相册筛选列表
  getphotolist(e){
    get({
      link:'/system/sysDept/getByParentId',
      data:{deptId:35}
    }).then(msg=>{
      if (msg.code == 200) {
        this.setData({
          array: msg.data,      
        })}
        console.log(this.data.array)
    })
  },
  // 获取党建相册列表
  getList(id){
    const that=this;
    console.log(id)
    get({
      link: '/photoalbum/list',
      data: {deptId:id}
    }).then(msg => {
      console.log(msg)
      if (msg.code == 200) {
        that.setData({
          list: msg.data.list,      
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
    this.getList(this.data.deptId),
    this.getphotolist()
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