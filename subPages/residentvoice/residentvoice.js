// subPages/residentvoice/residentvoice.js
import {get} from "../../assets/js/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize:10,
    pageNum:1,
    voicelist:[]
  },
  godetail(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url+"?id="+e.currentTarget.dataset.id,
    })
  },
  getvoicelist(){
    let data={
      pageSize: this.data.pageSize,
      pageNum: this.data.pageNum
    }
    get({
      link:'/heartvoice/list',
      data:data
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        this.setData({
          voicelist:res.data.list,
        })
      }
      console.log(res.data.list)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getvoicelist()
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