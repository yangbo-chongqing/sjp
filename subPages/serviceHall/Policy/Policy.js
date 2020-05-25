// subPages/serviceHall/Policy/Policy.js
import { get } from "../../../assets/js/request";
import { post } from "../../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_type: 2,
    allList:[],//法规列表
    title:''
  },
  //输入框正在输入
  bindInput(e){
    console.log(e)
    let data={
      title: e.detail,
      newsType:2
    } 
    this.toPost(data)
  },
  toPost(data){
    post({
      link: "/information/list",
      data: data
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          allList: res.data.list
        })
      }
    })
  },
  //获取列表
  toPolicy(){
    let data = {
      newsType: this.data.news_type
    }
    this.toPost(data)
  },
  //跳转政策法规详情
  toDetails(e) {
    let id = e.detail;
    let titlef = '政策详情'
    wx.navigateTo({
      url: `/subPages/forum/elegantDetails/elegantDetails?id=${id}&title=${titlef}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.toPolicy({ newsType: this.data.news_type})
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