// subPages/projectdetail/projectdetail.js
import {
  get
} from "../../assets/js/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    porone:{}
  },
  getone(id){
    let data={
      needId:id
    }
    get({
      link:'/need/info/list',
      data:data
    }).then(res=>{
      console.log(res)
      if(res.code==200){
        let obj=res.data.list[0]
        this.setData({
          porone:obj
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   nodes: this.data.nodes.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block"')
    // })
    this.getone(options.id)
    console.log(options)
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