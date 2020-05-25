// subPages/streetpic/streetpic.js
import {
  get,
  post
} from "../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: []

  },
  previewImage(e){
    console.log(e)
    wx.previewImage({
      current:e.currentTarget.dataset.img,
      urls: this.data.imglist
    })
  },
  getpic(detpid,type){
    get({
      link:"/photoStreet/getList",
      data:{
        deptId: detpid,
        photoType: type
      }
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        let data=res.data.list[0]
        let arr = data.photo_url.split(",")
        console.log(arr)
        this.setData({
          imglist:arr
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.getpic(options.deptid,options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})